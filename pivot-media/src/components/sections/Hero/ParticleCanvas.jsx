import { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let W, H, pts, animationFrameId;
        let mouse = { x: -1000, y: -1000 };
        let lastMouse = { x: -1000, y: -1000 };
        let mouseVelocity = { x: 0, y: 0 };
        let windTrails = [];

        const init = () => {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
            pts = Array.from({ length: 100 }, () => ({
                x: Math.random() * W,
                y: Math.random() * H,
                r: Math.random() * 2.5 + 0.5,
                vx: (Math.random() - 0.5) * 0.3,
                vy: -Math.random() * 0.6 - 0.2,
                baseVy: -Math.random() * 0.6 - 0.2, // Store base vertical speed
                a: Math.random() * 0.5 + 0.1,
                rotate: Math.random() * Math.PI * 2,
                rotateVel: (Math.random() - 0.5) * 0.05
            }));
        };

        const handleMouseMove = (e) => {
            if (lastMouse.x !== -1000) {
                mouseVelocity.x = e.clientX - lastMouse.x;
                mouseVelocity.y = e.clientY - lastMouse.y;

                // Add wind trail
                if (Math.abs(mouseVelocity.x) > 2 || Math.abs(mouseVelocity.y) > 2) {
                    windTrails.push({
                        x: e.clientX,
                        y: e.clientY,
                        vx: mouseVelocity.x * 0.5,
                        vy: mouseVelocity.y * 0.5,
                        life: 1.0,
                        width: Math.sqrt(mouseVelocity.x ** 2 + mouseVelocity.y ** 2) * 2
                    });
                }
            }
            lastMouse.x = mouse.x = e.clientX;
            lastMouse.y = mouse.y = e.clientY;
        };

        const draw = () => {
            ctx.clearRect(0, 0, W, H);

            // Decelerate mouse velocity
            mouseVelocity.x *= 0.95;
            mouseVelocity.y *= 0.95;

            // Draw and update wind trails
            windTrails = windTrails.filter(t => t.life > 0.01);
            windTrails.forEach(t => {
                t.life *= 0.92;
                t.x += t.vx;
                t.y += t.vy;

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(t.x, t.y);
                ctx.lineTo(t.x - t.vx * 3, t.y - t.vy * 3);
                ctx.strokeStyle = `rgba(97, 109, 107, ${t.life * 0.2})`;
                ctx.lineWidth = t.width * t.life;
                ctx.lineCap = 'round';
                ctx.stroke();
                ctx.restore();
            });

            pts.forEach(p => {
                // Apply mouse wind force
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 200;

                if (dist < maxDist) {
                    const force = (1 - dist / maxDist);
                    p.vx += mouseVelocity.x * force * 0.08;
                    p.vy += mouseVelocity.y * force * 0.08;
                }

                // Friction / Base movement recovery
                p.vx *= 0.98;
                p.vy = p.vy * 0.98 + p.baseVy * 0.02;

                p.x += p.vx;
                p.y += p.vy;
                p.rotate += p.rotateVel + (Math.abs(p.vx) + Math.abs(p.vy)) * 0.01;

                // Wrap around
                if (p.y < -20) { p.y = H + 20; p.x = Math.random() * W; }
                if (p.x < -20) p.x = W + 20;
                if (p.x > W + 20) p.x = -20;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotate);
                ctx.globalAlpha = p.a;
                ctx.fillStyle = 'var(--color-sage)';
                ctx.beginPath();
                ctx.ellipse(0, 0, p.r * 2.5, p.r, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
            animationFrameId = requestAnimationFrame(draw);
        };

        init();
        draw();

        window.addEventListener('resize', init);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', init);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none opacity-45 w-full h-full object-cover"
        />
    );
}
