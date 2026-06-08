import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { cn } from '../../utils/cn';
import RevealText from '../RevealText';
import Magnetic from '../Magnetic';

const ProjectModal = ({ project, isOpen, onClose }) => {
    if (!project) return null;

    return (
        <div
            className={cn(
                "fixed inset-0 bg-sage/95 backdrop-blur-md z-[9900] flex items-center justify-center p-4 md:p-10 transition-all duration-500",
                isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none delay-200"
            )}
            onClick={onClose}
        >
            <div
                className={cn(
                    "bg-cream max-w-[900px] w-full max-h-[90vh] overflow-y-auto p-8 md:p-20 relative transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)]",
                    isOpen ? "translate-y-0 scale-100 opacity-100" : "translate-y-24 scale-95 opacity-0"
                )}
                onClick={e => e.stopPropagation()}
                style={{ borderRadius: '2px' }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 md:top-10 md:right-10 w-14 h-14 border border-sage/10 rounded-full text-sage cursor-none text-[1.2rem] flex items-center justify-center hover:bg-sage hover:text-cream transition-colors duration-300 z-10 group"
                    data-cursor="Close"
                >
                    <span className="group-hover:rotate-90 transition-transform duration-500">✕</span>
                </button>

                <p className="text-[0.65rem] tracking-[0.25em] uppercase text-sage mb-6 font-bold">{project.tag}</p>

                <h2 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] text-sage tracking-[-0.03em] mb-12 leading-[0.9] font-black max-w-[600px]">
                    {project.title}
                </h2>

                <div className="flex flex-col gap-14 items-start border-t border-sage/10 pt-12">
                    <p className="text-[1.15rem] leading-[1.8] text-sage/80 max-w-[640px] font-medium">
                        {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-x-20 gap-y-10 w-full">
                        {project.stats.map((stat, i) => (
                            <div key={i} className="flex flex-col">
                                <span className="font-serif text-[3.5rem] md:text-[4.5rem] text-sage font-black leading-none tracking-[-0.04em] mb-2">{stat.n}</span>
                                <span className="text-[0.7rem] text-sage/50 uppercase tracking-[0.15em] font-bold">{stat.l}</span>
                            </div>
                        ))}
                    </div>

                    <button className="mt-8 px-10 py-5 bg-sage text-cream uppercase tracking-[0.15em] text-[0.7rem] font-bold hover:bg-sage/90 transition-colors duration-300 w-fit cursor-none rounded-full" data-cursor="View Case">
                        Read Case Study →
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProjectCard = ({ p, i, openProject, isDragging }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
    const glareOpacity = useTransform(mouseXSpring, [-0.5, 0.5], [0.1, 0.35]);

    const handleMouseMove = (e) => {
        if (isDragging || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onClick={() => { if (!isDragging) openProject(p) }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="flex-shrink-0 w-[85vw] md:w-[600px] h-[600px] md:h-[720px] snap-start relative overflow-hidden rounded-[2px] group cursor-none"
            data-cursor="Open"
        >
            <div
                className={cn("absolute inset-0 bg-gradient-to-br transition-all duration-1000 ease-out group-hover:scale-110", p.bg)}
                style={{ transform: "translateZ(-50px)" }}
            />

            {/* Dynamic Specular Glare Overlay */}
            <motion.div
                className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-500"
                style={{
                    background: useMotionTemplate`radial-gradient(circle 600px at ${glareX} ${glareY}, rgba(246, 244, 241, 0.1), transparent 80%)`,
                    opacity: glareOpacity,
                    transform: "translateZ(1px)"
                }}
            />

            {/* Content overlay */}
            <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-end bg-gradient-to-t from-sage via-sage/40 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100">
                <div style={{ transform: "translateZ(80px)" }} className="transition-transform duration-700">
                    <p className="text-[0.65rem] tracking-[0.25em] uppercase text-cream/60 mb-4 font-bold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
                        {p.tag}
                    </p>

                    {/* Text Title */}
                    <h3 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-black text-cream leading-[0.9] mb-8 relative">
                        {p.title}
                    </h3>

                    <div className="flex items-center gap-6 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200">
                        <div className="w-12 h-12 rounded-full border border-cream/20 flex items-center justify-center text-cream text-xl bg-cream/5 backdrop-blur-sm group-hover:bg-sage group-hover:text-cream transition-colors duration-300">
                            +
                        </div>
                    </div>
                </div>
            </div>

            {/* Static Bottom Bar (Disappears on hover) */}
            <div className="absolute bottom-10 left-10 md:left-14 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
                <p className="font-serif text-[2rem] md:text-[2.5rem] text-cream font-black tracking-[-0.02em]">{p.cta}</p>
            </div>
        </motion.div>
    );
};

export default function Works() {
    const containerRef = useRef(null);
    const scrollRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px 0px" });

    const [modalOpen, setModalOpen] = useState(false);
    const [activeProject, setActiveProject] = useState(null);

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const projects = [
        { bg: 'from-sage/40 to-sage', tag: 'Brand Identity · 2024', title: 'Verdant Studio', cta: 'Verdant', desc: 'Verdant Studio came to us as a scrappy creative collective with no visual identity. We spent 6 weeks in deep discovery, then built a full brand system rooted in their philosophy of slow, intentional creativity. Inbound leads doubled within 3 months and they landed two enterprise clients.', stats: [{ n: '2×', l: 'Lead Growth' }, { n: '6wk', l: 'Turnaround' }] },
        { bg: 'from-sage to-sage/60', tag: 'Digital Campaign · 2024', title: 'Aura Wellness', cta: 'Aura', desc: 'Aura needed to break into a saturated wellness market without a huge budget. We crafted a content-first strategy built around authentic storytelling and precision-targeted paid media. The campaign generated 400% more organic reach at 60% of the cost of their previous agency.', stats: [{ n: '400%', l: 'Organic Reach' }, { n: '60%', l: 'Cost Reduction' }, { n: '18K', l: 'New Followers' }] },
        { bg: 'from-sage/40 to-sage', tag: 'Growth Marketing · 2023', title: 'Loom & Leaf', cta: 'Loom & Leaf', desc: 'A sustainable textiles brand with a great product and invisible presence. We launched a performance marketing program across Meta, Google, and TikTok paired with a content overhaul, driving 11x ROAS within 90 days.', stats: [{ n: '11×', l: 'ROAS' }, { n: '90', l: 'Days to Impact' }, { n: '340%', l: 'Revenue Growth' }] },
        { bg: 'from-sage to-sage/40', tag: 'Brand + Performance · 2023', title: 'Bloom House', cta: 'Bloom', desc: 'A boutique hospitality brand expanding to three new cities. We built a unified brand architecture and a launch campaign for each market that drove pre-bookings 4 months before opening. All three locations opened at capacity.', stats: [{ n: '3', l: 'Cities Launched' }, { n: '100%', l: 'Opening Capacity' }, { n: '4mo', l: 'Advance Booking' }] },
        { bg: 'from-sage/40 to-sage', tag: 'SEO & Content · 2022', title: 'Canopy Labs', cta: 'Canopy Labs', desc: 'A B2B SaaS with strong tech but weak discoverability. We rebuilt their entire content architecture targeting high-intent search clusters. Organic traffic grew 6× in 12 months and the content hub became their #1 source of qualified pipeline.', stats: [{ n: '6×', l: 'Organic Traffic' }, { n: '#1', l: 'Lead Source' }, { n: '12mo', l: 'Timeline' }] },
    ];

    /* Mouse Drag Handlers for horizontal scroll */
    const onMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };
    const onMouseUp = () => setIsDragging(false);
    const onMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.6;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const openProject = (project) => {
        setActiveProject(project);
        setModalOpen(true);
    };

    const closeProject = () => {
        setModalOpen(false);
        setTimeout(() => setActiveProject(null), 500);
    };

    return (
        <section id="works" className="bg-cream py-[80px] md:py-[160px] overflow-hidden relative z-0">
            <motion.div
                ref={containerRef}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                className="flex flex-col md:flex-row justify-between items-start md:items-end px-6 md:px-16 mb-20 gap-10"
            >
                <div>
                    <motion.div
                        variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}
                        className="flex items-center gap-4 mb-8"
                    >
                        <span className="w-10 h-px bg-sage" />
                        <p className="text-[0.68rem] font-bold tracking-[0.25em] uppercase text-sage">Selected Work</p>
                    </motion.div>

                    <h2 className="font-serif text-[clamp(2.5rem,7vw,6.5rem)] text-sage leading-[1.1] tracking-[-0.04em] font-black pb-8 -mb-8">
                        <RevealText>Brands we've</RevealText><br />
                        <span className="italic text-sage font-normal">
                            <RevealText delay={0.2}>elevated.</RevealText>
                        </span>
                    </h2>
                </div>

                {/* ARCHIVE hidden for now
                <motion.div
                    variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } } }}
                >
                    <Magnetic strength={0.25}>
                        <a
                            href="#"
                            className="group flex flex-col items-center gap-2 no-underline p-4"
                            data-cursor="Archive"
                        >
                            <div className="w-16 h-16 rounded-full border border-cream/20 flex items-center justify-center text-cream group-hover:border-sage group-hover:text-sage transition-all duration-300">
                                <span className="text-xl rotate-45 group-hover:rotate-0 transition-transform duration-300">↗</span>
                            </div>
                            <span className="text-[0.65rem] tracking-[0.2em] uppercase font-bold text-cream/50 group-hover:text-cream transition-colors duration-300">Archive</span>
                        </a>
                    </Magnetic>
                </motion.div>
                */}
            </motion.div>

            {/* Horizontal Scroll Area */}
            <div
                ref={scrollRef}
                className={cn(
                    "flex gap-10 px-6 md:px-16 w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-12 perspective-[2000px]",
                    isDragging ? "cursor-grabbing" : "cursor-grab"
                )}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onMouseMove={onMouseMove}
            >
                <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>

                {projects.map((p, i) => (
                    <ProjectCard
                        key={i}
                        p={p}
                        i={i}
                        openProject={openProject}
                        isDragging={isDragging}
                    />
                ))}
            </div>

            <div className="flex items-center gap-4 pt-8 px-6 md:px-16 text-sage text-[0.65rem] font-bold tracking-[0.2em] uppercase opacity-40 pointer-events-none">
                <span className="w-10 h-px bg-sage/40" />
                Drag to explore
            </div>

            <ProjectModal project={activeProject} isOpen={modalOpen} onClose={closeProject} />
        </section>
    );
}
