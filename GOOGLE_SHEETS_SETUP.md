# Google Sheets Integration Guide

This guide walks you through integrating Google Sheets as a CRM database for K2 Makeover Studio lead management.

## Step 1: Create Google Service Account

### 1.1 Go to Google Cloud Console
- Navigate to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project (name it "K2 Makeover")

### 1.2 Enable APIs
- Search for "Google Sheets API" → Enable
- Search for "Google Drive API" → Enable

### 1.3 Create Service Account
1. Go to **IAM & Admin** → **Service Accounts**
2. Click **Create Service Account**
3. Fill in details:
   - Service account name: `k2-sheet-writer`
   - Description: "Writes leads to Google Sheets"
4. Click **Create and Continue**
5. Skip "Grant this service account access to project"
6. Click **Done**

### 1.4 Create JSON Key
1. Find your new service account in the list
2. Click on it
3. Go to **Keys** tab
4. Click **Add Key** → **Create new key**
5. Choose **JSON**
6. Save the file securely

## Step 2: Create Google Sheet

### 2.1 Create New Sheet
- Go to [Google Sheets](https://sheets.google.com)
- Create new spreadsheet named "K2 Leads CRM"

### 2.2 Set Up Columns
Create columns A-G:
```
A: Timestamp         (e.g., 2026-06-27 15:30:00)
B: Name              (e.g., Priya Sharma)
C: Phone             (e.g., 9876543210)
D: Service           (e.g., Bridal Makeup)
E: Preferred Date    (e.g., 2026-07-15)
F: Message           (Additional notes)
G: Status            (New/Contacted/Booked/Lost)
```

### 2.3 Share with Service Account
1. Copy the service account email from JSON file
2. Look for field: `"client_email": "k2-sheet-writer@k2-leads.iam.gserviceaccount.com"`
3. Share the Google Sheet with this email
4. Give **Editor** access

### 2.4 Get Sheet ID
From the sheet URL:
```
https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j/edit
                              ↑ This is Sheet ID
```

## Step 3: Update Environment Variables

### 3.1 Copy JSON Credentials
```bash
# In project root
cp .env.local.example .env.local
```

### 3.2 Add to `.env.local`

```env
# Paste the entire JSON file content
GOOGLE_SHEETS_CREDENTIALS='{"type":"service_account","project_id":"k2-leads","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...","client_email":"k2-sheet-writer@k2-leads.iam.gserviceaccount.com",...}'

# Add the Sheet ID
GOOGLE_SHEETS_ID=1a2b3c4d5e6f7g8h9i0j
```

## Step 4: Implement API Integration

Edit `app/api/lead/route.ts` to uncomment and use:

```typescript
// Replace the placeholder implementation with:
async function saveToGoogleSheets(data: any) {
  try {
    const credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS || '{}');
    
    // Get access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: createJWT(credentials),
      }),
    });
    
    const { access_token } = await tokenResponse.json();
    
    // Append row to sheet
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEETS_ID}/values/Sheet1!A:G:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [[
            new Date().toISOString(),
            data.fullName,
            data.phone,
            data.service,
            data.preferredDate,
            data.message || '',
            'New',
          ]],
        }),
      }
    );

    return { success: response.ok };
  } catch (error) {
    console.error('Google Sheets error:', error);
    return { success: false };
  }
}
```

## Step 5: Test Integration

1. Start dev server:
```bash
npm run dev
```

2. Go to `http://localhost:3000`
3. Scroll to Contact Form
4. Fill out the form:
   - Name: Test User
   - Phone: 9876543210
   - Service: Bridal Makeup
   - Date: 2026-07-15
5. Click "Book Consultation"
6. Check your Google Sheet - you should see the new row!

## Troubleshooting

### Issue: "Failed to save inquiry"
- Check JSON credentials format
- Verify Sheet ID is correct
- Ensure service account has Editor access

### Issue: "Sheet append failed"
- Verify sheet name is "Sheet1"
- Check column letters match (A-G)
- Ensure no typos in environment variables

### Issue: Credentials not loading
- Verify `.env.local` exists (not `.env`)
- Check JSON format (use online JSON validator)
- Restart dev server after editing `.env.local`

## Next: WhatsApp Notifications

See [WhatsApp Setup Guide](./WHATSAPP.md) to add real-time notifications when leads come in.

---

**Pro Tip:** Use Google Sheets formulas to automate:
- Send email on new row: `=QUERY()` + Zapier
- Calculate response rate
- Create dashboards
- Auto-status updates
