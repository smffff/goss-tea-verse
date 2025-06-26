#!/bin/bash

# Security Hardening Test Script
# This script tests your security hardening deployment

set -e

echo "🧪 Testing CTea Security Hardening Deployment"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[TEST]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[PASS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[FAIL]${NC} $1"
}

# Test 1: Check if environment variables are set
test_env_vars() {
    print_status "Testing environment variables..."
    
    if [ -f ".env.local" ]; then
        if grep -q "SUPABASE_URL" .env.local && grep -q "SUPABASE_SERVICE_ROLE_KEY" .env.local; then
            print_success "Environment variables found"
        else
            print_error "Missing required environment variables"
            return 1
        fi
    else
        print_error "No .env.local file found"
        return 1
    fi
}

# Test 2: Test Edge Function endpoint
test_edge_function() {
    print_status "Testing Edge Function endpoint..."
    
    # Get the project URL from environment
    if [ -f ".env.local" ]; then
        SUPABASE_URL=$(grep "SUPABASE_URL" .env.local | cut -d '=' -f2)
        SUPABASE_SERVICE_ROLE_KEY=$(grep "SUPABASE_SERVICE_ROLE_KEY" .env.local | cut -d '=' -f2)
        PROJECT_REF=$(echo $SUPABASE_URL | sed 's|https://||' | sed 's|.supabase.co||')
        ENDPOINT="https://${PROJECT_REF}.functions.supabase.co/harden_security"
        
        print_status "Testing: $ENDPOINT"
        
        # Test the function with proper authentication
        response=$(curl -s -X POST "$ENDPOINT" \
          -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
          -H "Content-Type: application/json" \
          -d '{"test": true}' 2>/dev/null || echo "ERROR")
        
        if [ "$response" = "ERROR" ]; then
            print_error "Failed to connect to Edge Function"
            print_warning "Make sure the function is deployed and accessible"
            return 1
        elif echo "$response" | grep -q '"success":true'; then
            print_success "Edge Function test passed!"
            print_status "Response: $response"
        else
            print_warning "Edge Function returned unexpected response"
            print_status "Response: $response"
            return 1
        fi
    else
        print_error "Cannot test Edge Function without .env.local"
        return 1
    fi
}

# Test 3: Check GitHub workflow file
test_github_workflow() {
    print_status "Testing GitHub workflow configuration..."
    
    if [ -f ".github/workflows/harden-security.yml" ]; then
        if grep -q "HARDEN_SECURITY_ENDPOINT" .github/workflows/harden-security.yml; then
            print_success "GitHub workflow configured correctly"
        else
            print_warning "GitHub workflow may need the secret configured"
        fi
    else
        print_error "GitHub workflow file not found"
        return 1
    fi
}

# Test 4: Check SQL migration
test_sql_migration() {
    print_status "Testing SQL migration file..."
    
    # Look for any security hardening migration file
    migration_file=$(find supabase/migrations/ -name "*security_hardening.sql" 2>/dev/null | head -1)
    
    if [ -n "$migration_file" ] && [ -f "$migration_file" ]; then
        if grep -q "run_security_hardening_script" "$migration_file"; then
            print_success "SQL migration file found: $(basename $migration_file)"
        else
            print_error "SQL migration file missing required function"
            return 1
        fi
    else
        print_error "SQL migration file not found"
        return 1
    fi
}

# Test 5: Check Edge Function code
test_edge_function_code() {
    print_status "Testing Edge Function code..."
    
    if [ -f "supabase/functions/harden_security/index.ts" ]; then
        if grep -q "run_security_hardening_script" supabase/functions/harden_security/index.ts; then
            print_success "Edge Function code found and calls security script"
        else
            print_error "Edge Function code missing security script call"
            return 1
        fi
    else
        print_error "Edge Function code not found"
        return 1
    fi
}

# Main test execution
main() {
    echo ""
    
    tests_passed=0
    total_tests=5
    
    test_env_vars && tests_passed=$((tests_passed + 1))
    echo ""
    
    test_edge_function && tests_passed=$((tests_passed + 1))
    echo ""
    
    test_github_workflow && tests_passed=$((tests_passed + 1))
    echo ""
    
    test_sql_migration && tests_passed=$((tests_passed + 1))
    echo ""
    
    test_edge_function_code && tests_passed=$((tests_passed + 1))
    echo ""
    
    # Final results
    echo "=============================================="
    echo "🧪 Test Results: $tests_passed/$total_tests tests passed"
    echo "=============================================="
    
    if [ $tests_passed -eq $total_tests ]; then
        print_success "All tests passed! Your security hardening is ready."
        echo ""
        echo "🎉 Next steps:"
        echo "1. Deploy the Edge Function: supabase functions deploy harden_security"
        echo "2. Set up GitHub Secret: HARDEN_SECURITY_ENDPOINT"
        echo "3. Test the GitHub workflow manually"
    else
        print_warning "Some tests failed. Please review the issues above."
        echo ""
        echo "🔧 To fix issues:"
        echo "1. Check DEPLOYMENT_CHECKLIST.md for detailed steps"
        echo "2. Review SECURITY_DEPLOYMENT_GUIDE.md for troubleshooting"
        echo "3. Ensure all files are properly configured"
    fi
}

# Run the tests
main "$@" 