import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Planet data (name, texture, radius, distance from the sun, speed)
const PLANETS = [
  { name: "Sun", texture: "/textures/sun.jpg", radius: 10, distance: 0, speed: 0 }, // Larger sun
  { name: "Mercury", texture: "/textures/mercury.jpg", radius: 6, distance: 20, speed: 0.015 },
  { name: "Venus", texture: "/textures/venus.jpg", radius: 6, distance: 30, speed: 0.015 },
  { name: "Earth", texture: "/textures/earth.jpg", radius: 6, distance: 40, speed: 0.015 },
  { name: "Mars", texture: "/textures/mars.jpg", radius: 6, distance: 50, speed: 0.015 },
  { name: "Jupiter", texture: "/textures/jupiter.jpg", radius: 6, distance: 60, speed: 0.015 },
  { name: "Saturn", texture: "/textures/saturn.jpg", radius: 6, distance: 70, speed: 0.015 },
  { name: "Uranus", texture: "/textures/uranus.jpg", radius: 6, distance: 80, speed: 0.015 },
  { name: "Neptune", texture: "/textures/neptune.jpg", radius: 6, distance: 80, speed: 0.015 },
];

export default function GalleryCircle() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Add lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5).normalize();
    scene.add(light);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Create planets
    const planets = [];
    const textureLoader = new THREE.TextureLoader();

    PLANETS.forEach((planetData, index) => {
      const { texture, radius, distance, speed } = planetData;

      // Create a sphere for the planet
      const planetGeometry = new THREE.SphereGeometry(radius, 32, 32);
      const planetMaterial = new THREE.MeshPhongMaterial({
        map: textureLoader.load(texture, undefined, undefined, (err) => {
          console.error(`Failed to load texture for ${planetData.name}:`, err);
        }),
      });
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);

      // Position the planet
      const angle = (index / PLANETS.length) * Math.PI * 2;
      planet.position.set(Math.cos(angle) * distance, 0, Math.sin(angle) * distance);

      // Add the planet to the scene
      scene.add(planet);
      planets.push({ planet, angle, speed });
    });

    // Add stars
    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Add OrbitControls for user interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Position the camera
    camera.position.set(0, 50, 100); // Adjusted camera position to see all planets
    controls.update();

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate planets around the sun
      planets.forEach((planet) => {
        if (planet.speed > 0) { // Skip the sun (speed = 0)
          planet.angle += planet.speed;
          planet.planet.position.x = Math.cos(planet.angle) * planet.planet.position.length();
          planet.planet.position.z = Math.sin(planet.angle) * planet.planet.position.length();
        }
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden" ref={containerRef}>
      {/* Title removed */}
    </div>
  );
}