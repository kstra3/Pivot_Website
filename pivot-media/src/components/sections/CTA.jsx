import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Button from '../Button';
import WavyText from '../WavyText';

export default function CTA() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px 0px" });

    const fadeUpVars = {
        hidden: { opacity: 0, y: 36 },
        show: { opacity: 1, y: 0, transition: { duration: 0.88, ease: [0.25, 0.46, 0.45, 0.94] } }
    };

    return (
        <section className="py-[40px] md:py-[80px] px-6 md:px-16 bg-bg text-center relative overflow-hidden">
            <motion.div
                ref={containerRef}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                variants={{ show: { transition: { staggerChildren: 0.15 } } }}
                className="max-w-[1000px] mx-auto"
            >
                <h2 className="font-serif text-[clamp(2.8rem,7vw,7rem)] font-bold text-text leading-[1.1] tracking-[-0.04em] mb-9 pb-8 -mb-8">
                    <WavyText text="Ready to" /><br />
                    <em className="italic text-sage font-normal px-2"><WavyText text="pivot your brand?" delay={0.4} /></em>
                </h2>

                <motion.p
                    variants={fadeUpVars}
                    className="text-text/55 text-[1.05rem] mb-[52px]"
                >
                    Your brand deserves to be impossible to ignore.
                </motion.p>

                <motion.div variants={fadeUpVars} className="flex justify-center">
                    <Button href="#contact" data-cursor="Let's go">Contact Us</Button>
                </motion.div>
            </motion.div>
        </section>
    );
}
