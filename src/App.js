import React, { useState, useEffect } from 'react';
import './App.css';

const ColorSwatch = ({ color, onCheckAnswer, isCorrect, isSelected }) => (
  <div
    onClick={() => onCheckAnswer(color)}
    className={`color-swatch ${isSelected ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
    style={{
      width: '100px',
      height: '100px',
      backgroundColor: color,
      cursor: 'pointer',
      border: '1px solid black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontWeight: 'bold',
      textShadow: '1px 1px 2px black',
    }}
  >
    {isSelected ? color : ''}
  </div>
);

function App() {
  const generateRandomColor = () => {
    const randomColorPart = () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    return `#${randomColorPart()}${randomColorPart()}${randomColorPart()}`;
  };

  const [colors, setColors] = useState([]);
  const [correctColor, setCorrectColor] = useState('');
  const [message, setMessage] = useState('');
  const [answerSelected, setAnswerSelected] = useState(false); 

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const newColors = [generateRandomColor(), generateRandomColor(), generateRandomColor()];
    const newCorrectColor = newColors[Math.floor(Math.random() * newColors.length)];
    setColors(newColors);
    setCorrectColor(newCorrectColor);
    setMessage('');
    setAnswerSelected(false); 
  };

  const checkAnswer = (color) => {
    setAnswerSelected(true);
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
          <ColorSwatch
            key={color}
            color={color}
            onCheckAnswer={checkAnswer}
            isCorrect={color === correctColor}
            isSelected={answerSelected}
          />
        ))}
      </div>
      <div style={{ marginBottom: '10px' }}>Click the swatch that matches: {correctColor}</div>
      {message && <div style={{ marginBottom: '10px' }}>{message}</div>}
      <button onClick={resetGame}>Play Again</button>
    </div>
  );
}

export default App;
