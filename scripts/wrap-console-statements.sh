#!/bin/bash

# CTea Console Statement Wrapper
# This script wraps console.log and console.error statements with environment checks

echo "🫖 CTea Console Statement Wrapper"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "🔒 Wrapping console statements with environment checks..."

# Create a backup directory
BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "📦 Creating backup in $BACKUP_DIR..."

# Backup all TypeScript and TSX files
find src/ -name "*.ts" -o -name "*.tsx" | while read file; do
    cp "$file" "$BACKUP_DIR/"
done

echo "✅ Backup created"

# Function to wrap console statements
wrap_console_statements() {
    local file="$1"
    local temp_file="${file}.tmp"
    
    # Skip files that already have proper environment checks
    if grep -q "process.env.NODE_ENV.*development" "$file"; then
        return 0
    fi
    
    # Create a temporary file
    cp "$file" "$temp_file"
    
    # Wrap console.log statements
    sed -i.tmp 's/console\.log(/if (process.env.NODE_ENV === "development") { console.log(/g' "$temp_file"
    sed -i.tmp 's/console\.log(/if (process.env.NODE_ENV === "development") { console.log(/g' "$temp_file"
    
    # Add closing braces for console.log statements
    sed -i.tmp 's/console\.log([^)]*);/if (process.env.NODE_ENV === "development") { console.log(\1); }/g' "$temp_file"
    
    # Wrap console.error statements (but keep them in production with sanitization)
    sed -i.tmp 's/console\.error(/if (process.env.NODE_ENV === "development") { console.error(/g' "$temp_file"
    sed -i.tmp 's/console\.error(/if (process.env.NODE_ENV === "development") { console.error(/g' "$temp_file"
    
    # Add closing braces for console.error statements
    sed -i.tmp 's/console\.error([^)]*);/if (process.env.NODE_ENV === "development") { console.error(\1); }/g' "$temp_file"
    
    # Replace the original file
    mv "$temp_file" "$file"
    rm -f "${file}.tmp"
}

# Process all TypeScript and TSX files
echo "🔧 Processing files..."

find src/ -name "*.ts" -o -name "*.tsx" | while read file; do
    # Skip certain files that should not be modified
    if [[ "$file" == *"node_modules"* ]] || [[ "$file" == *"dist"* ]] || [[ "$file" == *"build"* ]]; then
        continue
    fi
    
    # Check if file contains console statements
    if grep -q "console\." "$file"; then
        echo "Processing: $file"
        wrap_console_statements "$file"
    fi
done

echo "✅ Console statements wrapped"

# Create a more comprehensive security utility
echo "🔧 Creating comprehensive security utility..."

cat > src/utils/secureLogging.ts << 'EOF'
// CTea Secure Logging Utility
// This utility ensures no sensitive information is exposed in production

export const isProduction = process.env.NODE_ENV === 'production' || 
                           window.location.hostname === 'cteanews.com' ||
                           window.location.hostname === 'www.cteanews.com';

export const isDevelopment = process.env.NODE_ENV === 'development';

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
export const sanitizeData = (data: any): any => {
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

// Secure logging functions
export const secureLog = {
  // Only log in development
  info: (message: string, data?: any) => {
    if (isDevelopment) {
      console.log(message, data);
    }
  },
  
  // Log errors with sanitization in production
  error: (message: string, error?: any) => {
    if (isDevelopment) {
      console.error(message, error);
    } else {
      const sanitizedError = error instanceof Error 
        ? { message: error.message, name: error.name, stack: error.stack?.substring(0, 500) }
        : sanitizeData(error);
      console.error(message, sanitizedError);
    }
  },
  
  // Only warn in development
  warn: (message: string, data?: any) => {
    if (isDevelopment) {
      console.warn(message, data);
    }
  },
  
  // Debug logging (development only)
  debug: (message: string, data?: any) => {
    if (isDevelopment) {
      console.log(`[DEBUG] ${message}`, data);
    }
  },
  
  // Security event logging (always logged but sanitized)
  security: (event: string, details?: any) => {
    const sanitizedDetails = sanitizeData(details);
    if (isDevelopment) {
      console.warn(`[SECURITY] ${event}`, sanitizedDetails);
    } else {
      console.warn(`[SECURITY] ${event}`, sanitizedDetails);
    }
  }
};

// Replace console methods globally in production
if (isProduction) {
  // Override console.log
  const originalLog = console.log;
  console.log = (...args: any[]) => {
    const sanitizedArgs = args.map(arg => sanitizeData(arg));
    originalLog.apply(console, sanitizedArgs);
  };
  
  // Override console.error (keep for errors but sanitize)
  const originalError = console.error;
  console.error = (...args: any[]) => {
    const sanitizedArgs = args.map(arg => sanitizeData(arg));
    originalError.apply(console, sanitizedArgs);
  };
  
  // Override console.warn
  const originalWarn = console.warn;
  console.warn = (...args: any[]) => {
    const sanitizedArgs = args.map(arg => sanitizeData(arg));
    originalWarn.apply(console, sanitizedArgs);
  };
}
EOF

echo "✅ Created comprehensive security logging utility"

# Create a script to replace console statements with secure logging
echo "🔧 Creating console replacement script..."

cat > scripts/replace-console.sh << 'EOF'
#!/bin/bash

# Replace console statements with secure logging

echo "🫖 Replacing console statements with secure logging..."

# Find all TypeScript and TSX files
find src/ -name "*.ts" -o -name "*.tsx" | while read file; do
    # Skip certain files
    if [[ "$file" == *"node_modules"* ]] || [[ "$file" == *"dist"* ]] || [[ "$file" == *"build"* ]] || [[ "$file" == *"secureLogging.ts"* ]]; then
        continue
    fi
    
    # Check if file contains console statements
    if grep -q "console\." "$file"; then
        echo "Processing: $file"
        
        # Add import if not present
        if ! grep -q "import.*secureLog" "$file"; then
            # Add import at the top of the file
            sed -i.tmp '1i import { secureLog } from "@/utils/secureLogging";' "$file"
        fi
        
        # Replace console.log with secureLog.info
        sed -i.tmp 's/console\.log(/secureLog.info(/g' "$file"
        
        # Replace console.error with secureLog.error
        sed -i.tmp 's/console\.error(/secureLog.error(/g' "$file"
        
        # Replace console.warn with secureLog.warn
        sed -i.tmp 's/console\.warn(/secureLog.warn(/g' "$file"
        
        # Clean up temporary files
        rm -f "${file}.tmp"
    fi
done

echo "✅ Console statements replaced with secure logging"
EOF

chmod +x scripts/replace-console.sh

echo "✅ Created console replacement script"

# Run the replacement script
echo "🔧 Running console replacement..."
./scripts/replace-console.sh

echo ""
echo "🎉 Console statement wrapping completed!"
echo ""
echo "Summary:"
echo "- Created backup in $BACKUP_DIR"
echo "- Wrapped console statements with environment checks"
echo "- Created comprehensive security logging utility"
echo "- Created console replacement script"
echo ""
echo "Next steps:"
echo "1. Review the changes in the files"
echo "2. Test the application in development"
echo "3. Run: ./scripts/security-audit.sh"
echo "4. Deploy to production"
echo "5. Verify no sensitive information is exposed"
echo ""
echo "To restore from backup:"
echo "cp -r $BACKUP_DIR/* src/" 