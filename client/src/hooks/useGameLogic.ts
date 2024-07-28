import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

const useGameLogic = () => {
  const [username, setUsername] = useState('');
  const [started, setStarted] = useState(false);
  const [indicator, setIndicator] = useState<'left' | 'right' | null>(null);
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);
  const [fails, setFails] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const messageTimeoutRef = useRef<number | null>(null);

  const clearCurrentTimeouts = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
  };

  const onFail = (msg: string) => {
    setMessage(msg);
    setFails((prevFails) => prevFails + 1);
    messageTimeoutRef.current = setTimeout(() => setMessage(''), 1000);
  };

  const onSuccess = () => {
    setMessage('Success');
    setScore((prevScore) => prevScore + 1);
    messageTimeoutRef.current = setTimeout(() => setMessage(''), 1000);
  };

  const onSetIndicator = (state: 'left' | 'right' | null) => {
    setIndicator(state);
  };

  const handleStart = async () => {
    try {
      await axios.post('/api/users', { username });
      setStarted(true);
      startInitialWaiting();
    } catch (error) {
      setMessage('Failed to add user');
      messageTimeoutRef.current = setTimeout(() => setMessage(''), 1000);
    }
  };

  const startInitialWaiting = useCallback(() => {
    const delay = Math.random() * 3000 + 2000;
    clearCurrentTimeouts();
    timeoutRef.current = setTimeout(() => {
      const side = Math.random() > 0.5 ? 'left' : 'right';
      onSetIndicator(side);
      clearCurrentTimeouts();
      timeoutRef.current = setTimeout(() => {
        if (indicator) {
          onFail('Too Late');
          onSetIndicator(null);
          startInitialWaiting();
        }
      }, 1000);
    }, delay);
  }, [indicator]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!started) return;

      const keysPressed = e.key === 'a' || e.key === 'l';

      if (!indicator) {
        onFail('Too Soon');
      } else if (indicator && keysPressed) {
        if (
          (e.key === 'a' && indicator === 'left') ||
          (e.key === 'l' && indicator === 'right')
        ) {
          onSuccess();
          axios.post('/api/users/score', { username, success: true });
        } else {
          onFail('Wrong Key');
        }
        onSetIndicator(null);
        startInitialWaiting();
      }
    },
    [indicator, startInitialWaiting, started, username]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return {
    username,
    setUsername,
    started,
    handleStart,
    score,
    fails,
    message,
    indicator,
  };
};

export default useGameLogic;
