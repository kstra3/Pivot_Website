import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import Magnetic from './Magnetic';
import PivotText from './PivotText';

// Detailed Monstera outline for the branch nodes
const LeafSVG = ({ className }) => (
    <svg viewBox="0 0 100 110" fill="currentColor" className={className}>
        <path 
            d="M50 90C35 85 15 70 8 50 4 35 15 15 35 10c8-2 20 4 25 10v-5c0-6 12-12 20-10 15 4 28 20 25 40-3 18-20 35-40 40z M18 42 A2.5 3.5 0 1 0 23 42 A2.5 3.5 0 1 0 18 42 Z M77 48 A3 4 0 1 0 83 48 A3 4 0 1 0 77 48 Z"
            fillRule="evenodd"
        />
        <path d="M49 18 Q49 55 49 88" stroke="rgba(246, 244, 241, 0.2)" strokeWidth="1" fill="none" />
    </svg>
);

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { id: '01', name: 'About', href: '#about' },
        { id: '02', name: 'Services', href: '#services' },
        { id: '03', name: 'Process', href: '#process' },
        { id: '04', name: 'Work', href: '#works' },
        { id: '05', name: 'Contact', href: '#contact' },
    ];

    const handleSmoothScroll = (e, href) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY,
                behavior: 'smooth'
            });
        }
    };

    const toggleMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <>
            <nav
                className={cn(
                    'fixed top-0 left-0 right-0 z-[700] flex justify-between items-center transition-all duration-500',
                    scrolled && !mobileMenuOpen
                        ? 'py-4 px-6 md:px-10 bg-cream/80 backdrop-blur-md shadow-[0_1px_0_var(--color-border-color)]'
                        : 'py-6 px-6 md:px-16 bg-transparent'
                )}
            >
                {/* Logo */}
                <Magnetic strength={0.2}>
                    <a
                        href="#"
                        onClick={(e) => {
                            if (mobileMenuOpen) setMobileMenuOpen(false);
                            handleSmoothScroll(e, '#');
                        }}
                        className={cn(
                            "font-serif text-xl md:text-2xl font-black tracking-tight transition-colors duration-500 z-[710] no-underline relative",
                            mobileMenuOpen ? "text-sage" : "text-sage"
                        )}
                        aria-label="Pivot Media Home"
                        data-cursor="Home"
                    >
                        <PivotText>Pivot</PivotText><span className={cn("italic font-normal transition-colors duration-500", mobileMenuOpen ? "text-sage" : "text-sage/60")}>Media</span>
                    </a>
                </Magnetic>

                <div className="flex items-center gap-8">
                    {/* Secondary CTA - hidden on open menu or mobile */}
                    <Magnetic strength={0.3}>
                        <a
                            href="#contact"
                            onClick={(e) => {
                                if (mobileMenuOpen) setMobileMenuOpen(false);
                                handleSmoothScroll(e, '#contact');
                            }}
                            className={cn(
                                "hidden md:inline-block px-6 py-2.5 text-[0.75rem] font-medium tracking-wide uppercase transition-all duration-500 z-[710] rounded-full",
                                mobileMenuOpen
                                    ? "opacity-0 pointer-events-none translate-y-[-10px]"
                                    : "bg-sage text-cream hover:bg-sage/90 opacity-100 translate-y-0"
                            )}
                            data-cursor="Contact"
                        >
                            Let's Talk
                        </a>
                    </Magnetic>

                    {/* Enhanced Hamburger / Menu Button */}
                    <Magnetic strength={0.2}>
                        <button
                            className="flex items-center gap-3 bg-transparent border-none p-2 z-[710] cursor-none group"
                            onClick={toggleMenu}
                            aria-label="Toggle Menu"
                            data-cursor={mobileMenuOpen ? "Close" : "Menu"}
                        >
                            <span className={cn(
                                "hidden md:block uppercase text-xs font-bold tracking-[0.2em] transition-colors duration-300",
                                mobileMenuOpen ? "text-sage" : "text-sage group-hover:text-sage/70"
                            )}>
                                {mobileMenuOpen ? "Close" : "Menu"}
                            </span>
                            <div className="flex flex-col gap-[6px] relative w-8 h-4 overflow-hidden">
                                <motion.span
                                    animate={{
                                        rotate: mobileMenuOpen ? 45 : 0,
                                        y: mobileMenuOpen ? 8 : 0,
                                        backgroundColor: "var(--color-sage)"
                                    }}
                                    className="block w-8 h-[2px] right-0 absolute top-0 origin-center transition-colors bg-sage"
                                />
                                <motion.span
                                    animate={{
                                        opacity: mobileMenuOpen ? 0 : 1,
                                        x: mobileMenuOpen ? 20 : 0,
                                        backgroundColor: "var(--color-sage)"
                                    }}
                                    className="block w-6 h-[2px] right-0 absolute top-[8px] transition-colors bg-sage"
                                />
                                <motion.span
                                    animate={{
                                        rotate: mobileMenuOpen ? -45 : 0,
                                        y: mobileMenuOpen ? -4 : 0,
                                        backgroundColor: "var(--color-sage)"
                                    }}
                                    className="block w-8 h-[2px] right-0 absolute bottom-0 origin-center transition-colors bg-sage"
                                />
                            </div>
                        </button>
                    </Magnetic>
                </div>
            </nav>

            {/* Vine/Branch Fullscreen Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
                        animate={{ opacity: 1, clipPath: 'circle(150% at 95% 5%)' }}
                        exit={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-[690] bg-cream text-sage flex overflow-hidden"
                    >
                        {/* Background Texture Overlay */}
                        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-sage" />

                        <Particles />

                        {/* Central Flowing Vine (SVG) */}
                        <div className="absolute inset-0 pointer-events-none flex justify-center -ml-12 md:ml-0 overflow-hidden">
                            <svg
                                viewBox="0 0 200 1200"
                                preserveAspectRatio="none"
                                className="h-full w-[150px] md:w-[250px] opacity-70"
                            >
                                <defs>
                                    <linearGradient id="vineGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="var(--color-sage)" />
                                        <stop offset="40%" stopColor="var(--color-sage)" stopOpacity="0.8" />
                                        <stop offset="100%" stopColor="var(--color-sage)" />
                                    </linearGradient>
                                    <filter id="vineGlow">
                                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                {/* Rich organic curved vine */}
                                <motion.path
                                    d="M100 0 C140 200, 60 400, 110 600 C160 800, 40 1000, 100 1200"
                                    fill="none"
                                    stroke="url(#vineGrad)"
                                    strokeWidth="3"
                                    filter="url(#vineGlow)"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                                />

                                {/* Swaying Decorative Leaves along the vine */}
                                {[
                                    { x: 105, y: 150, d: "M0,0 C10,-10 25,0 20,15 C10,30 0,15 0,0", rot: 15 },
                                    { x: 92, y: 350, d: "M0,0 C-10,-10 -25,0 -20,15 C-10,30 0,15 0,0", rot: -20 },
                                    { x: 108, y: 550, d: "M0,0 C10,-10 25,0 20,15 C10,30 0,15 0,0", rot: 45 },
                                    { x: 95, y: 750, d: "M0,0 C-10,-10 -25,0 -20,15 C-10,30 0,15 0,0", rot: -10 },
                                    { x: 105, y: 950, d: "M0,0 C10,-10 25,0 20,15 C10,30 0,15 0,0", rot: 25 },
                                ].map((leaf, i) => (
                                    <motion.path
                                        key={`leaf-${i}`}
                                        d={leaf.d}
                                        fill="url(#vineGrad)"
                                        initial={{ scale: 0, opacity: 0, x: leaf.x, y: leaf.y, rotate: leaf.rot }}
                                        animate={{ 
                                            scale: 1, 
                                            opacity: 0.8,
                                            rotate: [leaf.rot, leaf.rot + 12, leaf.rot] 
                                        }}
                                        transition={{ 
                                            scale: { delay: 0.8 + i * 0.25, duration: 1 },
                                            opacity: { delay: 0.8 + i * 0.25, duration: 1 },
                                            rotate: { 
                                                duration: 4 + i, 
                                                repeat: Infinity, 
                                                ease: "easeInOut" 
                                            }
                                        }}
                                        style={{ transformOrigin: "0 0" }}
                                    />
                                ))}
                            </svg>
                        </div>

                        {/* Links Container */}
                        <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center gap-8 md:gap-6 px-10 md:px-0 pt-16 pb-8 relative z-10">
                            {links.map((link, i) => {
                                const isRightSide = i % 2 === 0;

                                return (
                                    <BranchItem
                                        key={link.name}
                                        link={link}
                                        i={i}
                                        isRightSide={isRightSide}
                                        closeMenu={() => setMobileMenuOpen(false)}
                                        handleSmoothScroll={handleSmoothScroll}
                                    />
                                );
                            })}
                        </div>

                        {/* Contact Info Footer inside Menu */}
                        <motion.div
                            className="absolute bottom-8 left-8 md:left-12 text-sage/70 text-[0.65rem] tracking-[0.2em] uppercase hidden sm:block"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 0.7, y: 0 }}
                            transition={{ delay: 1.4, duration: 0.8 }}
                        >
                            <p className="mb-2 text-sage font-bold tracking-[0.3em]">PIVOT MEDIA AGENCY</p>
                            <p className="text-sage/70">Global Digital Experiences</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

