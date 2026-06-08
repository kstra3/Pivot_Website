import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

/**
 * FluidAquarium Component (WebGL Version)
 * Provides high-performance fluid ripples and refraction.
 */
export default function FluidAquarium() {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isTouch, setIsTouch] = useState(false);

    // Physics state
    const physics = useRef({
        buffer1: null,
        buffer2: null,
        width: 0,
        height: 0,
        cols: 0,
        rows: 0,
    });

    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) {
            setIsTouch(true);
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const gl = canvas.getContext('webgl');
        if (!gl) {
            // Graceful fallback for strict browsers (Brave Shields)
            setIsTouch(true);
            return;
        }

        // Try to get extension, fallback to touch/static mode if blocked by Brave
        const floatExt = gl.getExtension('OES_texture_float');
        if (!floatExt) {
            console.warn("OES_texture_float not supported or blocked by Brave. Falling back.");
            setIsTouch(true);
            return;
        }

        // --- WEBGL SHADERS ---
        const vsSource = `
            attribute vec2 aPosition;
            varying vec2 vUv;
            void main() {
                vUv = aPosition * 0.5 + 0.5;
                vUv.y = 1.0 - vUv.y;
                gl_Position = vec4(aPosition, 0.0, 1.0);
            }
        `;

        const fsSource = `
            precision mediump float;
            varying vec2 vUv;
            uniform sampler2D uBuffer;
            uniform vec2 uResolution;
            
            void main() {
                float pixelX = 1.0 / uResolution.x;
                float pixelY = 1.0 / uResolution.y;
                
                // Sample height and calculate normal (gradient)
                float h = texture2D(uBuffer, vUv).r;
                float hL = texture2D(uBuffer, vUv + vec2(-pixelX, 0.0)).r;
                float hR = texture2D(uBuffer, vUv + vec2(pixelX, 0.0)).r;
                float hT = texture2D(uBuffer, vUv + vec2(0.0, -pixelY)).r;
                float hB = texture2D(uBuffer, vUv + vec2(0.0, pixelY)).r;
                
                vec2 n = vec2(hL - hR, hT - hB);
                
                // Realistic botanical dark green base
                vec3 baseColor = vec3(0.380, 0.427, 0.419); // Sage base (#616d6b)
                vec3 peakColor = vec3(0.964, 0.957, 0.945); // Cream peak (#f6f4f1)
                
                // Refraction / Specular highlight
                float mag = length(n);
                float spec = max(0.0, dot(normalize(vec3(n, 0.08)), normalize(vec3(0.0, 0.5, 1.0))));
                spec = pow(spec, 32.0) * 0.8;
                
                vec3 finalColor = mix(baseColor, peakColor, spec * mag * 5.0);
                
                gl_FragColor = vec4(finalColor, 0.2 + mag * 0.3);
            }
        `;

        // Shader setup helpers
        const createShader = (gl, type, source) => {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            return shader;
        };
        const program = gl.createProgram();
        gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vsSource));
        gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fsSource));
        gl.linkProgram(program);
        gl.useProgram(program);

        // Geometry (full-screen quad)
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const posAttrib = gl.getAttribLocation(program, 'aPosition');
        gl.enableVertexAttribArray(posAttrib);
        gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);

        // Textures for ripple simulation results
        const rippleTex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, rippleTex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        const resLoc = gl.getUniformLocation(program, 'uResolution');

        const init = () => {
            const w = physics.current.width = canvas.width = window.innerWidth;
            const h = physics.current.height = canvas.height = window.innerHeight;
            const c = physics.current.cols = Math.floor(w / 4);
            const r = physics.current.rows = Math.floor(h / 4);

            physics.current.buffer1 = new Float32Array(c * r).fill(0);
            physics.current.buffer2 = new Float32Array(c * r).fill(0);

            gl.viewport(0, 0, w, h);
            gl.uniform2f(resLoc, c, r);
            setIsLoaded(true);
        };

        const ripple = (x, y, force = 512) => {
            const { cols, rows } = physics.current;
            const c = Math.floor(x / 4);
            const r = Math.floor(y / 4);
            if (c > 2 && c < cols - 2 && r > 2 && r < rows - 2) {
                physics.current.buffer1[r * cols + c] = force;
            }
        };

        const updatePhysics = () => {
            const { buffer1, buffer2, cols, rows } = physics.current;
            if (!buffer1) return;

            for (let i = cols; i < cols * rows - cols; i++) {
                buffer2[i] = ((buffer1[i - 1] + buffer1[i + 1] +
                    buffer1[i - cols] + buffer1[i + cols]) / 2 - buffer2[i]) * 0.96;
            }

            // Transfer simulation to texture
            gl.bindTexture(gl.TEXTURE_2D, rippleTex);
            // We use LUMINANCE (single channel) for height
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, cols, rows, 0, gl.LUMINANCE, gl.FLOAT, buffer2);

            // Swap buffers
            physics.current.buffer1 = buffer2;
            physics.current.buffer2 = buffer1;
        };

        const render = () => {
            updatePhysics();
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            requestAnimationFrame(render);
        };

        window.addEventListener('resize', init);
        const handleMouseMove = (e) => {
            const rect = containerRef.current.getBoundingClientRect();
            if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
                ripple(e.clientX, e.clientY - rect.top, 128);
            }
        };
        const handleWaterDrop = (e) => {
            const { x, y } = e.detail;
            for (let i = 0; i < 5; i++) {
                setTimeout(() => ripple(x + (Math.random() - 0.5) * 20, y + (Math.random() - 0.5) * 20, 1024), i * 100);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('water-drop', handleWaterDrop);

        gl.getExtension('OES_texture_float');

        init();
        render();

        return () => {
            window.removeEventListener('resize', init);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('water-drop', handleWaterDrop);
        };
    }, []);

    if (isTouch) {
        return (
            <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden bg-sage">
                <div className="absolute inset-0 bg-gradient-to-b from-bg/10 via-transparent to-bg/40 pointer-events-none" />
                <div className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/water.png')]" />
            </div>
        );
    }

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden bg-sage">
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none mix-blend-screen" />

            {[...Array(15)].map((_, i) => (
                <Bubble key={`bubble-${i}`} />
            ))}

            <AnimatePresence>
                {isLoaded && (
                    <>
                        {[...Array(6)].map((_, i) => (
                            <Koi key={`koi-${i}`} size={Math.random() * 0.4 + 0.6} depth={Math.random() * 0.5} />
                        ))}
                        {[...Array(4)].map((_, i) => (
                            <Jellyfish key={`jelly-${i}`} index={i} depth={Math.random() * 0.8} />
                        ))}
                    </>
                )}
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-b from-bg/10 via-transparent to-bg/40 pointer-events-none" />
            <div className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/water.png')] animate-[pulse_10s_infinite]" />
        </div>
    );
}

