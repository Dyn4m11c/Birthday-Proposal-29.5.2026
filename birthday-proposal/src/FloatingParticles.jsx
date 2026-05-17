import React from 'react';
import './FloatingParticles.css';

const FloatingParticles = () => {
  // Generates 20 particles
  const particleArray = Array.from({ length: 20 }); 

  return (
    <div className="particle-container">
      {particleArray.map((_, index) => {
        const randomLeft = Math.random() * 100; // Random horizontal placement
        const randomDelay = Math.random() * 5;  // Random stagger times
        const randomDuration = 4 + Math.random() * 6; // Varied speeds

        return (
          <div
            key={index}
            className="balloon"
            style={{
              left: `${randomLeft}%`,
              animationDelay: `${randomDelay}s`,
              animationDuration: `${randomDuration}s`
            }}
          >
            🎈
          </div>
        );
      })}
    </div>
  );
};

export default FloatingParticles;