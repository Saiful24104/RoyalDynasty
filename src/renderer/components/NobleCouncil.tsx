import React from 'react';
import { GameState } from '../../shared/types';
import { GameManager } from '../../game/manager';

interface NobleCouncilProps {
  gameState: GameState;
  gameManager: GameManager;
}

const NobleCouncil: React.FC<NobleCouncilProps> = ({ gameState, gameManager }) => {
  const { council } = gameState;

  return (
    <div className="noble-council">
      <h2>Noble Council</h2>

      <div className="council-sections">
        <div className="section">
          <h3>Council Members</h3>
          <div className="nobles-list">
            {council.nobles.map(noble => (
              <div key={noble.id} className="noble-card">
                <h4>{noble.name}</h4>
                <div className="noble-info">
                  <div className="info-row">
                    <span>Title:</span>
                    <span>{noble.title}</span>
                  </div>
                  <div className="info-row">
                    <span>Power:</span>
                    <div className="bar">
                      <div className="fill" style={{ width: `${noble.power}%` }}></div>
                    </div>
                    <span>{noble.power}%</span>
                  </div>
                  <div className="info-row">
                    <span>Wealth:</span>
                    <span className="gold">{noble.wealth.toLocaleString()}</span>
                  </div>
                  <div className="info-row">
                    <span>Loyalty:</span>
                    <div className="bar">
                      <div className="fill" style={{ width: `${noble.loyalty}%` }}></div>
                    </div>
                    <span>{noble.loyalty}%</span>
                  </div>
                  <div className="info-row">
                    <span>Faction:</span>
                    <span>{noble.faction}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h3>Factions</h3>
          <div className="factions-list">
            {council.factions.map(faction => (
              <div key={faction.id} className="faction-card">
                <h4>{faction.name}</h4>
                <div className="faction-info">
                  <div className="info-row">
                    <span>Members:</span>
                    <span>{faction.members.length}</span>
                  </div>
                  <div className="info-row">
                    <span>Influence:</span>
                    <div className="bar">
                      <div className="fill" style={{ width: `${faction.influence}%` }}></div>
                    </div>
                    <span>{faction.influence}%</span>
                  </div>
                  <div className="info-row">
                    <span>Goals:</span>
                    <ul className="goals-list">
                      {faction.goals.map((goal, idx) => (
                        <li key={idx}>{goal}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h3>Council Influence</h3>
          <div className="influence-chart">
            {Array.from(council.influence.entries()).map(([factionName, influenceValue]) => (
              <div key={factionName} className="influence-item">
                <span>{factionName}:</span>
                <div className="influence-bar">
                  <div className="influence-fill" style={{ width: `${influenceValue}%` }}></div>
                </div>
                <span>{influenceValue}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NobleCouncil;
