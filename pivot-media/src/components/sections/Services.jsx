import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import RevealText from '../RevealText';
import NetworkParticles from '../NetworkParticles';

const ScrambleText = ({ text }) => {
    // ... (existing ScrambleText logic)
};

const ServiceCard = ({ num, title, desc, tag }) => {
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
            className="group relative bg-transparent border-r border-b border-cream/10 text-cream p-8 md:p-14 overflow-hidden min-h-[320px] md:min-h-[440px] flex flex-col justify-between hover:bg-white/[0.02] transition-colors duration-500"
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

            <div className="absolute inset-0 bg-cream/5 origin-top scale-y-0 transition-transform duration-1000 cubic-bezier(0.16, 1, 0.3, 1) z-0 group-hover:scale-y-100" />

            {/* Content */}
            <div className="relative z-20">
                <div className="flex items-center justify-between mb-10 md:mb-12">
                    <div className="flex items-center gap-4 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-[0.6rem] font-black tracking-[0.3em] uppercase">{num}</span>
                        <div className="h-px w-6 bg-cream/40" />
                    </div>
                    {tag && (
                        <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase px-3 py-1 border border-cream/10 text-cream/40 group-hover:border-cream/60 group-hover:text-cream transition-all duration-500 rounded-full">
                            {tag}
                        </span>
                    )}
                </div>

                <h3 className="font-serif text-3xl md:text-4xl font-black leading-[1.1] mb-8 text-cream">
                    {title}
                </h3>

                <p className="text-[1rem] leading-[1.7] opacity-50 group-hover:opacity-80 transition-opacity duration-500 max-w-[320px]">
                    {desc}
                </p>
            </div>


        </motion.div>
    );
};

export default function Services() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px 0px" });

    const services = [
        {
            num: '01',
            title: 'Brand Identity',
            tag: 'Strategy',
            desc: 'Crafting visual brand foundations. Positioning, naming, logo systems, and the verbal identity that makes your brand unmistakable.',
            imageAccent: '/assets/leaf_accent.png'
        },
        {
            num: '02',
            title: 'Content & SEO',
            tag: 'Search',
            desc: 'Data-driven content and search optimisation. Stories search engines love and audiences remember, built to compound over time.',
            imageAccent: '/assets/leaf_accent2.jpg'
        },
        {
            num: '03',
            title: 'Paid Ads',
            tag: 'PPC · ROAS',
            desc: 'Google & Meta PPC for targeted performance. Precision retargeting, Performance Max campaigns, and ad creative engineered for maximum return.',
            imageAccent: '/assets/leaf_pattern.png'
        },
        {
            num: '04',
            title: 'Social & Design',
            tag: 'Creative',
            desc: 'Organic growth, community systems, and high-impact graphic design. We build loyal audiences through stunning visuals, consistent strategy, and culture-driven content.',
            imageAccent: '/assets/leaf_social.png'
        },
        {
            num: '05',
            title: 'Web & UX',
            tag: 'Digital',
            desc: 'Custom sites with CRO focus. Designed to feel premium, built to convert, every pixel in service of your business goals.',
            imageAccent: '/assets/leaf_accent5.jpg'
        },
        {
            num: '06',
            title: 'Visual Production',
            tag: 'AI-Powered',
            desc: 'AI photo editing and product shoots. Background removal, ghost mannequin, multi-angle product photography, and lifestyle setups ready for ads and catalogs.',
            imageAccent: '/assets/leaf_accent6.jpg'
        },
        {
            num: '07',
            title: 'Analytics',
            tag: 'Intelligence',
            desc: 'Insights and reporting dashboards. Turn raw data into clear decisions with attribution models, performance tracking, and real-time reporting.',
            imageAccent: '/assets/leaf_palm_analytics.jpg'
        },
        {
            num: '08',
            title: 'AI Consulting',
            tag: 'Future-Ready',
            desc: 'Strategy, automation, and implementation. We help businesses adopt AI tools intelligently, cutting costs, scaling output, and staying ahead of the curve.',
            imageAccent: '/assets/leaf_monstera_white.png'
        },
        {
            num: '09',
            title: 'Email Marketing',
            tag: '42× ROI',
            desc: 'Full-funnel email ecosystems, welcome flows, abandoned cart recovery, re-engagement, and VIP sequences, built in Mailchimp or Klaviyo. High-ROI automation that keeps your audience engaged and your revenue growing on autopilot.',
            imageAccent: '/assets/leaf_monstera_email.png'
        },
    ];

    return (
        <section id="services" aria-label="Our Digital Marketing Services" className="py-[40px] md:py-[80px] px-6 md:px-16 overflow-hidden relative bg-sage text-cream">
            <NetworkParticles />
            <motion.div
                ref={containerRef}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                className="relative z-10 mb-24"
            >
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center gap-4 mb-8"
                >
                    <span className="w-10 h-px bg-cream/40" />
                    <p className="text-[0.68rem] font-bold tracking-[0.25em] uppercase text-cream/60">What We Do</p>
                </motion.div>

                <h2 className="font-serif text-[clamp(2.8rem,6vw,5.5rem)] font-black text-cream leading-[1.1] tracking-[-0.04em] pb-6 -mb-6">
                    <RevealText>Services that</RevealText><br />
                    <span className="text-cream italic font-normal">
                        <RevealText delay={0.2}>catalyze growth.</RevealText>
                    </span>
                </h2>
            </motion.div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-cream/10">
                {services.map((service, i) => (
                    <ServiceCard key={i} {...service} />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="relative z-10 mt-16 text-center"
            >
                <p className="text-[0.8rem] text-cream opacity-20 uppercase tracking-[0.3em]">Full Capabilities on Request</p>
            </motion.div>
        </section>
    );
}
