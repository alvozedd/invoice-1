import { useEffect } from 'react';
import { ADSENSE_CONFIG } from '../config/credentials';

const AdSenseBanner = ({ slot, format = 'auto', responsive = true, style = {} }) => {
  useEffect(() => {
    try {
      if (window.adsbygoogle && process.env.NODE_ENV === 'production') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  if (process.env.NODE_ENV !== 'production') {
    return (
      <div 
        className="bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-sm"
        style={{ minHeight: '90px', ...style }}
      >
        Ad Placeholder (AdSense shows in production)
      </div>
    );
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', ...style }}
      data-ad-client={ADSENSE_CONFIG.publisherId}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    ></ins>
  );
};

export default AdSenseBanner;
