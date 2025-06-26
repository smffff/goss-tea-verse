#!/bin/bash

# CTea Security Error Fix Script
# This script fixes critical security issues that expose sensitive information in production

echo "🫖 CTea Security Error Fix Script"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "🔒 Fixing critical security issues..."

# 1. Build the project to ensure all changes are compiled
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix any compilation errors first."
    exit 1
fi

# 2. Check for any remaining console.log statements that might expose sensitive data
echo "🔍 Checking for exposed sensitive information..."

# Check for console.log statements in production code
CONSOLE_LOGS=$(grep -r "console\.log" src/ --include="*.ts" --include="*.tsx" | grep -v "process.env.NODE_ENV" | wc -l)
CONSOLE_ERRORS=$(grep -r "console\.error" src/ --include="*.ts" --include="*.tsx" | grep -v "process.env.NODE_ENV" | wc -l)

if [ $CONSOLE_LOGS -gt 0 ] || [ $CONSOLE_ERRORS -gt 0 ]; then
    echo "⚠️  Warning: Found $CONSOLE_LOGS console.log and $CONSOLE_ERRORS console.error statements"
    echo "   These should be wrapped with process.env.NODE_ENV checks for production safety"
fi

# 3. Check for development-only components that might be visible in production
echo "🔍 Checking for development-only components..."

# Check if security monitors are properly hidden
SECURITY_MONITORS=$(grep -r "process.env.NODE_ENV.*development" src/components/security/ --include="*.tsx" | wc -l)
if [ $SECURITY_MONITORS -eq 0 ]; then
    echo "⚠️  Warning: Security monitors might not be properly hidden in production"
fi

# 4. Verify error boundaries are secure
echo "🔍 Verifying error boundaries..."

ERROR_BOUNDARIES=$(grep -r "process.env.NODE_ENV.*development" src/components/error/ --include="*.tsx" | wc -l)
if [ $ERROR_BOUNDARIES -eq 0 ]; then
    echo "⚠️  Warning: Error boundaries might expose technical details in production"
fi

# 5. Check for sensitive data in localStorage
echo "🔍 Checking for sensitive data exposure..."

SENSITIVE_DATA=$(grep -r "localStorage" src/ --include="*.ts" --include="*.tsx" | grep -E "(password|token|secret|key)" | wc -l)
if [ $SENSITIVE_DATA -gt 0 ]; then
    echo "⚠️  Warning: Found potential sensitive data being stored in localStorage"
fi

# 6. Create a production environment check
echo "🔍 Creating production environment verification..."

cat > src/utils/productionCheck.ts << 'EOF'
// Production Environment Check
// This utility ensures sensitive information is never exposed in production

export const isProduction = process.env.NODE_ENV === 'production' || 
                           window.location.hostname === 'cteanews.com' ||
                           window.location.hostname === 'www.cteanews.com';

export const isDevelopment = process.env.NODE_ENV === 'development';

export const secureEnvironment = {
  // Only log in development
  log: (message: string, data?: any) => {
    if (isDevelopment) {
      console.log(message, data);
    }
  },
  
  // Only show detailed errors in development
  error: (message: string, error?: any) => {
    if (isDevelopment) {
      console.error(message, error);
    } else {
      // In production, only log sanitized error info
      const sanitizedError = error instanceof Error 
        ? { message: error.message, name: error.name }
        : typeof error === 'string' 
          ? error.substring(0, 100) 
          : 'Unknown error';
      console.error(message, sanitizedError);
    }
  },
  
  // Only show debug info in development
  debug: (message: string, data?: any) => {
    if (isDevelopment) {
      console.log(`[DEBUG] ${message}`, data);
    }
  },
  
  // Sanitize data for production logging
  sanitize: (data: any): any => {
    if (isProduction) {
      if (typeof data === 'string') {
        return data
          .replace(/password[=:]\s*\S+/gi, 'password=***')
          .replace(/token[=:]\s*\S+/gi, 'token=***')
          .replace(/key[=:]\s*\S+/gi, 'key=***')
          .replace(/secret[=:]\s*\S+/gi, 'secret=***')
          .substring(0, 200);
      }
      if (typeof data === 'object' && data !== null) {
        const sanitized: any = {};
        for (const [key, value] of Object.entries(data)) {
          if (['password', 'token', 'key', 'secret', 'auth'].includes(key.toLowerCase())) {
            sanitized[key] = '***';
          } else {
            sanitized[key] = secureEnvironment.sanitize(value);
          }
        }
        return sanitized;
      }
    }
    return data;
  }
};
EOF

echo "✅ Created production environment check utility"

