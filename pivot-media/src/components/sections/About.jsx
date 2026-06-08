import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Button from '../Button';
import RevealText from '../RevealText';
import NetworkParticles from '../NetworkParticles';

const AnimatedCounter = ({ from = 0, to, suffix = "", duration = 2.4 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px 0px" });
    const [count, setCount] = useState(from);

    useEffect(() => {
        if (!isInView) return;
        let startTimestamp = null;
        let animationFrameId;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
            const easeProgress = 1 - Math.pow(1 - progress, 4); // Quartic ease out
            setCount(Math.floor(easeProgress * (to - from) + from));

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(step);
            }
        };

        animationFrameId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isInView, from, to, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
};

export default function About() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px 0px" });

    const stats = [
        { to: 18, suffix: '+', label: 'Brands Grown' },
        { to: 8, suffix: 'x', label: 'Avg. ROAS' },
        { displayValue: 'AI-Native Workflow', label: '' },
    ];

    return (
        <section id="about" aria-label="About Pivot Media" className="py-[40px] md:py-[80px] px-6 md:px-16 overflow-hidden bg-bg">
            <motion.div
                ref={containerRef}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-[120px] items-start"
            >
                {/* Left Content */}
                <div className="lg:sticky lg:top-32">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center gap-4 mb-8"
                    >
                        <span className="w-10 h-[1.5px] bg-sage" />
                        <p className="text-[0.68rem] font-bold tracking-[0.25em] uppercase text-sage">
                            Our Story
                        </p>
                    </motion.div>

                    <h2 className="font-serif text-[clamp(2.2rem,5vw,5rem)] leading-[1.1] font-black text-text tracking-[-0.04em] mb-10 pb-6 -mb-6">
                        <RevealText>Rooted in craft,</RevealText><br />
                        <span className="text-sage italic font-normal">
                            <RevealText delay={0.2}>built for growth</RevealText>
                        </span>
                    </h2>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-[540px]"
                    >
                        <p className="text-[1.1rem] leading-[1.8] text-text opacity-70 mb-8 text-balance">
                            Pivot Media was founded in 2025 with a straightforward idea: marketing should work for people, not at them. We build digital systems that attract the right audience then keep them engaged.
                        </p>
                        <p className="text-[0.95rem] leading-[1.8] text-text opacity-50 mb-8 text-balance">
                            We're a small team. That means no account managers passing notes between you and the people doing the work. You talk to the strategist. You review with the designer. You get answers fast.
                        </p>
                        <p className="text-[0.95rem] leading-[1.8] text-text opacity-50 mb-12 text-balance">
                            We don't chase trends. We build foundations that compound search rankings that stick, ad systems that scale, brands that last.
                        </p>
                        <Button href="#process" variant="outline">Our Methodology</Button>
                    </motion.div>
                </div>

                {/* Right Visual & Stats */}
                <div className="relative">
                    {/* Decorative Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                        className="aspect-[4/5] bg-sage/5 border border-sage/10 relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-sage/5 to-sage/10" />

                        {/* Abstract SVG Pattern */}
                        <svg className="absolute inset-0 w-full h-full opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-700" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <defs>
                                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>

                        {/* Background Photo */}
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 pointer-events-none z-0"
                        >
                            <img src="/assets/about_bg.jpg" alt="Acropolis" className="w-full h-full object-cover mix-blend-multiply opacity-[0.4]" />
                        </motion.div>

                        {/* Neural Network Overlay */}
                        <div className="absolute inset-0 z-[1] opacity-70">
                            <NetworkParticles alwaysVisible />
                        </div>

                        {/* Integrated Stats Boxes */}
                        <div className="absolute inset-0 p-4 md:p-8">
                            {/* Box 1 - Top Right */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="absolute top-[8%] right-[5%] md:top-[10%] md:right-[8%] bg-cream/20 backdrop-blur-xl border border-cream/50 p-4 md:p-6 shadow-[0_8px_32px_rgba(97,109,107,0.15)] rounded-2xl w-[140px] md:w-auto md:max-w-[180px]"
                            >
                                <div className="font-serif text-3xl md:text-4xl font-black text-text mb-1">
                                    <AnimatedCounter from={stats[0].to} to={stats[0].to} suffix={stats[0].suffix} />
                                </div>
                                <p className="text-[0.55rem] md:text-[0.6rem] font-bold uppercase tracking-[0.2em] text-sage">{stats[0].label}</p>
                            </motion.div>

                            {/* Box 2 - Middle Left */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                                className="absolute top-[50%] -translate-y-1/2 left-[5%] md:top-[40%] md:translate-y-0 md:left-[8%] bg-cream/20 backdrop-blur-xl border border-cream/50 p-4 md:p-6 shadow-[0_8px_32px_rgba(97,109,107,0.15)] rounded-2xl w-[140px] md:w-auto md:max-w-[180px]"
                            >
                                <div className="font-serif text-3xl md:text-4xl font-black text-text mb-1">
                                    <AnimatedCounter from={stats[1].to} to={stats[1].to} suffix={stats[1].suffix} />
                                </div>
                                <p className="text-[0.55rem] md:text-[0.6rem] font-bold uppercase tracking-[0.2em] text-sage">{stats[1].label}</p>
                            </motion.div>

                            {/* Box 3 - Bottom Right */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 1 }}
                                className="absolute bottom-[8%] right-[8%] md:bottom-[15%] md:right-[15%] bg-cream/20 backdrop-blur-xl border border-cream/50 p-4 md:p-6 shadow-[0_8px_32px_rgba(97,109,107,0.15)] rounded-2xl w-[140px] md:w-auto md:max-w-[180px]"
                            >
                                <div className="font-serif text-[1.45rem] md:text-[1.75rem] font-black text-text mb-1 leading-tight text-center px-2">
                                    {stats[2].displayValue}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
