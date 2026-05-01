import React from 'react';
import { GameState } from '../../shared/types';
import { GameManager } from '../../game/manager';

interface WorldMapProps {
  gameState: GameState;
  gameManager: GameManager;
}

const WorldMap: React.FC<WorldMapProps> = ({ gameState, gameManager }) => {
  const map = gameState.worldMap;

  return (
    <div className="world-map-view">
      <h2>World Map</h2>

      <div className="map-sections">
        <div className="map-display">
          <h3>Known Regions</h3>
          <div className="map-regions">
            {map.regions.map(region => (
              <div key={region.id} className="region-tile">
                <div className="region-name">{region.name}</div>
                <div className="region-type">{region.type}</div>
                <div className="region-pop">Pop: {region.population.toLocaleString()}</div>
                <div className="region-controller">
                  {region.controlled_by === gameState.kingdom.id ? '✓ Owned' : '✗ Foreign'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h3>Your Territories</h3>
          <div className="territories-list">
            {map.playerTerritories.map(territory => {
              const region = map.regions.find(r => r.id === territory.regionId);
              return (
                <div key={territory.id} className="territory-card">
                  <h4>{territory.name}</h4>
                  {region && <p className="region-name">{region.name}</p>}
                  <div className="territory-info">
                    <div className="info-row">
                      <span>Prosperity:</span>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${territory.prosperity}%` }}></div>
                      </div>
                      <span>{territory.prosperity}%</span>
                    </div>
                    <div className="info-row">
                      <span>Defenses:</span>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${territory.defenses}%` }}></div>
                      </div>
                      <span>{territory.defenses}%</span>
                    </div>
                  </div>
                  <button className="manage-button">Manage Territory</button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="section">
          <h3>Expansion Opportunities</h3>
          <p>Conquer new territories to expand your kingdom's influence and wealth!</p>
          <div className="expansion-buttons">
            <button className="conquest-button">Scout New Lands</button>
            <button className="conquest-button">Declare War</button>
            <button className="conquest-button">Negotiate Trade</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
