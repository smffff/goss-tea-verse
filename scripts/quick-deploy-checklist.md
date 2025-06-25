# 🚀 CTea Security Deployment - Quick Checklist

## ✅ Step 1: Deploy Edge Function (2 minutes)

1. **Go to:** https://supabase.com/dashboard/project/luubdvuuxvtkheyhzepm/functions
2. **Click:** "New Function"
3. **Name:** `harden_security`
4. **Paste this code:**
```ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async () => {
  const client = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { error } = await client.rpc("run_security_hardening_script");

  if (error) {
    return new Response(JSON.stringify({ success: false, error }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
});
```
5. **Click:** Deploy

---

## ✅ Step 2: Apply SQL Script (3 minutes)

1. **Go to:** https://supabase.com/dashboard/project/luubdvuuxvtkheyhzepm/sql
2. **Click:** "New query"
3. **Copy:** Entire contents of `scripts/apply-security-sql.sql`
4. **Paste & Run**

---

## ✅ Step 3: Add GitHub Secret (1 minute)

1. **Go to:** Your GitHub repo → Settings → Secrets → Actions
2. **Add secret:**
   - **Name:** `HARDEN_SECURITY_ENDPOINT`
   - **Value:** `https://luubdvuuxvtkheyhzepm.functions.supabase.co/harden_security`

---

## ✅ Step 4: Test Everything (30 seconds)

```bash
# Test the function
curl -X POST https://luubdvuuxvtkheyhzepm.functions.supabase.co/harden_security

# Expected: {"success": true}
```

---

## ✅ Step 5: Verify Security Status

**In Supabase SQL Editor:**
```sql
-- Check security status
SELECT * FROM get_security_status();

-- View audit logs
SELECT * FROM security_audit_log ORDER BY created_at DESC LIMIT 5;
```

---

## 🎯 Total Time: ~7 minutes
## 🛡️ Result: Production-ready security automation 