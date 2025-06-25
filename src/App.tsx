
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./components/WalletProvider";
import Layout from "./components/Layout";
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

const App = () => (
  <BrowserRouter>
    <WalletProvider>
      <div className="app">
        <Routes>
          {/* Landing page - no Layout wrapper */}
          <Route path="/" element={<Landing />} />
          
          {/* App pages with Layout wrapper */}
          <Route path="/feed" element={<Feed />} />
          <Route path="/submit" element={<SubmitTea />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/features" element={<Features />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          
          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </WalletProvider>
  </BrowserRouter>
);

export default App;
