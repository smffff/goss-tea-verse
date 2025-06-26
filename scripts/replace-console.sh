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
