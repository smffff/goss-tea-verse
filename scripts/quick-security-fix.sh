#!/bin/bash

# CTea Quick Security Fix
# This script quickly fixes the most critical security issues

echo "🫖 CTea Quick Security Fix"
echo "=========================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "🔒 Applying critical security fixes..."

# 1. Create a global console override in the main entry point
echo "🔧 Creating global console override..."

cat > src/utils/globalSecurity.ts << 'EOF'
// Global Security Override
// This file must be imported first in main.tsx to override console methods

const isProduction = process.env.NODE_ENV === 'production' || 
                     window.location.hostname === 'cteanews.com' ||
                     window.location.hostname === 'www.cteanews.com';

const isDevelopment = process.env.NODE_ENV === 'development';

// Sensitive patterns to detect and sanitize
const SENSITIVE_PATTERNS = [
  /password[=:]\s*\S+/gi,
  /token[=:]\s*\S+/gi,
  /key[=:]\s*\S+/gi,
  /secret[=:]\s*\S+/gi,
  /auth[=:]\s*\S+/gi,
  /api[_-]?key[=:]\s*\S+/gi,
  /private[_-]?key[=:]\s*\S+/gi,
  /access[_-]?token[=:]\s*\S+/gi,
  /session[_-]?id[=:]\s*\S+/gi,
  /user[_-]?id[=:]\s*\S+/gi,
  /email[=:]\s*\S+/gi,
  /phone[=:]\s*\S+/gi,
  /address[=:]\s*\S+/gi,
  /ssn[=:]\s*\S+/gi,
  /credit[_-]?card[=:]\s*\S+/gi,
  /cvv[=:]\s*\S+/gi,
  /pin[=:]\s*\S+/gi
];

// Sanitize sensitive data
const sanitizeData = (data: any): any => {
  if (isProduction) {
    if (typeof data === 'string') {
      let sanitized = data;
      SENSITIVE_PATTERNS.forEach(pattern => {
        sanitized = sanitized.replace(pattern, (match) => {
          const [key] = match.split(/[=:]/);
          return `${key}=***`;
        });
      });
      return sanitized.substring(0, 200); // Limit length
    }
    
    if (typeof data === 'object' && data !== null) {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(data)) {
        const lowerKey = key.toLowerCase();
        if (['password', 'token', 'key', 'secret', 'auth', 'email', 'phone', 'address', 'ssn', 'credit', 'cvv', 'pin'].some(sensitive => lowerKey.includes(sensitive))) {
          sanitized[key] = '***';
        } else {
          sanitized[key] = sanitizeData(value);
        }
      }
      return sanitized;
    }
  }
  return data;
};

// Override console methods in production
if (isProduction) {
  // Store original methods
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalInfo = console.info;
  const originalDebug = console.debug;

  // Override console.log - only show in development
  console.log = (...args: any[]) => {
    if (isDevelopment) {
      originalLog.apply(console, args);
    }
  };

  // Override console.error - sanitize in production
  console.error = (...args: any[]) => {
    if (isDevelopment) {
      originalError.apply(console, args);
    } else {
      const sanitizedArgs = args.map(arg => sanitizeData(arg));
      originalError.apply(console, sanitizedArgs);
    }
  };

  // Override console.warn - sanitize in production
  console.warn = (...args: any[]) => {
    if (isDevelopment) {
      originalWarn.apply(console, args);
    } else {
      const sanitizedArgs = args.map(arg => sanitizeData(arg));
      originalWarn.apply(console, sanitizedArgs);
    }
  };

  // Override console.info - only show in development
  console.info = (...args: any[]) => {
    if (isDevelopment) {
      originalInfo.apply(console, args);
    }
  };

  // Override console.debug - only show in development
  console.debug = (...args: any[]) => {
    if (isDevelopment) {
      originalDebug.apply(console, args);
    }
  };
}

// Export for use in other files
export const secureEnvironment = {
  isProduction,
  isDevelopment,
  sanitizeData,
  log: (message: string, data?: any) => {
    if (isDevelopment) {
      console.log(message, data);
    }
  },
  error: (message: string, error?: any) => {
    if (isDevelopment) {
      console.error(message, error);
    } else {
      const sanitizedError = error instanceof Error 
        ? { message: error.message, name: error.name }
        : sanitizeData(error);
      console.error(message, sanitizedError);
    }
  },
  warn: (message: string, data?: any) => {
    if (isDevelopment) {
      console.warn(message, data);
    }
  },
  debug: (message: string, data?: any) => {
    if (isDevelopment) {
      console.log(`[DEBUG] ${message}`, data);
    }
  }
};
EOF

echo "✅ Created global security override"

# 2. Update main.tsx to import the security override first
echo "🔧 Updating main.tsx..."

# Check if main.tsx exists
if [ -f "src/main.tsx" ]; then
    # Add import at the very beginning if not already present
    if ! grep -q "globalSecurity" src/main.tsx; then
        # Create a temporary file with the import
        echo "import './utils/globalSecurity';" > temp_main.tsx
        cat src/main.tsx >> temp_main.tsx
        mv temp_main.tsx src/main.tsx
        echo "✅ Added security import to main.tsx"
    else
        echo "✅ Security import already present in main.tsx"
    fi
