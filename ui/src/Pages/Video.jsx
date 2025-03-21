import React from "react";

const VideoSection = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-gray-100 to-gray-300"></div>

      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          className="w-full h-full absolute inset-0"
          src="https://www.youtube.com/embed/2r83OCYKKeY?autoplay=1&loop=1&playlist=2r83OCYKKeY&mute=1&controls=0&showinfo=0&modestbranding=1&rel=0&vq=hd1080"
          title="Background Video"
          frameBorder="0"
          allow="autoplay"
          allowFullScreen
          style={{ pointerEvents: "none", objectFit: "cover" }} // Prevents user interaction & covers full area
        ></iframe>
      </div>
    </section>
  );
};

export default VideoSection;
