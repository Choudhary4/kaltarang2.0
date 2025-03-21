import React from 'react';

const AnimatedGrid = () => {
  // Create an array of grid cells
  const cells = Array.from({ length: 256 }, (_, i) => (
    <span key={i} className="grid-cell" />
  ));

  return (
    <section className="animated-grid">
      {cells}
    </section>
  );
};

export default AnimatedGrid;