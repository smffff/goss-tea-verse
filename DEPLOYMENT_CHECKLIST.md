# 🚀 CTea Newsroom - Final Deployment Checklist

## ✅ Pre-Launch Verification

### 🔐 Environment Variables
- [x] `SUPABASE_URL` - Configured in `.env.local`
- [x] `SUPABASE_SERVICE_ROLE_KEY` - Configured in `.env.local`
- [ ] `OPENAI_API_KEY` - **NEEDS TO BE ADDED**

**Action Required**: Add your OpenAI API key to `.env.local`:
```bash
echo "OPENAI_API_KEY=your_openai_api_key_here" >> .env.local
```

### 🗄️ Database Migration
- [ ] Run database migration to create new tables
- [ ] Verify RLS policies are applied
- [ ] Test token reward triggers

**Action Required**: Deploy the migration:
```bash
supabase db push
```

### ⚡ Edge Function Deployment
- [ ] Deploy AI moderation edge function
- [ ] Set environment variables for edge function
- [ ] Test function response

**Action Required**: Deploy edge function:
```bash
supabase functions deploy ai_moderate_spill --no-verify-jwt
supabase secrets set OPENAI_API_KEY="your_openai_api_key_here"
```

## 🧪 Testing Checklist

### AI Moderation Testing
- [ ] **Clean Content Test**: Submit harmless content → should pass
- [ ] **Flagged Content Test**: Submit borderline content → should flag
- [ ] **Escalated Content Test**: Submit harmful content → should escalate
- [ ] **Moderation Log**: Check `moderation_log` table for entries

### Token System Testing
- [ ] **Wallet Connection**: Connect wallet and verify balance display
- [ ] **Token Award**: Submit approved content and verify 5 $TEA reward
- [ ] **Transaction History**: Check `tea_transactions` table
- [ ] **Balance Updates**: Verify real-time balance updates

### UI/UX Testing
- [ ] **SpillTea Form**: Test enhanced form with moderation feedback
- [ ] **Wallet Balance**: Verify balance component displays correctly
- [ ] **About Page**: Check audit trail display
- [ ] **Responsive Design**: Test on mobile and desktop

## 🌐 Production Deployment

### Vercel Deployment
- [ ] Ensure all environment variables are set in Vercel dashboard
- [ ] Deploy latest changes
- [ ] Verify production build works correctly

### GitHub Pages (Audit Trail)
- [ ] Enable GitHub Pages for repository
- [ ] Verify `public_audit_log.md` is accessible
- [ ] Test GitHub Action for automatic updates

## 📊 Monitoring Setup

### Supabase Dashboard
- [ ] Monitor `moderation_log` table for activity
- [ ] Check `tea_transactions` for token movements
- [ ] Verify edge function logs

### Analytics
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Monitor API response times
- [ ] Track user engagement metrics

## 🎯 Launch Sequence

### Phase 1: Internal Testing (Complete)
- [x] All features implemented
- [x] Code reviewed and tested
- [x] Security measures in place

### Phase 2: Staging Deployment
- [ ] Deploy to staging environment
- [ ] Run full test suite
- [ ] Verify all integrations work

### Phase 3: Production Launch
- [ ] Deploy to production
- [ ] Announce launch on social media
- [ ] Monitor system performance
- [ ] Gather user feedback

## 🔧 Quick Commands

### Deploy Everything
```bash
# 1. Add OpenAI API key
echo "OPENAI_API_KEY=your_key_here" >> .env.local

# 2. Deploy database migration
supabase db push

# 3. Deploy edge function
supabase functions deploy ai_moderate_spill --no-verify-jwt

# 4. Set edge function secrets
supabase secrets set OPENAI_API_KEY="your_key_here"

# 5. Test deployment
npm run dev
```

### Verify Deployment
```bash
# Test edge function
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -d '{"content":"test","spill_id":"test-123"}' \
  "$SUPABASE_URL/functions/v1/ai_moderate_spill"

# Check database tables
supabase db diff
```

## 🚨 Emergency Contacts

- **Supabase Issues**: Check Supabase dashboard logs
- **OpenAI Issues**: Verify API key and quota
- **Deployment Issues**: Check Vercel build logs
- **Security Issues**: Review RLS policies and audit logs

---

**Status**: Ready for deployment  
**Last Updated**: January 26, 2025  
**Next Action**: Add OpenAI API key and run deployment commands 