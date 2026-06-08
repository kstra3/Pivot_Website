import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import FluidAquarium from '../FluidAquarium';

const AnimatedCounter = ({ from = 0, to, prefix = "", suffix = "", duration = 2.2 }) => {
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

            // Custom cubic-bezier like easing for more premium feel
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeProgress * (to - from) + from));

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(step);
            }
        };

        animationFrameId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isInView, from, to, duration]);

    return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const StatCard = ({ stat, i }) => {
    const cardRef = useRef(null);
    const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');
    const [glowPos, setGlowPos] = useState({ x: 0, y: 0, opacity: 0 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        setTransform(`perspective(1000px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale3d(1.01, 1.01, 1.01)`);
        setGlowPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            opacity: 1
        });
    };

    const handleMouseLeave = () => {
        setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
        setGlowPos({ ...glowPos, opacity: 0 });
    };

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, scale: 0.98 },
                show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative py-12 px-6 md:py-16 md:px-10 border-r border-b border-cream/5 flex flex-col items-center text-center overflow-hidden min-h-[230px] md:min-h-[250px]"
            style={{ transform, transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)' }}
        >
            {/* High-End Glow Effect */}
            <div
                className="absolute w-[400px] h-[400px] rounded-full pointer-events-none z-10 blur-[100px] mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                    background: 'radial-gradient(circle, rgba(246, 244, 241, 0.15) 0%, transparent 60%)',
                    transform: 'translate(-50%, -50%)',
                    left: glowPos.x,
                    top: glowPos.y,
                }}
            />

            {/* Background Sweep on Hover */}
            <div className="absolute inset-0 bg-cream/5 origin-top scale-y-0 transition-transform duration-1000 cubic-bezier(0.16, 1, 0.3, 1) z-0 group-hover:scale-y-100" />

            <div className="relative z-10 flex flex-col items-center">
                <div className="font-serif text-[clamp(3.5rem,6vw,5.5rem)] font-black text-cream leading-none mb-6 tracking-tight">
                    <AnimatedCounter from={stat.target} to={stat.target} prefix={stat.prefix} suffix={stat.suffix} />
                </div>

                <div className="flex items-center gap-3">
                    <span className="w-4 h-[1px] bg-cream/20 group-hover:w-8 transition-all duration-500" />
                    <p className="text-[0.65rem] md:text-[0.72rem] text-cream/60 font-bold uppercase tracking-[0.25em] transition-colors duration-500 group-hover:text-cream">
                        {stat.label}
                    </p>
                    <span className="w-4 h-[1px] bg-cream/20 group-hover:w-8 transition-all duration-500" />
                </div>

                <div className="mt-6 text-[0.85rem] text-cream/40 max-w-[200px] leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    {stat.subtext}
                </div>
            </div>
        </motion.div>
    );
};

export default function Numbers() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px 0px" });

    const stats = [
        { target: 18, suffix: '+', label: 'Happy Partners', subtext: 'Global Enterprises.' },
        { target: 8, suffix: 'x', label: 'Avg ROAS', subtext: 'Average return on ad spend for our clients.' },
        { target: 30, prefix: '-', suffix: '%', label: 'Cost Per Acquisition', subtext: 'Decrease in average cost per acquisition.' },
        { target: 97, suffix: '%', label: 'Retention Rate', subtext: 'Clients who choose to stay and grow with us.' },
    ];

    return (
        <section aria-label="Our Track Record in Numbers" className="bg-sage py-[40px] md:py-[72px] px-6 md:px-16 overflow-hidden z-10 relative">
            {/* Fluid cursor-style background effect */}
            <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
                <FluidAquarium />
            </div>

            {/* Background Texture Overlay */}
            <div className="absolute inset-0 z-[1] opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-cream) 1px, transparent 0)', backgroundSize: '60px 60px' }} />

            <motion.div
                ref={containerRef}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                className="max-w-[1400px] mx-auto relative z-10"
            >
                <div className="flex flex-col items-center text-center mb-16 md:mb-20">
                    <motion.div
                        variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}
                        className="flex items-center gap-4 mb-8"
                    >
                        <span className="w-10 h-px bg-cream/40" />
                        <p className="text-[0.68rem] font-bold tracking-[0.25em] uppercase text-cream/60">Track Record</p>
                        <span className="w-10 h-px bg-cream/40" />
                    </motion.div>

                    <h2 className="font-serif text-[clamp(2.8rem,6vw,5rem)] font-black text-cream leading-[1.1] tracking-[-0.04em] pb-6 -mb-6">
                        Results that <span className="text-cream italic font-normal">matter.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-t border-l border-cream/10">
                    {stats.map((stat, i) => (
                        <StatCard key={i} stat={stat} i={i} />
                    ))}
                </div>

                {/* Bottom decorative line */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                    className="h-px bg-gradient-to-r from-transparent via-cream/30 to-transparent mt-24"
                />
            </motion.div>
        </section>
    );
}
