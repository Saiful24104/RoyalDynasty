import React, { useState } from 'react';
import { GameState } from '../../shared/types';
import { GameManager } from '../../game/manager';

interface KingdomOverviewProps {
  gameState: GameState;
  gameManager: GameManager;
}

const KingdomOverview: React.FC<KingdomOverviewProps> = ({ gameState, gameManager }) => {
  const { kingdom } = gameState;
  const [showSetConsort, setShowSetConsort] = useState(false);
  const [consortName, setConsortName] = useState('');
  const [showSetHeir, setShowSetHeir] = useState(false);
  const [heirName, setHeirName] = useState('');

  const handleSetConsort = () => {
    if (consortName.trim()) {
      gameManager.setConsort(consortName);
      setConsortName('');
      setShowSetConsort(false);
    }
  };

  const handleSetHeir = () => {
    if (heirName.trim()) {
      gameManager.setHeir(heirName);
      setHeirName('');
      setShowSetHeir(false);
    }
  };

  return (
    <div className="kingdom-overview">
      <h2>{kingdom.name}</h2>

      <div className="overview-grid">
        <div className="section">
          <h3>Ruler Profile</h3>
          <div className="info-block">
            <p><strong>Name:</strong> {kingdom.ruler.name}</p>
            <p><strong>Title:</strong> {kingdom.ruler.title}</p>
            <p><strong>Age:</strong> {kingdom.ruler.age.toFixed(0)}</p>
            <p><strong>Reign Duration:</strong> {kingdom.ruler.reign} years</p>
            <p><strong>Legitimacy:</strong> {(kingdom.ruler.legitimacy * 100).toFixed(0)}%</p>

            <div className="skills-section">
              <h4>Skills</h4>
              <div className="skill">
                <span>Leadership: {kingdom.ruler.skills.leadership}</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${kingdom.ruler.skills.leadership}%` }}></div>
                </div>
              </div>
              <div className="skill">
                <span>Diplomacy: {kingdom.ruler.skills.diplomacy}</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${kingdom.ruler.skills.diplomacy}%` }}></div>
                </div>
              </div>
              <div className="skill">
                <span>Military: {kingdom.ruler.skills.military}</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${kingdom.ruler.skills.military}%` }}></div>
                </div>
              </div>
              <div className="skill">
                <span>Wisdom: {kingdom.ruler.skills.wisdom}</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${kingdom.ruler.skills.wisdom}%` }}></div>
                </div>
              </div>
              <div className="skill">
                <span>Charisma: {kingdom.ruler.skills.charisma}</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${kingdom.ruler.skills.charisma}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <h3>Royal Family</h3>
          <div className="info-block">
            {kingdom.ruler.consort ? (
              <div className="family-member">
                <h4>👸 Consort</h4>
                <p><strong>{kingdom.ruler.consort.name}</strong></p>
                <p>Influence: {kingdom.ruler.consort.influence}%</p>
              </div>
            ) : (
              <div className="no-data">
                <p>No consort yet</p>
                <button onClick={() => setShowSetConsort(true)}>Set Consort</button>
              </div>
            )}

            {showSetConsort && (
              <div className="input-section">
                <input
                  type="text"
                  placeholder="Enter consort name"
                  value={consortName}
                  onChange={(e) => setConsortName(e.target.value)}
                />
                <button onClick={handleSetConsort}>Confirm</button>
                <button onClick={() => setShowSetConsort(false)}>Cancel</button>
              </div>
            )}

            {kingdom.ruler.heir ? (
              <div className="family-member">
                <h4>👦 Heir</h4>
                <p><strong>{kingdom.ruler.heir.name}</strong></p>
                <p>Age: {kingdom.ruler.heir.age.toFixed(0)}</p>
                <p>Legitimacy: {(kingdom.ruler.heir.legitimacy * 100).toFixed(0)}%</p>
              </div>
            ) : (
              <div className="no-data">
                <p>No heir yet</p>
                <button onClick={() => setShowSetHeir(true)}>Set Heir</button>
              </div>
            )}

            {showSetHeir && (
              <div className="input-section">
                <input
                  type="text"
                  placeholder="Enter heir name"
                  value={heirName}
                  onChange={(e) => setHeirName(e.target.value)}
                />
                <button onClick={handleSetHeir}>Confirm</button>
                <button onClick={() => setShowSetHeir(false)}>Cancel</button>
              </div>
            )}
          </div>
        </div>

        <div className="section">
          <h3>Kingdom Stats</h3>
          <div className="info-block">
            <div className="stat-row">
              <span>Total Population:</span>
              <span>{kingdom.population.toLocaleString()}</span>
            </div>
            <div className="stat-row">
              <span>Stability:</span>
              <span>{kingdom.stability.toFixed(1)}%</span>
            </div>
            <div className="stat-row">
              <span>Treasury:</span>
              <span className="gold">{kingdom.treasury.toLocaleString()}</span>
            </div>
            <div className="stat-row">
              <span>Capital Prosperity:</span>
              <span>{kingdom.capital.prosperity.toFixed(0)}%</span>
            </div>
            <div className="stat-row">
              <span>Defense Rating:</span>
              <span>{kingdom.capital.defense.toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KingdomOverview;
