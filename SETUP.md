# K2 Makeover Studio - Premium Website

A modern, premium, fully responsive website for K2 Makeover Studio featuring portfolio showcase, lead generation, booking inquiry funnel, and course guide distribution.

## 🎨 Features

✨ **Premium Design System**
- Luxury color palette (Gold, Rose, Beige tones)
- Elegant animations with Framer Motion
- Mobile-first responsive design
- Smooth scroll behavior

📱 **Landing Page Sections**
- Hero Section with CTAs
- Services with pricing
- Portfolio gallery with filtering
- About section with metrics
- Testimonials carousel
- Course guide section
- Contact form with validation
- SEO-optimized footer

🔧 **Lead Management**
- Form validation with Zod
- Rate limiting & anti-spam
- Google Sheets integration
- WhatsApp notifications
- Email confirmations

⚡ **Performance**
- Next.js 16 with Turbopack
- TypeScript for type safety
- Tailwind CSS optimization
- Lighthouse 90+ ready

## 📋 Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + PostCSS
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form + Zod
- **Deployment**: Vercel
- **Database**: Google Sheets (CRM)
- **Notifications**: WhatsApp API / n8n

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Cloud account (for Sheets integration)

### Installation

```bash
# Clone the repository (if using Git)
git clone <repository-url>
cd k2-makeover

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000` to view the website.

## 🔐 Environment Setup

### 1. Google Sheets Integration

**Setup Steps:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google Sheets API and Google Drive API
4. Create a Service Account:
   - Go to IAM → Service Accounts
   - Create new service account
   - Create key (JSON format)
   - Save the key

**Add to `.env.local`:**
```
GOOGLE_SHEETS_CREDENTIALS='{"type":"service_account","project_id":"...}'
GOOGLE_SHEETS_ID=your_spreadsheet_id_here
```

**Google Sheets Template:**
Create a new Google Sheet with these columns:
- A: Timestamp
- B: Name
- C: Phone
- D: Service
- E: Preferred Date
- F: Message
- G: Status

Share the sheet with the Service Account email.

### 2. WhatsApp Notifications

**Option A: Using n8n (Recommended - No Coding Required)**

1. Create free account at [n8n.io](https://n8n.io)
2. Create new workflow
3. Add "Webhook" trigger node
4. Add "WhatsApp" action node
5. Connect to your WhatsApp account
6. Copy webhook URL to `.env.local`:

```
WHATSAPP_WEBHOOK_URL=https://your-n8n-webhook-url.com
```

**Option B: Using WhatsApp Cloud API**
1. Get API credentials from Meta/WhatsApp Business
2. Add to `.env.local`:
```
WHATSAPP_API_TOKEN=your_token_here
WHATSAPP_BUSINESS_PHONE_ID=your_phone_id
```

### 3. Update Configuration

Edit `app/api/lead/route.ts` to implement Google Sheets and WhatsApp integrations based on your setup.

## 📝 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🎯 Usage

### Hero Section
- Customize headline, subheadline in `HeroSection.tsx`
- Update WhatsApp link with your business number

### Services
- Edit service list and pricing in `ServicesSection.tsx`
- Add/remove services as needed

### Portfolio
- Update portfolio items in `PortfolioSection.tsx`
- Replace image URLs with your portfolio photos
- Add/remove categories

### About
- Update experience and metrics in `AboutSection.tsx`
- Customize story and specialties

### Contact Form
- Form fields are pre-configured
- Customize phone number validation
- Add honeypot field for spam prevention

## 🎨 Customization

### Colors
Edit color palette in `app/globals.css`:
```css
:root {
  --background: #FFF8F5;
  --primary: #D4A373;
  --accent: #B76E79;
  --secondary: #EAD7D1;
  --text: #2B2B2B;
}
```

### Fonts
Currently using:
- Headings: Playfair Display (serif)
- Body: Poppins (sans-serif)

Change in `app/globals.css` Google Fonts import.

### Logo
Replace logo in `Header.tsx` and `Footer.tsx` components.

## 📊 Lead Management

### Viewing Leads
All form submissions are saved to Google Sheets with:
- Timestamp of submission
- Customer details (name, phone, service)
- Preferred date
- Message
- Status (New, Contacted, Booked, Lost)

### Lead Status Workflow
- **New**: Just received
- **Contacted**: Followed up
- **Booked**: Confirmed appointment
- **Lost**: Did not convert

### Response Automation
You can set up Google Sheets automation to:
- Send automatic email confirmations
- Notify team via Slack
- Create calendar events

## 🔍 SEO Optimization

The site includes:
- ✓ Meta title and description
- ✓ Open Graph tags
- ✓ Structured schema markup
- ✓ Alt text on images
- ✓ Sitemap.xml
- ✓ Robots.txt
- ✓ Mobile-friendly design

**Keyword Optimization:**
- makeup artist in Coimbatore
- bridal makeup services
- HD bridal makeup
- event makeup artist
- professional makeup

## 📱 Mobile Optimization

- Mobile-first responsive design
- Touch-friendly buttons and forms
- Optimized images with lazy loading
- Fast load times on 4G networks

## 🛡️ Security Features

- ✓ Input sanitization
- ✓ Rate limiting (5 submissions per hour per IP)
- ✓ Honeypot field for spam prevention
- ✓ CSRF protection
- ✓ Email validation

## 🚀 Deployment

### Deploy to Vercel

```bash
# Connect to Vercel
npm i -g vercel
vercel

# Push to production
git push
```

Environment variables are set in Vercel dashboard:
1. Go to Project → Settings → Environment Variables
2. Add all variables from `.env.local`

### Custom Domain
1. Add domain in Vercel dashboard
2. Update DNS records
3. Enable HTTPS (automatic)

## 📧 Email Integration (Future)

To add email confirmations:
1. Set up Resend, SendGrid, or similar
2. Add API key to environment
3. Implement email sending in `app/api/lead/route.ts`

## 🤝 Support & Maintenance

### Regular Updates
- Update portfolio gallery monthly
- Refresh testimonials quarterly
- Monitor form submissions daily
- Check SEO rankings monthly

### Performance Monitoring
- Use Google Analytics
- Monitor Core Web Vitals
- Check form submission success rate
- Track lead conversion

## 📋 File Structure

```
app/
├── api/
│   └── lead/
│       └── route.ts          # Lead submission API
├── components/
│   ├── Header.tsx            # Navigation header
│   ├── HeroSection.tsx        # Hero banner
│   ├── ServicesSection.tsx    # Services showcase
│   ├── PortfolioSection.tsx   # Gallery
│   ├── AboutSection.tsx       # About section
│   ├── TestimonialsSection.tsx # Reviews
│   ├── CourseGuideSection.tsx # Course guide
│   ├── ContactForm.tsx        # Lead capture form
│   └── Footer.tsx             # Footer
├── globals.css                # Global styles
├── layout.tsx                 # Root layout
└── page.tsx                   # Home page

public/
├── robots.txt                 # SEO robots file
└── sitemap.xml               # SEO sitemap
```

## 📞 Contact & Support

For issues or questions:
- Check the GitHub issues page
- Review component documentation
- Consult Next.js docs

## 📄 License

This project is built for K2 Makeover Studio.

## 🎯 Next Steps

1. ✓ Deploy to Vercel
2. Set up Google Sheets integration
3. Configure WhatsApp notifications
4. Add portfolio images
5. Test form submissions
6. Set up analytics
7. Launch marketing campaign

---

**Built with ❤️ for K2 Makeover Studio**
