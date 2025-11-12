import { useEffect } from 'react';
import { ADSENSE_CONFIG } from '../config/credentials';

const AdSenseBanner = ({ slot, format = 'auto', responsive = true, style = {} }) => {
  const publisherId = ADSENSE_CONFIG.publisherId || 'ca-pub-7469351471654900';
  
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  if (!publisherId || publisherId === 'ca-pub-7469351471654900') {
    if (!slot) {
      return (
        <div 
          className="bg-yellow-50 border border-yellow-300 rounded-lg flex items-center justify-center text-yellow-700 text-sm p-4"
          style={{ minHeight: '90px', ...style }}
        >
          AdSense: Please configure ad slot IDs in your deployment environment variables
        </div>
      );
    }
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', ...style }}
      data-ad-client={publisherId}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    ></ins>
  );
};

export default AdSenseBanner;