const Bubble = () => (
    <motion.div
        className="absolute w-1 h-1 bg-cream/10 rounded-full"
        style={{
            left: `${Math.random() * 100}%`,
            bottom: "-20px",
        }}
        animate={{
            y: "-110vh",
            x: [0, 15, -15, 0],
            opacity: [0, 0.3, 0]
        }}
        transition={{
            duration: Math.random() * 8 + 8,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
        }}
    />
);

const Koi = ({ size, depth }) => {
    const [pos, setPos] = useState({ x: Math.random() * 100, y: Math.random() * 100 });
    const [rot, setRot] = useState(0);
    const speed = useRef(Math.random() * 12 + 18).current;

    useEffect(() => {
        const move = () => {
            const newX = Math.random() * 100;
            const newY = Math.random() * 100;
            const dx = (newX / 100 * window.innerWidth) - (pos.x / 100 * window.innerWidth);
            const dy = (newY / 100 * window.innerHeight) - (pos.y / 100 * window.innerHeight);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            setRot(angle);
            setPos({ x: newX, y: newY });
        };
        move();
        const interval = setInterval(move, speed * 1000);
        return () => clearInterval(interval);
    }, [speed]);

    return (
        <motion.div
            className="absolute z-10"
            initial={false}
            animate={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                rotate: rot,
                opacity: 0.15 + (1 - depth) * 0.4,
                scale: size * (1 - depth * 0.3),
                filter: `blur(${depth * 3}px)`
            }}
            transition={{
                duration: speed,
                ease: [0.45, 0, 0.55, 1]
            }}
        >
            <div className="relative group">
                <svg width="70" height="40" viewBox="0 0 100 60" className="drop-shadow-2xl">
                    <path 
                        d="M10 30 C10 10 50 5 80 30 C50 55 10 50 10 30" 
                        fill="var(--color-cream)" 
                        fillOpacity="0.8"
                    />
                    {/* Variegation patches (Sage) */}
                    <path d="M30 15 Q45 10 55 20 L50 35 Q35 40 25 30 Z" fill="var(--color-sage)" fillOpacity="0.5" />
                    <path d="M65 25 Q75 20 80 30 Q75 40 60 35 Z" fill="var(--color-sage)" fillOpacity="0.6" />
                    
                    {/* Fins */}
                    <path d="M40 12 Q45 0 55 10" fill="var(--color-cream)" fillOpacity="0.3" />
                    <path d="M40 48 Q45 60 55 50" fill="var(--color-cream)" fillOpacity="0.3" />
                    
                    {/* Head / Eyes */}
                    <circle cx="75" cy="22" r="1.5" fill="#1a1a1a" opacity="0.6" />
                    <circle cx="75" cy="38" r="1.5" fill="#1a1a1a" opacity="0.6" />
                </svg>
                
                {/* Flowing Tail */}
                <motion.div
                    className="absolute left-[-5px] top-1/2 -translate-y-1/2"
                    animate={{ rotateY: [35, -35, 35], rotateZ: [5, -5, 5] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: "right center" }}
                >
                    <svg width="35" height="45" viewBox="0 0 35 45" fill="var(--color-cream)" fillOpacity="0.4">
                        <path d="M35 22 L5 5 C0 10 0 35 5 40 Z" />
                        <path d="M35 22 L0 0 L10 22 L0 44 Z" fillOpacity="0.2" />
                    </svg>
                </motion.div>
            </div>
        </motion.div>
    );
};

