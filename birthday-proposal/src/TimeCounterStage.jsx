import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TimeCounterStage.css';

const TimeCounterStage = ({ onNext }) => {
  // 1. REPLACE THIS WITH YOUR EXACT ANIVERSARY DATE & TIME
  // Format: YYYY, MM (0-indexed: Jan=0, Feb=1, etc.), DD, HH, MM, SS
  const ANNIVERSARY_DATE = new Date(2025, 10, 11, 15, 30, 0); 

  const [timeElapsed, setTimeElapsed] = useState({
    years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      let diff = now.getTime() - ANNIVERSARY_DATE.getTime();

      // Math calculations for time intervals
      const msInSecond = 1000;
      const msInMinute = msInSecond * 60;
      const msInHour = msInMinute * 60;
      const msInDay = msInHour * 24;

      // Approximate values for longer stretches
      const msInMonth = msInDay * 30.436875; 
      const msInYear = msInDay * 365.25;

      const years = Math.floor(diff / msInYear);
      diff %= msInYear;

      const months = Math.floor(diff / msInMonth);
      diff %= msInMonth;

      const days = Math.floor(diff / msInDay);
      diff %= msInDay;

      const hours = Math.floor(diff / msInHour);
      diff %= msInHour;

      const minutes = Math.floor(diff / msInMinute);
      diff %= msInMinute;

      const seconds = Math.floor(diff / msInSecond);

      setTimeElapsed({ years, months, days, hours, minutes, seconds });
    };

    // Initialize instantly, then update every 1000ms
    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Pad single digits with a leading zero for a clean dashboard look
  const formatNum = (num) => String(num).padStart(2, '0');

  return (
    <div className="counter-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="counter-card"
      >
        <span className="counter-subtitle">...بفكر فيكي بكل تانية بحياتي</span>
        <h2 className="counter-title">عنجد حبيتك من أول نظرة</h2>

        <div className="dashboard-grid">
          {Object.entries(timeElapsed).map(([unit, value]) => (
            <div key={unit} className="dashboard-slot">
              {/* AnimatePresence makes changing numbers glide cleanly */}
              <div className="number-wrapper">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={value}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 15 }}
                    className="time-number"
                  >
                    {formatNum(value)}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="time-label">{unit.toUpperCase()}</span>
            </div>
          ))}
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="counter-next-btn"
          onClick={onNext}
        >
           نكمل رحلتنا ➔
        </motion.button>
      </motion.div>
    </div>
  );
};

export default TimeCounterStage;