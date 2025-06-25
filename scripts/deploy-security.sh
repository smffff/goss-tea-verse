#!/bin/bash

# Security Hardening Deployment Script for CTea Newsroom
# This script helps complete the final deployment steps

set -e

echo "🔒 CTea Security Hardening Deployment Script"
echo "=============================================="

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

# Check if Supabase CLI is installed
check_supabase_cli() {
    if ! command -v supabase &> /dev/null; then
        print_warning "Supabase CLI not found. Installing..."
        
        # Detect OS and install accordingly
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            if command -v brew &> /dev/null; then
                brew install supabase/tap/supabase
            else
                print_error "Homebrew not found. Please install Supabase CLI manually:"
                print_error "https://supabase.com/docs/guides/cli/getting-started"
                exit 1
            fi
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            # Linux
            curl -fsSL https://supabase.com/install.sh | sh
        else
            print_error "Unsupported OS. Please install Supabase CLI manually:"
            print_error "https://supabase.com/docs/guides/cli/getting-started"
            exit 1
        fi
    fi
    
    print_success "Supabase CLI is available"
}

# Check environment variables
check_env_vars() {
    print_status "Checking environment variables..."
    
    if [ -f ".env.local" ]; then
        print_success "Found .env.local file"
        
        # Check for required variables
        if grep -q "SUPABASE_URL" .env.local && grep -q "SUPABASE_SERVICE_ROLE_KEY" .env.local; then
            print_success "Required Supabase environment variables found"
        else
            print_warning "Missing required environment variables in .env.local"
            print_status "Please add the following to your .env.local file:"
            echo ""
            echo "SUPABASE_URL=https://your-project-ref.supabase.co"
            echo "SUPABASE_SERVICE_ROLE_KEY=your-service-role-key"
            echo ""
        fi
    else
        print_warning "No .env.local file found"
        print_status "Creating .env.local template..."
        cat > .env.local << EOF
# Supabase Configuration
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Add your actual values above
EOF
        print_success "Created .env.local template. Please update with your actual values."
    fi
}

# Deploy Edge Function
deploy_edge_function() {
    print_status "Deploying harden_security Edge Function..."
    
    if command -v supabase &> /dev/null; then
        supabase functions deploy harden_security
        print_success "Edge Function deployed successfully"
    else
        print_error "Supabase CLI not available. Please install it first."
        exit 1
    fi
}

# Test the Edge Function
test_edge_function() {
    print_status "Testing Edge Function..."
    
    # Get the project URL from environment or prompt
    if [ -f ".env.local" ]; then
        SUPABASE_URL=$(grep "SUPABASE_URL" .env.local | cut -d '=' -f2)
        if [ "$SUPABASE_URL" != "https://your-project-ref.supabase.co" ]; then
            PROJECT_REF=$(echo $SUPABASE_URL | sed 's|https://||' | sed 's|.supabase.co||')
            ENDPOINT="https://${PROJECT_REF}.functions.supabase.co/harden_security"
            
            print_status "Testing endpoint: $ENDPOINT"
            
            # Test the function
            response=$(curl -s -X POST "$ENDPOINT" -H "Content-Type: application/json" -d '{"test": true}')
            
            if echo "$response" | grep -q '"success":true'; then
                print_success "Edge Function test successful!"
                print_status "Response: $response"
            else
                print_warning "Edge Function test failed or returned unexpected response"
                print_status "Response: $response"
            fi
        else
            print_warning "Please update SUPABASE_URL in .env.local with your actual project URL"
        fi
    else
        print_warning "No .env.local file found. Cannot test Edge Function."
    fi
}

# Check GitHub Secrets
check_github_secrets() {
    print_status "Checking GitHub Secrets setup..."
    
    print_status "Please ensure you have set up the following GitHub Secret:"
    echo ""
    echo "Secret Name: HARDEN_SECURITY_ENDPOINT"
    echo "Secret Value: https://<your-project-ref>.functions.supabase.co/harden_security"
    echo ""
    print_status "To set this up:"
    echo "1. Go to your GitHub repository"
    echo "2. Navigate to Settings → Secrets and variables → Actions"
    echo "3. Click 'New repository secret'"
    echo "4. Add the secret with the name and value above"
    echo ""
}

# Show final status
show_final_status() {
    print_success "Deployment script completed!"
    echo ""
    echo "📋 Final Checklist:"
    echo "=================="
    echo "✅ SQL Migration: Ready in supabase/migrations/"
    echo "✅ Edge Function: Ready in supabase/functions/harden_security/"
    echo "✅ GitHub Workflow: Ready in .github/workflows/harden-security.yml"
    echo ""
    echo "🔧 Next Steps:"
    echo "=============="
    echo "1. Update .env.local with your actual Supabase credentials"
    echo "2. Deploy the Edge Function: supabase functions deploy harden_security"
    echo "3. Set up GitHub Secret: HARDEN_SECURITY_ENDPOINT"
    echo "4. Test the function manually"
    echo ""
    echo "🧪 Manual Test Command:"
    echo "======================="
    echo "curl -X POST https://<your-project-ref>.functions.supabase.co/harden_security"
    echo ""
    echo "📊 Check Security Status:"
    echo "========================="
    echo "You can check your security status anytime by calling the get_security_status() function"
    echo "in your Supabase dashboard or via the API."
}

# Main execution
main() {
    echo ""
    check_supabase_cli
    echo ""
    check_env_vars
    echo ""
    
    # Ask user if they want to deploy the Edge Function
    read -p "Do you want to deploy the Edge Function now? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        deploy_edge_function
        echo ""
        test_edge_function
    else
        print_status "Skipping Edge Function deployment. You can run it manually later."
    fi
    
    echo ""
    check_github_secrets
    echo ""
    show_final_status
}

# Run the script
main "$@" 