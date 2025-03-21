import React, { useState } from "react";
import one from "../assets/Planrt photos/1.png";
import Two from "../assets/Planrt photos/2.png";
import Three from "../assets/Planrt photos/3.png";
import Four from "../assets/Planrt photos/4.png";
import Poster1 from "../assets/Poster/Poster1.jpg";
import Poster2 from "../assets/Poster/Poster2.jpg";
import Poster3 from "../assets/Poster/Poster3.jpg";
import Poster4 from "../assets/Poster/Poster4.jpg";

function plannet() {
  const [hoveredPlanet, setHoveredPlanet] = useState(null);

  const planets = [
    {
      id: 1,
      name: "Celestial Haven",
      image: one,
      poster: Poster1,
      position: { x: 15, y: 15 }, // Top Left
      size: "w-34 h-24",
    },
    {
      id: 2,
      name: "Nova Terra",
      image: Two,
      poster: Poster2,
      position: { x: 85, y: 15 }, // Top Right
      size: "w-20 h-20",
    },
    {
      id: 3,
      name: "Quantum Sphere",
      image: Three,
      poster: Poster3,
      position: { x: 15, y: 85 }, // Bottom Left
      size: "w-16 h-16",
    },
    {
      id: 4,
      name: "Astral Prime",
      image: Four,
      poster: Poster4,
      position: { x: 85, y: 85 }, // Bottom Right
      size: "w-20 h-20",
    },
  ];

  return (
    <div className="w-full h-screen bg-grid relative overflow-hidden p-4"
      style={{
    backgroundColor: "#E6E6FA",
    backgroundImage:
      "radial-gradient(rgba(255, 255, 255, 0.1) 10%, transparent 10%)",
    backgroundSize: "30px 30px",
    backgroundPosition: "0 0",
  }} >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Planets Section */}
        <div className="relative w-[600px] h-[600px]">
          {/* Diagonal Lines */}
          <div className="absolute inset-0">
            <div className="absolute w-full h-[2px] bg-gray-400/20 top-1/2 left-0 transform -rotate-45" />
            <div className="absolute w-full h-[2px] bg-gray-400/20 top-1/2 left-0 transform rotate-45" />
          </div>

          {/* Central Sun */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black rounded-full z-20 shadow-lg border-2 border-gray-300">
            <div className="absolute -inset-2 border-2 border-gray-400 rounded-full animate-ping opacity-75"></div>
          </div>

          {/* Planets */}
          {planets.map((planet) => (
            <div
              key={planet.id}
              className="absolute"
              style={{
                left: `${planet.position.x}%`,
                top: `${planet.position.y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: hoveredPlanet === planet.id ? 20 : 1,
              }}
              onMouseEnter={() => setHoveredPlanet(planet.id)}
              onMouseLeave={() => setHoveredPlanet(null)}
            >
              <div className="relative">
                <img
                  src={planet.image}
                  alt={planet.name}
                  className={`${planet.size} rounded-full object-cover transition-transform duration-300 ${
                    hoveredPlanet === planet.id ? "scale-110" : ""
                  }`}
                />
                <div className="absolute -inset-4 border-2 border-dashed border-gray-400 rounded-full animate-spin-slow"></div>
              </div>

              {/* Planet Name */}
              <div className="absolute mt-2 left-1/2 -translate-x-1/2 text-gray-700 font-semibold whitespace-nowrap">
                {planet.name}
              </div>
            </div>
          ))}

          {/* Event Card Overlay */}
          {hoveredPlanet && (
            <div
              className="absolute z-30 shadow-lg w-80 transition-transform transform"
              style={{
                animation: "fadeIn 0.5s ease-in-out forwards, scaleIn 0.3s ease-in-out forwards",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src={planets.find((p) => p.id === hoveredPlanet).poster}
                alt="Event Poster"
                className="rounded-lg shadow-xl"
              />
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="w-[500px] text-right pr-8">
          <h1 className="text-4xl font-mono text-gray-700 tracking-wider mb-4">
            COMPETE, CONNECT, AND
          </h1>
          <h2 className="text-3xl font-mono text-gray-600 tracking-wide mb-6">
            CELEBRATE YOUR TALENT IN
          </h2>
          <h3 className="text-2xl font-mono text-gray-500 tracking-wide mb-8">
            VIBRANT CONTESTS
          </h3>
          <button className="bg-black text-white px-8 py-3 rounded-full font-mono text-sm hover:bg-gray-800 transition-colors">
            Competitions ▶
          </button>
        </div>
      </div>
    </div>
  );
}

export default plannet;