import { useEffect, useRef } from 'react';

export default function VineWave() {
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

    const NODES = 60;
    const nodes = Array.from({ length: NODES }, (_, i) => ({
      xFrac: i / (NODES - 1),
      y: 0,
      vy: 0,
      targetY: 0,
      baseOffset: Math.random() * Math.PI * 2,
      hasLeaf: i % 4 === 0 && i > 2 && i < NODES - 3,
      leafSide: i % 8 === 0 ? 1 : -1,
      leafSize: 0.6 + Math.random() * 0.4
    }));

    const DUST_N = 40;
    const dust = Array.from({ length: DUST_N }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.001,
      vy: (Math.random() - 0.5) * 0.001,
    }));

    const springTension = 0.035;
    const springDampening = 0.88;

    const tick = () => {
      if (!inViewRef.current) {
        animRef.current = null;
        return;
      }
      const t = timeRef.current;
      
      ctx.fillStyle = '#f6f4f1';
      ctx.fillRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.fillStyle = 'rgba(97, 109, 107, 0.25)';
      dust.forEach(p => {
        p.x += p.vx + Math.sin(t + p.y * 10) * 0.0005;
        p.y += p.vy;
        
        const dx = (p.x * W) - mx;
        const dy = (p.y * H) - my;
        const dist = Math.hypot(dx, dy);
        if (dist < 100 && mx > 0) {
            p.x += (dx / dist) * 0.002;
            p.y += (dy / dist) * 0.002;
        }

        if (p.x < -0.1) p.x = 1.1;
        if (p.x > 1.1) p.x = -0.1;
        if (p.y < -0.1) p.y = 1.1;
        if (p.y > 1.1) p.y = -0.1;

        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      nodes.forEach((n, i) => {
        const nx = n.xFrac * W;
        n.targetY = H * 0.5 + Math.sin(t * 1.2 + n.xFrac * Math.PI * 3) * (H * 0.18);
        
        const dx = mx - nx;
        if (Math.abs(dx) < 150 && mx > 0) {
            const dy = my - n.targetY;
            const dist = Math.hypot(dx, dy);
            if (dist < 120) {
                const force = Math.pow((120 - dist) / 120, 2);
                n.targetY -= (dy > 0 ? 1 : -1) * force * 50;
            }
        }
        
        const ay = (n.targetY - n.y) * springTension;
        n.vy = (n.vy + ay) * springDampening;
        n.y += n.vy;
      });

      ctx.beginPath();
      ctx.moveTo(nodes[0].xFrac * W, nodes[0].y);
      for (let i = 1; i < NODES - 2; i++) {
        const xc = (nodes[i].xFrac * W + nodes[i + 1].xFrac * W) / 2;
        const yc = (nodes[i].y + nodes[i + 1].y) / 2;
        ctx.quadraticCurveTo(nodes[i].xFrac * W, nodes[i].y, xc, yc);
      }
      const last = NODES - 1;
      ctx.quadraticCurveTo(nodes[last-1].xFrac * W, nodes[last-1].y, nodes[last].xFrac * W, nodes[last].y);

      ctx.strokeStyle = '#616d6b';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      nodes.forEach((n, i) => {
        if (!n.hasLeaf) return;
        
        const nx = n.xFrac * W;
        const prev = nodes[Math.max(0, i-1)];
        const next = nodes[Math.min(NODES-1, i+1)];
        
        const angle = Math.atan2(next.y - prev.y, next.xFrac * W - prev.xFrac * W);
        const leafAngle = angle + (Math.PI / 2) * n.leafSide;
        const sway = Math.sin(t * 2 + n.baseOffset) * 0.15;
        const finalAngle = leafAngle + sway;

        ctx.save();
        ctx.translate(nx, n.y);
        ctx.rotate(finalAngle);
        
        const breathe = 1 + Math.sin(t * 1.5 + n.baseOffset) * 0.05;
        ctx.scale(n.leafSize * breathe, n.leafSize * breathe);
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(10, 0);
        ctx.strokeStyle = '#616d6b';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.bezierCurveTo(18, 12, 35, 8, 42, 0);
        ctx.bezierCurveTo(35, -8, 18, -12, 10, 0);
        ctx.closePath();
        ctx.fillStyle = '#616d6b';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#f6f4f1';
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
      });

      if (mx > 0 && mx < W && my > 0 && my < H) {
         ctx.beginPath();
         ctx.arc(mx, my, 8 + Math.sin(t * 5) * 2, 0, Math.PI * 2);
         ctx.strokeStyle = 'rgba(97, 109, 107, 0.2)';
         ctx.lineWidth = 1;
         ctx.stroke();
      }

      timeRef.current += 0.016;
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
      className="relative w-full overflow-hidden bg-cream select-none text-sage border-y border-sage/10"
      style={{ height: 'clamp(200px, 30vw, 320px)' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto" />
      
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '100px',
        }}
      />
      
      <div className="absolute top-6 left-6 z-10 pointer-events-none flex items-center gap-3">
        <span className="w-6 h-px bg-sage/40" />
        <span className="text-[0.65rem] font-bold tracking-[0.25em] uppercase text-sage/70">
          Living Vine
        </span>
      </div>
      
      <div className="absolute bottom-6 right-8 z-10 pointer-events-none">
        <span className="font-serif italic text-[0.65rem] tracking-[0.15em] text-sage/50">
          move to interact
        </span>
      </div>
    </div>
  );
}
