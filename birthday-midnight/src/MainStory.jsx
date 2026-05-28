import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import './MainStory.css';

const MainStory = () => {
  // -------------------------------------------------------------
  // 1. SET YOUR TARGET UNLOCK DATE & TIME HERE
  // Format: YYYY, MM (0-indexed: Jan=0, Feb=1, etc.), DD, Hour, Min, Sec
  // Example: June 15, 2026 at 00:00:00 (Midnight)
  const UNLOCK_DATE = new Date(2026, 4, 29, 0, 0, 0); 
  
  // 2. SET YOUR RELATIONSHIP ANNIVERSARY DATE HERE (For the ticker later)
  const ANNIVERSARY_DATE = new Date(2025, 10, 11, 16, 30, 0);
  // -------------------------------------------------------------

  const initialTimeRemaining = UNLOCK_DATE.getTime() - Date.now();
  const [isLocked, setIsLocked] = useState(initialTimeRemaining > 0);
  const [timeRemaining, setTimeRemaining] = useState(initialTimeRemaining > 0 ? initialTimeRemaining : 0);
  const [diff, setDiff] = useState(() => Date.now() - ANNIVERSARY_DATE.getTime());

  const [stage, setStage] = useState(0); // 0: Welcome, 1: Letter, 2: Celebration
  const audioRef = useRef(null);

  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle the Unlock Countdown
  useEffect(() => {
    if (!isLocked) return;
    const lockInterval = setInterval(() => {
      const remaining = UNLOCK_DATE.getTime() - Date.now();
      if (remaining <= 0) {
        setIsLocked(false);
        clearInterval(lockInterval);
      } else {
        setTimeRemaining(remaining);
      }
    }, 1000);
    return () => clearInterval(lockInterval);
  }, [isLocked]);

  // Handle the Relationship Counter (Only runs when reading the letter)
  useEffect(() => {
    if (stage !== 1 || isLocked) return;
    const interval = setInterval(() => {
      setDiff(Date.now() - ANNIVERSARY_DATE.getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [stage, isLocked]);

  // Derived formatting state (Calculated during render to keep state simple)
  const pad = (num) => String(num).padStart(2, '0');
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  const countdownText = `${days}d : ${pad(hours)}h : ${pad(minutes)}m : ${pad(seconds)}s`;

  const msInSecond = 1000, msInMinute = 60000, msInHour = 3600000, msInDay = 86400000, msInMonth = msInDay * 30.436, msInYear = msInDay * 365.25;
  const timeElapsed = {
    years: Math.floor(diff / msInYear), months: Math.floor((diff % msInYear) / msInMonth), days: Math.floor((diff % msInMonth) / msInDay),
    hours: Math.floor((diff % msInDay) / msInHour), minutes: Math.floor((diff % msInHour) / msInMinute), seconds: Math.floor((diff % msInMinute) / msInSecond)
  };

  // --- THE LOCKED VIEW ---
  if (isLocked) {
    return (
      <div className="story-container locked-bg">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="central-card"
          dir="rtl"
        >
          <span className="gold-tag">بلشت المفاجآت</span>
          <h1 className="main-heading">الصبر يا حلوة شوي...</h1>
          <p className="subtext">بفتح بس يخلص الوقت:</p>
          <div className="countdown-display" dir="ltr">{countdownText}</div>
        </motion.div>
      </div>
    );
  }

  // --- THE UNLOCKED APP ---
  return (
    <div className="story-container">
      {/* Background Birthday Song */}
      <audio ref={audioRef} src="Kol Sana.mp3" loop />

      {/* Full-screen Confetti when Unlocked */}
      {stage === 2 && (
        <Confetti 
          width={windowSize.width} 
          height={windowSize.height} 
          recycle={true} 
          colors={['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#ffd166', '#f94144']}
        />
      )}

      <AnimatePresence mode="wait">
        
        {/* STAGE 0: WELCOME SCREEN */}
        {stage === 0 && (
          <motion.div 
            key="welcome"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}
            className="central-card"
            dir="rtl"
          >
            <span className="gold-tag">اليوم يومك يحلوة</span>
            <h1 className="main-heading">كل سنة وانت سالمة يا شخصي المفضل🎂</h1>
            <p className="subtext">هاي بداية المفاجآت الي محضرها</p>
            <button className="premium-btn" onClick={() => {
              setStage(1);
              if (audioRef.current) audioRef.current.play();
            }}>يلا نبلش</button>
          </motion.div>
        )}

        {/* STAGE 1: THE COUNTER + EXTENDED LETTER */}
        {stage === 1 && (
          <motion.div 
            key="letter"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 1 }}
            className="scrollable-letter-view"
          >
            <div className="mini-ticker-container" dir="rtl">
              <p className="ticker-label">حبيتك من اول لحظة:</p>
              <div className="ticker-digits">
                {timeElapsed.years} سنين، و {timeElapsed.months} أشهر، و {timeElapsed.days} أيام، و {timeElapsed.hours} ساعات، و {timeElapsed.minutes} دقائق، و {timeElapsed.seconds} ثوان
              </div>
            </div>

            <div className="letter-content" dir="rtl">
              <h2>إلى محور الكون وملكة جمال القارات السبعة،</h2>
              <p> </p>
              <p>بس اشوف الوقت الي محطوط فوق عنجد بتأثر لانو كل تانية عشتها معك كانت احلى من الي قبل، انت الحدا الي عنجد بخليني افكر اني اكمل الطريق واشد اكتر واكتر وانجح بحياتي عشان اغدر اخليكي تكوني مبسوطة انك معي.</p>
              <p>كل سنة وانت الحياة الي فيي،
     كل سنة وانت السنة تاعتي،
     كل سنة وانت قطعة مني،
     كل سنة وانت قلبي النابض،
     كل سنة وانت انا يا انا،
     كل سنة وانت روحي برا جسمي،
     كل سنة وانت كل الخير،
     ان شاء الله سنينك كلها خير وصحة وسعادة يا عمري بتمنالك كل الخير من كل قلبي،
     بحبك
     🫶🏽    </p>
              <p className="letter-closing">شكراً لمجرد انك كل دنيتي، رح أحبك للأبد.</p>
              
              <button className="premium-btn continue-btn" onClick={() => setStage(2)}>
                نبدأ الاحتفال!
              </button>
            </div>
          </motion.div>
        )}

        {/* STAGE 2: THE CELEBRATION */}
        {stage === 2 && (
          <motion.div 
            key="celebration"
            initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: 0.8 }}
            className="central-card success-view"
            style={{ position: "relative", overflow: "hidden" }}
            dir="rtl"
          >
            <h1 className="success-title">🎉 كل سنة وانت سالمة شهودتي الحلوة 🎂</h1>
            <p className="success-sub">بتمنالك كل الخير من كل قلبي يقلبي انت!</p>
            <div className="sparkles" style={{ zIndex: 1, position: "relative" }}>✨🎁✨</div>
            
            {/* Subtle Particle Effect */}
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                initial={{ opacity: 0, y: "100%", x: `${Math.random() * 100}%`, scale: Math.random() * 0.5 + 0.5 }}
                animate={{ opacity: [0, 1, 0], y: "-20%", x: `${Math.random() * 100}%` }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 2
                }}
                style={{ position: "absolute", bottom: "-10%", left: 0, fontSize: "1.5rem", zIndex: 0 }}
              >
                {['✨', '🎉', '💖', '🎂', '🎈'][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default MainStory;