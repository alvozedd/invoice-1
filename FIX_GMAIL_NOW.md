# Fix Gmail Integration - Redirect URI Issue

## Your Current Status:
✓ Client ID: Loaded  
✓ Scope: Loaded  
✓ GAPI Script: Loaded  
✗ Gmail API: NOT INITIALIZED ← **THIS IS THE PROBLEM**

## The Fix (5 minutes):

### Step 1: Open Google Cloud Console
1. Go to: https://console.cloud.google.com/
2. Select project: **clinic-app-87d29**
3. Click: **APIs & Services** → **Credentials**

### Step 2: Find Your OAuth 2.0 Client ID
Look for the client ID starting with: `869951921728-...`

### Step 3: Edit OAuth Client
Click on the client ID name to edit it

### Step 4: Add Authorized JavaScript Origins
Under **Authorized JavaScript origins**, add:
```
https://invoice-1-sand.vercel.app
```

### Step 5: Add Authorized Redirect URIs
Under **Authorized redirect URIs**, add:
```
https://invoice-1-sand.vercel.app
```

**Important:** 
- No trailing slash
- Must be HTTPS (not HTTP)
- Must match exactly

### Step 6: Save Changes
Click **SAVE** button at the bottom

### Step 7: Wait & Test (2 minutes)
1. Wait 1-2 minutes for changes to propagate
2. Clear your browser cache (Ctrl + Shift + Delete)
3. Refresh your invoice site: https://invoice-1-sand.vercel.app
4. Look at the debug panel again
5. Try clicking "Send via Gmail"

---

## If Still Not Working:

### Check Gmail API is Enabled:
1. In Google Cloud Console
2. Go to: **APIs & Services** → **Library**
3. Search for: **Gmail API**
4. Make sure it says **ENABLED** (if not, click Enable)

### Check Browser Console for Exact Error:
1. Press **F12** on your keyboard
2. Click **Console** tab
3. Look for red error messages
4. Copy the error and paste it here

---

## Expected Result After Fix:

Debug Panel Should Show:
```
✓ Client ID: Loaded
✓ GAPI Script: Loaded
✓ Gmail API: Initialized ← Should change to this
✗ Signed In: No ← This is normal until you click Send
```

When you click "Send via Gmail":
1. Google OAuth popup appears
2. You grant permission
3. Email sends successfully with PDF attached
4. No more "attach PDF manually" message!

---

## Quick Checklist:

- [ ] Added https://invoice-1-sand.vercel.app to Authorized JavaScript origins
- [ ] Added https://invoice-1-sand.vercel.app to Authorized redirect URIs
- [ ] Clicked SAVE in Google Cloud Console
- [ ] Waited 1-2 minutes
- [ ] Cleared browser cache
- [ ] Refreshed the invoice site
- [ ] Checked debug panel - Gmail API should now be "Initialized"

If it still doesn't work after this, press F12 and tell me the exact error message!
