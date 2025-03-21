import { motion, AnimatePresence } from "framer-motion";

export function PlanetCard({ title, description, color, number, image, isVisible, onClose, onMouseEnter, onMouseLeave }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          onMouseEnter={onMouseEnter} // Prevent flickering
          onMouseLeave={onMouseLeave} // Hide when leaving the card
        >
          <motion.div className="relative max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <div className="border-2 border-gray-800" style={{ backgroundColor: color }}>
              <div className="relative w-full aspect-video">
                <img src={image} alt={title} className="object-cover w-full h-full" />
              </div>
              <div className="p-8 text-white">
                <div className="mb-4">
                  <span className="text-4xl font-mono text-[#4ECCA3]">{number}</span>
                  <span className="text-xl font-mono">/04</span>
                </div>
                <h2 className="text-2xl font-mono mb-4 text-[#4ECCA3]">{title}</h2>
                <p className="font-mono leading-relaxed uppercase text-sm">{description}</p>
              </div>
            </div>
            <div className="absolute -left-4 -bottom-4 w-12 h-12 border-2 border-gray-800 rotate-45" />
            <div className="absolute -right-4 -top-4 w-12 h-12 border-2 border-gray-800 rotate-45" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
