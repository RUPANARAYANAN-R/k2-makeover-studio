# Deployment Guide - K2 Makeover Studio

Complete guide to deploy the website to production on Vercel.

## Prerequisites

- GitHub account (for version control)
- Vercel account (free at vercel.com)
- Google Cloud credentials (for Sheets)
- WhatsApp API credentials (for notifications)

## Step 1: Push to GitHub

### 1.1 Initialize Git Repository

```bash
cd d:\projects\K2\ makeover\k2-makeover

# Initialize if not done
git init

# Add all files
git add .

# Commit
git commit -m "Initial K2 Makeover Studio website"
```

### 1.2 Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name: `k2-makeover-studio`
3. Private (recommended)
4. Create repository

### 1.3 Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/k2-makeover-studio.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### 2.1 Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up / Login
3. Click **Add New** → **Project**
4. Import your GitHub repository
5. Select `k2-makeover-studio`
6. Click **Import**

### 2.2 Configure Build Settings

Vercel should auto-detect Next.js settings. Verify:

```
Framework: Next.js
Build Command: npm run build
Output Directory: .next
```

### 2.3 Add Environment Variables

In Vercel Dashboard:
1. Go to Project → **Settings** → **Environment Variables**
2. Add each from your `.env.local`:

```
GOOGLE_SHEETS_CREDENTIALS = (paste JSON)
GOOGLE_SHEETS_ID = (paste ID)
WHATSAPP_WEBHOOK_URL = (if using n8n)
WHATSAPP_API_TOKEN = (if using WhatsApp API)
BUSINESS_PHONE = 919876543210
```

**Important:** These are sensitive - mark as "Secret"

### 2.4 Deploy

1. Click **Deploy**
2. Wait for build to complete (2-3 minutes)
3. Get your live URL: `https://k2-makeover.vercel.app`

## Step 3: Set Custom Domain

### 3.1 Buy Domain

Options:
- Namecheap
- GoDaddy
- Google Domains
- Any registrar

Recommended: `k2makeover.com` or `k2makeover.studio`

### 3.2 Connect Domain to Vercel

1. In Vercel → Project → **Settings** → **Domains**
2. Click **Add Domain**
3. Enter domain name (e.g., `k2makeover.com`)
4. Verify ownership:
   - Add DNS records from Vercel
   - Wait for propagation (5-30 min)

### 3.3 Update DNS

**If using external registrar:**

1. Go to domain registrar's DNS settings
2. Add Vercel's nameservers:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`

OR add CNAME record:
```
k2makeover.com CNAME cname.vercel-dns.com
www.k2makeover.com CNAME cname.vercel-dns.com
```

### 3.4 Enable HTTPS

- Vercel auto-generates SSL certificate
- Enforce HTTPS in Project Settings
- Test at: https://your-domain.com

## Step 4: Test Production Build

### 4.1 Test Website

1. Visit your production URL
2. Check all sections load
3. Test form submission
4. Verify Google Sheets gets data
5. Check WhatsApp notification

### 4.2 Run Lighthouse Audit

1. Open in Chrome DevTools (F12)
2. Go to **Lighthouse** tab
3. Generate report
4. Target scores: 90+ on all metrics

## Step 5: Set Up Monitoring

### 5.1 Add Google Analytics

1. Create account at [analytics.google.com](https://analytics.google.com)
2. Create property for your domain
3. Copy measurement ID (G-XXXXXXXXXX)
4. Add to `app/layout.tsx`:

```tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout() {
  return (
    <>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      {/* ... */}
    </>
  )
}
```

5. Deploy again
6. Wait 24 hours for data

### 5.2 Set Up Error Tracking

Use Vercel's built-in analytics:
- Go to Vercel → **Analytics**
- Monitor Core Web Vitals
- Check error logs

## Step 6: Automate Deployments

### 6.1 Auto-Deploy on Push

Vercel does this automatically! Every push to main branch = auto deploy.

To skip deployment:
```bash
git commit -m "skip: minor fix [skip ci]"
```

### 6.2 Preview Deployments

Every PR gets automatic preview URL.

## Step 7: Backup & Security

### 7.1 Enable Vercel Backup

- Vercel auto-backups on every deployment
- Rollback to previous version anytime

### 7.2 Secrets Best Practices

- Never commit `.env.local` to Git
- Use `.gitignore`:
```
.env.local
.env
node_modules/
```

- Rotate credentials every 3 months
- Use different tokens for dev/prod

## Troubleshooting

### Build Fails

**Check logs:**
```bash
vercel logs
```

**Common issues:**
- Missing environment variables
- TypeScript errors
- Node version mismatch

**Solution:**
```bash
# Rebuild locally first
npm run build

# If works locally, check Vercel env vars
```

### Slow Performance

1. Check Lighthouse score
2. Optimize images (WebP format)
3. Enable caching headers
4. Check Third-party scripts

### Form Not Working

1. Verify API route deployed
2. Check environment variables in Vercel
3. Test API directly:
```bash
curl -X POST https://your-domain.com/api/lead \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test","phone":"9876543210",...}'
```

## Performance Optimization

### Image Optimization

1. Use WebP format
2. Lazy load images
3. Set width/height attributes
4. Use Next.js Image component

```tsx
import Image from 'next/image'

<Image
  src="/portfolio-1.webp"
  alt="Bridal makeup"
  width={500}
  height={600}
  loading="lazy"
/>
```

### Reduce Bundle Size

```bash
npm install -D @next/bundle-analyzer
```

Update `next.config.ts`:
```ts
const withBundleAnalyzer = require('@next/bundle-analyzer')()

module.exports = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig)
```

Run:
```bash
ANALYZE=true npm run build
```

### Caching Strategy

In `next.config.ts`:
```ts
headers: [
  {
    source: '/(.*)',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=3600, stale-while-revalidate=86400',
      },
    ],
  },
],
```

## Maintenance Checklist

- [ ] Weekly: Check form submissions
- [ ] Weekly: Monitor uptime
- [ ] Monthly: Review analytics
- [ ] Monthly: Update portfolio
- [ ] Quarterly: Update testimonials
- [ ] Quarterly: Rotate API keys
- [ ] Annually: Renew SSL certificate (auto)
- [ ] Annually: Audit security

## Support URLs

- **Website:** https://your-domain.com
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Google Analytics:** https://analytics.google.com
- **Google Sheets:** https://sheets.google.com

## Success Metrics

Track these KPIs:

```
Monthly:
- Unique visitors: Target 500+
- Form submissions: Target 25+
- Conversion rate: Target 5-15%
- Avg session time: Target 2+ min
- Bounce rate: Target <50%

Daily:
- Website uptime: Target 99.9%
- Page load time: Target <2s
- Form success rate: Target 95%+
```

## Next Phase: Growth

Once deployed and monitoring:

1. **SEO Marketing**
   - Submit sitemap to Google Search Console
   - Add schema markup
   - Create blog section
   - Build backlinks

2. **Social Integration**
   - Add Instagram feed
   - Share links on Instagram bio
   - Cross-promote portfolio

3. **Email Marketing**
   - Collect emails from form
   - Set up autoresponder
   - Create newsletter

4. **Paid Ads**
   - Google Ads
   - Instagram Ads
   - Facebook Ads
   - Target local audience

---

**Congratulations!** Your website is now live! 🎉

Monitor regularly and optimize based on user behavior.
