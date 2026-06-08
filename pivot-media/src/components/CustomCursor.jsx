import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform, useVelocity, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

// Separate Particle component to handle its own hooks consistently
const TrailParticle = ({ mouseX, mouseY, index }) => {
    // Old lethargic movement config for the trail
    const px = useSpring(mouseX, { damping: 15, stiffness: 60 - index * 5, mass: 1 + index * 0.1 });
    const py = useSpring(mouseY, { damping: 15, stiffness: 60 - index * 5, mass: 1 + index * 0.1 });

    return (
        <motion.div
            className="absolute w-1.5 h-1.5 rounded-full bg-sage/20 mix-blend-multiply dark:mix-blend-screen overflow-hidden"
            style={{
                x: px,
                y: py,
                left: 0,
                top: 0,
                translateX: '-50%',
                translateY: '-50%',
            }}
        />
    );
};

export default function CustomCursor() {
    // 1. All hooks MUST be declared at the top, unconditionally
    const [isHovering, setIsHovering] = useState(false);
    const [hoverText, setHoverText] = useState('');
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // RESTORE OLD MOVEMENT: Organic spring with slight drag/delay for floating effect
    const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const vX = useVelocity(x);
    const vY = useVelocity(y);
    const speed = useTransform([vX, vY], ([vX, vY]) => Math.sqrt(vX * vX + vY * vY));

    // RESTORE OLD MOVEMENT: More aggressive 3D tilt
    const rX = useTransform(vY, [-800, 800], [35, -35], { clamp: true });
    const rY = useTransform(vX, [-800, 800], [-35, 35], { clamp: true });
    const rZ = useTransform(vX, [-800, 800], [-25, 25], { clamp: true });

    // RESTORE OLD MOVEMENT: Aerodynamic squash and stretch
    const sX = useTransform(speed, [0, 1500], [1, 1.15]);
    const sY = useTransform(speed, [0, 1500], [1, 0.9]);

    useEffect(() => {
        // Detect touch device
        if (window.matchMedia('(pointer: coarse)').matches) {
            setIsTouchDevice(true);
        }

        const onMouseMove = (e) => {
            if (isHidden) setIsHidden(false);
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const onMouseLeave = () => setIsHidden(true);
        const onMouseEnter = () => setIsHidden(false);

        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);

        const handleMouseOver = (e) => {
            const target = e.target.closest('a, button, [data-cursor], .cursor-pointer');
            if (target) {
                setIsHovering(true);
                const text = target.getAttribute('data-cursor');
                setHoverText(text || '');
            } else {
                setIsHovering(false);
                setHoverText('');
            }
        };

        document.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY, isHidden]);

    // 2. Early return for touch ONLY after all hooks are evaluated
    if (isTouchDevice) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[99999]">
            <AnimatePresence>
                {!isHidden && !isHovering && (
                    <motion.div key="trail-group">
                        <TrailParticle mouseX={mouseX} mouseY={mouseY} index={0} />
                        <TrailParticle mouseX={mouseX} mouseY={mouseY} index={1} />
                        <TrailParticle mouseX={mouseX} mouseY={mouseY} index={2} />
                        <TrailParticle mouseX={mouseX} mouseY={mouseY} index={3} />
                        <TrailParticle mouseX={mouseX} mouseY={mouseY} index={4} />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                    opacity: isHidden ? 0 : 1, 
                    scale: isHidden ? 0 : isHovering ? 1.4 : 1 
                }}
                className="absolute left-0 top-0 flex items-center justify-center p-4 origin-center"
                style={{
                    x,
                    y,
                    left: 0,
                    top: 0,
                    translateX: '-50%',
                    translateY: '-50%',
                    rotateX: rX,
                    rotateY: rY,
                    rotateZ: rZ,
                    scaleX: sX,
                    scaleY: sY,
                    transformStyle: 'preserve-3d',
                }}
            >
                <div className="relative">
                    {/* NEW DESIGN: Variegated Banana Leaf */}
                    <svg
                        width="30"
                        height="45"
                        viewBox="0 0 100 150"
                        className={cn(
                            "transition-all duration-500 drop-shadow-[0_8px_15px_rgba(97, 109, 107, 0.4)]",
                            isHovering ? "scale-110" : "scale-100"
                        )}
                    >
                        {/* Base Shape */}
                        <path 
                            d="M50 145C50 145 20 125 15 75C10 25 40 5 50 25C60 5 90 25 85 75C80 125 50 145 50 145Z" 
                            className={cn("transition-colors duration-500 fill-sage", isHovering && "fill-sage")}
                        />
                        
                        {/* Variegation Patches (Cream) */}
                        <path 
                            d="M50 25C40 35 25 50 20 75C18 95 30 115 50 145L55 130C65 110 82 90 80 75C78 55 65 35 50 25Z" 
                            fill="var(--color-cream)" 
                            fillOpacity="0.35"
                            style={{ mixBlendMode: 'overlay' }}
                        />
                        
                        {/* Organic Large Patches */}
                        <path d="M15 75C12 55 25 35 45 45C35 65 25 85 30 110C22 95 18 85 15 75Z" fill="var(--color-cream)" fillOpacity="0.4" />
                        <path d="M85 75C88 55 75 35 55 45C65 65 75 85 70 110C78 95 82 85 85 75Z" fill="var(--color-cream)" fillOpacity="0.4" />
                        
                        {/* Central Midrib */}
                        <path 
                            d="M50 25C50 25 48 85 50 145" 
                            stroke="rgba(97, 109, 107, 0.15)" 
                            strokeWidth="1.5" 
                            strokeLinecap="round" 
                            fill="none" 
                        />
                        
                        {/* Subtle Vein Accents */}
                        <path d="M50 40L30 35M50 60L25 55M50 80L28 85" stroke="rgba(246, 244, 241, 0.15)" strokeWidth="1" fill="none" />
                        <path d="M50 50L75 45M50 70L80 75M50 90L72 100" stroke="rgba(246, 244, 241, 0.15)" strokeWidth="1" fill="none" />
                    </svg>

                    {/* Hover text badge */}
                    <AnimatePresence>
                        {isHovering && hoverText && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 45 }}
                                exit={{ opacity: 0, scale: 0.5, x: 20 }}
                                className="absolute top-1/2 left-0 whitespace-nowrap bg-sage text-cream px-3 py-1.5 rounded-full text-[0.65rem] font-black uppercase tracking-[0.2em] shadow-xl border border-cream/10 backdrop-blur-md"
                            >
                                {hoverText}
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </motion.div>
        </div>
    );
}
