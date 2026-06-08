import { useState, useEffect } from 'react';
import ReactLenis from 'lenis/react';

import Loader from './components/Loader';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import ScrollVine from './components/ScrollVine';
import WaterDropTrigger from './components/WaterDropTrigger';
import ScrollProgress from './components/ScrollProgress';
import Footer from './components/Footer';
import RootSystem from './components/RootSystem';
import VineWave from './components/VineWave';
import OceanWaves from './components/OceanWaves';
import CookieConsent from './components/CookieConsent';

// Sections
import Hero from './components/sections/Hero';
import Marquee from './components/sections/Marquee';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Process from './components/sections/Process';
import Numbers from './components/sections/Numbers';
import Contact from './components/sections/Contact';
import CTA from './components/sections/CTA';

// Add noise texture globally
const Grain = () => (
  <div
    className="fixed inset-0 z-[9990] pointer-events-none mix-blend-overlay opacity-5 animate-[grainShift_0.5s_steps(1)_infinite]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize: '120px'
    }}
  >
    <style>{`
      @keyframes grainShift {
        0%  { background-position: 0 0; }
        25% { background-position: -20px 10px; }
        50% { background-position: 10px -20px; }
        75% { background-position: -10px -10px; }
      }
    `}</style>
  </div>
);

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [theme, setTheme] = useState('light');
  const [cookieConsentOpen, setCookieConsentOpen] = useState(false);
  const [cookieConsentChoice, setCookieConsentChoice] = useState(null);

  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Setup prefers-reduced-motion check to disable lenis if needed
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      document.documentElement.classList.add('reduce-motion');
    }
    // Detect touch-only device
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);

    const storedConsent = window.localStorage.getItem('cookieConsent');
    if (storedConsent) {
      setCookieConsentChoice(storedConsent);
    } else {
      setCookieConsentOpen(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleOpenCookieConsent = () => {
    setCookieConsentOpen(true);
  };

  const handleAcceptCookies = () => {
    window.localStorage.setItem('cookieConsent', 'accepted');
    setCookieConsentChoice('accepted');
    setCookieConsentOpen(false);
  };

  const handleDeclineCookies = () => {
    window.localStorage.setItem('cookieConsent', 'declined');
    setCookieConsentChoice('declined');
    setCookieConsentOpen(false);
  };

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      <Loader onLoadingComplete={() => setLoadingComplete(true)} />

      {/* App Content only mounts/shows properly after loader to prevent flash */}
      <div className={loadingComplete ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}>
        <Grain />
        {!isTouch && <RootSystem />}
        {!isTouch && <CustomCursor />}
        {/* <ScrollVine /> */}
        {!isTouch && <WaterDropTrigger />}
        <ScrollProgress />

        {/* Theme Toggle Button - hidden for now
        <div className="fixed top-1/2 right-6 -translate-y-1/2 z-[600] flex flex-col gap-3">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-surface border border-border-color shadow-[0_4px_20px_var(--color-shadow-color)] flex items-center justify-center text-base hover:scale-110 hover:border-sage transition-all duration-300 cursor-none"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
        */}

        <header>
          <Navigation />
        </header>

        <main className="relative z-10">
          <Hero />
          <Marquee />
          <About />
          <Services />
          <Process />
          <Numbers />
          <OceanWaves />
          <Contact />
          <CTA />
        </main>

        <VineWave />
        <footer>
          <Footer onOpenCookies={handleOpenCookieConsent} cookieConsentChoice={cookieConsentChoice} />
        </footer>

        <CookieConsent
          open={cookieConsentOpen}
          onAccept={handleAcceptCookies}
          onDecline={handleDeclineCookies}
          onClose={() => setCookieConsentOpen(false)}
        />
      </div>
    </ReactLenis>
  );
}

export default App;
