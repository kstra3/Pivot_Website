import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Footer({ onOpenCookies }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });
    
    // Parallax effect for the massive text
    const y = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);
    
    const FooterLink = ({ href, children, ...props }) => (
        <a
            href={href}
            className="group relative block text-cream no-underline text-[1rem] md:text-[1.1rem] opacity-60 hover:opacity-100 transition-opacity duration-300 w-fit"
            data-cursor="Navigate"
            {...props}
        >
            <span className="relative z-10">{children}</span>
            <span className="absolute left-0 bottom-0 w-0 h-px bg-cream transition-all duration-300 group-hover:w-full" />
        </a>
    );

    return (
        <footer className="bg-sage text-cream pt-16 md:pt-24 px-6 md:px-16 pb-8 relative overflow-hidden">

            {/* Soft top gradient */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cream/10 to-transparent" />

            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-16 pb-16 md:pb-32">
                    {/* Left - About */}
                    <div className="max-w-[400px]">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-2 h-2 rounded-full bg-cream animate-pulse" />
                            <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-cream/60">Currently taking new projects</span>
                        </div>
                        <p className="text-[1.1rem] leading-[1.6] opacity-60">
                            We build digital experiences that plant the seeds for exponential growth.
                        </p>
                    </div>

                    {/* Right - Links */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-cream/40 mb-2">Connect</h4>
                        <FooterLink href="https://www.instagram.com/pivotmedia.gr/" target="_blank" rel="noopener noreferrer" aria-label="Follow Pivot Media on Instagram">Instagram</FooterLink>
                        <FooterLink href="#" aria-label="Connect with Pivot Media on LinkedIn">LinkedIn</FooterLink>
                    </div>
                </div>

                {/* Massive Brand Typographic Element */}
                <div ref={containerRef} className="relative w-full overflow-hidden border-t border-cream/5 pt-12 pb-6">
                    <motion.h2 
                        style={{ y }}
                        className="font-serif font-black text-[15vw] leading-[0.75] tracking-[-0.05em] text-transparent bg-clip-text bg-gradient-to-b from-cream to-cream/10 select-none text-center"
                    >
                        PivotMedia
                    </motion.h2>

                    {/* Bottom Info Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-center mt-12 text-[0.75rem] opacity-40 uppercase tracking-[0.1em] font-medium gap-4 md:gap-0">
                        <span>© 2025 Pivot Media.</span>
                        <div className="flex flex-wrap items-center gap-3 md:gap-4">
                            <button type="button" onClick={onOpenCookies} className="px-4 py-2 rounded-full border border-cream/10 text-cream/40 hover:text-cream hover:border-cream/20 hover:bg-cream/5 transition-all no-underline cursor-none" data-cursor="Cookies">
                                Cookies
                            </button>
                            <Link to="/privacy-policy" className="hover:text-cream/80 transition-colors no-underline text-cream/40 hover:text-cream/80">Privacy Policy</Link>
                            <Link to="/terms-of-service" className="hover:text-cream/80 transition-colors no-underline text-cream/40 hover:text-cream/80">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
