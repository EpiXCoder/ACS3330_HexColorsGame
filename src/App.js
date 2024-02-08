import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const generateRandomColor = () => {
    const randomColorPart = () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    return `#${randomColorPart()}${randomColorPart()}${randomColorPart()}`;
  };
  
  const ColorSwatch = ({ color, onCheckAnswer }) => (
    <div
      onClick={() => onCheckAnswer(color)}
      style={{
        width: '100px',
        height: '100px',
        backgroundColor: color,
        cursor: 'pointer',
        border: '1px solid black',
      }}
    />
  );
  
  const [colors, setColors] = useState([]);
  const [correctColor, setCorrectColor] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const newColors = [generateRandomColor(), generateRandomColor(), generateRandomColor()];
    const newCorrectColor = newColors[Math.floor(Math.random() * newColors.length)];
    setColors(newColors);
    setCorrectColor(newCorrectColor);
    setMessage('');
  };

  const checkAnswer = (color) => {
    if (color === correctColor) {
      setMessage('Correct!');
    } else {
      setMessage('Incorrect!');
    }
  };

  return (
    <div style={{ textAlign: 'center' }} className='game-container'>
      <div style={{ marginBottom: '10px' }} className='swatch-container'>
        {colors.map((color) => (
          <ColorSwatch key={color} color={color} onCheckAnswer={checkAnswer} />
        ))}
      </div>
      <div style={{ marginBottom: '10px' }}>Click the swatch that matches: {correctColor}</div>
      {message && <div style={{ marginBottom: '10px' }}>{message}</div>}
      <button onClick={resetGame}>Play Again</button>
    </div>
  );  
}

export default App;
