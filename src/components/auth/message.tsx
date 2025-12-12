import React from 'react';

interface msgType {
  msg: string | null;
  type: 'error' | 'success';
}

const Message = ({ msg, type }: msgType) => {
  if (!msg) return null;
  return (
    <div
      className={
        type === 'error'
          ? 'flex justify-center items-center text-pink-500 p-2 rounded'
          : 'text-green-500 p-2 rounded'
      }
    >
      <p>{msg}</p>
    </div>
  );
};

export default Message;
