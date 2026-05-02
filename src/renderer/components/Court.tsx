import React from 'react';
import { GameState } from '../../shared/types';
import { GameManager } from '../../game/manager';
import { IMAGE_ASSETS } from '../config';

interface CourtProps {
  gameState: GameState;
  gameManager: GameManager;
}

const Court: React.FC<CourtProps> = ({ gameState, gameManager }) => {
  const court = gameState.kingdom.capital.court;
  const conqueredKingdoms = gameState.otherKingdoms.filter(k => k.isConquered === true);

  const getOverlays = () => {
    const overlays = [];
    if (court.throneRoomLevel >= 10) {
      overlays.push(IMAGE_ASSETS.backgrounds.manaVeins);
    }
    if (court.throneRoomLevel >= 20) {
      overlays.push(IMAGE_ASSETS.backgrounds.throneGlow);
    }
    if (court.throneRoomLevel >= 50) {
      overlays.push(IMAGE_ASSETS.backgrounds.houseSpirits);
    }
    return overlays;
  };

  return (
    <div 
      className="court-view"
      style={{ backgroundImage: `url(${IMAGE_ASSETS.backgrounds.throneRoom})` }}
    >
      <div className="throne-room-overlays">
        {getOverlays().map((overlay, index) => (
          <div
            key={index}
            className="throne-room-overlay"
            style={{ backgroundImage: `url(${overlay})` }}
          />
        ))}
      </div>

      <div className="trophy-hall">
        {conqueredKingdoms.map(kingdom => (
          <div 
            key={kingdom.id}
            className="trophy-banner"
            style={{ backgroundImage: `url(${IMAGE_ASSETS.banners.ironThorne})` }} 
          />
        ))}
      </div>

      <div 
        className="map-table"
        style={{ backgroundImage: `url(${IMAGE_ASSETS.backgrounds.mapTable})` }}
      />

      <h2>Throne Room</h2>

      <div className="court-sections">
        <div className="section">
          <h3>Court Status</h3>
          <div className="info-block">
            <div className="stat-row">
              <span>Throne Room Level:</span>
              <span>{court.throneRoomLevel}</span>
            </div>
            <div className="stat-row">
              <span>Court Prestige:</span>
              <span className="prestige">{court.prestige}</span>
            </div>
            <div className="stat-row">
              <span>Court Members:</span>
              <span>{court.courtMembers.length}</span>
            </div>
          </div>
        </div>

        <div className="section">
          <h3>Court Members</h3>
          {court.courtMembers.length > 0 ? (
            <div className="members-list">
              {court.courtMembers.map(member => (
                <div key={member.id} className="member-card">
                  <h4>{member.name}</h4>
                  <div className="member-info">
                    <div className="info-row">
                      <span>Role:</span>
                      <span>{member.role}</span>
                    </div>
                    <div className="info-row">
                      <span>Influence:</span>
                      <div className="bar">
                        <div className="fill" style={{ width: `${member.influence}%` }}></div>
                      </div>
                      <span>{member.influence}%</span>
                    </div>
                    <div className="info-row">
                      <span>Loyalty:</span>
                      <div className="bar">
                        <div className="fill" style={{ width: `${member.loyalty}%` }}></div>
                      </div>
                      <span>{member.loyalty}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No court members yet. Appoint nobles to your court!</p>
          )}
        </div>

        <div className="section">
          <h3>Ceremonies</h3>
          <div className="ceremonies-grid">
            {court.ceremonies.map(ceremony => (
              <div key={ceremony.id} className="ceremony-card">
                <h4>{ceremony.name}</h4>
                <div className="ceremony-info">
                  <div className="info-row">
                    <span>Cost:</span>
                    <span className="gold">{ceremony.cost}</span>
                  </div>
                  <div className="info-row">
                    <span>Prestige:</span>
                    <span className="prestige">+{ceremony.prestigeGain}</span>
                  </div>
                </div>
                <button className="perform-button">Perform</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Court;
