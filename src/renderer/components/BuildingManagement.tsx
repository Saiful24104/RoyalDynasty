import React, { useState } from 'react';
import { GameState, BuildingType } from '../../shared/types';
import { GameManager } from '../../game/manager';

interface BuildingManagementProps {
  gameState: GameState;
  gameManager: GameManager;
}

const BuildingManagement: React.FC<BuildingManagementProps> = ({ gameState, gameManager }) => {
  const [buildingToConstruct, setBuildingToConstruct] = useState<BuildingType | null>(null);

  const handleBuild = (buildingType: BuildingType) => {
    gameManager.buildBuilding(buildingType);
    setBuildingToConstruct(null);
  };

  const buildings = gameState.kingdom.capital.buildings;

  return (
    <div className="building-management">
      <h2>Capital Construction</h2>

      <div className="buildings-section">
        <h3>Existing Buildings</h3>
        <div className="buildings-grid">
          {buildings.map(building => (
            <div key={building.id} className="building-card">
              <h4>{building.type}</h4>
              <div className="building-stat">
                <span>Level:</span>
                <span>{building.level}</span>
              </div>
              {building.isConstructing ? (
                <div className="construction-progress">
                  <span>Construction:</span>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${building.constructionProgress}%` }}
                    ></div>
                  </div>
                  <span>{building.constructionProgress.toFixed(0)}%</span>
                </div>
              ) : (
                <div className="building-stat">
                  <span>Maintenance:</span>
                  <span className="cost">{building.maintenanceCost} gold</span>
                </div>
              )}
              <button 
                className="upgrade-button"
                disabled={building.isConstructing}
              >
                Upgrade
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="construction-section">
        <h3>Construct New Building</h3>
        <div className="building-options">
          {Object.values(BuildingType).map(buildingType => (
            <button
              key={buildingType}
              className="construct-button"
              onClick={() => handleBuild(buildingType)}
            >
              Build {buildingType}
            </button>
          ))}
        </div>
      </div>

      <div className="resource-status">
        <h3>Resources for Construction</h3>
        <div className="resources-display">
          <div className="resource">
            <span>Gold:</span>
            <span className="amount">{gameState.kingdom.resources.gold.toFixed(0)}</span>
          </div>
          <div className="resource">
            <span>Wood:</span>
            <span className="amount">{gameState.kingdom.resources.wood.toFixed(0)}</span>
          </div>
          <div className="resource">
            <span>Stone:</span>
            <span className="amount">{gameState.kingdom.resources.stone.toFixed(0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingManagement;
