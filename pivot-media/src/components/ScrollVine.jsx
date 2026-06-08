import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ScrollVine() {
    const { scrollYProgress } = useScroll();

    // Smooth the scroll progress for a natural feel
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Path drawing for the vine
    const pathLength = smoothProgress;

    // Opacity based on scroll (hide at very top)
    const opacity = useTransform(smoothProgress, [0, 0.05], [0, 0.6]);

    return (
        <div className="fixed right-4 md:right-8 top-1/4 bottom-1/4 w-8 z-50 pointer-events-none hidden sm:block">
            <svg
                viewBox="0 0 40 600"
                className="h-full w-full overflow-visible"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="scrollVineGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-sage)" />
                        <stop offset="50%" stopColor="var(--color-sage)" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="var(--color-sage)" />
                    </linearGradient>
                </defs>

                {/* Main Vine Path */}
                <motion.path
                    d="M20 0 Q30 150, 10 300 Q30 450, 20 600"
                    fill="none"
                    stroke="url(#scrollVineGrad)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{ pathLength, opacity }}
                />

                {/* Mini Monstera Leaves along the path */}
                {[0.1, 0.3, 0.5, 0.7, 0.9].map((pos, i) => (
                    <LeafNode
                        key={i}
                        progress={smoothProgress}
                        triggerPos={pos}
                        side={i % 2 === 0 ? 'right' : 'left'}
                    />
                ))}
            </svg>
        </div>
    );
}

const LeafNode = ({ progress, triggerPos, side }) => {
    // Scales up when progress passes triggerPos
    const scale = useTransform(progress, [triggerPos - 0.05, triggerPos], [0, 1]);
    const opacity = useTransform(progress, [triggerPos - 0.05, triggerPos], [0, 0.8]);

    // Position on the path (simplified)
    const y = triggerPos * 600;
    const x = side === 'right' ? 25 : 15;
    const rotation = side === 'right' ? 45 : -45;

    return (
        <motion.g
            style={{
                scale,
                opacity,
                transformOrigin: `${x}px ${y}px`,
                x: 0,
                y: 0
            }}
        >
            <path
                d="M0,0 C5,-5 10,0 10,5 C5,10 0,5 0,0"
                fill="var(--color-sage)"
                transform={`translate(${x},${y}) rotate(${rotation})`}
            />
        </motion.g>
    );
};
