import React from 'react';
import { motion } from 'framer-motion';
import './GalleryStage.css';

const memories = [
  { id: 1, img: 'https://via.placeholder.com/400x300?text=Photo+1', note: "Our first date here!" },
  { id: 2, img: 'https://via.placeholder.com/400x300?text=Photo+2', note: "You make my world beautiful." },
  { id: 3, img: 'https://via.placeholder.com/400x300?text=Photo+3', note: "That amazing trip!" },
  { id: 4, img: 'https://via.placeholder.com/400x300?text=Photo+4', note: "Laughing until we cried." },
  { id: 5, img: 'https://via.placeholder.com/400x300?text=Photo+5', note: "A quiet moment together." },
  { id: 6, img: 'https://via.placeholder.com/400x300?text=Photo+6', note: "To many more years to come. ❤️" }
];

const GalleryStage = ({ onNext, onProposal }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="gallery-container">
      <h2 className="gallery-title">Moments in Time</h2>
      <div className="memory-grid">
        {memories.map((item) => (
          <div key={item.id} className="memory-card">
            <img src={item.img} alt="Memory" />
            <div className="card-overlay">
              <p>{item.note}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button onClick={() => {
          if (onProposal) onProposal();
          onNext();
        }}>
          There's just one more thing... ✨
        </button>
      </div>
    </motion.div>
  );
};

export default GalleryStage;