import React from 'react';
import ScoreContainer from './ScoreContainer';
import Message from './Message';
import Indicator from './Indicator';

interface GameScreenProps {
  score: number;
  fails: number;
  message: string;
  indicator: 'left' | 'right' | null;
}

const GameScreen: React.FC<GameScreenProps> = ({
  score,
  fails,
  message,
  indicator,
}) => (
  <div className='game-screen'>
    <ScoreContainer score={score} fails={fails} />
    {message && <Message message={message} />}
    <Indicator indicator={indicator} />
  </div>
);

export default GameScreen;
