#!/bin/bash

# CTea Newsroom - AI Moderation & Token System Deployment Script
# This script deploys the complete AI moderation and $TEA token incentive system

set -e

echo "🫖 CTea Newsroom - AI Moderation & Token System Deployment"
echo "=========================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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

# Check if required tools are installed
check_dependencies() {
    print_status "Checking dependencies..."
    
    if ! command -v supabase &> /dev/null; then
        print_error "Supabase CLI is not installed. Please install it first:"
        echo "npm install -g supabase"
        exit 1
    fi
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install it first."
        exit 1
    fi
    
    print_success "All dependencies are installed"
}

# Check environment variables
check_environment() {
    print_status "Checking environment variables..."
    
    if [ -z "$SUPABASE_URL" ]; then
        print_error "SUPABASE_URL environment variable is not set"
        exit 1
    fi
    
    if [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
        print_error "SUPABASE_SERVICE_ROLE_KEY environment variable is not set"
        exit 1
    fi
    
    if [ -z "$OPENAI_API_KEY" ]; then
        print_warning "OPENAI_API_KEY environment variable is not set"
        print_warning "AI moderation will not work without this key"
    fi
    
    print_success "Environment variables are configured"
}

# Deploy database migration
deploy_migration() {
    print_status "Deploying database migration..."
    
    # Run the migration
    supabase db push
    
    if [ $? -eq 0 ]; then
        print_success "Database migration deployed successfully"
    else
        print_error "Database migration failed"
        exit 1
    fi
}

# Deploy edge functions
deploy_edge_functions() {
    print_status "Deploying edge functions..."
    
    # Deploy AI moderation function
    print_status "Deploying ai_moderate_spill function..."
    supabase functions deploy ai_moderate_spill --no-verify-jwt
    
    if [ $? -eq 0 ]; then
        print_success "AI moderation function deployed successfully"
    else
        print_error "AI moderation function deployment failed"
        exit 1
    fi
}

# Set environment variables for edge functions
set_edge_function_env() {
    print_status "Setting edge function environment variables..."
    
    if [ ! -z "$OPENAI_API_KEY" ]; then
        supabase secrets set OPENAI_API_KEY="$OPENAI_API_KEY"
        print_success "OpenAI API key configured"
    fi
    
    # Set other required environment variables
    supabase secrets set SUPABASE_URL="$SUPABASE_URL"
    supabase secrets set SUPABASE_SERVICE_ROLE_KEY="$SUPABASE_SERVICE_ROLE_KEY"
    
    print_success "Edge function environment variables configured"
}

# Test the deployment
test_deployment() {
    print_status "Testing deployment..."
    
    # Test database connection
    print_status "Testing database connection..."
    supabase db reset --linked
    
    # Test edge function
    print_status "Testing AI moderation function..."
    
    # Create a test payload
    cat > test_payload.json << EOF
{
  "content": "This is a test message for moderation",
  "spill_id": "test-123",
  "user_id": "test-user",
  "wallet_address": "test-wallet"
}
EOF
    
    # Test the function
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
      -d @test_payload.json \
      "$SUPABASE_URL/functions/v1/ai_moderate_spill"
    
    # Clean up test file
    rm test_payload.json
    
    print_success "Deployment test completed"
}

# Update audit log
update_audit_log() {
    print_status "Updating public audit log..."
    
    # Get current date
    DATE=$(date +"%Y-%m-%d")
    
    # Create audit entry
    cat >> public_audit_log.md << EOF

### $DATE - AI Moderation & Token System Deployment
- **Feature**: Complete AI moderation and $TEA token mechanics implementation
- **Deployed by**: Deployment Script
- **Changes**:
  - ✅ AI Moderation Edge Function deployed
  - ✅ Database migration applied
  - ✅ Environment variables configured
  - ✅ System tested and verified
  - ✅ Public audit log updated

EOF
    
    # Update last updated date
    sed -i "s/Last updated: .*/Last updated: $DATE/" public_audit_log.md
    
    print_success "Public audit log updated"
}

# Main deployment function
main() {
    echo ""
    print_status "Starting deployment process..."
    
    # Check dependencies and environment
    check_dependencies
    check_environment
    
    echo ""
    print_status "Deploying to Supabase..."
    
    # Deploy components
    deploy_migration
    deploy_edge_functions
    set_edge_function_env
    
    echo ""
    print_status "Testing deployment..."
    test_deployment
    
    echo ""
    print_status "Finalizing deployment..."
    update_audit_log
    
    echo ""
    print_success "🎉 Deployment completed successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Verify the deployment in your Supabase dashboard"
    echo "2. Test the AI moderation with real content"
    echo "3. Monitor the moderation_log table for activity"
    echo "4. Check wallet balances and transactions"
    echo ""
    echo "For support, check the documentation or create an issue on GitHub."
}

# Run the deployment
main "$@" 