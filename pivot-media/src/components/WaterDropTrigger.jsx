import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

/**
 * WaterDropTrigger Component
 * Detects scroll threshold and triggers a visual drop animation.
 */
export default function WaterDropTrigger() {
    const { scrollYProgress } = useScroll();
    const [hasDropped, setHasDropped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [splash, setSplash] = useState(false);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            // Trigger as we approach the Reel section (approx 68% of scroll)
            if (latest > 0.68 && !hasDropped && !isAnimating) {
                triggerDrop();
            }
            if (latest < 0.5) {
                setHasDropped(false);
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress, hasDropped, isAnimating]);

    const triggerDrop = () => {
        setIsAnimating(true);
        setHasDropped(true);

        // Falling duration: 1s
        setTimeout(() => {
            setSplash(true);
            const event = new CustomEvent('water-drop', {
                detail: { x: window.innerWidth / 2, y: 150 }
            });
            window.dispatchEvent(event);

            setTimeout(() => {
                setSplash(false);
                setIsAnimating(false);
            }, 800);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 pointer-events-none z-[100]">
            <AnimatePresence>
                {isAnimating && !splash && (
                    <motion.div
                        initial={{ y: -100, x: "50%", opacity: 0, scale: 0.2 }}
                        animate={{
                            y: "50vh",
                            opacity: [0, 1, 1],
                            scale: [0.2, 1, 0.8],
                        }}
                        transition={{
                            duration: 1,
                            ease: [0.34, 1.56, 0.64, 1], // Bouncy entry then fall
                        }}
                        className="absolute top-0 left-0 w-4 h-10 bg-gradient-to-b from-sage to-sage/60 rounded-full blur-[0.5px]"
                        style={{
                            translateX: "-50%",
                            boxShadow: "0 0 15px var(--color-shadow-color)",
                            borderRadius: "50% 50% 50% 50% / 80% 80% 20% 20%" // Pointy top drop
                        }}
                    >
                        <div className="absolute top-2 left-1 w-1 h-3 bg-cream/60 rounded-full opacity-40" />
                    </motion.div>
                )}

                {splash && (
                    <motion.div
                        initial={{ scale: 0, opacity: 1, x: "50%", y: "50vh" }}
                        animate={{ scale: 4, opacity: 0 }}
                        className="absolute w-20 h-20 border-2 border-sage rounded-full"
                        style={{ translateX: "-50%", translateY: "-50%" }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