else
    echo "⚠️  main.tsx not found, skipping"
fi

# 3. Create a production environment check
echo "🔧 Creating production environment check..."

cat > src/utils/productionCheck.ts << 'EOF'
// Production Environment Check
// This utility ensures sensitive information is never exposed in production

export const isProduction = process.env.NODE_ENV === 'production' || 
                           window.location.hostname === 'cteanews.com' ||
                           window.location.hostname === 'www.cteanews.com';

export const isDevelopment = process.env.NODE_ENV === 'development';

// Check if we're in a production-like environment
export const isProductionLike = () => {
  return isProduction || 
         window.location.hostname.includes('vercel.app') ||
         window.location.hostname.includes('netlify.app') ||
         window.location.hostname.includes('herokuapp.com') ||
         window.location.hostname.includes('railway.app');
};

// Secure environment utilities
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

echo "✅ Created production environment check"

# 4. Create a security audit script
echo "🔧 Creating security audit script..."

cat > scripts/security-audit-quick.sh << 'EOF'
#!/bin/bash

echo "🔒 CTea Quick Security Audit"
echo "============================"

# Check for exposed sensitive information
echo "1. Checking for sensitive data exposure..."
SENSITIVE_COUNT=$(grep -r -i "password\|token\|secret\|key\|auth" src/ --include="*.ts" --include="*.tsx" | grep -v "process.env.NODE_ENV" | grep -v "sanitize" | grep -v "globalSecurity" | wc -l)
echo "   Found $SENSITIVE_COUNT potential sensitive data exposures"

# Check for development-only code in production
echo "2. Checking for development code in production..."
DEV_CODE=$(grep -r "process.env.NODE_ENV.*development" src/ --include="*.ts" --include="*.tsx" | wc -l)
echo "   Found $DEV_CODE development-only code blocks"

# Check for console statements
echo "3. Checking for console statements..."
CONSOLE_COUNT=$(grep -r "console\." src/ --include="*.ts" --include="*.tsx" | grep -v "globalSecurity" | wc -l)
echo "   Found $CONSOLE_COUNT console statements (will be overridden in production)"

# Check for error boundary security
echo "4. Checking error boundary security..."
ERROR_BOUNDARIES=$(find src/components/error/ -name "*.tsx" -exec grep -l "process.env.NODE_ENV" {} \; | wc -l)
echo "   Found $ERROR_BOUNDARIES secure error boundaries"

# Check if global security is imported
echo "5. Checking global security import..."
if grep -q "globalSecurity" src/main.tsx; then
    echo "   ✅ Global security override is imported"
else
    echo "   ❌ Global security override is NOT imported"
fi

echo "✅ Quick security audit complete"
EOF

chmod +x scripts/security-audit-quick.sh

echo "✅ Created quick security audit script"

# 5. Create deployment checklist
echo "📋 Creating deployment checklist..."

cat > QUICK_SECURITY_CHECKLIST.md << 'EOF'
# CTea Quick Security Deployment Checklist

## Critical Security Fixes Applied ✅

### 1. Global Console Override
- [x] Console methods overridden in production
- [x] Sensitive data automatically sanitized
- [x] Development logging preserved
- [x] Production logging sanitized

### 2. Error Boundary Security
- [x] ProductionErrorBoundary no longer exposes technical details in production
- [x] Console logging wrapped with environment checks
- [x] Error details sanitized for production

### 3. Security Monitors
- [x] EnhancedSecurityMonitor completely hidden in production
- [x] SecurityHealthMonitor completely hidden in production
- [x] Debug flags required for development visibility

### 4. Production Environment Detection
- [x] Multiple production environment checks
- [x] Hostname-based production detection
- [x] Secure environment utilities

## Pre-Deployment Checks

Before deploying to production:

1. Run the quick security audit:
   ```bash
   ./scripts/security-audit-quick.sh
   ```

2. Test the application:
   ```bash
   npm run build
   npm run preview
   ```

3. Verify console behavior:
   - Check that console.log statements are not visible in production
   - Verify error messages are sanitized
   - Confirm development logging still works

## Post-Deployment Verification

After deployment:

1. Open browser console in production
2. Verify no sensitive information is exposed
3. Check that error pages don't show technical details
4. Confirm security monitors are not visible
5. Test error handling

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

echo "✅ Created quick security checklist"

# 6. Test the build
echo "🔧 Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed - please fix compilation errors"
    exit 1
fi

echo ""
echo "🎉 Quick security fixes completed!"
echo ""
echo "Summary:"
echo "- Created global console override"
echo "- Updated main.tsx with security import"
echo "- Created production environment check"
echo "- Created quick security audit script"
echo "- Created deployment checklist"
echo "- Verified build works"
echo ""
echo "Next steps:"
echo "1. Test the application in development"
echo "2. Run: ./scripts/security-audit-quick.sh"
echo "3. Deploy to production"
echo "4. Verify no sensitive information is exposed"
echo ""
echo "For security issues, contact: security@cteanews.com" 