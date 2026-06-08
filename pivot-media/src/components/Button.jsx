import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

export default function Button({ children, href, className, variant = 'dark', onClick, ...props }) {
    const ref = useRef(null);
    const [hovered, setHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [ripplePos, setRipplePos] = useState({ x: '50%', y: '50%' });
    const [magnetPos, setMagnetPos] = useState({ x: 0, y: 0 });

    const handleMouseEnter = (e) => {
        setHovered(true);
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        setRipplePos({
            x: e.clientX - left,
            y: e.clientY - top,
        });
    };

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const x = (clientX - (left + width / 2)) * 0.25;
        const y = (clientY - (top + height / 2)) * 0.25;
        setMagnetPos({ x, y });
    };

    const handleMouseLeave = () => {
        setHovered(false);
        setMagnetPos({ x: 0, y: 0 });
    };

    const baseClasses =
        'relative overflow-hidden inline-flex items-center justify-center font-sans text-[0.8rem] font-medium tracking-[0.1em] uppercase no-underline select-none rounded-full cursor-none';

    const variantClasses = {
        dark: 'px-[46px] py-[17px] bg-sage text-cream border border-sage',
        outline: 'px-[46px] py-[17px] border-[1.5px] border-sage text-sage',
        link: 'text-[0.82rem] text-sage opacity-50 hover:opacity-100 gap-2 transition-all duration-300',
    };

    // The fill color depending on variant
    const fillColor = variant === 'outline' ? 'bg-sage' : 'bg-cream/10';
    const fillTextColor = 'text-cream';

    const inner = (
        <motion.div
            ref={ref}
            className="relative w-full h-full inline-flex items-center justify-center"
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: magnetPos.x, y: magnetPos.y }}
            transition={{ type: 'spring', stiffness: 280, damping: 14, mass: 0.08 }}
        >
            {/* Ripple fill blob */}
            <AnimatePresence>
                {hovered && (
                    <motion.span
                        key="fill"
                        className={cn('absolute rounded-full pointer-events-none', fillColor)}
                        style={{
                            left: ripplePos.x,
                            top: ripplePos.y,
                            translateX: '-50%',
                            translateY: '-50%',
                        }}
                        initial={{ width: 0, height: 0, opacity: 0.85 }}
                        animate={{ width: '280%', height: '600%', opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.25 } }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                )}
            </AnimatePresence>

            {/* Text – stays on top, colour swaps on hover */}
            <motion.span
                className={cn('relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 pointer-events-none',
                    hovered ? fillTextColor : variant === 'outline' ? 'text-sage' : 'text-cream'
                )}
            >
                {children}
            </motion.span>
        </motion.div>
    );

    if (href) {
        if (href.startsWith('#')) {
            return (
                <a
                    href={href}
                    className={cn(baseClasses, variantClasses[variant], className)}
                    onClick={(e) => {
                        if (onClick) onClick(e);
                        e.preventDefault();
                        const target = document.querySelector(href);
                        if (target) {
                            window.scrollTo({
                                top: target.getBoundingClientRect().top + window.scrollY,
                                behavior: 'smooth',
                            });
                        }
                    }}
                    {...props}
                >
                    {inner}
                </a>
            );
        }
        return (
            <a href={href} className={cn(baseClasses, variantClasses[variant], className)} {...props}>
                {inner}
            </a>
        );
    }

    return (
        <button
            onClick={onClick}
            className={cn(baseClasses, variantClasses[variant], className)}
            {...props}
        >
            {inner}
        </button>
    );
}
