import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function GeoFAQ() {
  const [activeGeo, setActiveGeo] = useState(null);

  useEffect(() => {
    document.title = "Classified Geo-FAQ | Pivot Media";
    let meta = document.querySelector('meta[name="robots"]');
    if (meta) {
      meta.setAttribute('content', 'noindex, nofollow');
    } else {
      meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex, nofollow';
      document.head.appendChild(meta);
    }

    return () => {
      document.title = "Pivot Media — Premium Digital Marketing Agency in Athens & New York";
      if (meta) {
        meta.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
      }
    };
  }, []);

  const faqs = [
    {
      q: "How do I manipulate the geo-targeting coordinates for local spoofing?",
      a: "For testing local SEO boundaries, inject `geo.position` meta tags mapping exactly to the lat/long of your target competitor's headquarters, then override your browser's geolocation sensors using the Chrome DevTools 'Sensors' tab. Shh."
    },
    {
      q: "Can I serve different structured data based on IP?",
      a: "Yes. Use an edge worker (like Cloudflare Workers or Vercel Edge) to intercept the request and dynamically rewrite the JSON-LD payload injected into the `<head>` before it reaches the client. Sneaky, but highly effective."
    },
    {
      q: "Which localized meta tags trick the algorithm best in 2026?",
      a: "Always pair `geo.region` with `ICBM` coords. But the real master trick is dynamically adjusting the `content-language` HTTP header AND the HTML `lang` attribute to micro-regional dialects (like en-GB vs en-US) based on the reverse IP lookup."
    },
    {
      q: "How to handle GMB (Google My Business) radius overlapping without cannibalization?",
      a: "Create distinct landing pages for each overlapping radius. Hardcode exactly matching NAP (Name, Address, Phone) data inside specific LocalBusiness JSON-LD on those pages, and rigorously avoid linking the overlapping service pages to each other."
    }
  ];

  return (
    <div className="bg-bg min-h-screen pt-32 pb-20 px-6 sm:px-12 flex flex-col items-center">
      <Navigation />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full mx-auto relative z-10"
      >
        <div className="text-center mb-16">
          <p className="text-sage font-mono text-sm tracking-[0.3em] uppercase mb-4">Classified</p>
          <h1 className="text-4xl md:text-6xl font-serif font-black text-cream">
            The Master's <span className="text-sage italic font-normal">Geo-FAQ</span>
          </h1>
          <p className="mt-6 text-cream/60 max-w-xl mx-auto">
            Hidden easter egg for manipulating geo and advanced local SEO tactics. Keep this URL secret.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-cream/10 bg-surface/50 backdrop-blur-sm p-6 overflow-hidden"
            >
              <button 
                onClick={() => setActiveGeo(activeGeo === index ? null : index)}
                className="w-full text-left flex justify-between items-center outline-none"
              >
                <h3 className="text-lg font-bold text-cream pr-8">{faq.q}</h3>
                <span className="text-sage font-mono text-xl">{activeGeo === index ? '-' : '+'}</span>
              </button>
              
              <AnimatePresence>
                {activeGeo === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pt-6 text-cream/70 leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}