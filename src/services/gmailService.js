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

    return new Promise((resolve, reject) => {
      gapi.load('client:auth2', async () => {
        try {
          await gapi.client.init({
            clientId: GMAIL_CONFIG.clientId,
            scope: GMAIL_CONFIG.scope,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
          });

          this.isInitialized = true;
          this.isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
          
          // Listen for sign-in state changes
          gapi.auth2.getAuthInstance().isSignedIn.listen((signedIn) => {
            this.isSignedIn = signedIn;
          });

          resolve();
        } catch (error) {
          console.error('Error initializing Gmail API:', error);
          reject(error);
        }
      });
    });
  }

  // Sign in to Google
  async signIn() {
    try {
      await this.initClient();
      if (!this.isSignedIn) {
        await gapi.auth2.getAuthInstance().signIn();
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
      if (this.isSignedIn) {
        await gapi.auth2.getAuthInstance().signOut();
        this.isSignedIn = false;
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  // Check if user is signed in
  checkSignInStatus() {
    if (!this.isInitialized) return false;
    return gapi.auth2.getAuthInstance().isSignedIn.get();
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
