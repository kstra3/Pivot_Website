import { StrictMode } from 'react'

window.addEventListener('error', (e) => {
  document.body.innerHTML += '<div style="position:fixed;z-index:99999;top:0;left:0;background:red;color:white;padding:20px;">' + e.message + '<pre>' + (e.error ? e.error.stack : '') + '</pre></div>';
});

import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsOfService from './pages/TermsOfService.jsx'
import GeoFAQ from './pages/GeoFAQ.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/geo-faq" element={<GeoFAQ />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
