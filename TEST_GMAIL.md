# Gmail Integration Troubleshooting

## Current Issue
Gmail service is falling back to mailto: link with message "Gmail is not configured opening your email client instead..."

## Diagnostic Steps

### 1. Check Browser Console (F12)
Look for these specific errors:
- "Gmail API credentials are not configured"
- "Google Auth instance not available"
- "Error initializing Gmail API"
- Any OAuth/redirect URI errors

### 2. Check Environment Variables (Vercel/Local)

**On Vercel (Production):**
- Go to Vercel Dashboard → Project Settings → Environment Variables
- Verify these exist:
  - `VITE_GMAIL_CLIENT_ID`
  - `VITE_GMAIL_CLIENT_SECRET`
  - `VITE_GMAIL_PROJECT_ID`

**On Local (Development):**
- Check `.env.local` file has all three Gmail variables

### 3. Check Google Cloud Console OAuth Settings

**Authorized JavaScript origins must include:**
- Local: `http://localhost:5173`
- Production: `https://invoice-1-sand.vercel.app`

**Authorized redirect URIs must include:**
- Local: `http://localhost:5173`
- Production: `https://invoice-1-sand.vercel.app`

### 4. Common Problems and Solutions

#### Problem: "credentials are not configured"
**Cause:** Environment variables not loaded or empty
**Fix:** 
- Verify `.env.local` has the values
- Restart dev server: `npm run dev`
- On Vercel: Add env vars and redeploy

#### Problem: "redirect_uri_mismatch"
**Cause:** OAuth redirect URI not configured for your domain
**Fix:**
- Add your URL to Google Cloud Console (see step 3)
- Make sure there's no trailing slash mismatch

#### Problem: "auth instance not available"
**Cause:** gapi script not loaded or auth2 not initialized
**Fix:**
- Check `index.html` has the gapi script tag
- Clear browser cache and reload

#### Problem: Falls back to mailto immediately
**Cause:** Gmail API throwing error during initialization
**Fix:**
- Open browser console (F12)
- Note the exact error message
- Follow specific fix for that error

## Testing Flow

1. **Open site** → Open browser console (F12)
2. **Fill invoice** → Check console for initialization messages
3. **Click "Send via Gmail"** → Should see OAuth popup
4. **If popup blocked** → Allow popups for the site
5. **Grant permissions** → Should succeed
6. **Check console** → Look for "Gmail API initialized successfully"

## Expected Console Messages (Success)

```
Gmail API initialized successfully
Signed in: false
[User clicks Send]
[OAuth popup appears]
[User grants permission]
Invoice sent successfully via Gmail!
```

## Expected Console Messages (Failure)

Look for specific error messages that indicate the problem.
