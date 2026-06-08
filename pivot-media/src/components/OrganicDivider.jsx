import { motion } from 'framer-motion';

const LeafSVG = ({ className, color = "currentColor" }) => (
    <svg viewBox="0 0 100 110" fill={color} className={className}>
        <path d="M50 90C35 85 15 70 8 50 4 35 15 15 35 10c8-2 20 4 25 10v-5c0-6 12-12 20-10 15 4 28 20 25 40-3 18-20 35-40 40z
                 M18 42 A2.5 3.5 0 1 0 23 42 A2.5 3.5 0 1 0 18 42 Z
                 M77 48 A3 4 0 1 0 83 48 A3 4 0 1 0 77 48 Z"
            fillRule="evenodd"
        />
        <path d="M49 18 Q49 55 49 88" stroke="rgba(246, 244, 241, 0.1)" strokeWidth="1" fill="none" />
    </svg>
);

export default function OrganicDivider() {
    return (
        <div className="relative w-full h-[200px] md:h-[300px] overflow-hidden bg-sage">
            {/* Background Waves Layer */}
            <svg 
                className="absolute bottom-0 left-0 w-full h-full preserve-3d"
                viewBox="0 0 1200 300" 
                preserveAspectRatio="none"
            >
                {/* Secondary Wave for depth */}
                <path 
                    d="M0,150 C300,100 600,250 900,150 L1200,200 L1200,300 L0,300 Z" 
                    fill="var(--color-cream)"
                    opacity="0.1"
                />
                
                {/* Main Cream Wave */}
                <path 
                    d="M0,200 C200,150 400,280 600,200 C800,120 1000,250 1200,180 L1200,300 L0,300 Z" 
                    fill="var(--color-cream)"
                    opacity="0.2"
                />

                {/* Accent thin lines */}
                <path 
                    d="M0,210 C200,160 400,290 600,210 C800,130 1000,260 1200,190" 
                    fill="none" 
                    stroke="rgba(246, 244, 241, 0.2)" 
                    strokeWidth="1.5" 
                />
                <path 
                    d="M0,230 C200,180 400,310 600,230 C800,150 1000,280 1200,210" 
                    fill="none" 
                    stroke="rgba(246, 244, 241, 0.1)" 
                    strokeWidth="1" 
                />
            </svg>

            {/* Sprinkled Leaves */}
            {/* Left side leaves - Sage */}
            <motion.div 
                className="absolute left-[10%] bottom-[20%] w-16 h-16"
                initial={{ rotate: -20, opacity: 0 }}
                whileInView={{ opacity: 0.8, rotate: -10 }}
                transition={{ duration: 1.5 }}
            >
                <LeafSVG color="var(--color-cream)" className="w-full h-full opacity-60" />
            </motion.div>
            
            <motion.div 
                className="absolute left-[18%] bottom-[35%] w-12 h-12"
                initial={{ rotate: 10, opacity: 0 }}
                whileInView={{ opacity: 0.6, rotate: 25 }}
                transition={{ duration: 1.8, delay: 0.2 }}
            >
                <LeafSVG color="var(--color-cream)" className="w-full h-full opacity-30" />
            </motion.div>

            {/* Right side leaves - Cream */}
            <motion.div 
                className="absolute right-[15%] bottom-[25%] w-20 h-20"
                initial={{ rotate: 15, opacity: 0 }}
                whileInView={{ opacity: 1, rotate: 5 }}
                transition={{ duration: 1.2, delay: 0.1 }}
            >
                <LeafSVG color="var(--color-cream)" className="w-full h-full" />
            </motion.div>
            
            <motion.div 
                className="absolute right-[8%] bottom-[40%] w-14 h-14"
                initial={{ rotate: -30, opacity: 0 }}
                whileInView={{ opacity: 0.7, rotate: -15 }}
                transition={{ duration: 1.4, delay: 0.3 }}
            >
                <LeafSVG color="var(--color-cream)" className="w-full h-full opacity-40" />
            </motion.div>

            <motion.div 
                className="absolute right-[22%] bottom-[15%] w-10 h-10"
                initial={{ rotate: 45, opacity: 0 }}
                whileInView={{ opacity: 0.4, rotate: 60 }}
                transition={{ duration: 2, delay: 0.5 }}
            >
                <LeafSVG color="var(--color-cream)" className="w-full h-full opacity-20" />
            </motion.div>
        </div>
    );
}
