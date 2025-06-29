#!/bin/bash

# Fix OTP Expiry Security Issue
# This script helps configure the OTP expiry to a secure value (15 minutes)

set -e

echo "🔒 Fixing OTP Expiry Security Issue"
echo "=================================="

# Check if supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI is not installed. Please install it first:"
    echo "   npm install -g supabase"
    exit 1
fi

# Check if we're in a Supabase project
if [ ! -f "supabase/config.toml" ]; then
    echo "❌ Not in a Supabase project directory. Please run this from your project root."
    exit 1
fi

echo "📋 Current OTP settings:"
echo "   You can check your current OTP expiry setting in the Supabase dashboard:"
echo "   https://supabase.com/dashboard/project/$(grep project_id supabase/config.toml | cut -d'"' -f2)/auth/settings"
echo ""

echo "🔧 Recommended OTP Expiry Settings:"
echo "   - Set OTP expiry to 15 minutes (900 seconds) or less"
echo "   - This is well under the 1-hour security recommendation"
echo ""

echo "📝 Manual Steps Required:"
echo "   1. Go to your Supabase dashboard"
echo "   2. Navigate to Authentication > Settings > Email Auth"
echo "   3. Set 'OTP Expiry' to 900 seconds (15 minutes) or less"
echo "   4. Save the changes"
echo ""

echo "✅ Database migration has been created to fix the function search path issue"
echo "   Run: supabase db push"
echo ""

echo "🔍 To verify the fixes:"
echo "   1. Run the database migration: supabase db push"
echo "   2. Check security compliance: SELECT * FROM check_security_compliance();"
echo "   3. Verify OTP settings in Supabase dashboard"
echo ""

echo "📊 Security Status:"
echo "   - Function search path: ✅ Fixed (via migration)"
echo "   - OTP expiry: ⚠️  Manual action required"
echo ""

echo "🎯 Next Steps:"
echo "   1. Apply the database migration"
echo "   2. Update OTP expiry in Supabase dashboard"
echo "   3. Run security compliance check"
echo "   4. Verify both linting issues are resolved" 