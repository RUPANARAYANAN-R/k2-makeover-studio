# WhatsApp Notifications Setup

Get real-time WhatsApp alerts when new leads arrive at K2 Makeover Studio.

## Option A: Using n8n (Recommended - Easiest)

n8n is a free automation platform that requires no coding.

### Step 1: Create n8n Account

1. Go to [n8n.io](https://n8n.io) → Sign Up (free)
2. Create account with email
3. Verify email

### Step 2: Create WhatsApp Workflow

1. Click **Create Workflow**
2. Search and add **Webhook** node
3. In Webhook node:
   - Click **Copy Webhook URL** (save this!)
   - Test it shows green checkmark

### Step 3: Add WhatsApp Notification

1. Add **WhatsApp** node
2. Click **Create New Credential**
3. Follow n8n's WhatsApp setup:
   - Link your WhatsApp Business account
   - Get verification code
   - Authorize n8n
4. Configure message format:

```
New Lead Received! 🚨

👤 Name: {{$json.body.fullName}}
📱 Phone: {{$json.body.phone}}
💄 Service: {{$json.body.service}}
📅 Date: {{$json.body.preferredDate}}
📝 Message: {{$json.body.message}}

⏰ Time: {{now().format('DD/MM/YYYY HH:mm')}}
```

5. Set recipient to your WhatsApp number

### Step 4: Test Webhook

1. Copy Webhook URL
2. Add to `.env.local`:

```env
WHATSAPP_WEBHOOK_URL=https://your-n8n-instance.n8n.cloud/webhook/your-webhook-id
```

3. Test by submitting form on website

### Step 5: Activate Workflow

- Make sure workflow is **Active** (toggle at top)
- Test again from website

---

## Option B: Using WhatsApp Cloud API

For more control and scaling.

### Step 1: Get WhatsApp Business Account

1. Go to [Facebook Business Manager](https://business.facebook.com)
2. Create business account
3. Set up WhatsApp Business Account
4. Complete verification

### Step 2: Create System User

1. Go to **Settings** → **Users** → **System Users**
2. Create new system user (name: "K2 App")
3. Grant permissions:
   - whatsapp_business_messaging
   - whatsapp_business_account_management

### Step 3: Get API Credentials

1. In System User settings, generate **Access Token**
2. Copy access token (save securely!)
3. Get your **Business Phone ID** from WhatsApp setup

### Step 4: Update Environment

Add to `.env.local`:

```env
WHATSAPP_API_TOKEN=your_access_token_here
WHATSAPP_BUSINESS_PHONE_ID=1234567890123456
WHATSAPP_BUSINESS_ACCOUNT_ID=your_account_id
```

### Step 5: Implement API Handler

Update `app/api/lead/route.ts`:

```typescript
async function sendWhatsAppNotification(data: any) {
  try {
    const message = `
🚨 New Lead Received

Name: ${data.fullName}
Phone: ${data.phone}
Service: ${data.service}
Preferred Date: ${data.preferredDate}
Message: ${data.message || 'No additional message'}
    `.trim();

    const response = await fetch(
      `https://graph.instagram.com/v19.0/${process.env.WHATSAPP_BUSINESS_PHONE_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: process.env.BUSINESS_PHONE,
          type: 'text',
          text: { body: message },
        }),
      }
    );

    return { success: response.ok };
  } catch (error) {
    console.error('WhatsApp API error:', error);
    return { success: false };
  }
}
```

---

## Option C: Using Twilio

Another reliable service.

### Setup Steps

1. Create account at [Twilio.com](https://twilio.com)
2. Get API credentials
3. Add to `.env.local`:

```env
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
TWILIO_TO_NUMBER=whatsapp:+9876543210
```

4. Install SDK:
```bash
npm install twilio
```

5. Update API handler with Twilio SDK

---

## Testing

### Test Steps

1. Start dev server:
```bash
npm run dev
```

2. Go to `http://localhost:3000#contact`

3. Fill form with test data

4. Check WhatsApp - you should get notification!

### Debug Checklist

- ✓ Webhook URL is correct
- ✓ Environment variables are set
- ✓ WhatsApp account is verified
- ✓ API token is still valid
- ✓ Recipient phone number is correct

---

## Recommended: n8n + Google Sheets Combo

Use both together for complete CRM:

```
Form Submission
    ↓
API Route
    ├→ Save to Google Sheets
    └→ Trigger n8n Webhook
        └→ Send WhatsApp Notification
```

This gives you:
- Lead history in Sheets
- Real-time notifications
- No server costs
- Complete automation

---

## Advanced: Create WhatsApp Follow-up Flow

Use n8n to:
1. Get lead from webhook
2. Wait 1 hour
3. Send follow-up WhatsApp if not contacted
4. Update status in Google Sheets

---

## Troubleshooting

### No notification received
- Check webhook URL in `.env.local`
- Verify WhatsApp account is active
- Check n8n workflow is "Active"
- Look at n8n execution logs

### Wrong phone number
- Verify `BUSINESS_PHONE` format (+91...)
- Check WhatsApp business account settings
- Test with your own number first

### Rate limiting
- Add delays between messages
- Use queuing system for high volume
- Implement retry logic

---

**Next Steps:**
1. ✓ Set up either n8n or WhatsApp API
2. Test with form submission
3. Create Google Sheets backup
4. Set up automated follow-ups
5. Monitor conversion metrics
