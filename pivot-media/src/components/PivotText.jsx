import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export default function PivotText({ children, className }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span
      className={cn("inline-block cursor-pointer relative", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: '1000px' }}
    >
      <motion.span
        className="inline-block"
        animate={{
          rotateY: isHovered ? 360 : 0,
          color: isHovered ? 'var(--color-sage)' : 'inherit',
        }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for a "premium" feel
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
