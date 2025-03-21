import React from "react";
import "./style.css"

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full text-black text-center">
      {/* Main Title */}
      <h1 
  className="text-[clamp(6rem,22.5vw,18rem)] font-drunk text-[18rem] uppercase">
  KALTARANG
</h1>



      {/* Bottom Section */}
      <div className="absolute bottom-10 w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-6 text-sm uppercase space-y-4 md:space-y-0">
        {/* Toggle Switch */}
        <div className="flex items-center">
          <span className="mr-2">Off</span>
          <div className="w-12 h-6 bg-gray-400 rounded-full relative">
            <div className="w-5 h-5 bg-black rounded-full absolute left-1 top-1"></div>
          </div>
        </div>

        <p className="text-center text-xs sm:text-sm md:text-base">
          Are You Ready to Step Into the World of Pixel?
        </p>

        {/* Speech Bubble Styled Button */}
        <button className="relative bg-black text-white text-sm md:text-base px-5 py-2 border-4 border-gray-300 uppercase 
                           before:absolute before:-bottom-2 before:left-3 before:w-4 before:h-4 before:bg-black
                           before:clip-polygon-triangle">
          Register Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
