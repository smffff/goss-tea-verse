#!/bin/bash

# Fix RLS Security Audit Log Script
# This script helps fix the RLS issue on the security_audit_log table

set -e

echo "🔒 Fix RLS Security Audit Log"
echo "=============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

echo ""
print_status "Security Issue Detected:"
echo "The 'security_audit_log' table in the public schema doesn't have Row Level Security (RLS) enabled."
echo "This is a security concern that needs to be fixed."
echo ""

print_status "Available Solutions:"
echo "========================"
echo "1. Run SQL directly in Supabase Dashboard (Recommended)"
echo "2. Use Supabase CLI (if available)"
echo "3. Apply via API call"
echo ""

echo "Option 1: Supabase Dashboard (Recommended)"
echo "=========================================="
echo "1. Go to your Supabase project dashboard"
echo "2. Navigate to SQL Editor"
echo "3. Copy and paste the contents of 'scripts/fix-security-audit-log-rls.sql'"
echo "4. Click 'Run' to execute the SQL"
echo ""

echo "Option 2: Supabase CLI"
echo "======================"
if command -v supabase &> /dev/null; then
    print_success "Supabase CLI is available!"
    echo "Run: supabase db push"
    echo "This will apply the migration: supabase/migrations/20250626000001_fix_security_audit_log_rls.sql"
else
    print_warning "Supabase CLI not found."
    echo "To install:"
    echo "  macOS: brew install supabase/tap/supabase"
    echo "  Linux: curl -fsSL https://supabase.com/install.sh | sh"
    echo "  Or download from: https://supabase.com/docs/guides/cli/getting-started"
fi

echo ""
echo "Option 3: API Call"
echo "=================="
echo "If you have the service role key, you can make an API call:"
echo ""
echo "curl -X POST 'https://your-project-ref.supabase.co/rest/v1/rpc/exec_sql' \\"
echo "  -H 'apikey: YOUR_SERVICE_ROLE_KEY' \\"
echo "  -H 'Authorization: Bearer YOUR_SERVICE_ROLE_KEY' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d @scripts/fix-security-audit-log-rls.sql"
echo ""

print_status "What the fix does:"
echo "======================"
echo "✅ Enables RLS on the security_audit_log table"
echo "✅ Creates policies for admin access (SELECT)"
echo "✅ Creates policies for moderator insert access"
echo "✅ Creates policies for system insert access"
echo "✅ Grants appropriate permissions to authenticated users"
echo "✅ Logs the security fix in the audit log"
echo ""

print_status "Verification:"
echo "=============="
echo "After applying the fix, you can verify it worked by running:"
echo ""
echo "SELECT schemaname, tablename, rowsecurity"
echo "FROM pg_tables"
echo "WHERE tablename = 'security_audit_log' AND schemaname = 'public';"
echo ""
echo "Expected result: rowsecurity should be 't' (true)"
echo ""

print_warning "Important Notes:"
echo "==================="
echo "• This fix only affects the security_audit_log table"
echo "• Existing data will be preserved"
echo "• The fix is backward compatible"
echo "• No downtime required"
echo ""

print_success "Ready to fix! Choose one of the options above." 