const Jellyfish = ({ depth, index }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        offset: ["start end", "end start"]
    });

    // 3D Scroll Path: Floating up and towards/away from camera
    const y = useTransform(scrollYProgress, [0, 1], ["80%", "-20%"]);
    const x = useTransform(scrollYProgress, [0, 1], [`${20 + index * 15}%`, `${30 + index * 5}%`]);
    const z = useTransform(scrollYProgress, [0, 0.5, 1], [-100, 0, 100]);
    const rotateX = useTransform(scrollYProgress, [0, 1], [45, -45]);
    const rotateY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
    
    // Disappear / Fade effect
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.1 + (1 - depth) * 0.25, 0.1 + (1 - depth) * 0.25, 0]);

    return (
        <motion.div
            className="absolute z-20"
            style={{
                left: x,
                top: y,
                opacity,
                z,
                rotateX,
                rotateY,
                perspective: '1000px',
                transformStyle: 'preserve-3d',
                scale: 0.8 + (1 - depth) * 0.4,
                filter: `blur(${depth * 5 + 1}px)`
            }}
        >
            <motion.div
                animate={{ y: [0, -20, 0], scaleY: [1, 0.95, 1], scaleX: [1, 1.05, 1] }}
                transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
                className="relative flex flex-col items-center"
            >
                {/* Jelly Bell */}
                <div className="w-16 h-12 bg-cream/20 rounded-[50%_50%_40%_40%] border border-cream/10 backdrop-blur-[2px] relative overflow-hidden">
                    <div className="absolute inset-2 border-t border-cream/30 rounded-full" />
                    {/* Subtle Internal Glow */}
                    <div className="absolute inset-4 bg-cream/10 rounded-full blur-xl" />
                </div>
                
                {/* Tentacles */}
                <div className="flex gap-2 -mt-2">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-px h-16 bg-gradient-to-b from-cream/30 to-transparent origin-top"
                            animate={{ 
                                height: [40, 60, 40], 
                                rotate: [Math.sin(i + index) * 15, -Math.sin(i + index) * 15, Math.sin(i + index) * 15],
                            }}
                            transition={{ 
                                duration: 3 + Math.random() * 2, 
                                repeat: Infinity, 
                                ease: "easeInOut",
                                delay: i * 0.2
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};
