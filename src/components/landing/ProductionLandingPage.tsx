import React from 'react';

const ProductionLandingPage: React.FC = () => {
  return (
    <div style={{ 
      padding: 40, 
      minHeight: '100vh',
      backgroundColor: '#1b1b1b',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      fontFamily: 'Arial, sans-serif'
    }}>
      ✅ CTea Newsroom is live! 
      <br />
      <span style={{ fontSize: '16px', marginTop: '10px', opacity: 0.8 }}>
        Landing page is working - ready to restore components
      </span>
    </div>
  );
};

export default ProductionLandingPage;
