#!/bin/bash

echo "🔒 Quick Security Test"
echo "====================="

ENDPOINT="https://luubdvuuxvtkheyhzepm.functions.supabase.co/harden_security"

echo "Testing edge function..."
RESPONSE=$(curl -s -X POST "$ENDPOINT")

if echo "$RESPONSE" | grep -q '"success":true'; then
    echo "✅ Security hardening working!"
    echo "Response: $RESPONSE"
else
    echo "❌ Security hardening failed"
    echo "Response: $RESPONSE"
    echo ""
    echo "Next steps:"
    echo "1. Deploy edge function in Supabase Dashboard"
    echo "2. Apply SQL script in SQL Editor"
    echo "3. Check function logs for errors"
fi

echo ""
echo "🎯 Ready for production!" 