# Quick Fix Guide - AdSense & Gmail Issues

## Issue 1: AdSense Ads Not Showing ❌

### Root Cause
Your `.env.local` file has **empty slot IDs**. I've added temporary placeholder values, but you need to replace them with REAL slot IDs from your AdSense dashboard.

### How to Fix

1. **Get Real AdSense Slot IDs** (5 minutes):
   - Go to [Google AdSense Dashboard](https://www.google.com/adsense/)
   - Click **Ads** → **By ad unit** → **+ New ad unit**
   - Create **Display ad**:
     - Name: "Invoice Top Banner"
     - Ad size: **Responsive**
     - Click **Create**
     - **Copy the slot ID** (looks like: `1234567890`)
   
   - Create another one:
     - Name: "Invoice Bottom Banner"  
     - Ad size: **Responsive**
     - Click **Create**
     - **Copy the slot ID**

2. **Update `.env.local`**:
   ```env
   VITE_ADSENSE_TOP_SLOT=YOUR_REAL_TOP_SLOT_ID
   VITE_ADSENSE_BOTTOM_SLOT=YOUR_REAL_BOTTOM_SLOT_ID
   ```

3. **Restart your dev server**:
   ```bash
   npm run dev
   ```

### ⚠️ Important Notes
- **New AdSense accounts**: Google may take 24-48 hours to review your site before showing ads
- **Placeholder IDs won't work**: You MUST use real slot IDs from your dashboard
- **Test in incognito mode**: Ad blockers prevent ads from showing

---

## Issue 2: Gmail Not Sending ❌

### Root Cause
The OAuth redirect URI is not configured for your local development environment (`http://localhost:5173`).

### How to Fix

1. **Add Redirect URI to Google Cloud Console** (2 minutes):
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Select your project (check your `.env.local` for `VITE_GMAIL_PROJECT_ID`)
   - Navigate to **APIs & Services** → **Credentials**
   - Click on your OAuth 2.0 Client ID (check your `.env.local` for the client ID)
   - Under **Authorized JavaScript origins**, add:
     ```
     http://localhost:5173
     http://localhost:5174
     http://127.0.0.1:5173
     ```
   
   - Under **Authorized redirect URIs**, add:
     ```
     http://localhost:5173
     http://localhost:5174
     http://127.0.0.1:5173
     ```
   
   - Click **Save**

2. **Restart your dev server**:
   ```bash
   npm run dev
   ```

3. **Test Gmail Integration**:
   - Fill out an invoice
   - Add a client email address
   - Click "Send via Gmail"
   - You should see the Google OAuth popup
   - Grant permissions
   - Email should send successfully!

### Troubleshooting

If you still see errors:

1. **Clear browser cache**: Press `Ctrl + Shift + Delete` → Clear cached images and files
2. **Check browser console**: Press `F12` and look for error messages
3. **Verify credentials**: Make sure your `.env.local` has the correct `VITE_GMAIL_CLIENT_ID`

---

## Quick Test Checklist

After making the fixes above:

- [ ] Added real AdSense slot IDs to `.env.local`
- [ ] Added redirect URIs to Google Cloud Console
- [ ] Restarted dev server (`npm run dev`)
- [ ] Cleared browser cache
- [ ] Tested in incognito mode (to bypass ad blockers)
- [ ] Attempted to send email via Gmail
- [ ] Checked browser console for errors (F12)

---

## Still Having Issues?

### AdSense:
- Make sure you're testing with real slot IDs, not placeholders
- Check [AdSense Policy Center](https://www.google.com/adsense/new/u/0/pub-7469351471654900/policy-center) for any violations
- Wait 10-20 minutes after creating new ad units for them to activate

### Gmail:
- Verify the redirect URI matches exactly (including `http://` and port number)
- Try signing out and back in to Google
- Check that Gmail API is enabled in [Google Cloud Console](https://console.cloud.google.com/apis/library/gmail.googleapis.com)

---

## For Production Deployment

When deploying to a hosting platform (Vercel, Netlify, etc.):

1. Add ALL environment variables from `.env.local` to your deployment platform
2. Update redirect URIs in Google Cloud Console to include your production URL
3. Follow the detailed instructions in `DEPLOYMENT_GUIDE.md`
