#!/bin/bash

# CTea TypeScript Any Type Fixer
# This script helps identify and fix common TypeScript any patterns

echo "🔍 CTea TypeScript Any Type Analysis"
echo "====================================="

# Find all any types in the codebase
echo "📊 Current any type usage:"
grep -r "any" src/ --include="*.ts" --include="*.tsx" | grep -v "node_modules" | wc -l

echo ""
echo "🎯 Common any patterns found:"
echo ""

# Find Promise<any> patterns
echo "1. Promise<any> patterns:"
grep -r "Promise<any>" src/ --include="*.ts" --include="*.tsx" | head -5

# Find event: any patterns
echo ""
echo "2. event: any patterns:"
grep -r "event: any" src/ --include="*.ts" --include="*.tsx" | head -5

# Find data: any patterns
echo ""
echo "3. data: any patterns:"
grep -r "data: any" src/ --include="*.ts" --include="*.tsx" | head -5

echo ""
echo "💡 Recommended fixes:"
echo "===================="
echo ""
echo "1. Replace Promise<any> with Promise<SpecificType>"
echo "   Example: Promise<any> → Promise<AuthResult>"
echo ""
echo "2. Replace event: any with proper event types"
echo "   Example: event: any → event: React.ChangeEvent<HTMLInputElement>"
echo ""
echo "3. Replace data: any with interface types"
echo "   Example: data: any → data: ApiResponse"
echo ""
echo "4. Use unknown instead of any for truly unknown types"
echo "   Example: any → unknown"
echo ""
echo "🚀 Run 'npm run lint' to see current issues"
echo "🔧 Use 'npm run lint -- --fix' for auto-fixable issues" 