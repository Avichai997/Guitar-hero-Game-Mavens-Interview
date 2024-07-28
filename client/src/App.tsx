import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import './App.scss';

axios.defaults.baseURL = 'http://localhost:5000';

const App = () => {
  const [username, setUsername] = useState('');
  const [started, setStarted] = useState(false);
  const [indicator, setIndicator] = useState<'left' | 'right' | null>(null);
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);
  const [fails, setFails] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  const clearCurrentTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };
  const onFail = () => {
    setFails((prevFails) => prevFails + 1);
  };
  const onSuccess = () => {
    setScore((prevScore) => prevScore + 1);
  };

  const handleStart = async () => {
    try {
      await axios.post('/api/users', { username });
      setStarted(true);
      startInitialWaiting();
    } catch (error) {
      setMessage('Failed to add user');
    }
  };

  const startGame = useCallback(() => {
    const side = Math.random() > 0.5 ? 'left' : 'right';
    setIndicator(side);
    clearCurrentTimeout();
    timeoutRef.current = setTimeout(() => {
      if (indicator) {
        setMessage('Too Late');
        setIndicator(null);
        onFail();
        startGame();
      }
    }, 1000);
  }, [indicator]);

  const startInitialWaiting = useCallback(() => {
    setMessage(
      'Press "a" for left side or "l"  for right to start the game 😈'
    );
    const delay = Math.random() * 3000 + 2000;
    clearCurrentTimeout();
    timeoutRef.current = setTimeout(() => {
      startGame();
    }, delay);
  }, [startGame]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!started) return;

      const keysPressed = e.key === 'a' || e.key === 'l';

      if (!indicator) {
        setMessage('Too Soon');
        onFail();
      } else if (indicator && keysPressed) {
        if (
          (e.key === 'a' && indicator === 'left') ||
          (e.key === 'l' && indicator === 'right')
        ) {
          setMessage('Success');
          onSuccess();
          axios.post('/api/users/score', { username, success: true });
        } else {
          setMessage('Wrong Key');
          onFail();
        }
        setIndicator(null);
        startGame();
      }
    },
    [indicator, startGame, started, username]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

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
          <div className='score'>Score: {score}</div>
          <div className='fails'>Fails: {fails}</div>{' '}
          {message && (
            <div
              className={`message ${
                message === 'Success' ? 'success' : 'error'
              }`}
            >
              {message}
            </div>
          )}
          {indicator && <div className={`indicator ${indicator}`}></div>}
        </div>
      )}
    </div>
  );
};

export default App;
