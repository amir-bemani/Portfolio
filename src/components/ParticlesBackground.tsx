import { useEffect, useRef } from 'react';

export const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    let particles: Particle[] = [];
    let animationFrameId: number;

    let mouse = { x: 0, y: 0, radius: 120 };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseSize: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4; // 0.4 speed limits
        this.vy = (Math.random() - 0.5) * 0.4;
        this.baseSize = Math.random() * 1.5 + 1; // 1-2.5px
        this.size = this.baseSize;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce borders
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse attraction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= dx * force * 0.012;
          this.y -= dy * force * 0.012;
          this.size = this.baseSize + force * 1.5; // Slight size swell
        } else {
          this.size = this.baseSize;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(145, 94, 255, 0.7)';
        ctx.fill();
      }
    }

    const initParticles = () => {
      const count = width < 768 ? 40 : 90; // Optimized mobile sizing
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const drawNetwork = () => {
      if (!ctx) return;
      const time = Date.now() * 0.0008; // Base speed factor

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 130;
          if (dist < maxDist) {
            const opacity = 1 - (dist / maxDist);
            
            // 1. Draw connecting synapse wire
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(145, 94, 255, ${opacity * 0.22})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();

            // 2. Draw Digital neon Pulses scrolling linearly
            // Offset progress per line pair
            const progress = (time + (i + j) * 17.31) % 1; 
            const px = p1.x + (p2.x - p1.x) * progress;
            const py = p1.y + (p2.y - p1.y) * progress;

            ctx.beginPath();
            ctx.arc(px, py, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 242, 254, 0.9)'; // Gorgeous digital cyan
            ctx.shadowColor = '#00f2fe';
            ctx.shadowBlur = opacity * 6;
            ctx.fill();
            ctx.shadowBlur = 0; // Reset
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      drawNetwork();
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initial setups
    canvas.width = width;
    canvas.height = height;
    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[-1] pointer-events-none w-full h-full opacity-40" 
    />
  );
};
