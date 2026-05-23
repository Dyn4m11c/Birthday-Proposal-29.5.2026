import React from 'react';
import { motion } from 'framer-motion';

const WelcomeStage = ({ onNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{ textAlign: 'center', zIndex: 10 }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '40px' }}>🎉كل سنة وانت سالمة شهودتي</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '35px', color: '#ccc' }}>
       ... عملتلك مفاجأة صغيرة عشان نحتفل بيومك الخاص
      </p>
      <button onClick={onNext}>🎁 يلا نبلش المفاجأة</button>
    </motion.div>
  );
};
export default WelcomeStage;