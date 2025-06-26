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
