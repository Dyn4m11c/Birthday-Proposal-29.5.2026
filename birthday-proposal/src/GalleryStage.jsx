import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './GalleryStage.css';

const memories = [
  { id: 1, img: '/img1.JPG', note: "🤤 اما الجمال والتلتليم موضوع تاني" },
  { id: 2, img: '/img2.JPG', note: "🥺 ai الصورة الوحيدة الي بتجمعنا مش" },
  { id: 3, img: '/img3.JPG', note: "🥰 وبكِ أيقنْتُ أنّي أملِكُ من الحظ أجمله" },
  { id: 4, img: '/img4.JPG', note: "🌷 أحلى وردة بتزهر بحديقة حياتي" },
  { id: 5, img: '/img5.JPG', note: "🌘 القمر الي ضاويلي حياتي" },
  { id: 6, img: '/img6.JPG', note: "😊 يسعدها الشغيلة اكتر وحدة بتتعب" }
];

const GalleryStage = ({ onNext, onProposal }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="gallery-container">
      <h2 className="gallery-title">لحظاتك الحلوة</h2>
      <div className="memory-grid">
        {memories.map((item) => (
          <motion.div 
            key={item.id} className="memory-card" onClick={() => setSelectedImage(item)}
            layoutId={`card-${item.id}`}>
            <img src={item.img} alt="Memory" />
            <div className="card-overlay">
              <p>{item.note}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button onClick={() => {
          if (onProposal) onProposal();
          onNext();
        }}>
          😉 ...مممم وأخرى اشي
        </button>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="modal-content"
              layoutId={`card-${selectedImage.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImage.img} alt="Enlarged memory" className="modal-image" />
              <p className="modal-note">{selectedImage.note}</p>
              <button className="modal-close-btn" onClick={() => setSelectedImage(null)}>
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default GalleryStage;