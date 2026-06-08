import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import RevealText from '../RevealText';
import { Mail, Phone, Copy, Check, Linkedin, Instagram, ExternalLink } from 'lucide-react';

export default function Contact() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px 0px" });
    const [copiedId, setCopiedId] = useState(null);

    const fadeUpVars = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.88, ease: [0.25, 0.46, 0.45, 0.94] } }
    };

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <section id="contact" aria-label="Contact Pivot Media" className="bg-sage text-cream py-[40px] md:py-[80px] px-6 md:px-16 overflow-hidden relative">
            {/* Soft background glow */}
            <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] bg-sage/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <motion.div
                ref={containerRef}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                variants={{ show: { transition: { staggerChildren: 0.15 } } }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-14 md:gap-[120px] items-start max-w-[1400px] mx-auto relative z-10"
            >
                {/* Left Column */}
                <div>
                    <motion.div variants={fadeUpVars} className="flex items-center gap-4 mb-8">
                        <span className="w-10 h-px bg-cream/30" />
                        <p className="text-[0.68rem] font-bold tracking-[0.25em] uppercase text-cream/70">Start a Conversation</p>
                    </motion.div>
                    <h2 className="font-serif text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.15] font-black text-cream tracking-[-0.04em] mb-10 pb-6 -mb-6 overflow-hidden">
                        <RevealText>Let's build something</RevealText><br />
                        <span className="text-cream italic font-normal">
                            <RevealText delay={0.2}>remarkable.</RevealText>
                        </span>
                    </h2>

                    <div className="flex flex-col gap-10 mt-16 border-t border-cream/10 pt-10">
                        <motion.div variants={fadeUpVars} className="group cursor-none" data-cursor="Write Email">
                            <div className="flex items-center gap-3 mb-2">
                                <Mail className="w-4 h-4 text-cream/60" />
                                <p className="text-[0.68rem] font-bold tracking-[0.2em] uppercase text-cream/40">General Inquiries</p>
                            </div>
                            <a href="mailto:info@pivotmedia.gr" className="text-[1.8rem] font-serif text-cream hover:text-cream/70 transition-colors duration-300">info@pivotmedia.gr</a>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-8">
                            <motion.div variants={fadeUpVars} className="group cursor-none" data-cursor="Call">
                                <div className="flex items-center gap-3 mb-2">
                                    <Phone className="w-4 h-4 text-cream/60" />
                                    <p className="text-[0.68rem] font-bold tracking-[0.2em] uppercase text-cream/40">Call Us</p>
                                </div>
                                <a href="tel:+306947987770" className="text-[1.1rem] text-cream hover:text-cream/70 transition-all duration-300">+30 694 798 7770</a>
                            </motion.div>
                            <motion.div variants={fadeUpVars} className="group">
                                <p className="text-[0.68rem] font-bold tracking-[0.2em] uppercase text-cream/40 mb-2">Based In</p>
                                <p className="text-[1.1rem] text-cream opacity-80">Athens · New York</p>
                            </motion.div>
                        </div>

                        {/* Social Links */}
                        <motion.div variants={fadeUpVars} className="flex items-center gap-8 mt-4 pt-10 border-t border-cream/5">
                            <a href="#" aria-label="Connect with Pivot Media on LinkedIn" className="flex items-center gap-2 text-cream opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-none" data-cursor="LinkedIn">
                                <Linkedin className="w-5 h-5" />
                                <span className="text-[0.8rem] font-bold tracking-widest uppercase">LinkedIn</span>
                            </a>
                            <a href="https://www.instagram.com/pivotmedia.gr/" target="_blank" rel="noopener noreferrer" aria-label="Follow Pivot Media on Instagram" className="flex items-center gap-2 text-cream opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-none" data-cursor="Instagram">
                                <Instagram className="w-5 h-5" />
                                <span className="text-[0.8rem] font-bold tracking-widest uppercase">Instagram</span>
                            </a>
                        </motion.div>
                    </div>
                </div>

                {/* Right Contact Card */}
                <motion.div
                    variants={fadeUpVars}
                    className="flex flex-col p-10 md:p-14 border border-cream/5 bg-cream/[0.02] backdrop-blur-xl rounded-[2px] relative overflow-hidden group/card"
                >
                    {/* Animated background accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cream/10 blur-[80px] rounded-full group-hover/card:scale-150 transition-transform duration-1000" />

                    <h3 className="text-xl font-serif font-bold text-cream mb-10 pb-6 border-b border-cream/5 relative z-10">
                        Contact
                    </h3>

                    <div className="space-y-12 relative z-10">
                        {/* Email Row */}
                        <div className="group cursor-none" data-cursor="View Email">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-[0.68rem] font-bold tracking-[0.25em] uppercase text-cream/40">Email Address</p>
                                <button
                                    onClick={() => copyToClipboard('info@pivotmedia.gr', 'email')}
                                    className="p-2 text-cream/20 hover:text-cream transition-colors duration-300 relative"
                                    title="Copy to clipboard"
                                >
                                    <AnimatePresence mode="wait">
                                        {copiedId === 'email' ? (
                                            <motion.div
                                                key="check"
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0.5, opacity: 0 }}
                                            >
                                                <Check className="w-4 h-4" />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="copy"
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0.5, opacity: 0 }}
                                            >
                                                <Copy className="w-4 h-4" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </div>
                            <a
                                href="mailto:info@pivotmedia.gr"
                                className="text-[clamp(1.2rem,2.5vw,2.2rem)] font-serif text-cream hover:opacity-80 transition-all duration-500 block leading-tight tracking-tight underline-offset-[12px] hover:underline decoration-cream/30"
                            >
                                info@pivotmedia.gr
                            </a>
                        </div>

                        {/* Phone Row */}
                        <div className="group cursor-none" data-cursor="View Phone">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-[0.68rem] font-bold tracking-[0.25em] uppercase text-cream/40">Direct Line</p>
                                <button
                                    onClick={() => copyToClipboard('+306947987770', 'phone')}
                                    className="p-2 text-cream/20 hover:opacity-80 transition-colors duration-300"
                                    title="Copy to clipboard"
                                >
                                    <AnimatePresence mode="wait">
                                        {copiedId === 'phone' ? (
                                            <motion.div
                                                key="p-check"
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0.5, opacity: 0 }}
                                            >
                                                <Check className="w-4 h-4" />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="p-copy"
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0.5, opacity: 0 }}
                                            >
                                                <Copy className="w-4 h-4" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </div>
                            <a
                                href="tel:+306947987770"
                                className="text-[clamp(1.2rem,2.5vw,2.2rem)] font-serif text-cream hover:opacity-80 transition-all duration-500 block leading-tight tracking-tight underline-offset-[12px] hover:underline decoration-cream/30"
                            >
                                +30 694 798 7770
                            </a>
                        </div>
                    </div>

                    <div className="mt-16 flex flex-col gap-6 relative z-10">
                        <a
                            href="mailto:info@pivotmedia.gr"
                            className="bg-cream text-sage font-black text-[0.8rem] tracking-[0.2em] uppercase py-6 px-10 flex items-center justify-center gap-4 hover:bg-cream/90 transition-all duration-500 cursor-none rounded-full group/btn"
                            data-cursor="Submit"
                        >
                            Quick Send Email
                            <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                        </a>

                        <div className="flex items-center gap-3 pt-6 border-t border-cream/10">
                            <span className="w-2 h-2 bg-cream rounded-full animate-pulse" />
                            <p className="text-cream/60 text-[0.9rem] italic font-serif">Awaiting your next big idea for 2026</p>
                        </div>
                    </div>

                    {/* Subtle decorative element */}
                    <div className="absolute bottom-[-5%] right-[-5%] text-[10rem] font-serif text-cream/[0.02] select-none pointer-events-none italic">
                        P
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
