import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onLoadingComplete }) {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    const handleComplete = useCallback(() => {
        if (onLoadingComplete) onLoadingComplete();
    }, [onLoadingComplete]);

    useEffect(() => {
        let frame;
        let start = null;
        const totalDuration = 1800;

        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const rawProgress = Math.min(elapsed / totalDuration, 1);
            // Ease-out cubic
            const easedProgress = 1 - Math.pow(1 - rawProgress, 3);

            setProgress(Math.round(easedProgress * 100));

            if (rawProgress < 1) {
                frame = requestAnimationFrame(animate);
            } else {
                handleComplete(); // Reveal content beneath
                setTimeout(() => setLoading(false), 50); // Begin fade out seamlessly
            }
        };

        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, []);

    // Stabilized Path Data, ensuring M command is always present at index 0
    // Simplified to a single morph to avoid Framer Motion interpolation errors
    const morphVariants = {
        initial: { 
            d: "M50 50 Q50 50 50 50 Q50 50 50 50 Q50 50 50 50 Q50 50 50 50",
            scale: 0.8,
            opacity: 0
        },
        animate: { 
            d: "M50 90C35 85 15 70 8 50 4 35 15 15 35 10c8-2 20 4 25 10v-5c0-6 12-12 20-10 15 4 28 20 25 40-3 18-20 35-40 40z",
            scale: 1,
            opacity: 1,
            transition: { 
                d: { duration: 1.2, ease: [0.65, 0, 0.35, 1], delay: 0.2 },
                scale: { duration: 0.8, ease: "easeOut" },
                opacity: { duration: 0.4, delay: 0.1 }
            }
        }
    };

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: '-10%' }}
                    transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
                    style={{ backgroundColor: '#162118' }} // Original dark background
                    className="fixed inset-0 z-[9998] flex flex-col items-center justify-center pointer-events-none"
                >
                    <div className="relative flex flex-col items-center gap-[36px]">
                        {/* Original Plant Animation */}
                        <div className="relative flex flex-col items-center w-[60px]">
                            {/* Stem */}
                            <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: 70 }}
                                transition={{ duration: 1, ease: [0.77, 0, 0.175, 1], delay: 0.4 }}
                                className="w-[2px] bg-sage"
                            />
                            
                            {/* Leaves wrapper positioned relative to grow up from the stem */}
                            <div className="flex items-center justify-center h-[28px] relative w-[60px]">
                                {/* Left Leaf */}
                                <motion.div 
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay: 1.3 }}
                                    className="w-[28px] h-[18px] bg-green absolute right-[30px] origin-right"
                                    style={{ borderRadius: '50% 0 50% 0' }}
                                />
                                
                                {/* Right Leaf */}
                                <motion.div 
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay: 1.5 }}
                                    className="w-[28px] h-[18px] bg-sage absolute left-[30px] origin-left"
                                    style={{ borderRadius: '0 50% 0 50%' }}
                                />
                            </div>
                        </div>

                        {/* Title */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="font-serif text-[2.8rem] font-black tracking-[-0.03em] flex items-center gap-1"
                        >
                            <span className="text-[#f5f0e8]">Pivot</span>
                            <span className="text-[#7a9e6e] italic font-normal">Media</span>
                        </motion.div>

                        {/* Progress Bar Container */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.5 }}
                            className="relative mt-2 w-[180px] h-[1px] bg-white/10 overflow-hidden"
                        >
                            {/* Progress Fill */}
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-[#7a9e6e]"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
