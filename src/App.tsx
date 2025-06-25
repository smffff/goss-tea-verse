import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import Feed from "./pages/Feed";
import SubmitTea from "./pages/SubmitTea";
import Campaigns from "./pages/Campaigns";
import Features from "./pages/Features";
import Trends from "./pages/Trends";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <div className="app">
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<Index />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/submit" element={<SubmitTea />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/features" element={<Features />} />
        <Route path="/trends" element={<Trends />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
