import React from "react";
import AboutImage from "../assets/Pixel.png"; // About section image

const About = () => {
  return (
    <section className="relative w-full flex flex-col items-center text-center py-12 px-4 bg-grid bg-cover bg-center">
      {/* Bottom Curved Gradient for Lens Effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-[40%] 
                      bg-gradient-to-t from-gray-300/60 to-transparent 
                      rounded-t-full pointer-events-none"></div>

      {/* Welcome Text */}
      <p className="text-sm uppercase tracking-widest text-gray-500 relative z-10">
        ─── WELCOME EXPLORER ───
      </p>

      {/* Description */}
      <h2 className="text-lg md:text-xl font-light mt-2 max-w-3xl relative z-10">
        Embark on the journey across distant worlds,
        <br /> within its own mysteries, blocks, and pixels,
        <br /> blending each block with bits.
      </h2>

      {/* Image */}
      <img src={AboutImage} alt="About Kaltarang" className="mt-6 w-[80%] max-w-3xl relative z-10" />

      {/* Dummy Text */}
      <p className="mt-6 text-xs md:text-sm max-w-4xl text-gray-600 leading-relaxed relative z-10">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type 
        specimen book. It has survived not only five centuries, but also the leap into 
        electronic typesetting, remaining essentially unchanged.
      </p>
    </section>
  );
};

export default About;
