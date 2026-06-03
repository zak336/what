# Common Room - Backend Setup Guide

## Overview
This backend uses Google Sheets + Google Drive for waitlist validation stage.

## Architecture
```
Next.js Frontend
    ↓
Next.js API Routes
    ↓
Services Layer
    ↓
Google Apps Script Web App
    ↓
Google Sheets + Google Drive
```

## Setup Steps

### 1. Create Google Sheets Spreadsheet

Create a new Google Sheets spreadsheet named "Common Room Waitlist"

### 2. Create Sheet Tabs

Create the following tabs with headers:

**Tab: Waitlist**
```
Timestamp | Waitlist ID | Name | Email | College | Department | Year | User Type
```

**Tab: FeatureVotes**
```
Waitlist ID | Email | Feature
```

**Tab: Suggestions**
```
Waitlist ID | Email | Suggestion
```

**Tab: Contributors**
```
Waitlist ID | Email | Role
```

**Tab: Verification**
```
Waitlist ID | Email | College | Document Type | Google Drive Link
```

**Tab: PricingSurvey**
```
Waitlist ID | Email | Willing To Pay | Preferred Price | Maximum Price | Payment Model
```

**Tab: SubscriptionFeedback**
```
Waitlist ID | Email | Response
```

**Tab: ValuableFeatures**
```
Waitlist ID | Email | Feature
```

### 3. Create Google Drive Folders

Create folder structure:
```
Common Room/
├── Verification Uploads/
│   ├── GEC Raipur/
│   ├── NIT Raipur/
│   ├── IIIT Naya Raipur/
│   └── Other Colleges/
```

Get folder IDs from URL: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`

### 4. Deploy Google Apps Script

1. Open your spreadsheet
2. Extensions > Apps Script
3. Copy contents of `GOOGLE_APPS_SCRIPT.js`
4. Replace `SPREADSHEET_ID` with your spreadsheet ID
5. Replace `DRIVE_FOLDER_IDS` with your folder IDs
6. Deploy > New Deployment
7. Type: Web App
8. Execute as: Me
9. Who has access: Anyone
10. Copy deployment URL

### 5. Configure Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

### 6. Test the Integration

Run the test in Apps Script:
```javascript
testAppendRow()
```

Check if data appears in Waitlist sheet.

### 7. Deploy Next.js App

```bash
npm run build
npm start
```

Or deploy to Vercel.

## API Routes

### POST /api/waitlist
Submit waitlist entry
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "collegeName": "GEC Raipur",
  "department": "Computer Science",
  "yearOfStudy": "1st",
  "collegeType": "gec"
}
```

Response:
```json
{
  "success": true,
  "waitlistId": "WL-143",
  "position": 143
}
```

### POST /api/verification
Upload verification document
```
FormData:
- waitlistId
- email
- college
- documentType
- file (JPG/PNG/PDF, max 10MB)
```

### POST /api/survey
Submit pricing survey
```json
{
  "waitlistId": "WL-143",
  "email": "john@example.com",
  "willingToPay": "yes",
  "pricePoint": "₹10",
  "maxAmount": "50",
  "paymentStyle": "monthly",
  "valuableFeatures": ["Digital Yearbook"],
  "worthPayingFor": "..."
}
```

## Analytics Events

Tracked events (placeholder):
- `waitlist_submitted`
- `verification_started`
- `verification_completed`
- `verification_skipped`
- `pricing_survey_completed`
- `feature_votes_submitted`
- `suggestion_submitted`
- `contributor_interest_submitted`

## Security

- File validation (type, size)
- Email format validation
- Input sanitization
- Add Cloudflare Turnstile for spam protection (optional)

## Future Migration to Supabase

To migrate:
1. Create Supabase project
2. Create tables matching sheet structure
3. Replace service layer functions
4. Keep API routes unchanged
5. Frontend requires NO changes

## Troubleshooting

**Error: "Sheet not found"**
- Verify sheet names match exactly
- Check SPREADSHEET_ID in Apps Script

**Error: "File upload failed"**
- Verify DRIVE_FOLDER_IDS in Apps Script
- Check folder permissions

**Error: "CORS error"**
- Verify Apps Script deployment has "Anyone" access
- Redeploy if needed

## Admin Dashboard

Access Google Sheets directly for:
- Total signups
- College breakdown
- Verification status
- Survey responses
- Feature vote counts

Use Google Sheets filters, pivot tables, and charts for analytics.
