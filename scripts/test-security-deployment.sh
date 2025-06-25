#!/bin/bash

# CTea Security Deployment Test Script
# This script tests all aspects of the security deployment

set -e

echo "🔒 CTea Security Deployment Test Script"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ID="luubdvuuxvtkheyhzepm"
ENDPOINT="https://${PROJECT_ID}.functions.supabase.co/harden_security"

echo -e "${BLUE}Testing Security Deployment for Project: ${PROJECT_ID}${NC}"
echo ""

# Test 1: Edge Function Availability
echo -e "${YELLOW}1. Testing Edge Function Availability...${NC}"
if curl -s -o /dev/null -w "%{http_code}" "$ENDPOINT" | grep -q "200\|401\|403"; then
    echo -e "${GREEN}✅ Edge function is accessible${NC}"
else
    echo -e "${RED}❌ Edge function is not accessible (503 error)${NC}"
    echo "   This usually means the function hasn't been deployed yet."
    echo "   Run: supabase functions deploy harden_security"
    exit 1
fi

# Test 2: Edge Function Response
echo -e "${YELLOW}2. Testing Edge Function Response...${NC}"
RESPONSE=$(curl -s -X POST "$ENDPOINT" -H "Content-Type: application/json" -d '{"test": true}')
echo "Response: $RESPONSE"

if echo "$RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ Edge function executed successfully${NC}"
elif echo "$RESPONSE" | grep -q '"error"'; then
    echo -e "${RED}❌ Edge function returned an error${NC}"
    echo "   Error details: $RESPONSE"
else
    echo -e "${YELLOW}⚠️  Unexpected response format${NC}"
fi

# Test 3: Database Connection (if supabase CLI is available)
if command -v supabase &> /dev/null; then
    echo -e "${YELLOW}3. Testing Database Security Functions...${NC}"
    
    # Test security status function
    SECURITY_STATUS=$(supabase db function call get_security_status --project-ref "$PROJECT_ID" 2>/dev/null || echo "Function not found")
    
    if echo "$SECURITY_STATUS" | grep -q "function_name"; then
        echo -e "${GREEN}✅ Security status function is working${NC}"
    else
        echo -e "${YELLOW}⚠️  Security status function may not be deployed yet${NC}"
    fi
else
    echo -e "${YELLOW}3. Skipping database tests (supabase CLI not found)${NC}"
fi

# Test 4: GitHub Actions Secret Check
echo -e "${YELLOW}4. Checking GitHub Actions Setup...${NC}"
if [ -f ".github/workflows/harden-security.yml" ]; then
    echo -e "${GREEN}✅ GitHub Actions workflow exists${NC}"
    echo "   Next: Add HARDEN_SECURITY_ENDPOINT secret to GitHub repository"
    echo "   Value: $ENDPOINT"
else
    echo -e "${RED}❌ GitHub Actions workflow not found${NC}"
fi

# Test 5: Security SQL Script
echo -e "${YELLOW}5. Checking Security SQL Script...${NC}"
if [ -f "scripts/apply-security-sql.sql" ]; then
    echo -e "${GREEN}✅ Security SQL script exists${NC}"
    echo "   Next: Apply this script in Supabase Dashboard → SQL Editor"
else
    echo -e "${RED}❌ Security SQL script not found${NC}"
fi

echo ""
echo -e "${BLUE}📋 Next Steps:${NC}"
echo "1. Apply the SQL script in Supabase Dashboard"
echo "2. Add GitHub Actions secret: HARDEN_SECURITY_ENDPOINT = $ENDPOINT"
echo "3. Test the weekly automation"
echo "4. Monitor security audit logs"

echo ""
echo -e "${GREEN}🎉 Security deployment test completed!${NC}" 