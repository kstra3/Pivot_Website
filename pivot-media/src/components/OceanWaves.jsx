import { useEffect, useRef } from 'react';

export default function OceanWaves() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef(null);
  const timeRef = useRef(0);
  const inViewRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); 

    const observer = new IntersectionObserver((entries) => {
        inViewRef.current = entries[0].isIntersecting;
        if (inViewRef.current && !animRef.current) {
            animRef.current = requestAnimationFrame(tick);
        }
    }, { threshold: 0 });
    observer.observe(canvas);

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      W = rect.width;
      H = rect.height;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const SEGMENTS = 120; // smoothness of the wave
    const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

    const tick = () => {
      if (!inViewRef.current) {
        animRef.current = null;
        return;
      }
      const t = timeRef.current;
      
      // Because Numbers is sage and Contact is sage, having sage base bg connects them.
      ctx.fillStyle = '#616d6b';
      ctx.fillRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const waveParams = [
        { speed: 0.007, freq: 0.0035, amp: 22, yBaseOffset: -120, color: 'rgba(246, 244, 241, 0.04)' },
        { speed: 0.010, freq: 0.0022, amp: 35, yBaseOffset: -75, color: 'rgba(246, 244, 241, 0.08)' },
        { speed: 0.013, freq: 0.0040, amp: 18, yBaseOffset: -30, color: 'rgba(246, 244, 241, 0.12)' },
        { speed: 0.008, freq: 0.0025, amp: 45, yBaseOffset: 20, color: '#616d6b' } 
      ];

      // Draw waves back to front
      waveParams.forEach((param, layerIndex) => {
        ctx.beginPath();
        ctx.moveTo(0, H);

        const baseHeight = H - clamp(H * 0.4, 80, 200) + param.yBaseOffset;

        for (let i = 0; i <= SEGMENTS; i++) {
            const xFrac = i / SEGMENTS;
            const x = xFrac * W;
            
            // Primary sine
            let y = baseHeight + Math.sin(x * param.freq + t * param.speed) * param.amp;
            // Secondary sine for complexity
            y += Math.sin(x * param.freq * 2.3 - t * param.speed * 1.5) * (param.amp * 0.4);

            // Subtle mouse ripple
            if (mx !== -9999) {
                const distDistX = Math.abs(mx - x);
                const distDistY = Math.abs(my - y);
                const dist = Math.hypot(distDistX, distDistY);
                if (dist < 180) {
                    const force = Math.pow((180 - dist) / 180, 2);
                    y -= force * 15 * (layerIndex + 1) * 0.25; // Pull surface UP locally
                }
            }

            ctx.lineTo(x, y);
        }

        ctx.lineTo(W, H);
        ctx.closePath();
        ctx.fillStyle = param.color;
        ctx.fill();
        
        // Edge highlight for premium look
        if (layerIndex < waveParams.length - 1) {
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(246, 244, 241, 0.05)';
            ctx.stroke();
        }
      });

      // Floating sea bubbles
      const bubbleCount = 8;
      for(let i=0; i<bubbleCount; i++) {
          const bx = (i / bubbleCount * W + t * 5 + i * 154) % W;
          const by = Math.sin(t * 0.02 + i * 2) * 50 + (H - 50);
          ctx.beginPath();
          ctx.arc(bx, Math.min(by, H - 20), (i % 3) * 1.5 + 1, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(246, 244, 241, 0.15)';
          ctx.fill();
      }

      timeRef.current += 1;
      animRef.current = requestAnimationFrame(tick);
    };

    tick();

    const onMove  = (e) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    const onTouch = (e) => {
        if (!e.touches[0]) return;
        const r = canvas.getBoundingClientRect();
        mouseRef.current = { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top };
    };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    canvas.addEventListener('touchmove', onTouch, {passive: true});
    canvas.addEventListener('touchend', onLeave);

    return () => {
      observer.disconnect();
      if (animRef.current) cancelAnimationFrame(animRef.current);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      canvas.removeEventListener('touchmove', onTouch);
      canvas.removeEventListener('touchend', onLeave);
    };
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-sage select-none text-cream"
      style={{ height: 'clamp(200px, 30vw, 320px)' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto" />
      
      {/* Grain overlay setup */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '100px',
        }}
      />
      
      {/* Label Box */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none flex items-center gap-3">
        <span className="w-6 h-px bg-cream/40" />
        <span className="text-[0.65rem] font-bold tracking-[0.25em] uppercase text-cream/70">
          Flowing Sea
        </span>
      </div>
      
      {/* Interaction hint */}
      <div className="absolute bottom-10 right-8 z-10 pointer-events-none">
        <span className="font-serif italic text-[0.65rem] tracking-[0.15em] text-cream/50 mix-blend-screen">
          move against the tide
        </span>
      </div>
    </div>
  );
}
