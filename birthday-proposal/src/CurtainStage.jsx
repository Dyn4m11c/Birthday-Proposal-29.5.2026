import React, { useState, useEffect } from 'react';
import './CurtainStage.css';

const CurtainStage = ({ onNext }) => {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    // Automatically trigger the opening transition shortly after mounting
    const timer = setTimeout(() => setIsOpened(true), 500);
    
    // Proceed to the text message stage after the curtains slide completely off-screen
    const nextTimer = setTimeout(() => onNext(), 2500); 

    return () => {
      clearTimeout(timer);
      clearTimeout(nextTimer);
    };
  }, [onNext]);

  return (
    <div className="curtain-scene">
      <div className={`curtain left-side ${isOpened ? 'open' : ''}`} />
      <div className={`curtain right-side ${isOpened ? 'open' : ''}`} />
    </div>
  );
};

export default CurtainStage;