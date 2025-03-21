import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoadingAnimation = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate("/start"), 500); // Navigate after 100%
          return 100;
        }
        return oldProgress + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-white to-blue-200">
      <div className="flex items-center space-x-2">
        <p className="text-black text-4xl font-bold">LOADING</p>
        <motion.div
          className="w-6 h-6 bg-black rounded-full"
          animate={{ x: [0, 100, 200, 300, 400, 500], opacity: [1, 1, 1, 1, 0] }}
          transition={{ duration: 5, ease: "easeInOut" }}
        />
      </div>
      <div className="relative w-[80%] h-6 mt-4 bg-white rounded-full border border-black">
        <motion.div
          className="absolute top-0 left-0 h-full bg-black rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-black text-4xl font-bold mt-2">{progress}%</p>
    </div>
  );
};

export default LoadingAnimation;
