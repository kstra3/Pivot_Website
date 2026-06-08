import React, { useRef, useEffect } from 'react';

const NetworkParticles = ({ alwaysVisible = false }) => {
    const canvasRef = useRef(null);

    const [maskStyle, setMaskStyle] = React.useState({
        WebkitMaskImage: alwaysVisible ? 'none' : `radial-gradient(circle at -10% -10%, black 0%, transparent 0px)`,
        maskImage: alwaysVisible ? 'none' : `radial-gradient(circle at -10% -10%, black 0%, transparent 0px)`
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particlesArray = [];

        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;

        let mouse = {
            x: null,
            y: null,
            radius: 200
        };

        const handleMouseMove = (event) => {
            if (alwaysVisible) return;
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            mouse.x = x;
            mouse.y = y;
            
            // Interactive Spotlight "Breaking" the background
            setMaskStyle({
                WebkitMaskImage: `radial-gradient(400px circle at ${x}px ${y}px, black 20%, transparent 100%)`,
                maskImage: `radial-gradient(400px circle at ${x}px ${y}px, black 20%, transparent 100%)`
            });
        };

        const handleMouseLeave = () => {
            if (alwaysVisible) return;
            mouse.x = null;
            mouse.y = null;
            setMaskStyle({
                WebkitMaskImage: `radial-gradient(circle at -10% -10%, black 0%, transparent 0px)`,
                maskImage: `radial-gradient(circle at -10% -10%, black 0%, transparent 0px)`
            });
        };

        const parent = canvas.parentElement;
        if (parent && !alwaysVisible) {
            parent.addEventListener('mousemove', handleMouseMove);
            parent.addEventListener('mouseleave', handleMouseLeave);
        }
        window.addEventListener('resize', handleResize);

        function handleResize() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
            init();
        }

        const colors = ['#f6f4f1']; // Minimalist brand colored dots

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
                this.baseX = this.x;
                this.baseY = this.y;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }

                this.x += this.directionX * 0.5;
                this.y += this.directionY * 0.5;

                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 12000;
            if(numberOfParticles > 150) numberOfParticles = 150;

            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1.5;
                let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 2) - 1;
                let directionY = (Math.random() * 2) - 1;
                let color = colors[Math.floor(Math.random() * colors.length)];

                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        function connect() {
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let dx = particlesArray[a].x - particlesArray[b].x;
                    let dy = particlesArray[a].y - particlesArray[b].y;
                    let distance = (dx * dx) + (dy * dy);
                    
                    if (distance < 12000) {
                        let opacityValue = 1 - (distance / 12000);
                        ctx.strokeStyle = `rgba(246, 244, 241, ${opacityValue * 0.15})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();

                        // Occasionally draw a nice polygon as seen in image 1
                        if (distance < 6000 && Math.random() < 0.05 && b + 1 < particlesArray.length) {
                             let dx2 = particlesArray[a].x - particlesArray[b+1].x;
                             let dy2 = particlesArray[a].y - particlesArray[b+1].y;
                             let distance2 = (dx2 * dx2) + (dy2 * dy2);
                             if (distance2 < 6000) {
                                 ctx.fillStyle = `rgba(246, 244, 241, ${opacityValue * 0.05})`;
                                 ctx.beginPath();
                                 ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                                 ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                                 ctx.lineTo(particlesArray[b+1].x, particlesArray[b+1].y);
                                 ctx.closePath();
                                 ctx.fill();
                             }
                        }
                    }
                }
                
                if (mouse.x && mouse.y) {
                    let dx = particlesArray[a].x - mouse.x;
                    let dy = particlesArray[a].y - mouse.y;
                    let distanceToMouse = (dx * dx) + (dy * dy);
                        
                    if (distanceToMouse < mouse.radius * mouse.radius) {
                        let opacityValue = 1 - (distanceToMouse / (mouse.radius * mouse.radius));
                        ctx.strokeStyle = `rgba(246, 244, 241, ${opacityValue * 0.4})`;
                        ctx.lineWidth = 1.2;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();

                        // Push particles slightly away or attract them
                        // Let's slightly attract them to form a cluster like a web
                        particlesArray[a].x -= dx * 0.015;
                        particlesArray[a].y -= dy * 0.015;
                    }
                }
            }
        }

        function animate() {
            animationFrameId = requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        }

        init();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (parent && !alwaysVisible) {
                parent.removeEventListener('mousemove', handleMouseMove);
                parent.removeEventListener('mouseleave', handleMouseLeave);
            }
            cancelAnimationFrame(animationFrameId);
        };
    }, [alwaysVisible]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300"
            style={{ 
                width: '100%', 
                height: '100%', 
                mixBlendMode: 'screen',
                ...maskStyle,
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat'
            }}
        />
    );
};

export default NetworkParticles;
