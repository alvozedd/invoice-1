import { gapi } from 'gapi-script';
import { GMAIL_CONFIG } from '../config/credentials';

class GmailService {
  constructor() {
    this.isInitialized = false;
    this.isSignedIn = false;
  }

  // Initialize the Google API client
  async initClient() {
    if (this.isInitialized) return;

    if (!GMAIL_CONFIG.clientId || !GMAIL_CONFIG.scope) {
      const error = new Error('Gmail API credentials are not configured. Please check DEPLOYMENT_GUIDE.md for setup instructions.');
      console.error(error.message);
      throw error;
    }

    return new Promise((resolve, reject) => {
      // Check if gapi is loaded
      if (typeof gapi === 'undefined') {
        const error = new Error('Google API (gapi) not loaded. Make sure the script is included in index.html');
        console.error(error.message);
        reject(error);
        return;
      }

      gapi.load('client:auth2', async () => {
        try {
          await gapi.client.init({
            apiKey: '', // Not needed for OAuth flow
            clientId: GMAIL_CONFIG.clientId,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
            scope: GMAIL_CONFIG.scope,
          });

          // Wait for auth2 to be ready
          await gapi.auth2.getAuthInstance();
          
          this.isInitialized = true;
          const authInstance = gapi.auth2.getAuthInstance();
          
          if (authInstance) {
            this.isSignedIn = authInstance.isSignedIn.get();
            
            // Listen for sign-in state changes
            authInstance.isSignedIn.listen((signedIn) => {
              this.isSignedIn = signedIn;
            });
            
            console.log('Gmail API initialized successfully');
            console.log('Signed in:', this.isSignedIn);
          } else {
            console.error('Auth instance is null after initialization');
          }

          resolve();
        } catch (error) {
          console.error('Error initializing Gmail API:', error);
          console.error('Make sure to add this redirect URI to Google Cloud Console:');
          console.error(`  ${window.location.origin}`);
          reject(error);
        }
      });
    });
  }

  // Sign in to Google
  async signIn() {
    try {
      await this.initClient();
      
      const authInstance = gapi.auth2.getAuthInstance();
      if (!authInstance) {
        throw new Error('Google Auth instance not available. Please refresh the page and try again.');
      }
      
      if (!this.isSignedIn) {
        await authInstance.signIn();
        this.isSignedIn = true;
      }
      return true;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  // Sign out from Google
  async signOut() {
    try {
      const authInstance = gapi.auth2.getAuthInstance();
      if (authInstance && this.isSignedIn) {
        await authInstance.signOut();
        this.isSignedIn = false;
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  // Check if user is signed in
  checkSignInStatus() {
    if (!this.isInitialized) return false;
    const authInstance = gapi.auth2.getAuthInstance();
    if (!authInstance) return false;
    return authInstance.isSignedIn.get();
  }

  // Create email message in base64 format
  createMessage(to, subject, body, pdfBase64, fileName) {
    const boundary = '__boundary__';
    const mimeType = 'application/pdf';
    
    const messageParts = [
      `To: ${to}`,
      `Subject: ${subject}`,
      'MIME-Version: 1.0',
      `Content-Type: multipart/mixed; boundary="${boundary}"`,
      '',
      `--${boundary}`,
      'Content-Type: text/plain; charset="UTF-8"',
      '',
      body,
      '',
      `--${boundary}`,
      `Content-Type: ${mimeType}; name="${fileName}"`,
      'Content-Transfer-Encoding: base64',
      `Content-Disposition: attachment; filename="${fileName}"`,
      '',
      pdfBase64,
      '',
      `--${boundary}--`
    ];

    const message = messageParts.join('\r\n');
    return btoa(unescape(encodeURIComponent(message)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  // Send email with PDF attachment
  async sendEmail(to, subject, body, pdfBase64, fileName) {
    try {
      // Initialize and sign in if needed
      await this.initClient();
      
      if (!this.isSignedIn) {
        await this.signIn();
      }

      // Create and send the message
      const encodedMessage = this.createMessage(to, subject, body, pdfBase64, fileName);
      
      const response = await gapi.client.gmail.users.messages.send({
        userId: 'me',
        resource: {
          raw: encodedMessage
        }
      });

      return response;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const gmailService = new GmailService();
