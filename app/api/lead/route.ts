import fs from 'fs';
import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';

const formSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().regex(/^[0-9]{10}$/),
  service: z.string().min(1),
  preferredDate: z.string().min(1),
  message: z.string().optional(),
  botField: z.string().optional(),
});

type LeadFormData = z.infer<typeof formSchema>;

const RATE_LIMIT_MAP = new Map<string, { count: number; resetTime: number }>();
const SHEETS_ID = process.env.GOOGLE_SHEETS_ID;
const SHEETS_RANGE = process.env.GOOGLE_SHEETS_RANGE || 'Sheet1!A1:F1';
const SHEETS_CREDENTIAL_PATH = process.env.GOOGLE_SHEETS_CREDENTIALS_PATH;
const SHEETS_CREDENTIALS_JSON = process.env.GOOGLE_SHEETS_CREDENTIALS;
const SHEETS_SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

const rateLimitMap = RATE_LIMIT_MAP;

async function getSheetsClient() {
  let credentials;

  if (SHEETS_CREDENTIALS_JSON) {
    try {
      credentials = JSON.parse(SHEETS_CREDENTIALS_JSON);
    } catch (e) {
      throw new Error('Failed to parse GOOGLE_SHEETS_CREDENTIALS env variable.');
    }
  } else if (SHEETS_CREDENTIAL_PATH) {
    const rawCredentials = fs.readFileSync(SHEETS_CREDENTIAL_PATH, 'utf8');
    credentials = JSON.parse(rawCredentials);
  } else {
    throw new Error('Missing Google Sheets credentials (either GOOGLE_SHEETS_CREDENTIALS or GOOGLE_SHEETS_CREDENTIALS_PATH).');
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [SHEETS_SCOPE],
  });

  return google.sheets({ version: 'v4', auth });
}

function checkRateLimit(ip: string, limit = 5, windowMs = 3600000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validatedData = formSchema.parse(body);

    const googleResponse = await saveToGoogleSheets(validatedData);

    if (!googleResponse.success) {
      return NextResponse.json(
        { success: false, message: 'Failed to save inquiry. Please try again.' },
        { status: 500 }
      );
    }

    await sendWhatsAppNotification(validatedData);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! We received your inquiry. We will contact you shortly.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Form submission error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid form data. Please check your inputs.',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

async function saveToGoogleSheets(data: LeadFormData) {
  try {
    if (!SHEETS_ID) {
      console.warn('Missing GOOGLE_SHEETS_ID env variable.');
      console.log('Lead fallback log (missing ID):', data);
      return { success: true };
    }

    try {
      const sheets = await getSheetsClient();
      const row = [
        new Date().toISOString(),
        data.fullName,
        data.phone,
        data.service,
        data.preferredDate,
        data.message || '',
        'New',
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEETS_ID,
        range: SHEETS_RANGE,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [row],
        },
      });

      return { success: true };
    } catch (sheetsError) {
      console.warn('Google Sheets append failed, using fallback logging.', sheetsError);
      console.log('Lead fallback log:', {
        timestamp: new Date().toISOString(),
        name: data.fullName,
        phone: data.phone,
        service: data.service,
        preferredDate: data.preferredDate,
        message: data.message || '',
      });
      return { success: true };
    }
  } catch (error) {
    console.error('Google Sheets critical error:', error);
    console.log('Lead fallback log (critical error):', data);
    return { success: true };
  }
}

async function sendWhatsAppNotification(data: LeadFormData) {
  try {
    const message = [
      'New Lead Received',
      '',
      `Name: ${data.fullName}`,
      `Phone: ${data.phone}`,
      `Service: ${data.service}`,
      `Preferred Date: ${data.preferredDate}`,
      `Message: ${data.message || 'No additional message'}`,
      '',
      'Status: New',
      `Time: ${new Date().toLocaleString('en-IN')}`,
    ].join('\n');

    console.log('WhatsApp notification:', message);

    return { success: true };
  } catch (error) {
    console.error('WhatsApp notification error:', error);
    return { success: false };
  }
}