// Particle Engine - now with rotating leaf fragments
const Particles = () => (
    <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
                key={`particle-${i}`}
                className="absolute pointer-events-none"
                style={{
                    width: Math.random() * 10 + 4 + "px",
                    height: Math.random() * 8 + 3 + "px",
                    background: "var(--color-sage)",
                    left: Math.random() * 100 + "%",
                    borderRadius: "50% 0 50% 0", // Leaf shape
                    filter: "blur(0.5px)",
                    boxShadow: "0 0 8px rgba(97, 109, 107, 0.2)"
                }}
                initial={{ y: "110vh", opacity: 0, scale: 0, rotate: 0 }}
                animate={{
                    y: "-10vh",
                    opacity: [0, 0.4, 0],
                    scale: [0, 1, 0.6],
                    x: [0, Math.sin(i) * 60, 0],
                    rotate: [0, 360]
                }}
                transition={{
                    duration: Math.random() * 15 + 15,
                    repeat: Infinity,
                    delay: Math.random() * 10,
                    ease: "linear"
                }}
            />
        ))}
    </div>
);

// Individual Animated Branch & Link Component
const BranchItem = ({ link, i, isRightSide, closeMenu, handleSmoothScroll }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [ripple, setRipple] = useState(false);

    const handleClick = (e) => {
        setRipple(true);
        setTimeout(() => {
            handleSmoothScroll(e, link.href);
            closeMenu();
        }, 300); // Wait for ripple animation to visually trigger before closing
    };

    return (
        <div
            className={cn(
                "relative flex w-full md:w-1/2 items-center",
                isRightSide ? "md:self-end md:pl-12" : "md:self-start md:justify-end md:pr-12",
                "pl-1 md:pl-0"
            )}
        >
            {/* Desktop Branch connecting line to center vine */}
            <motion.div
                className={cn(
                    "absolute top-1/2 -translate-y-1/2 h-px bg-gradient-to-r hidden md:block z-0 pointer-events-none",
                    isRightSide
                        ? "left-0 w-12 origin-left from-sage/60 to-transparent"
                        : "right-0 w-12 origin-right from-transparent to-sage/60"
                )}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.6 + i * 0.15, ease: "easeOut" }}
            />

            {/* Mobile Branch line */}
            <motion.div
                className="absolute top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-sage/50 to-transparent left-0 w-8 origin-left md:hidden z-0 pointer-events-none"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 + i * 0.15, ease: "easeOut" }}
            />

            {/* Idle Breathing Wrapper */}
            <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                className="w-full md:auto"
            >
                {/* Glassmorphism Link Group Wrapper */}
                <motion.div
                    className={cn(
                        "relative flex flex-col md:flex-row items-center gap-4 md:gap-6 group cursor-pointer z-10 w-full md:w-auto",
                        "p-4 md:py-5 md:px-8 rounded-3xl bg-sage/[0.02] backdrop-blur-md border border-sage/[0.05] shadow-[0_8px_32px_0_rgba(97, 109, 107, 0.1)] overflow-hidden",
                        !isRightSide && "md:flex-row-reverse"
                    )}
                    initial={{ opacity: 0, scale: 0.8, rotate: isRightSide ? -5 : 5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.7 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -8, x: isRightSide ? 8 : -8, backgroundColor: "rgba(97, 109, 107, 0.06)", borderColor: "rgba(97, 109, 107, 0.15)" }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    onClick={handleClick}
                    data-cursor="Select"
                >
                    {/* Shimmer Effect */}
                    <motion.div
                        className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-sage/10 to-transparent skew-x-[20deg] pointer-events-none"
                        initial={{ left: '-100%' }}
                        animate={isHovered ? { left: '200%' } : { left: '-100%' }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    />

                    {/* Responsive Blooming Leaf indicating the node */}
                    <motion.div
                        className={cn(
                            "flex items-center justify-center shrink-0 w-12 h-12 rounded-full",
                            "bg-sage/[0.03] border border-sage/[0.05] shadow-inner transition-colors duration-500"
                        )}
                        animate={{
                            rotate: isHovered ? 360 : 0,
                            scale: isHovered ? 1.3 : 1,
                            color: "var(--color-sage)",
                            borderColor: isHovered ? "rgba(97, 109, 107, 0.5)" : "rgba(97, 109, 107, 0.05)",
                            boxShadow: isHovered ? "0 0 20px rgba(97, 109, 107, 0.3)" : "0 0 0px transparent"
                        }}
                        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 15 }}
                    >
                        <LeafSVG className={cn("w-6 h-6 transition-colors duration-300", !isRightSide && "md:-scale-x-100")} />
                    </motion.div>

                    {/* Inner Content Component (Number + Text) */}
                    <div className={cn("flex flex-col relative py-1 w-full text-center", !isRightSide ? "md:text-right" : "md:text-left")}>

                        {/* Ripple Background Effect */}
                        <AnimatePresence>
                            {ripple && (
                                <motion.span
                                    className="absolute inset-0 bg-sage/20 rounded-xl -z-10 pointer-events-none w-full h-full filter blur-md"
                                    initial={{ scale: 0.8, opacity: 1 }}
                                    animate={{ scale: 1.5, opacity: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                />
                            )}
                        </AnimatePresence>

                        <span className="text-sage/60 font-mono text-[0.65rem] md:text-xs tracking-[0.4em] mb-1 transition-colors group-hover:text-sage">
                            {link.id} //
                        </span>
                        <motion.span
                            className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight block relative z-10 transition-colors"
                            animate={{
                                letterSpacing: isHovered ? "0.02em" : "0em",
                                color: "var(--color-sage)"
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            {link.name}
                        </motion.span>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};
