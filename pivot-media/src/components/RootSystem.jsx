import { useEffect, useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

export default function RootSystem() {
    const canvasRef = useRef(null);
    const { scrollYProgress } = useScroll();

    // Growth factor based on scroll
    const growth = useTransform(scrollYProgress, [0, 1], [0, 1]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let W, H;
        let roots = [];
        let leaves = [];
        let animationFrameId;
        let mouse = { x: -2000, y: -2000 };

        class Leaf {
            constructor(x, y, angle, size) {
                this.x = x;
                this.y = y;
                this.angle = angle;
                this.size = 0;
                this.maxSize = size;
                this.growing = true;
            }

            draw(ctx) {
                if (this.size < 0.1) return;

                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);

                ctx.beginPath();
                // Simple leaf shape
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(this.size, -this.size, this.size * 2, 0, 0, this.size * 2);
                ctx.bezierCurveTo(-this.size * 2, 0, -this.size, -this.size, 0, 0);

                ctx.fillStyle = 'var(--color-sage)';
                ctx.globalAlpha = 0.12;
                ctx.fill();
                ctx.restore();
            }

            update() {
                if (this.growing && this.size < this.maxSize) {
                    this.size += 0.05;
                }
            }
        }

        class Root {
            constructor(x, y, angle, depth, color) {
                this.x = x;
                this.y = y;
                this.angle = angle;
                this.depth = depth;
                this.color = color;
                this.speed = Math.random() * 1.5 + 0.5;
                this.growing = true;
                this.segments = [{ x, y }];
                this.life = 0;
                this.maxLife = Math.random() * 200 + 150;
                this.sproutTimer = 0;
            }

            update(scrollFactor) {
                if (!this.growing) return;

                // Growth is capped by scroll
                const targetLife = this.maxLife * (scrollFactor * 1.3);
                if (this.life >= targetLife) return;

                this.life += this.speed;
                this.sproutTimer += this.speed;

                // Organic wiggle
                this.angle += (Math.random() - 0.5) * 0.15;

                // Cursor attraction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 250) {
                    const angleToMouse = Math.atan2(dy, dx);
                    this.angle += (angleToMouse - this.angle) * 0.015;
                }

                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;

                this.segments.push({ x: this.x, y: this.y });

                if (this.segments.length > 150) this.segments.shift();

                // Sprouting leaves
                if (this.sproutTimer > 30 && Math.random() < 0.15) {
                    leaves.push(new Leaf(
                        this.x,
                        this.y,
                        this.angle + (Math.random() > 0.5 ? Math.PI / 2 : -Math.PI / 2),
                        Math.random() * 5 + 3
                    ));
                    this.sproutTimer = 0;
                }

                // Branching
                if (Math.random() < 0.012 && this.depth < 3 && this.life < this.maxLife * 0.7) {
                    roots.push(new Root(
                        this.x,
                        this.y,
                        this.angle + (Math.random() - 0.5) * 1.2,
                        this.depth + 1,
                        this.color
                    ));
                }

                if (this.life >= this.maxLife) this.growing = false;
            }

            draw(ctx) {
                if (this.segments.length < 2) return;

                ctx.beginPath();
                ctx.moveTo(this.segments[0].x, this.segments[0].y);
                for (let i = 1; i < this.segments.length; i++) {
                    ctx.lineTo(this.segments[i].x, this.segments[i].y);
                }

                ctx.strokeStyle = this.color;
                ctx.lineWidth = Math.max(0.2, (3 - this.depth) * 0.4);
                ctx.globalAlpha = 0.06 + (this.life / this.maxLife) * 0.08;
                ctx.stroke();
            }
        }

        const init = () => {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
            roots = [];
            leaves = [];

            // Multiple seeds
            const seedPoints = [
                { x: 0, y: H * 0.3, a: 0 },
                { x: W, y: H * 0.6, a: Math.PI },
                { x: W * 0.3, y: H, a: -Math.PI / 2 },
                { x: W * 0.7, y: H, a: -Math.PI / 2 },
            ];

            seedPoints.forEach(p => {
                roots.push(new Root(p.x, p.y, p.a + (Math.random() - 0.5), 0, 'var(--color-sage)'));
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, W, H);

            const scrollVal = scrollYProgress.get();

            roots.forEach(r => {
                r.update(scrollVal);
                r.draw(ctx);
            });

            leaves.forEach(l => {
                l.update();
                l.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener('resize', init);
        window.addEventListener('mousemove', handleMouseMove);

        init();
        animate();

        return () => {
            window.removeEventListener('resize', init);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [scrollYProgress]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[-1] opacity-40 mix-blend-multiply dark:mix-blend-screen"
        />
    );
}
