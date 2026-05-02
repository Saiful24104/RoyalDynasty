import React, { useState, useEffect } from 'react';
import { GameState, Kingdom } from '../shared/types';
import { GameEngine } from '../game/engine';
import { GameManager } from '../game/manager';
import { initializeNewGame } from '../game/initializer';
import { GAME_SPEED } from '../shared/constants';
import './styles/App.css';

import Dashboard from './components/Dashboard';
import KingdomOverview from './components/KingdomOverview';
import ArmyManagement from './components/ArmyManagement';
import BuildingManagement from './components/BuildingManagement';
import NobleCouncil from './components/NobleCouncil';
import MarketPlace from './components/MarketPlace';
import GameControls from './components/GameControls';
import Court from './components/Court';
import Bloodline from './components/Bloodline';
import Heroes from './components/Heroes';
import Guilds from './components/Guilds';
import Tavern from './components/Tavern';
import Academy from './components/Academy';
import WorldMap from './components/WorldMap';
import ImperialOverview from './components/ImperialOverview';
import ImperialPillars from './components/ImperialPillars';
import ConstellationMastery from './components/ConstellationMastery';


type View =
  | 'dashboard'
  | 'kingdom'
  | 'capital'
  | 'world'
  | 'army'
  | 'buildings'
  | 'council'
  | 'market'
  | 'court'
  | 'bloodline'
  | 'heroes'
  | 'guilds'
  | 'tavern'
  | 'academy'
  | 'imperial-overview'
  | 'imperial-pillars'
  | 'constellation-mastery';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [gameEngine, setGameEngine] = useState<GameEngine | null>(null);
  const [gameManager, setGameManager] = useState<GameManager | null>(null);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  // Initialize game
  useEffect(() => {
    const newGameState = initializeNewGame('King Arthur', 'Camelot');
    setGameState(newGameState);

    const engine = new GameEngine(newGameState);
    const manager = new GameManager(newGameState);

    setGameEngine(engine);
    setGameManager(manager);
    setIsLoading(false);

    engine.startGameLoop();

    // Update UI every 500ms
    const updateInterval = setInterval(() => {
      setGameState({ ...engine.getGameState() });
    }, 500);

    return () => {
      clearInterval(updateInterval);
      engine.stopGameLoop();
    };
  }, []);

  if (isLoading || !gameState || !gameEngine || !gameManager) {
    return <div className="app-loading">Loading Royal Dynasty Simulator...</div>;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Royal Dynasty Simulator</h1>
        <div className="header-info">
          <span>{gameState.kingdom.name}</span>
          <span className="ruler-name">{gameState.kingdom.ruler.name}</span>
          <span className="game-date">Year {gameState.gameTime.year}</span>
        </div>
      </header>

      <div className="app-layout">
        <nav className="sidebar-nav">
          <div className="nav-section">
            <h4>REALM</h4>
            <button 
              className={`nav-button ${currentView === 'capital' ? 'active' : ''}`}
              onClick={() => setCurrentView('capital')}
            >
              🏰 Capital
            </button>
            <button 
              className={`nav-button ${currentView === 'world' ? 'active' : ''}`}
              onClick={() => setCurrentView('world')}
            >
              🗺️ World Map
            </button>
            <button 
              className={`nav-button ${currentView === 'army' ? 'active' : ''}`}
              onClick={() => setCurrentView('army')}
            >
              ⚔️ Army
            </button>
            <button 
              className={`nav-button ${currentView === 'market' ? 'active' : ''}`}
              onClick={() => setCurrentView('market')}
            >
              🏪 Market
            </button>
            <button 
              className={`nav-button ${currentView === 'guilds' ? 'active' : ''}`}
              onClick={() => setCurrentView('guilds')}
            >
              ⚡ Guilds
            </button>
            <button 
              className={`nav-button ${currentView === 'tavern' ? 'active' : ''}`}
              onClick={() => setCurrentView('tavern')}
            >
              🍺 Tavern
            </button>
          </div>

          <div className="nav-section">
            <h4>COURT</h4>
            <button 
              className={`nav-button ${currentView === 'court' ? 'active' : ''}`}
              onClick={() => setCurrentView('court')}
            >
              👑 Throne Room
            </button>
            <button 
              className={`nav-button ${currentView === 'bloodline' ? 'active' : ''}`}
              onClick={() => setCurrentView('bloodline')}
            >
              👨‍👩‍👧‍👦 Bloodline
            </button>
            <button 
              className={`nav-button ${currentView === 'heroes' ? 'active' : ''}`}
              onClick={() => setCurrentView('heroes')}
            >
              🏆 Heroes
            </button>
            <button 
              className={`nav-button ${currentView === 'academy' ? 'active' : ''}`}
              onClick={() => setCurrentView('academy')}
            >
              📚 Academy
            </button>
          </div>

          <div className="nav-section">
            <h4>COMMUNICATIONS</h4>
            <button className="nav-button" disabled>
              📬 Inbox (Coming Soon)
            </button>
          </div>

          <div className="nav-section">
            <button 
              className={`nav-button dashboard-btn ${currentView === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentView('dashboard')}
            >
              📊 Dashboard
            </button>
          </div>
          <div className="nav-section">
  <h4>IMPERIAL</h4>
  <button
    className={`nav-button ${currentView === 'imperial-overview' ? 'active' : ''}`}
    onClick={() => setCurrentView('imperial-overview')}
  >
    📜 Imperial Overview
  </button>
  <button
    className={`nav-button ${currentView === 'imperial-pillars' ? 'active' : ''}`}
    onClick={() => setCurrentView('imperial-pillars')}
  >
    🏛 Imperial Pillars
  </button>
  <button
    className={`nav-button ${currentView === 'constellation-mastery' ? 'active' : ''}`}
    onClick={() => setCurrentView('constellation-mastery')}
  >
    ✨ Constellation Mastery
  </button>
</div>

        </nav>

        <main className="main-content">
          {currentView === 'dashboard' && <Dashboard gameState={gameState} gameManager={gameManager} />}
          {currentView === 'kingdom' && <KingdomOverview gameState={gameState} gameManager={gameManager} />}
          {currentView === 'capital' && <BuildingManagement gameState={gameState} gameManager={gameManager} />}
          {currentView === 'world' && <WorldMap gameState={gameState} gameManager={gameManager} />}
          {currentView === 'army' && <ArmyManagement gameState={gameState} gameManager={gameManager} />}
          {currentView === 'buildings' && <BuildingManagement gameState={gameState} gameManager={gameManager} />}
          {currentView === 'council' && <NobleCouncil gameState={gameState} gameManager={gameManager} />}
          {currentView === 'market' && <MarketPlace gameState={gameState} gameManager={gameManager} />}
          {currentView === 'court' && <Court gameState={gameState} gameManager={gameManager} />}
          {currentView === 'bloodline' && <Bloodline gameState={gameState} gameManager={gameManager} />}
          {currentView === 'heroes' && <Heroes gameState={gameState} gameManager={gameManager} />}
          {currentView === 'guilds' && <Guilds gameState={gameState} gameManager={gameManager} />}
          {currentView === 'tavern' && <Tavern gameState={gameState} gameManager={gameManager} />}
          {currentView === 'academy' && <Academy gameState={gameState} gameManager={gameManager} />}
          {/* New Imperial systems */}
  {currentView === 'imperial-overview' && <ImperialOverview gameState={gameState} gameManager={gameManager} />}
  {currentView === 'imperial-pillars' && <ImperialPillars gameState={gameState} gameManager={gameManager} />}
  {currentView === 'constellation-mastery' && <ConstellationMastery gameState={gameState} gameManager={gameManager} />}
        </main>

        <aside className="sidebar-controls">
          <GameControls gameEngine={gameEngine} gameState={gameState} />
        </aside>
      </div>
    </div>
  );
};

export default App;
