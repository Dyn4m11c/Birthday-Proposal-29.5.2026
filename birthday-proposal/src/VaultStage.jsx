import React, { useState } from 'react';
import { motion } from 'framer-motion';

const VaultStage = ({ onNext }) => {
  const [date, setDate] = useState('');
  const [error, setError] = useState(false);
  
  // Set your specific anniversary date here!
  const targetDate = '2026-05-29'; // HTML date inputs always use YYYY-MM-DD format

  const checkDate = (e) => {
    e.preventDefault();
    if (date === targetDate) {
      onNext(); // Unlocks the vault
    } else {
      setError(true); // Triggers the shake animation
      setTimeout(() => setError(false), 600);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      style={{ textAlign: 'center', zIndex: 10, padding: '20px' }}
    >
      <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🔒 Protected Vault</h2>
      <p style={{ marginBottom: '30px', color: '#ccc', fontSize: '1.2rem' }}>To proceed, please enter our anniversary date.</p>
      
      <form onSubmit={checkDate} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <motion.input
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            padding: '15px 20px', fontSize: '1.2rem', borderRadius: '8px',
            border: error ? '2px solid #ff4d4d' : '2px solid #555',
            background: '#222', color: '#fff', textAlign: 'center', outline: 'none'
          }}
        />
        <button type="submit">Unlock 🗝️</button>
      </form>
    </motion.div>
  );
};
export default VaultStage;