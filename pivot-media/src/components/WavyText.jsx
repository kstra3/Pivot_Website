import { motion } from 'framer-motion';

export default function WavyText({
    text,
    className = "",
    delay = 0,
    duration = 0.5,
    stagger = 0.05
}) {
    const letters = Array.from(text);

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: stagger, delayChildren: delay * i }
        })
    };

    const child = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
                duration: duration
            }
        }
    };

    return (
        <motion.span
            className={`inline-flex flex-wrap ${className}`}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            {letters.map((letter, index) => (
                <motion.span
                    key={index}
                    variants={child}
                    className="inline-block py-4 -my-4 px-1 -mx-1"
                    // Add a continuous hover animation using CSS for the wavy effect
                    whileHover={{
                        y: [-2, -8, -2],
                        transition: {
                            duration: 0.6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                >
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.span>
    );
}
