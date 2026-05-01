import React from 'react';
import { GameState } from '../../shared/types';
import { GameManager } from '../../game/manager';

interface BloodlineProps {
  gameState: GameState;
  gameManager: GameManager;
}

const Bloodline: React.FC<BloodlineProps> = ({ gameState, gameManager }) => {
  const bloodlines = gameState.bloodlines;
  const houses = gameState.houses;

  return (
    <div className="bloodline-view">
      <h2>Bloodline & Houses</h2>

      <div className="bloodline-sections">
        <div className="section">
          <h3>Royal Bloodlines</h3>
          <div className="bloodlines-list">
            {bloodlines.map(bloodline => (
              <div key={bloodline.id} className="bloodline-card">
                <h4>{bloodline.name}</h4>
                <div className="bloodline-info">
                  <div className="info-row">
                    <span>Members:</span>
                    <span>{bloodline.members.length}</span>
                  </div>
                  <div className="info-row">
                    <span>Prestige:</span>
                    <span className="prestige">{bloodline.prestige}</span>
                  </div>
                  <div className="info-row">
                    <span>Traits:</span>
                    <span>{bloodline.traits.length}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h3>Noble Houses</h3>
          <div className="houses-grid">
            {houses.map(house => (
              <div key={house.id} className="house-card">
                <div className="house-header">
                  <span className="sigil">{house.sigil}</span>
                  <h4>{house.name}</h4>
                </div>
                <div className="house-info">
                  <p className="words">"{house.words}"</p>
                  <div className="info-row">
                    <span>Power:</span>
                    <span>{house.power}</span>
                  </div>
                  <div className="info-row">
                    <span>Wealth:</span>
                    <span className="gold">{house.wealth.toLocaleString()}</span>
                  </div>
                  <div className="info-row">
                    <span>Members:</span>
                    <span>{house.members.length}</span>
                  </div>
                  <div className="info-row">
                    <span>Lands:</span>
                    <span>{house.landedTitles.join(', ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bloodline;
