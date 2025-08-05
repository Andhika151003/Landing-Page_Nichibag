// components/CustomCursor.jsx
import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: position.y - 10,
        left: position.x - 10,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'rgba(128, 0, 0, 0.6)',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'top 0.05s, left 0.05s',
      }}
    />
  );
};

export default CustomCursor;
