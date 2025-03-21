import { useEffect, useRef, useState } from "react";

const TOTAL_IMAGES = 12;
const RADIUS = 200; // Radius of the circle in pixels
const ANIMATION_DELAY = 200; // Delay between each image animation

export default function GalleryCircle() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images] = useState([...Array(TOTAL_IMAGES)].map((_, i) => i + 1));
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor(targetX, targetY, imageIndex) {
        this.initialX = window.innerWidth / 2;
        this.initialY = -50;
        this.x = this.initialX;
        this.y = this.initialY;
        this.targetX = targetX;
        this.targetY = targetY;
        this.size = Math.random() * 3 + 2;
        this.speed = Math.random() * 0.02 + 0.01;
        this.active = false;
        this.imageIndex = imageIndex;
      }

      update() {
        if (!this.active) return;
        this.x += (this.targetX - this.x) * this.speed;
        this.y += (this.targetY - this.y) * this.speed;
      }

      draw(ctx) {
        if (!this.active) return;
        ctx.fillStyle = "#333";
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }

      activate() {
        this.active = true;
      }
    }

    const particles = [];
    const particlesPerPoint = 5;

    for (let i = 0; i < TOTAL_IMAGES; i++) {
      const angle = (i / TOTAL_IMAGES) * Math.PI * 2;
      const x = Math.cos(angle) * RADIUS + window.innerWidth / 2;
      const y = Math.sin(angle) * RADIUS + window.innerHeight / 2;

      for (let j = 0; j < particlesPerPoint; j++) {
        particles.push(new Particle(x, y, i));
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });
      requestAnimationFrame(animate);
    };

    animate();

    let currentIndex = 0;
    const animateNextImage = () => {
      if (currentIndex < TOTAL_IMAGES) {
        setActiveIndex(currentIndex);
        particles.filter((p) => p.imageIndex === currentIndex).forEach((p) => p.activate());
        currentIndex++;
        setTimeout(animateNextImage, ANIMATION_DELAY);
      }
    };

    setTimeout(animateNextImage, 1000);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-grid" ref={containerRef}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ imageRendering: "pixelated" }} />
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <h1 className="text-6xl font-bold font-mono tracking-wider text-gray-800">GALLERY</h1>
      </div>
      <div className="absolute inset-0 z-10">
        {images.map((_, index) => {
          const angle = (index / TOTAL_IMAGES) * Math.PI * 2;
          const x = Math.cos(angle) * RADIUS;
          const y = Math.sin(angle) * RADIUS;

          return (
            <div
              key={index}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
                index <= activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
              style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, perspective: "1000px" }}
            >
              <div className="w-24 h-24 relative transform transition-transform duration-1000 hover:scale-110">
                <img
                  src={`https://source.unsplash.com/random/96x96?${index}`}
                  alt={`Gallery image ${index + 1}`}
                  width={96}
                  height={96}
                  className="rounded-lg shadow-lg object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
