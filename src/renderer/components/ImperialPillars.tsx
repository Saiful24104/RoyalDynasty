import React, { useEffect, useState } from 'react';
import { GameState } from '../../shared/types';
import { GameManager } from '../../game/manager';
import imperialPillarsBg from '../assets/backgrounds/imperial/imperial_pillars_bg.png';

interface ImperialPillarsProps {
  gameState: GameState;
  gameManager: GameManager;
}

const ImperialPillars: React.FC<ImperialPillarsProps> = ({ gameState, gameManager }) => {
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);
  const pillars = gameState.kingdom.imperialPillars || [];
  const heroes = gameState.heroes || [];
  const nobles = gameState.council?.nobles || [];

  useEffect(() => {
    if (!gameState.kingdom.imperialPillars) {
      gameManager.initializeImperialPillars();
    }
  }, [gameManager, gameState.kingdom.imperialPillars]);

  const handleAssignToPillar = (pillarId: string, heroOrNobleName: string) => {
    gameManager.assignToPillar(pillarId, heroOrNobleName);
    setSelectedPillar(null);
  };

  const getPillarEffectIcon = (type: string): string => {
    switch (type) {
      case 'war': return '⚔️';
      case 'coin': return '💰';
      case 'shadow': return '🕵️';
      case 'seraphine': return '👑';
      default: return '🏛️';
    }
  };

  const pillarList = pillars.length > 0 ? pillars : [
    {
      id: 'pillar_placeholder_war',
      name: 'War Pillar',
      type: 'war',
      occupant: null,
      description: 'Governs military might and conquest',
      worldAlteringEffect: { description: 'Troops gain lifesteal in Layer 3 Red Zones' },
      isActive: false,
    },
    {
      id: 'pillar_placeholder_coin',
      name: 'Coin Pillar',
      type: 'coin',
      occupant: null,
      description: 'Controls commerce and wealth',
      worldAlteringEffect: { description: 'Reduces market costs by 20%' },
      isActive: false,
    },
  ];

  const activeCount = pillarList.filter((pillar) => pillar.isActive).length;

  return (
    <div className="imperial-pillars" style={{ backgroundImage: `url(${imperialPillarsBg})` }}>
      <div className="pillars-header">
        <h2>Imperial Pillars Active</h2>
        <p className="subtitle">
          Assign Heroes or Noble Leaders to seats for world-altering effects.
        </p>
        <div className="pillar-summary-row">
          <span>Active Pillars: {activeCount}/{pillarList.length}</span>
          <span>Heroes Ready: {heroes.length}</span>
          <span>Nobles Available: {nobles.length}</span>
        </div>
        <button className="refresh-btn" onClick={() => gameManager.initializeImperialPillars()}>
          Initialize Pillars
        </button>
      </div>

      <div className="pillars-grid">
        {pillarList.map((pillar) => (
          <div
            key={pillar.id}
            className={`pillar-card ${pillar.isActive ? 'active' : 'vacant'}`}
            onClick={() => setSelectedPillar(pillar.id)}
          >
            <div className="pillar-icon">{getPillarEffectIcon(pillar.type)}</div>

            <h3>{pillar.name}</h3>
            <p className="pillar-description">{pillar.description}</p>

            <div className="world-effect">
              <strong>World Effect:</strong>
              <p>{pillar.worldAlteringEffect.description}</p>
            </div>

            {pillar.occupant ? (
              <div className="occupant-info">
                <span className="occupant-label">Occupied by:</span>
                <span className="occupant-name">{(pillar.occupant as any).name}</span>
                <div className="active-badge">Active ✓</div>
              </div>
            ) : (
              <div className="vacant-info">
                <span className="vacant-label">Seat Vacant</span>
                <button className="assign-btn" onClick={() => setSelectedPillar(pillar.id)}>Assign Hero/Noble</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Assignment Modal */}
      {selectedPillar && (
        <div className="modal-overlay" onClick={() => setSelectedPillar(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Assign to {pillarList.find(p => p.id === selectedPillar)?.name || 'Pillar'}</h3>
              <button className="close-btn" onClick={() => setSelectedPillar(null)}>×</button>
            </div>

            <div className="assignment-section">
              <h4>Available Heroes</h4>
              <div className="assignment-list">
                {heroes.length > 0 ? (
                  heroes.map((hero) => (
                    <div
                      key={hero.id}
                      className="assignment-item hero-item"
                      onClick={() => {
                        handleAssignToPillar(selectedPillar, hero.name);
                      }}
                    >
                      <span className="item-name">{hero.name}</span>
                      <span className="item-level">Lvl {hero.level || 1}</span>
                    </div>
                  ))
                ) : (
                  <p className="no-items">No heroes available</p>
                )}
              </div>

              <h4>Available Nobles</h4>
              <div className="assignment-list">
                {nobles.length > 0 ? (
                  nobles.map((noble) => (
                    <div
                      key={noble.id}
                      className="assignment-item noble-item"
                      onClick={() => {
                        handleAssignToPillar(selectedPillar, noble.name);
                      }}
                    >
                      <span className="item-name">{noble.name}</span>
                      <span className="item-power">Power: {noble.power}</span>
                    </div>
                  ))
                ) : (
                  <p className="no-items">No nobles available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImperialPillars;
