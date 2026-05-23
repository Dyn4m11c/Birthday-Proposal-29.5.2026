import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import './ProposalStage.css';

const ProposalStage = () => {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [noBtnPosition, setNoBtnPosition] = useState({ top: 'auto', left: 'auto' });

  // Fun mechanism: Moves the "No" button to a random spot whenever hovered
  const dodgeNoButton = () => {
    const randomTop = Math.floor(Math.random() * 60) + 15; // Tighter bounds for iPhone screens
    const randomLeft = Math.floor(Math.random() * 60) + 10;
    setNoBtnPosition({
      position: 'absolute',
      top: `${randomTop}%`,
      left: `${randomLeft}%`,
    });
  };

  // Function to render the background petals
  const renderPetals = () => {
    return (
      <div className="petals-container">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="petal"
            style={{
              left: `${Math.random() * 100}vw`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>
    );
  };

  if (hasAccepted) {
    return (
      <div className="celebration-screen">
        <Confetti numberOfPieces={600} recycle={false} gravity={0.15} />
        {renderPetals()}
        <motion.div 
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="celebration-content"
        >
          <h1>💍 يا عيني ❤️</h1>
          <p>الجزء الحلو من قصتنا اسا رح يبلش</p>
          <div className="hearts-raining">✨🥂✨</div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="proposal-screen">
      {renderPetals()}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="proposal-card"
      >
        <p className="proposal-sub">من لما عرفتك وأنا متأكد اني بدي اياكي</p>
        <h1 className="proposal-title">بتقبلي نكون لبعض وتتجوزيني؟</h1>

        <div className="action-buttons">
          {/* YES BUTTON */}
          <button 
            className="btn-yes" 
            onClick={() => setHasAccepted(true)}
          >
           😍 يس
          </button>

          {/* NO BUTTON */}
          <button 
            className="btn-no"
            style={noBtnPosition}
            onMouseEnter={dodgeNoButton}
            onClick={dodgeNoButton} // For mobile touchscreen users
          >
           😢 لا
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProposalStage;