import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const InteractiveStage = ({ onNext, playMusic }) => {
  const [step, setStep] = useState(0);

  // Restore the original background color when leaving this stage
  useEffect(() => {
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleAction = () => {
    if (step < 2) {
      // Fade the background to black when "Dim the lights" is clicked
      if (step === 0) {
        document.body.style.backgroundColor = '#000000';
      }
      
      // If they just clicked "Play some music", start the audio
      if (step === 1 && playMusic) {
        playMusic();
      }
      setStep(step + 1);
    } else {
      onNext();
    }
  };

  const buttonTexts = ["💡 منطفي الضي", "🎵 ومنشغل اغاني", "Reveal the surprise ✨"];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      style={{ textAlign: 'center', zIndex: 10 }}
    >
      <h2 style={{ marginBottom: '30px', fontSize: '2rem' }}>... هات نبدأ نجهز الأجواء</h2>
      <button onClick={handleAction}>{buttonTexts[step]}</button>
    </motion.div>
  );
};
export default InteractiveStage;