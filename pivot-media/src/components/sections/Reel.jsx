import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import RevealText from '../RevealText';
import Magnetic from '../Magnetic';
import FluidAquarium from '../FluidAquarium';

export default function Reel() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-sage z-10 group">
            {/* Immersive Background Transition - Now Fluid Aquarium */}
            <div className="absolute inset-0 z-0">
                <FluidAquarium />
            </div>

            {/* Content */}
            <div className="relative z-20 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    className="mb-14"
                >
                    <h2 className="font-serif text-[clamp(2rem,7vw,7rem)] text-cream font-black tracking-[-0.05em] leading-[1.1] pb-6 -mb-6">
                        <RevealText>We make brands</RevealText><br />
                        <span className="italic text-cream/70 font-normal">
                            <RevealText delay={0.2}>impossible to ignore.</RevealText>
                        </span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <Magnetic strength={0.4}>
                        <a
                            href="#works"
                            className="inline-flex flex-col items-center gap-6 group no-underline p-4"
                            data-cursor="Play Reel"
                        >
                            <div className="relative flex items-center justify-center">
                                {/* Outer Pulse Rings */}
                                <div className="absolute inset-0 rounded-full bg-cream/10 scale-100 group-hover:scale-150 group-hover:opacity-0 transition-all duration-1000" />
                                <div className="absolute inset-0 rounded-full bg-cream/5 scale-100 group-hover:scale-125 group-hover:opacity-0 transition-all duration-700 delay-100" />

                                {/* Play Button */}
                                <div className="w-24 h-24 rounded-full border border-cream/20 bg-cream/10 backdrop-blur-xl flex items-center justify-center text-cream text-[1.4rem] group-hover:scale-110 group-hover:bg-cream/20 transition-all duration-500 shadow-[0_0_40px_rgba(246, 244, 241, 0.1)]">
                                    <span className="ml-1.5 translate-y-[-1px]">▶</span>
                                </div>
                            </div>

                            <div className="overflow-hidden">
                                <span className="block text-[0.7rem] font-black tracking-[0.4em] uppercase text-cream group-hover:translate-x-2 transition-transform duration-500">
                                    Showreel 2024
                                </span>
                            </div>
                        </a>
                    </Magnetic>
                </motion.div>
            </div>

            {/* Glass Border Overlay */}
            <div className="absolute inset-0 pointer-events-none border-[30px] border-sage/20 backdrop-blur-[2px] z-30" />
        </section>
    );
}
