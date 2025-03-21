import Eventcircle from '../assets/Eventscircle.png';
import SnakeEffect from '../Components/Snake';

const Highlights = () => {
  return (
    <section className="bg-grid min-h-screen px-12 py-16 text-black relative overflow-hidden">
      <SnakeEffect />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-16 mb-20">
          {/* Left Side - Image with Geometric Overlay */}
          <div className="md:w-1/2 flex justify-center md:justify-start">
            <div className="relative w-80 h-80">
              <img 
                src={Eventcircle} 
                alt="Event Highlights" 
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Side - Title */}
          <div className="md:w-1/2 pl-10">
            <div className="border-t border-b border-black py-4 px-2">
              <h3 className="text-2xl md:text-3xl font-mono tracking-wider text-center md:text-right">
                EXPLORE MINDSET
              </h3>
            </div>
            <h2 className="text-4xl md:text-5xl font-mono mt-8 leading-tight tracking-wider text-center md:text-right">
              HOW ABOUT WE
              <br />
              HAVE A LOOK
              <br />
              AT THE HIGHLIGHTS
            </h2>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-start gap-20">
          {/* Left Side - Text Content */}
          <div className="md:w-1/2 pr-10">
            <h2 className="text-2xl font-mono font-bold mb-4 tracking-wider">
              THIS YEAR, WE'LL BE CELEBRATING THE MAGIC OF MUSIC, ART, AND MORE!
            </h2>
            <p className="font-mono text-sm leading-relaxed mb-6">
              KALTARANG FEATURES THRILLING LIVE CONCERTS, ENERGETIC DANCE AND MUSIC COMPETITIONS, 
              LITERARY EVENTS, SPORTS CHALLENGES, AND HANDS-ON WORKSHOPS. WITH FLAGSHIP EVENTS 
              LIKE PRONITES, PROSHOWS, AND CREATORS CAMP, IT PROMISES UNFORGETTABLE EXPERIENCES 
              FOR PARTICIPANTS AND AUDIENCES ALIKE.
            </p>
            <button className="bg-black text-white hover:bg-black/90 font-mono px-8 py-2 rounded-md">
              Events
            </button>
          </div>

          {/* Right Side - Posters */}
          <div className="md:w-1/2 pl-10">
            <div className="grid grid-cols-2 gap-10">
              <div className="aspect-square bg-white border-2 border-black flex items-center justify-center font-mono text-lg font-bold">
                POSTER 1
              </div>
              <div className="aspect-square bg-white border-2 border-black flex items-center justify-center font-mono text-lg font-bold">
                POSTER 2
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;