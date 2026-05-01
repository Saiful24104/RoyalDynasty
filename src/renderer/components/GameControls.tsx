import React from 'react';
import { GameEngine } from '../../game/engine';
import { GameState } from '../../shared/types';
import { GAME_SPEED } from '../../shared/constants';

interface GameControlsProps {
  gameEngine: GameEngine;
  gameState: GameState;
}

const GameControls: React.FC<GameControlsProps> = ({ gameEngine, gameState }) => {
  const currentSpeed = gameState.gameTime.speed;

  return (
    <div className="game-controls">
      <h3>Game Controls</h3>

      <div className="controls-section">
        <h4>Game Speed</h4>
        <div className="speed-buttons">
          <button onClick={() => gameEngine.setGameSpeed(GAME_SPEED.PAUSE)}>
            ⏸️ Pause
          </button>
          <button onClick={() => gameEngine.setGameSpeed(GAME_SPEED.SLOW)}>
            🐢 Slow
          </button>
          <button onClick={() => gameEngine.setGameSpeed(GAME_SPEED.NORMAL)}>
            ▶️ Normal
          </button>
          <button onClick={() => gameEngine.setGameSpeed(GAME_SPEED.FAST)}>
            ⏩ Fast
          </button>
          <button onClick={() => gameEngine.setGameSpeed(GAME_SPEED.VERY_FAST)}>
            ⏭️ V.Fast
          </button>
        </div>
        <div className="current-speed">
          Speed: {currentSpeed}x
        </div>
      </div>

      <div className="controls-section">
        <h4>Game Actions</h4>
        <button className="action-button" onClick={() => gameEngine.togglePause()}>
          {currentSpeed === 0 ? 'Resume' : 'Pause'}
        </button>
      </div>

      <div className="controls-section">
        <h4>Game Time</h4>
        <div className="time-display">
          <div className="time-value">
            {String(gameState.gameTime.hour).padStart(2, '0')}:{String(gameState.gameTime.minute).padStart(2, '0')}
          </div>
          <div className="date-value">
            Year {gameState.gameTime.year}, Month {gameState.gameTime.month}, Day {gameState.gameTime.day}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameControls;
