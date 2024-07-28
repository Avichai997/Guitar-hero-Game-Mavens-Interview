import { useState, useEffect, useCallback } from 'react';
import './App.scss';

const App = () => {
  const [username, setUsername] = useState('');
  const [started, setStarted] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [indicator, setIndicator] = useState<'left' | 'right' | null>(null);
  const [message, setMessage] = useState('');

  const handleStart = () => {
    setStarted(true);
    startGame();
  };

  const startGame = useCallback(() => {
    setWaiting(true);
    setMessage('');
    const delay = Math.random() * 3000 + 2000;
    setTimeout(() => {
      setWaiting(false);
      const side = Math.random() > 0.5 ? 'left' : 'right';
      setIndicator(side);
      setTimeout(() => {
        if (indicator) {
          setMessage('Too Late');
          setIndicator(null);
          startGame();
        }
      }, 1000);
    }, delay);
  }, [indicator]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (waiting) {
        setMessage('Too Soon');
        startGame();
      } else if (indicator && (e.key === 'a' || e.key === 'l')) {
        if (
          (e.key === 'a' && indicator === 'left') ||
          (e.key === 'l' && indicator === 'right')
        ) {
          setMessage('Success');
        } else {
          setMessage('Wrong Key');
        }
        setIndicator(null);
        startGame();
      }
    },
    [indicator, startGame, waiting]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress, indicator, waiting]);

  return (
    <div className='app'>
      {!started ? (
        <div className='start-screen'>
          <input
            type='text'
            placeholder='Enter your name'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleStart}>START</button>
        </div>
      ) : (
        <div className='game-screen'>
          {waiting && <div className='waiting'>Wait...</div>}
          {indicator && <div className={`indicator ${indicator}`}></div>}
          {message && (
            <div
              className={`message ${
                message === 'Success' ? 'success' : 'error'
              }`}
            >
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
