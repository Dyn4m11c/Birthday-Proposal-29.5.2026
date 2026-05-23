import React, { useState, useRef } from 'react';
import VaultStage from './VaultStage';
import WelcomeStage from './WelcomeStage';
import InteractiveStage from './InteractiveStage';
import CurtainStage from './CurtainStage';
import MessageStage from './MessageStage';
import TimeCounterStage from './TimeCounterStage';
import GalleryStage from './GalleryStage';
import ProposalStage from './ProposalStage';
import FloatingParticles from './FloatingParticles';
import './App.css';

function App() {
  const [stage, setStage] = useState(0);
  const beginningMusicRef = useRef(null);
  const bgMusicRef = useRef(null);
  const proposalMusicRef = useRef(null);

  const nextStage = () => setStage((prev) => prev + 1);

  // Starts the first song
  const startBackgroundMusic = () => {
    if (beginningMusicRef.current) beginningMusicRef.current.play();
  };
  
  const playBirthdayMusic = () => {
    if (beginningMusicRef.current) beginningMusicRef.current.pause();
    if (bgMusicRef.current) bgMusicRef.current.play();
  };

  // Stops the first song and starts the second one for the proposal
  const triggerProposalMusic = () => {
    if (bgMusicRef.current) bgMusicRef.current.pause();
    if (proposalMusicRef.current) proposalMusicRef.current.play();
  };

  return (
    <div className="app-container">
      {/* Global Audio Players */}
      <audio ref={bgMusicRef} src="/Ahmad Akkad - Kebrit Sene [Official Video]  أحمد العقاد - كبرت سنه.mp3" loop />
      <audio ref={proposalMusicRef} src="/السبع.mp3" loop />
      <audio ref={beginningMusicRef} src="/Kol Sana.mp3" loop />

      {/* Show particles in the background for stages 2 through 4 */}
      {stage > 1 && stage < 5 && <FloatingParticles />}
      
      {stage === 0 && <VaultStage onNext={nextStage} />}
      {stage === 1 && <WelcomeStage onNext={nextStage} playMusic={startBackgroundMusic} />} 
      {stage === 2 && <InteractiveStage onNext={nextStage} playMusic={playBirthdayMusic} />}
      {stage === 3 && <CurtainStage onNext={nextStage} />}
      {stage === 4 && <MessageStage onNext={nextStage} />}
      {stage === 5 && <TimeCounterStage onNext={nextStage} />}
      {stage === 6 && <GalleryStage onNext={nextStage} onProposal={triggerProposalMusic} />}
      {stage === 7 && <ProposalStage />}
    </div>
  );
}

export default App;