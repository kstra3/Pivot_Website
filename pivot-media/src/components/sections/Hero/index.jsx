import { motion } from 'framer-motion';
import Button from '../../Button';
import ParticleCanvas from './ParticleCanvas';
import NetworkParticles from '../../NetworkParticles';
import Typewriter from './Typewriter';
import RevealText from '../../RevealText';
import PivotText from '../../PivotText';

export default function Hero() {
    return (
        <section id="hero" aria-label="Hero - Pivot Media Digital Marketing Agency" className="min-h-screen relative flex items-center pt-[120px] md:pt-[150px] px-6 md:px-16 pb-[80px] md:pb-[100px] overflow-hidden bg-bg">
            <ParticleCanvas />
            <NetworkParticles />

            {/* Premium Background Blurs */}
            <div className="absolute top-[20%] right-[10%] w-[35vw] h-[35vw] bg-sage/20 rounded-full blur-[160px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-[10%] left-[5%] w-[25vw] h-[25vw] bg-sage/10 rounded-full blur-[140px] pointer-events-none" />

            {/* Hero Content */}
            <div className="relative z-10 max-w-[940px] pt-12 md:pt-0">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex items-center gap-4 mb-10"
                >
                    <span className="w-10 h-[1.5px] bg-sage" />
                    <p className="text-[0.68rem] font-bold tracking-[0.25em] uppercase text-sage">
                        Modern Marketing for Brands Ready to Move
                    </p>
                </motion.div>

                <h1 className="font-serif text-[clamp(2.8rem,10vw,8.5rem)] font-black leading-[1.05] text-text tracking-[-0.03em] text-balance mb-10 md:mb-12">
                    <div className="overflow-hidden mb-2 pb-10 -mb-10">
                        <RevealText delay={0.3}>We <PivotText>pivot</PivotText></RevealText>
                    </div>
                    <div className="overflow-hidden mb-2 pb-10 -mb-10">
                        <RevealText delay={0.38}>brands</RevealText>
                    </div>
                    <div className="overflow-hidden pb-10 -mb-10">
                        <span className="text-sage italic font-normal inline-block">
                            <Typewriter words={['to new heights.', 'with purpose.', 'beyond limits.', 'into the future.']} />
                        </span>
                    </div>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-[1.05rem] md:text-[1.15rem] leading-[1.7] text-text/60 max-w-[520px] mt-4 mb-10 text-balance"
                >
                    Data-driven digital marketing that transforms ambitious brands into market leaders. Strategy, creative, and technology - unified.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                >
                    <Button href="#contact" data-cursor="Let's go">Get in Touch</Button>
                </motion.div>
            </div>

            {/* Refined Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                className="absolute bottom-12 right-6 md:right-16 flex flex-col items-center gap-4"
            >
                <div className="relative w-px h-24 bg-sage/20 overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1/2 bg-sage origin-top"
                        animate={{ y: ['-100%', '200%'] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>
                <span className="text-[0.55rem] font-bold tracking-[0.3em] uppercase opacity-40 mix-blend-difference" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
            </motion.div>

            <style>{`
                @keyframes scrollPulse {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(200%); }
                }
            `}</style>
        </section>
    );
}
