import React from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import useGameLogic from './hooks/useGameLogic';
import './styles/App.scss';

const App: React.FC = () => {
  const {
    username,
    setUsername,
    started,
    handleStart,
    score,
    fails,
    message,
    indicator,
  } = useGameLogic();

  return (
    <div className='app'>
      {!started ? (
        <StartScreen
          username={username}
          setUsername={setUsername}
          handleStart={handleStart}
        />
      ) : (
        <GameScreen
          score={score}
          fails={fails}
          message={message}
          indicator={indicator}
        />
      )}
    </div>
  );
};

export default App;
