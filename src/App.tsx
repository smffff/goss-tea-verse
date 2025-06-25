import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./components/WalletProvider";
import Layout from "./components/Layout";
import MobileLayout from "./components/MobileLayout";
import Landing from "./pages/Landing";
import Feed from "./pages/Feed";
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

const App = () => (
  <BrowserRouter>
    <WalletProvider>
      <div className="app">
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
