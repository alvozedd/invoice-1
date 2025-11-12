# Deployment Guide - Environment Variables Setup

## 🚨 CRITICAL: Why Ads and Email Are Not Working

Your `.env.local` file is **NOT deployed** (correctly excluded from git for security). Your deployment platform needs these environment variables configured separately.

## Quick Fix Steps

### Step 1: Get Your Real AdSense Slot IDs

1. Go to [Google AdSense Dashboard](https://www.google.com/adsense/)
2. Click **Ads** → **By ad unit** → **Display ads**
3. Create TWO new ad units:
   - **Top Banner**: Name it "Invoice Top Banner"
     - Ad type: **Display**
     - Ad size: **Responsive**
     - Copy the **Ad slot ID** (format: 1234567890)
   
   - **Bottom Banner**: Name it "Invoice Bottom Banner"
     - Ad type: **Display**
     - Ad size: **Responsive**
     - Copy the **Ad slot ID**

4. Note down both slot IDs - you'll need them in Step 2

### Step 2: Configure OAuth Redirect URI

Your Gmail OAuth needs to know your deployment URL:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (get the project ID from your `.env.local` file)
3. Navigate to **APIs & Services** → **Credentials**
4. Click on your OAuth 2.0 Client ID
5. Under **Authorized redirect URIs**, add:
   ```
   https://your-deployment-url.vercel.app
   https://your-deployment-url.vercel.app/
   ```
   Replace with your actual deployment URL
6. Click **Save**

### Step 3: Add Environment Variables to Your Deployment Platform

#### For Vercel:

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Settings** → **Environment Variables**
3. Copy ALL variables from your `.env.local` file and add them one by one:
   - `VITE_GMAIL_CLIENT_ID` (get from your `.env.local`)
   - `VITE_GMAIL_CLIENT_SECRET` (get from your `.env.local`)
   - `VITE_GMAIL_PROJECT_ID` (get from your `.env.local`)
   - `VITE_ADSENSE_PUBLISHER_ID` (get from your `.env.local`)
   - `VITE_ADSENSE_TOP_SLOT` (the REAL slot ID from Step 1)
   - `VITE_ADSENSE_BOTTOM_SLOT` (the REAL slot ID from Step 1)

4. Click **Save**
5. Redeploy your application

#### For Netlify:

1. Go to your site on [Netlify Dashboard](https://app.netlify.com/)
2. Click **Site settings** → **Environment variables**
3. Copy ALL variables from your `.env.local` file (same 6 variables as Vercel)
4. Click **Save**
5. Trigger a new deployment

#### For Other Platforms:

Look for **Environment Variables** or **Build Environment** section and add the same variables.

---

## Testing After Deployment

### AdSense Test:
1. Visit your deployed site
2. Open browser console (F12)
3. You should **NOT** see: "Ad client is missing from the slot"
4. Ads may take 10-20 minutes to appear (Google review time)
5. If you see placeholder messages, verify slot IDs are correct

### Gmail Test:
1. Try to send an invoice via email
2. You should see Google OAuth popup
3. Grant permissions
4. Email should send successfully

---

## Common Issues

### Issue 1: "Ad client is missing from the slot"
**Solution**: You haven't set the slot IDs or they're incorrect
- Go to AdSense and get real slot IDs (Step 1)
- Add them to your deployment platform (Step 3)
- Redeploy

### Issue 2: "client_id and scope must both be provided"
**Solution**: Environment variables aren't loaded
- Verify you added ALL variables to your deployment platform
- Make sure variable names are EXACTLY as shown (including VITE_ prefix)
- Redeploy after adding variables

### Issue 3: Gmail OAuth redirect error
**Solution**: Authorized redirect URI not configured
- Complete Step 2 above
- Make sure the URL matches your deployment URL exactly
- Include both with and without trailing slash

### Issue 4: Ads show but no revenue
**Causes**:
- New account: Google needs to review your site (can take 24-48 hours)
- Policy violations: Check AdSense policy center
- Low traffic: Ads need actual visitors to generate revenue
- Ad blockers: Test in incognito mode without extensions

---

## Security Note

⚠️ **Keep Your Credentials Safe**

For production applications:
1. Never commit `.env.local` to git (already excluded via `.gitignore`)
2. Use separate OAuth credentials for production vs development
3. Store credentials only in your deployment platform's environment variables
4. Regularly rotate your client secrets if exposed

Your `.env.local` file contains sensitive credentials - keep it secure and never share publicly.

---

## Quick Checklist

- [ ] Created two AdSense ad units and got slot IDs
- [ ] Added deployment URL to Google OAuth redirect URIs
- [ ] Added all 6 environment variables to deployment platform
- [ ] Redeployed the application
- [ ] Tested email sending (OAuth popup appears)
- [ ] Checked browser console for errors
- [ ] Waited 10-20 minutes for AdSense to activate

---

## Need Help?

If issues persist:
1. Check browser console for specific error messages
2. Verify environment variables are saved in deployment platform
3. Confirm OAuth redirect URIs include your deployment URL
4. Test in incognito mode (disable ad blockers)
5. Check [AdSense Help Center](https://support.google.com/adsense/)
