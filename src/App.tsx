
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./components/WalletProvider";
import Layout from "./components/Layout";
import MobileLayout from "./components/MobileLayout";
import Landing from "./pages/Landing";
import Feed from "./pages/Feed";
import EnhancedFeed from "./pages/EnhancedFeed";
import SubmitTea from "./pages/SubmitTea";
import Campaigns from "./pages/Campaigns";
import Features from "./pages/Features";
import Trends from "./pages/Trends";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

// Import new feature pages
import TokenPage from "./pages/TokenPage";
import GovernancePage from "./pages/GovernancePage";

// SEO and Analytics
import { Helmet } from 'react-helmet-async';

const App = () => (
  <BrowserRouter>
    <Helmet>
      {/* Primary Meta Tags */}
      <title>CTea Newsroom - Anonymous Crypto Gossip Platform</title>
      <meta name="title" content="CTea Newsroom - Anonymous Crypto Gossip Platform" />
      <meta name="description" content="Where Crypto Twitter comes to spill. Submit, track, and score the latest gossip & alpha—anonymous, algorithmic, and spicy. Join the hottest crypto community." />
      <meta name="keywords" content="crypto, cryptocurrency, gossip, alpha, anonymous, tea, blockchain, defi, nft, memecoin, trading, community" />
      <meta name="author" content="CTea Newsroom" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://ctea.news/" />
      <meta property="og:title" content="CTea Newsroom - Anonymous Crypto Gossip Platform" />
      <meta property="og:description" content="Where Crypto Twitter comes to spill. Submit, track, and score the latest gossip & alpha—anonymous, algorithmic, and spicy." />
      <meta property="og:image" content="https://ctea.news/ctea-banner.png" />
      <meta property="og:site_name" content="CTea Newsroom" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://ctea.news/" />
      <meta property="twitter:title" content="CTea Newsroom - Anonymous Crypto Gossip Platform" />
      <meta property="twitter:description" content="Where Crypto Twitter comes to spill. Submit, track, and score the latest gossip & alpha—anonymous, algorithmic, and spicy." />
      <meta property="twitter:image" content="https://ctea.news/ctea-banner.png" />
      <meta property="twitter:creator" content="@ctea_newsroom" />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="theme-color" content="#6366f1" />
      <meta name="msapplication-TileColor" content="#6366f1" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="CTea Newsroom" />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/ctea-logo-icon.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/ctea-logo-icon.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/ctea-logo-icon.png" />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://ctea.news/" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Analytics Script */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX', {
            page_title: 'CTea Newsroom',
            page_location: window.location.href,
            custom_map: {
              'custom_parameter_1': 'tea_submissions',
              'custom_parameter_2': 'user_engagement'
            }
          });
          
          // Track page views
          window.addEventListener('load', function() {
            gtag('event', 'page_view', {
              page_title: document.title,
              page_location: window.location.href,
              page_referrer: document.referrer
            });
          });
          
          // Track CTA clicks
          document.addEventListener('click', function(e) {
            if (e.target.matches('[data-cta]')) {
              gtag('event', 'click', {
                event_category: 'CTA',
                event_label: e.target.getAttribute('data-cta'),
                value: 1
              });
            }
          });
        `}
      </script>
    </Helmet>
    
    <WalletProvider>
      <div className="app" role="application" aria-label="CTea Newsroom Application">
        <Routes>
          {/* Landing page - no Layout wrapper */}
          <Route path="/" element={<Landing />} />
          
          {/* App pages with Layout wrapper */}
          <Route path="/feed" element={
            <MobileLayout>
              <Layout>
                <Feed />
              </Layout>
            </MobileLayout>
          } />
          <Route path="/enhanced-feed" element={
            <MobileLayout>
              <Layout>
                <EnhancedFeed />
              </Layout>
            </MobileLayout>
          } />
          <Route path="/submit" element={
            <MobileLayout>
              <Layout>
                <SubmitTea />
              </Layout>
            </MobileLayout>
          } />
          <Route path="/campaigns" element={
            <MobileLayout>
              <Layout>
                <Campaigns />
              </Layout>
            </MobileLayout>
          } />
          <Route path="/features" element={
            <MobileLayout>
              <Layout>
                <Features />
              </Layout>
            </MobileLayout>
          } />
          <Route path="/trends" element={
            <MobileLayout>
              <Layout>
                <Trends />
              </Layout>
            </MobileLayout>
          } />
          <Route path="/about" element={
            <MobileLayout>
              <Layout>
                <About />
              </Layout>
            </MobileLayout>
          } />
          <Route path="/contact" element={
            <MobileLayout>
              <Layout>
                <Contact />
              </Layout>
            </MobileLayout>
          } />
          <Route path="/privacy" element={
            <MobileLayout>
              <Layout>
                <Privacy />
              </Layout>
            </MobileLayout>
          } />
          <Route path="/terms" element={
            <MobileLayout>
              <Layout>
                <Terms />
              </Layout>
            </MobileLayout>
          } />
          
          {/* New feature pages */}
          <Route path="/token" element={
            <MobileLayout>
              <Layout>
                <TokenPage />
              </Layout>
            </MobileLayout>
          } />
          <Route path="/governance" element={
            <MobileLayout>
              <Layout>
                <GovernancePage />
              </Layout>
            </MobileLayout>
          } />
          
          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </WalletProvider>
  </BrowserRouter>
);

export default App;
