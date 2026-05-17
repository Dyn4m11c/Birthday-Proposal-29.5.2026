import React from 'react';
import { motion } from 'framer-motion';

const MessageStage = ({ onNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      style={{ 
        background: 'rgba(255, 255, 255, 0.05)', 
        padding: '40px', 
        borderRadius: '20px', 
        maxWidth: '600px', 
        textAlign: 'center', 
        backdropFilter: 'blur(10px)', 
        zIndex: 10 
      }}
    >
      <h2 style={{ color: '#ff4d4d', marginBottom: '20px', fontSize: '2.2rem' }}>My Dearest,</h2>
      <p style={{ lineHeight: '1.8', fontSize: '1.2rem', marginBottom: '30px' }}>
        Every moment with you feels like a dream I never want to wake up from. 
        Today is all about celebrating the incredible person you are. 
        I built this little corner of the internet just for us, so we can look back on everything we've built together.
      </p>
      <button onClick={onNext}>Our Memories ❤️</button>
    </motion.div>
  );
};
export default MessageStage;