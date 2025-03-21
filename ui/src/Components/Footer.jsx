import React from "react";
import World from "../assets/World.png";

const ExplorerPath = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-grid text-black text-center overflow-hidden">
      <p className="text-sm tracking-widest text-gray-400 mb-2">-- EXPLORER PATH --</p>
      <h1 className="text-4xl md:text-6xl font-bold pixelated">WHICH WORLD CALLS TO YOU?</h1>
      <p className="text-lg text-gray-300 mt-2">FIND YOUR PATH TO A NEW WORLD</p>
      
      {/* Image container with clipping */}
      <div className="absolute bottom-0 w-full flex justify-center overflow-hidden">
        <img
          src={World}
          alt="World"
          className="w-96 h-96 md:w-[500px] md:h-[500px] object-contain pixelated translate-y-1/4"
        />
      </div>
    </div>
  );
};

export default ExplorerPath;
