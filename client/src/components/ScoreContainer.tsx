import React from 'react';

interface ScoreContainerProps {
  score: number;
  fails: number;
}

const ScoreContainer: React.FC<ScoreContainerProps> = ({ score, fails }) => (
  <div className='scoreContainer'>
    <div className='score'>Score: {score}</div>
    <div className='fails'>Fails: {fails}</div>
  </div>
);

export default ScoreContainer;
