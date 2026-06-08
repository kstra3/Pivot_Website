import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '../../utils/cn';
import RevealText from '../RevealText';

const TimelineItem = ({ step, title, desc, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-40% 0px", once: false });

    return (
        <div ref={ref} className={cn("relative pl-12 md:pl-20 pb-20 transition-all duration-700", isInView ? "opacity-100 translate-x-0" : "opacity-30 -translate-x-4")}>
            {/* Pulsing Dot */}
            <div className={cn(
                "absolute -left-[5px] md:-left-[9px] top-2 w-[12px] md:w-[20px] h-[12px] md:h-[20px] rounded-full transition-all duration-700 z-10",
                isInView ? "bg-sage shadow-[0_0_20px_rgba(97, 109, 107, 0.4)] scale-110" : "bg-sage/20 scale-75"
            )}>
                {isInView && (
                    <div className="absolute inset-0 bg-sage/40 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                )}
            </div>

            <p className={cn(
                "text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-4 transition-colors duration-500",
                isInView ? "text-sage" : "text-sage/60"
            )}>
                {step}
            </p>
            <h3 className="font-serif text-[1.8rem] md:text-[2.2rem] font-black text-text mb-4 leading-[1.1] tracking-[-0.02em]">{title}</h3>
            <p className="text-[1.05rem] leading-[1.8] opacity-60 max-w-[540px] text-text">{desc}</p>
        </div>
    );
};

export default function Process() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    // Expand the line fill
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="process" aria-label="Our Growth Process" className="bg-bg py-[40px] md:py-[80px] px-6 md:px-16 overflow-hidden relative">

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-sage) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

            <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

                {/* Left Sticky Header */}
                <div className="lg:col-span-5 relative">
                    <div className="sticky top-40">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex items-center gap-4 mb-8"
                        >
                            <span className="w-10 h-px bg-sage" />
                            <p className="text-[0.68rem] font-bold tracking-[0.25em] uppercase text-sage">How We Work</p>
                        </motion.div>

                        <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-[1.1] text-text tracking-[-0.04em] mb-8 pb-6 -mb-6">
                            <RevealText>Our</RevealText><br />
                            <span className="italic text-sage font-normal">
                                <RevealText delay={0.2}>growth</RevealText>
                            </span><br />
                            <RevealText delay={0.4}>process.</RevealText>
                        </h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="text-[1.1rem] leading-[1.7] opacity-60 max-w-[400px]"
                        >
                            We don't guess. We analyze, strategize, and execute with precision. Every phase is designed to compound your digital presence.
                        </motion.p>
                    </div>
                </div>

                {/* Right Timeline */}
                <div ref={containerRef} className="lg:col-span-7 relative lg:pl-20 py-10">
                    <div className="relative">
                        {/* Background line */}
                        <div className="absolute left-0 top-2 bottom-0 w-[2px] bg-sage/10 overflow-hidden rounded-full">
                            {/* Fill line */}
                            <motion.div
                                className="absolute top-0 left-0 w-full bg-sage origin-top"
                                style={{ height: lineHeight }}
                            />
                        </div>

                        <TimelineItem
                            index={0}
                            step="Phase 01"
                            title="Discovery & Rooting"
                            desc="We immerse ourselves in your brand, audience, and competitive landscape. Every campaign grows from deep soil, understanding your market before a single asset is created."
                        />
                        <TimelineItem
                            index={1}
                            step="Phase 02"
                            title="Strategy & Seedling"
                            desc="We craft a bespoke growth strategy, channel selection, positioning, messaging hierarchy, and KPIs that actually mean something. This is the blueprint your brand grows from."
                        />
                        <TimelineItem
                            index={2}
                            step="Phase 03"
                            title="Creative Cultivation"
                            desc="Campaigns, content, and visuals crafted with intention. Every piece is both beautiful and purposeful, designed to convert as well as captivate your exact audience."
                        />
                        <TimelineItem
                            index={3}
                            step="Phase 04"
                            title="Launch & Flourish"
                            desc="We launch, measure, and iterate relentlessly. Data flows back into creative, and creative back into strategy. Your brand doesn't just launch, it actively blooms and scales."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
