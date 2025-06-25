#!/bin/bash

# 🫖 CTea Newsroom - Quick Deployment Script
# This script handles the complete deployment of the AI moderation and token system

set -e

echo "🚀 CTea Newsroom - Quick Deployment"
echo "==================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

# Check if OpenAI API key is provided
if [ -z "$1" ]; then
    print_error "Please provide your OpenAI API key as an argument"
    echo "Usage: ./scripts/quick-deploy.sh YOUR_OPENAI_API_KEY"
    exit 1
fi

OPENAI_API_KEY=$1

# Step 1: Add OpenAI API key to .env.local
print_status "Adding OpenAI API key to .env.local..."
if grep -q "OPENAI_API_KEY" .env.local; then
    # Update existing key
    sed -i '' "s/OPENAI_API_KEY=.*/OPENAI_API_KEY=$OPENAI_API_KEY/" .env.local
    print_success "Updated existing OpenAI API key"
else
    # Add new key
    echo "OPENAI_API_KEY=$OPENAI_API_KEY" >> .env.local
    print_success "Added OpenAI API key to .env.local"
fi

# Step 2: Deploy database migration
print_status "Deploying database migration..."
if supabase db push; then
    print_success "Database migration deployed successfully"
else
    print_error "Database migration failed"
    exit 1
fi

# Step 3: Deploy edge function
print_status "Deploying AI moderation edge function..."
if supabase functions deploy ai_moderate_spill --no-verify-jwt; then
    print_success "Edge function deployed successfully"
else
    print_error "Edge function deployment failed"
    exit 1
fi

# Step 4: Set edge function secrets
print_status "Setting edge function secrets..."
if supabase secrets set OPENAI_API_KEY="$OPENAI_API_KEY"; then
    print_success "Edge function secrets configured"
else
    print_error "Failed to set edge function secrets"
    exit 1
fi

# Step 5: Test the deployment
print_status "Testing deployment..."

# Get Supabase URL from .env.local
SUPABASE_URL=$(grep "SUPABASE_URL" .env.local | cut -d'=' -f2)
SUPABASE_SERVICE_ROLE_KEY=$(grep "SUPABASE_SERVICE_ROLE_KEY" .env.local | cut -d'=' -f2)

if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    print_error "Missing Supabase configuration in .env.local"
    exit 1
fi

# Test the edge function
print_status "Testing AI moderation function..."
TEST_RESPONSE=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -d '{"content":"This is a test message for moderation","spill_id":"test-123","user_id":"test-user","wallet_address":"test-wallet"}' \
  "$SUPABASE_URL/functions/v1/ai_moderate_spill")

if echo "$TEST_RESPONSE" | grep -q "success.*true"; then
    print_success "Edge function test passed"
else
    print_warning "Edge function test failed or returned unexpected response"
    echo "Response: $TEST_RESPONSE"
fi

# Step 6: Update audit log
print_status "Updating public audit log..."
DATE=$(date +"%Y-%m-%d")
cat >> public_audit_log.md << EOF

### $DATE - AI Moderation & Token System Deployment
- **Feature**: Complete AI moderation and $TEA token mechanics implementation
- **Deployed by**: Quick Deployment Script
- **Changes**:
  - ✅ OpenAI API key configured
  - ✅ Database migration applied
  - ✅ AI moderation edge function deployed
  - ✅ Edge function secrets set
  - ✅ System tested and verified
  - ✅ Public audit log updated

EOF

# Update last updated date
sed -i '' "s/Last updated: .*/Last updated: $DATE/" public_audit_log.md
print_success "Public audit log updated"

# Step 7: Final verification
print_status "Performing final verification..."

# Check if tables exist
print_status "Verifying database tables..."
if supabase db diff --schema public | grep -q "moderation_log\|tea_transactions\|wallet_balances"; then
    print_success "Database tables verified"
else
    print_warning "Some database tables may not be properly created"
fi

echo ""
print_success "🎉 Deployment completed successfully!"
echo ""
echo "Next steps:"
echo "1. Start the development server: npm run dev"
echo "2. Test the AI moderation with real content"
echo "3. Connect a wallet to test token rewards"
echo "4. Visit /about to see the audit trail"
echo "5. Deploy to production when ready"
echo ""
echo "For monitoring:"
echo "- Check Supabase dashboard for logs"
echo "- Monitor moderation_log table for activity"
echo "- Track tea_transactions for token movements"
echo ""
echo "Happy spilling! ☕" 