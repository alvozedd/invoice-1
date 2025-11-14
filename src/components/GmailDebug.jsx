import { useState, useEffect } from 'react';
import { GMAIL_CONFIG } from '../config/credentials';
import { gmailService } from '../services/gmailService';

const GmailDebug = () => {
  const [debugInfo, setDebugInfo] = useState({
    clientIdLoaded: false,
    clientIdValue: '',
    scopeLoaded: false,
    gapiLoaded: false,
    isInitialized: false,
    isSignedIn: false,
    error: null
  });

  useEffect(() => {
    const checkGmailConfig = async () => {
      const info = {
        clientIdLoaded: !!GMAIL_CONFIG.clientId,
        clientIdValue: GMAIL_CONFIG.clientId ? `${GMAIL_CONFIG.clientId.substring(0, 20)}...` : 'NOT SET',
        scopeLoaded: !!GMAIL_CONFIG.scope,
        gapiLoaded: typeof window.gapi !== 'undefined',
        isInitialized: gmailService.isInitialized,
        isSignedIn: gmailService.isSignedIn,
        redirectUri: window.location.origin,
        error: null
      };

      // Try to initialize
      try {
        await gmailService.initClient();
        info.isInitialized = gmailService.isInitialized;
        info.isSignedIn = gmailService.isSignedIn;
      } catch (error) {
        info.error = error.message;
      }

      setDebugInfo(info);
    };

    checkGmailConfig();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-gray-300 rounded-lg shadow-lg p-4 max-w-md z-50">
      <h3 className="font-bold text-lg mb-2">Gmail Debug Info</h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center">
          <span className={`w-3 h-3 rounded-full mr-2 ${debugInfo.clientIdLoaded ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span>Client ID: {debugInfo.clientIdLoaded ? '✓ Loaded' : '✗ Missing'}</span>
        </div>
        
        <div className="text-xs text-gray-600 ml-5">
          {debugInfo.clientIdValue}
        </div>

        <div className="flex items-center">
          <span className={`w-3 h-3 rounded-full mr-2 ${debugInfo.scopeLoaded ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span>Scope: {debugInfo.scopeLoaded ? '✓ Loaded' : '✗ Missing'}</span>
        </div>

        <div className="flex items-center">
          <span className={`w-3 h-3 rounded-full mr-2 ${debugInfo.gapiLoaded ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span>GAPI Script: {debugInfo.gapiLoaded ? '✓ Loaded' : '✗ Not Loaded'}</span>
        </div>

        <div className="flex items-center">
          <span className={`w-3 h-3 rounded-full mr-2 ${debugInfo.isInitialized ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
          <span>Gmail API: {debugInfo.isInitialized ? '✓ Initialized' : '○ Not Initialized'}</span>
        </div>

        <div className="flex items-center">
          <span className={`w-3 h-3 rounded-full mr-2 ${debugInfo.isSignedIn ? 'bg-green-500' : 'bg-gray-400'}`}></span>
          <span>Signed In: {debugInfo.isSignedIn ? '✓ Yes' : '✗ No'}</span>
        </div>

        <div className="text-xs text-gray-600 mt-2">
          <strong>Redirect URI:</strong><br/>
          {debugInfo.redirectUri}
        </div>

        {debugInfo.error && (
          <div className="mt-2 p-2 bg-red-50 border border-red-300 rounded text-xs text-red-700">
            <strong>Error:</strong> {debugInfo.error}
          </div>
        )}

        <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
          Press F12 to see full console logs
        </div>
      </div>
    </div>
  );
};

export default GmailDebug;
