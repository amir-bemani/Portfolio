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

    let neurons: Neuron[] = [];
    let synapses: Synapse[] = [];
    let pulses: Pulse[] = [];
    let animationFrameId: number;

    let mouse = { x: 0, y: 0, radius: 100 };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initNetwork();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    class Neuron {
      x: number;
      y: number;
      layer: number;
      size: number;
      originalX: number;
      originalY: number;
      activation: number;

      constructor(x: number, y: number, layer: number) {
        this.x = x;
        this.y = y;
        this.originalX = x;
        this.originalY = y;
        this.layer = layer;
        this.size = Math.random() * 2 + 2; // Radius
        this.activation = Math.random();
      }

      update() {
        // Slight organic floating motion
        this.x = this.originalX + Math.sin(Date.now() * 0.001 + this.y) * 4;
        this.y = this.originalY + Math.cos(Date.now() * 0.001 + this.x) * 4;

        this.activation = (Math.sin(Date.now() * 0.002 + this.x) + 1) / 2; // slow pulse activation rate

        // Mouse push
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x += (dx / dist) * force * -5;
          this.y += (dy / dist) * force * -5;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Node pulse color based on activation
        ctx.fillStyle = `rgba(145, 94, 255, ${0.4 + this.activation * 0.6})`;
        ctx.shadowColor = 'rgba(145, 94, 255, 0.8)';
        ctx.shadowBlur = this.activation * 8;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      }
    }

    class Synapse {
      n1: Neuron;
      n2: Neuron;
      weight: number;

      constructor(n1: Neuron, n2: Neuron) {
        this.n1 = n1;
        this.n2 = n2;
        this.weight = Math.random() * 0.5 + 0.1;
      }

      draw() {
        if (!ctx) return;
        const opacity = (this.n1.activation + this.n2.activation) / 2 * this.weight;
        ctx.beginPath();
        ctx.moveTo(this.n1.x, this.n1.y);
        ctx.lineTo(this.n2.x, this.n2.y);
        ctx.strokeStyle = `rgba(145, 94, 255, ${opacity * 0.25})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }

    class Pulse {
      n1: Neuron;
      n2: Neuron;
      progress: number;
      speed: number;

      constructor(n1: Neuron, n2: Neuron) {
        this.n1 = n1;
        this.n2 = n2;
        this.progress = Math.random();
        this.speed = Math.random() * 0.003 + 0.0015;
      }

      update() {
        this.progress += this.speed;
        if (this.progress > 1) {
          this.progress = 0;
          // random speed variant on wrap
          this.speed = Math.random() * 0.003 + 0.0015;
        }
      }

      draw() {
        if (!ctx) return;
        const x = this.n1.x + (this.n2.x - this.n1.x) * this.progress;
        const y = this.n1.y + (this.n2.y - this.n1.y) * this.progress;

        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = '#00f2fe'; // Gorgeous cyan pulse running through purple lines
        ctx.shadowColor = '#00f2fe';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      }
    }

    const initNetwork = () => {
      neurons = [];
      synapses = [];
      pulses = [];

      const layerCounts = width < 768 ? [4, 6, 4] : [5, 8, 8, 4]; // input, hidden, output
      const paddingX = width * 0.1;
      const paddingY = height * 0.18;
      const layerWidth = (width - paddingX * 2) / (layerCounts.length - 1);

      // 1. Create Neurons
      layerCounts.forEach((count, lIndex) => {
        const x = paddingX + lIndex * layerWidth;
        const layerHeight = height - paddingY * 2;
        const nodeSpacing = layerHeight / (count - 1 || 1);

        for (let i = 0; i < count; i++) {
          const y = count === 1 ? height / 2 : paddingY + i * nodeSpacing + (Math.random() - 0.5) * 40;
          neurons.push(new Neuron(x, y, lIndex));
        }
      });

      // 2. Connect Adjacent Layers (Synapses & Pulses)
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const n1 = neurons[i];
          const n2 = neurons[j];
          if (n2.layer === n1.layer + 1) {
            synapses.push(new Synapse(n1, n2));
            pulses.push(new Pulse(n1, n2));
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Synapses (Lines)
      synapses.forEach(s => s.draw());

      // Update & Render Neurons (Nodes)
      neurons.forEach(n => {
        n.update();
        n.draw();
      });

      // Update & Render Flowing Pulses
      pulses.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    canvas.width = width;
    canvas.height = height;
    initNetwork();
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
      className="fixed inset-0 z-[-1] pointer-events-none w-full h-full opacity-35" 
    />
  );
};
