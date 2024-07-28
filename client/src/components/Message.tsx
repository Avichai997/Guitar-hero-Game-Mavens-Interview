import React from 'react';

interface MessageProps {
  message: string;
}

const Message: React.FC<MessageProps> = ({ message }) => (
  <div className={`message ${message === 'Success' ? 'success' : 'error'}`}>
    {message}
  </div>
);

export default Message;
