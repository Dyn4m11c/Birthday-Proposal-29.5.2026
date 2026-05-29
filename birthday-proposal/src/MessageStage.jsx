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
      <h2 style={{ color: '#ff4d4d', marginBottom: '20px', fontSize: '2.2rem' }}>,عزيزة قلبي وأميرة حياتي</h2>
      <p style={{ lineHeight: '1.8', fontSize: '1.2rem', marginBottom: '30px' }}>
    كل تانية بتمرق من حياتي وانت معي زي الحلم الي بديش اصحى منو,
     كل سنة وانت سالمة حبيبتي ان شاء الله تكون حياتك كلها صحة وسعادة ونجاح,
     وهاي عشان احتفل فيكي اليوم وافرجيكي عنجد انك دنيتي, 
     لاني بعشقك ولانك بتستاهلي يا احلى انسانة شفتها بحياتي
      </p>
      <button onClick={onNext}>❤️...لكل تانية</button>
    </motion.div>
  );
};
export default MessageStage;
