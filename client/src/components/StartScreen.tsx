import React from 'react';

interface StartScreenProps {
  username: string;
  setUsername: (username: string) => void;
  handleStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({
  username,
  setUsername,
  handleStart,
}) => (
  <div className='start-screen'>
    <input
      type='text'
      placeholder='Enter your name'
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
    <button onClick={handleStart}>START</button>
  </div>
);

export default StartScreen;
