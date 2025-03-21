import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moonImage from "../assets/moon.png"; // Replace with actual moon image path

const MoonReveal = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/home"), 3000); // Redirect to main site
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-white to-blue-200">
      <motion.img
        src={moonImage}
        alt="KALTARANG"
        className="w-32 h-32 md:w-96 md:h-96"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      <p className="absolute text-black text-4xl font-bold">KALTARANG</p>
    </div>
  );
};

export default MoonReveal;
