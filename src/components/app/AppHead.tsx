
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface AppHeadProps {
  isProduction: boolean;
}

const AppHead: React.FC<AppHeadProps> = ({ isProduction }) => {
  return (
    <Helmet>
      <title>CTea Newsroom - Where Crypto Twitter Spills the Tea</title>
      <meta name="description" content="Anonymous crypto gossip platform powered by AI. Share intel, earn tokens, stay shady." />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#00d1c1" />
      
      {/* Preconnect to external resources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/ctea-logo-icon.svg" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* PWA */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Analytics */}
      {isProduction && (
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"
        />
      )}
      {isProduction && (
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_TRACKING_ID');
          `}
        </script>
      )}
    </Helmet>
  );
};

export default AppHead;
