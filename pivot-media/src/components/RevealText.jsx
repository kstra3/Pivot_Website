import { motion } from "framer-motion";

export default function RevealText({ children, delay = 0, className = "" }) {
    // Split the text into lines or words, checking if children is a string
    const words = typeof children === 'string' ? children.split(' ') : [children];

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: delay }
        })
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 100,
                duration: 0.8,
                ease: [0.2, 0.65, 0.3, 0.9]
            }
        },
        hidden: {
            opacity: 0,
            y: "100%",
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 100
            }
        }
    };

    return (
        <motion.span
            className={`${className} inline-flex flex-wrap overflow-visible`}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {words.map((word, index) => (
                <span key={index} className="inline-block overflow-hidden mr-[0.25em] py-[0.6em] -my-[0.6em] px-[0.2em] -mx-[0.2em]">
                    <motion.span
                        variants={child}
                        className="inline-block will-change-transform"
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </motion.span>
    );
}
