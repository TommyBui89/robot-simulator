import React, { useState } from 'react';
import './App.css';
import BellroyLogo from './Images/Bellroy_logo.svg';

const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
const directionSymbols = ['↑', '→', '↓', '←'];

function App() {
  const [robot, setRobot] = useState({
    x: 0,
    y: 4,
    direction: 0,
  });

  const moveForward = () => {
    setRobot((prev) => {
      const newPos = { ...prev };
      if (directions[prev.direction] === 'NORTH' && prev.y > 0) newPos.y -= 1;
      if (directions[prev.direction] === 'EAST' && prev.x < 4) newPos.x += 1;
      if (directions[prev.direction] === 'SOUTH' && prev.y < 4) newPos.y += 1;
      if (directions[prev.direction] === 'WEST' && prev.x > 0) newPos.x -= 1;
      return newPos;
    });
  };

  const rotateRight = () => {
    setRobot((prev) => ({
      ...prev,
      direction: (prev.direction + 1) % 4,
    }));
  };

  const rotateLeft = () => {
    setRobot((prev) => ({
      ...prev,
      direction: (prev.direction + 3) % 4,
    }));
  };

  return (
    <div className="App">
      <img src={BellroyLogo} alt="Bellroy Logo" className="logo" />
      <h1>Robot Simulator</h1>
      <div className="grid">
        {[...Array(5)].map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {[...Array(5)].map((_, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${
                  robot.x === colIndex && robot.y === rowIndex
                    ? 'robot'
                    : ''
                }`}
              >
                {robot.x === colIndex && robot.y === rowIndex ? directionSymbols[robot.direction] : ''}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="controls">
        <button className="rotate-left" onClick={rotateLeft}>⟲ Rotate Left</button>
        <button className="move-forward" onClick={moveForward}>↑ Move Forward</button>
        <button className="rotate-right" onClick={rotateRight}>⟳ Rotate Right</button>
      </div>
    </div>
  );
}

export default App;
