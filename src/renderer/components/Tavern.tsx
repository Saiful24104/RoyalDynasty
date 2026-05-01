import React from 'react';
import { GameState } from '../../shared/types';
import { GameManager } from '../../game/manager';

interface TavernProps {
  gameState: GameState;
  gameManager: GameManager;
}

const Tavern: React.FC<TavernProps> = ({ gameState, gameManager }) => {
  const tavern = gameState.tavern;

  return (
    <div className="tavern-view">
      <h2>The {tavern.name}</h2>

      <div className="tavern-sections">
        <div className="section">
          <h3>Tavern Status</h3>
          <div className="info-block">
            <div className="stat-row">
              <span>Tavern Level:</span>
              <span>{tavern.level}</span>
            </div>
            <div className="stat-row">
              <span>Patrons:</span>
              <span>{tavern.patrons.length}</span>
            </div>
            <div className="stat-row">
              <span>Treasury:</span>
              <span className="gold">{tavern.treasury.toLocaleString()}</span>
            </div>
            <div className="stat-row">
              <span>Active Rumors:</span>
              <span>{tavern.rumors.length}</span>
            </div>
          </div>
        </div>

        <div className="section">
          <h3>Regular Patrons</h3>
          {tavern.patrons.length > 0 ? (
            <div className="patrons-list">
              {tavern.patrons.map(patron => (
                <div key={patron.id} className="patron-card">
                  <h4>{patron.name}</h4>
                  <div className="patron-info">
                    <div className="info-row">
                      <span>Type:</span>
                      <span>{patron.type}</span>
                    </div>
                    <div className="info-row">
                      <span>Loyalty:</span>
                      <div className="bar">
                        <div className="fill" style={{ width: `${patron.loyalty}%` }}></div>
                      </div>
                      <span>{patron.loyalty}%</span>
                    </div>
                    <div className="info-row">
                      <span>Gold Spent:</span>
                      <span className="gold">{patron.goldSpent}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No regular patrons yet</p>
          )}
        </div>

        <div className="section">
          <h3>Rumors & Gossip</h3>
          {tavern.rumors.length > 0 ? (
            <div className="rumors-list">
              {tavern.rumors.map(rumor => (
                <div key={rumor.id} className="rumor-card">
                  <p className="rumor-text">{rumor.content}</p>
                  <div className="rumor-meta">
                    <span className="source">Source: {rumor.source}</span>
                    <span className={rumor.verified ? 'verified' : 'unverified'}>
                      {rumor.verified ? '✓ Verified' : '? Unverified'}
                    </span>
                    <span className="importance">Importance: {rumor.importance}/10</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No rumors yet. Visit the tavern to hear tales!</p>
          )}
        </div>

        <div className="section">
          <h3>Tavern Actions</h3>
          <div className="action-buttons">
            <button className="action-button">Buy Drinks (100 gold)</button>
            <button className="action-button">Host Tournament (500 gold)</button>
            <button className="action-button">Gather Intelligence (200 gold)</button>
            <button className="action-button">Recruit Mercenaries</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tavern;
