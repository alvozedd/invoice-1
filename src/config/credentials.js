// Google API Credentials Configuration
// IMPORTANT: Never commit real credentials to git!
// Use .env.local file for your actual credentials (see .env.example)

export const GMAIL_CONFIG = {
  // Get these from your 'gmail cred.json' file
  clientId: import.meta.env.VITE_GMAIL_CLIENT_ID || "",
  clientSecret: import.meta.env.VITE_GMAIL_CLIENT_SECRET || "",
  projectId: import.meta.env.VITE_GMAIL_PROJECT_ID || "",
  authUri: "https://accounts.google.com/o/oauth2/auth",
  tokenUri: "https://oauth2.googleapis.com/token",
  redirectUri: window.location.origin,
  scope: "https://www.googleapis.com/auth/gmail.send"
};

export const ADSENSE_CONFIG = {
  // Your AdSense Publisher ID (format: ca-pub-XXXXXXXXXXXXXXXX)
  publisherId: import.meta.env.VITE_ADSENSE_PUBLISHER_ID || "",
  // Get these from your AdSense dashboard
  topBannerSlot: import.meta.env.VITE_ADSENSE_TOP_SLOT || "",
  bottomBannerSlot: import.meta.env.VITE_ADSENSE_BOTTOM_SLOT || ""
};

// SETUP INSTRUCTIONS:
// 1. Create a .env.local file in the project root (NOT committed to git)
// 2. Add your credentials:
//    VITE_GMAIL_CLIENT_ID=your-client-id
//    VITE_GMAIL_CLIENT_SECRET=your-client-secret
//    VITE_GMAIL_PROJECT_ID=your-project-id
//    VITE_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX
//    VITE_ADSENSE_TOP_SLOT=your-top-slot-id
//    VITE_ADSENSE_BOTTOM_SLOT=your-bottom-slot-id
