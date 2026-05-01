import React from 'react';
import { GameState } from '../../shared/types';
import { GameManager } from '../../game/manager';

interface DashboardProps {
  gameState: GameState;
  gameManager: GameManager;
}

const Dashboard: React.FC<DashboardProps> = ({ gameState, gameManager }) => {
  const { kingdom, gameTime } = gameState;
  const score = gameManager.calculateKingdomScore();

  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        <div className="card">
          <h3>Kingdom Status</h3>
          <div className="stat">
            <span>Stability:</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${kingdom.stability}%`, backgroundColor: getStabilityColor(kingdom.stability) }}
              ></div>
            </div>
            <span>{kingdom.stability.toFixed(1)}%</span>
          </div>
          <div className="stat">
            <span>Population:</span>
            <span>{kingdom.population.toLocaleString()}</span>
          </div>
          <div className="stat">
            <span>Kingdom Score:</span>
            <span>{score.toFixed(0)}</span>
          </div>
        </div>

        <div className="card">
          <h3>Resources</h3>
          <div className="stat">
            <span>Gold:</span>
            <span className="resource-gold">{kingdom.resources.gold.toFixed(0)}</span>
          </div>
          <div className="stat">
            <span>Treasury:</span>
            <span className="resource-gold">{kingdom.treasury.toFixed(0)}</span>
          </div>
          <div className="stat">
            <span>Food:</span>
            <span className="resource-food">{kingdom.resources.food.toFixed(0)}</span>
          </div>
          <div className="stat">
            <span>Wood:</span>
            <span className="resource-wood">{kingdom.resources.wood.toFixed(0)}</span>
          </div>
          <div className="stat">
            <span>Stone:</span>
            <span className="resource-stone">{kingdom.resources.stone.toFixed(0)}</span>
          </div>
          <div className="stat">
            <span>Iron:</span>
            <span className="resource-iron">{kingdom.resources.iron.toFixed(0)}</span>
          </div>
          <div className="stat">
            <span>Mana:</span>
            <span className="resource-mana">{kingdom.resources.mana.toFixed(0)}</span>
          </div>
          <div className="stat">
            <span>Silver:</span>
            <span className="resource-silver">{kingdom.resources.silver.toFixed(0)}</span>
          </div>
          <div className="stat">
            <span>Prestige:</span>
            <span className="resource-prestige">{kingdom.resources.prestige.toFixed(0)}</span>
          </div>
        </div>

        <div className="card">
          <h3>Ruler Information</h3>
          <div className="stat">
            <span>Name:</span>
            <span>{kingdom.ruler.name}, {kingdom.ruler.title}</span>
          </div>
          <div className="stat">
            <span>Age:</span>
            <span>{kingdom.ruler.age.toFixed(0)}</span>
          </div>
          <div className="stat">
            <span>Reign:</span>
            <span>{kingdom.ruler.reign} years</span>
          </div>
          <div className="stat">
            <span>Legitimacy:</span>
            <span>{(kingdom.ruler.legitimacy * 100).toFixed(0)}%</span>
          </div>
          {kingdom.ruler.consort && (
            <div className="stat">
              <span>Consort:</span>
              <span>{kingdom.ruler.consort.name}</span>
            </div>
          )}
          <div className="stat">
            <span>Species:</span>
            <span>{kingdom.species}</span>
          </div>
          <div className="stat">
            <span>Dynastic Unions:</span>
            <span>{gameState.marriages.length}</span>
          </div>
          {kingdom.ruler.heir && (
            <div className="stat">
              <span>Heir:</span>
              <span>{kingdom.ruler.heir.name} (Age {kingdom.ruler.heir.age.toFixed(0)})</span>
            </div>
          )}
        </div>

        <div className="card">
          <h3>Game Time</h3>
          <div className="game-clock">
            <span className="time">{String(gameTime.hour).padStart(2, '0')}:{String(gameTime.minute).padStart(2, '0')}</span>
            <span className="date">Year {gameTime.year}, Month {gameTime.month}, Day {gameTime.day}</span>
            <span className="speed">Speed: {gameTime.speed}x</span>
          </div>
        </div>

        <div className="card">
          <h3>Capital City</h3>
          <div className="stat">
            <span>City Name:</span>
            <span>{kingdom.capital.name}</span>
          </div>
          <div className="stat">
            <span>Population:</span>
            <span>{kingdom.capital.population.toLocaleString()}</span>
          </div>
          <div className="stat">
            <span>Prosperity:</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${kingdom.capital.prosperity}%` }}></div>
            </div>
            <span>{kingdom.capital.prosperity.toFixed(0)}%</span>
          </div>
          <div className="stat">
            <span>Defense:</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${kingdom.capital.defense}%` }}></div>
            </div>
            <span>{kingdom.capital.defense.toFixed(0)}%</span>
          </div>
          <div className="stat">
            <span>Buildings:</span>
            <span>{kingdom.capital.buildings.length}</span>
          </div>
        </div>

        <div className="card">
          <h3>Military Overview</h3>
          <div className="stat">
            <span>Armies:</span>
            <span>{gameState.armies.length}</span>
          </div>
          <div className="stat">
            <span>Total Units:</span>
            <span>{gameState.armies.reduce((sum, a) => sum + a.units.reduce((s, u) => s + u.count, 0), 0)}</span>
          </div>
          <div className="stat">
            <span>Overall Morale:</span>
            <span>{(gameState.armies.reduce((sum, a) => sum + a.morale, 0) / gameState.armies.length).toFixed(0)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function getStabilityColor(stability: number): string {
  if (stability < 20) return '#ff4444';
  if (stability < 40) return '#ff9900';
  if (stability < 60) return '#ffdd00';
  return '#44dd44';
}

export default Dashboard;
