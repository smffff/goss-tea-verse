import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
    <div className="app">
      <Routes>
        {/* Landing page - no Layout wrapper */}
        <Route path="/" element={<Landing />} />
        
        {/* App pages with Layout wrapper */}
        <Route path="/feed" element={
          <Layout>
            <Feed />
          </Layout>
        } />
        <Route path="/submit" element={
          <Layout>
            <SubmitTea />
          </Layout>
        } />
        <Route path="/campaigns" element={
          <Layout>
            <Campaigns />
          </Layout>
        } />
        <Route path="/features" element={
          <Layout>
            <Features />
          </Layout>
        } />
        <Route path="/trends" element={
          <Layout>
            <Trends />
          </Layout>
        } />
        <Route path="/about" element={
          <Layout>
            <About />
          </Layout>
        } />
        <Route path="/contact" element={
          <Layout>
            <Contact />
          </Layout>
        } />
        <Route path="/privacy" element={
          <Layout>
            <Privacy />
          </Layout>
        } />
        <Route path="/terms" element={
          <Layout>
            <Terms />
          </Layout>
        } />
        
        {/* 404 page with Layout wrapper */}
        <Route path="*" element={
          <Layout>
            <NotFound />
          </Layout>
        } />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
