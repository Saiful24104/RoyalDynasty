import React, { useState } from 'react';
import { GameState, UnitType } from '../../shared/types';
import { GameManager } from '../../game/manager';

interface ArmyManagementProps {
  gameState: GameState;
  gameManager: GameManager;
}

const ArmyManagement: React.FC<ArmyManagementProps> = ({ gameState, gameManager }) => {
  const [selectedArmy, setSelectedArmy] = useState(0);
  const [recruitingUnit, setRecruitingUnit] = useState<UnitType | null>(null);
  const [recruitCount, setRecruitCount] = useState(1);

  const army = gameState.armies[selectedArmy];

  const handleRecruit = () => {
    if (recruitingUnit && army) {
      gameManager.recruitUnits(army.id, recruitingUnit, recruitCount);
      setRecruitingUnit(null);
      setRecruitCount(1);
    }
  };

  return (
    <div className="army-management">
      <h2>Military Forces</h2>

      <div className="army-selector">
        <h3>Select Army</h3>
        <div className="army-buttons">
          {gameState.armies.map((army, index) => (
            <button
              key={army.id}
              className={`army-button ${selectedArmy === index ? 'active' : ''}`}
              onClick={() => setSelectedArmy(index)}
            >
              {army.name}
            </button>
          ))}
        </div>
      </div>

      {army && (
        <div className="army-details">
          <div className="section">
            <h3>{army.name}</h3>
            <div className="info-block">
              <div className="stat-row">
                <span>Commander:</span>
                <span>{army.commander.name} ({army.commander.rank})</span>
              </div>
              <div className="stat-row">
                <span>Experience:</span>
                <span>{army.commander.experience}%</span>
              </div>
              <div className="stat-row">
                <span>Morale:</span>
                <span>{army.morale.toFixed(0)}%</span>
              </div>
              <div className="stat-row">
                <span>Readiness:</span>
                <span>{army.readiness.toFixed(0)}%</span>
              </div>
              <div className="stat-row">
                <span>Total Units:</span>
                <span>{army.units.reduce((sum, u) => sum + u.count, 0)}</span>
              </div>
            </div>
          </div>

          <div className="section">
            <h3>Units</h3>
            <div className="units-grid">
              {army.units.map(unit => (
                <div key={unit.id} className="unit-card">
                  <h4>{unit.type}</h4>
                  <div className="unit-stat">
                    <span>Count:</span>
                    <span>{unit.count}</span>
                  </div>
                  <div className="unit-stat">
                    <span>Health:</span>
                    <span>{unit.health}%</span>
                  </div>
                  <div className="unit-stat">
                    <span>Training:</span>
                    <span>{unit.training.toFixed(0)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="section">
            <h3>Recruitment</h3>
            {!recruitingUnit ? (
              <div className="recruitment-options">
                {Object.values(UnitType).map(unitType => (
                  <button
                    key={unitType}
                    className="recruit-button"
                    onClick={() => setRecruitingUnit(unitType)}
                  >
                    Recruit {unitType}
                  </button>
                ))}
              </div>
            ) : (
              <div className="recruitment-form">
                <div className="form-group">
                  <label>Unit Type: {recruitingUnit}</label>
                </div>
                <div className="form-group">
                  <label>Number to Recruit:</label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={recruitCount}
                    onChange={(e) => setRecruitCount(parseInt(e.target.value) || 1)}
                  />
                </div>
                <button className="confirm-button" onClick={handleRecruit}>
                  Recruit
                </button>
                <button className="cancel-button" onClick={() => setRecruitingUnit(null)}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArmyManagement;