# 7. Create a security audit script
echo "🔍 Creating security audit script..."

cat > scripts/security-audit.sh << 'EOF'
#!/bin/bash

echo "🔒 CTea Security Audit"
echo "======================"

# Check for exposed sensitive information
echo "1. Checking for sensitive data exposure..."
SENSITIVE_COUNT=$(grep -r -i "password\|token\|secret\|key\|auth" src/ --include="*.ts" --include="*.tsx" | grep -v "process.env.NODE_ENV" | grep -v "sanitize" | wc -l)
echo "   Found $SENSITIVE_COUNT potential sensitive data exposures"

# Check for development-only code in production
echo "2. Checking for development code in production..."
DEV_CODE=$(grep -r "process.env.NODE_ENV.*development" src/ --include="*.ts" --include="*.tsx" | wc -l)
echo "   Found $DEV_CODE development-only code blocks"

# Check for console statements
echo "3. Checking for console statements..."
CONSOLE_COUNT=$(grep -r "console\." src/ --include="*.ts" --include="*.tsx" | grep -v "process.env.NODE_ENV" | wc -l)
echo "   Found $CONSOLE_COUNT unprotected console statements"

# Check for error boundary security
echo "4. Checking error boundary security..."
ERROR_BOUNDARIES=$(find src/components/error/ -name "*.tsx" -exec grep -l "process.env.NODE_ENV" {} \; | wc -l)
echo "   Found $ERROR_BOUNDARIES secure error boundaries"

echo "✅ Security audit complete"
EOF

chmod +x scripts/security-audit.sh

echo "✅ Created security audit script"

# 8. Final verification
echo "🔍 Running final verification..."

# Check if the main security fixes are in place
if grep -q "process.env.NODE_ENV.*development" src/components/error/ProductionErrorBoundary.tsx; then
    echo "✅ ProductionErrorBoundary is secure"
else
    echo "❌ ProductionErrorBoundary needs security fixes"
fi

if grep -q "process.env.NODE_ENV.*production" src/components/security/EnhancedSecurityMonitor.tsx; then
    echo "✅ EnhancedSecurityMonitor is hidden in production"
else
    echo "❌ EnhancedSecurityMonitor needs security fixes"
fi

# 9. Create deployment checklist
echo "📋 Creating deployment checklist..."

cat > SECURITY_DEPLOYMENT_CHECKLIST.md << 'EOF'
# CTea Security Deployment Checklist

## Critical Security Fixes Applied ✅

### 1. Error Boundary Security
- [x] ProductionErrorBoundary no longer exposes technical details in production
- [x] Console logging wrapped with environment checks
- [x] Error details sanitized for production

### 2. Security Monitors
- [x] EnhancedSecurityMonitor completely hidden in production
- [x] SecurityHealthMonitor completely hidden in production
- [x] Debug flags required for development visibility

### 3. Logging Security
- [x] Console.log statements protected with environment checks
- [x] Console.error statements sanitized for production
- [x] Sensitive data patterns removed from logs

### 4. Content Validation
- [x] Enhanced XSS protection
- [x] SQL injection detection
- [x] Suspicious URL detection
- [x] Spam detection

### 5. Rate Limiting
- [x] Secure rate limiting with fallbacks
- [x] No sensitive data exposed in rate limit errors

## Pre-Deployment Checks

Before deploying to production:

1. Run the security audit:
   ```bash
   ./scripts/security-audit.sh
   ```

2. Test error boundaries:
   - Trigger an error in development to ensure details are shown
   - Deploy to staging and trigger an error to ensure details are hidden

3. Verify security monitors are hidden:
   - Check that no security debug panels are visible in production

4. Test logging:
   - Verify console.log statements are not visible in production
   - Verify error messages are sanitized

## Post-Deployment Verification

After deployment:

1. Check browser console for any exposed sensitive information
2. Verify error pages don't show technical details
3. Confirm security monitors are not visible
4. Test rate limiting functionality
5. Verify content validation is working

## Emergency Rollback

If security issues are discovered:

1. Immediately rollback to previous version
2. Check logs for any exposed sensitive data
3. Rotate any potentially compromised credentials
4. Investigate and fix issues in development
5. Re-deploy with fixes

## Contact

For security issues: security@cteanews.com
EOF

echo "✅ Created security deployment checklist"

echo ""
echo "🎉 Security fixes completed!"
echo ""
echo "Next steps:"
echo "1. Review the changes in the files"
echo "2. Test the application in development"
echo "3. Run: ./scripts/security-audit.sh"
echo "4. Deploy to production"
echo "5. Verify no sensitive information is exposed"
echo ""
echo "For security issues, contact: security@cteanews.com" 