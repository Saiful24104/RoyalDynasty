import React, { useState } from 'react';
import { GameState } from '../../shared/types';
import { GameManager } from '../../game/manager';

interface ConstellationMasteryProps {
  gameState: GameState;
  gameManager: GameManager;
}

const ConstellationMastery: React.FC<ConstellationMasteryProps> = ({ gameState, gameManager }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const constellation = gameState.kingdom.constellationMastery;
  const ruler = gameState.kingdom.ruler;

  if (!constellation) {
    return <div className="empty-state">Constellation Mastery Tree not initialized</div>;
  }

  const handleUnlockNode = (nodeId: string) => {
    const node = constellation.nodes.find(n => n.id === nodeId);
    if (!node || node.unlocked) return;

    if (!ruler.systemPoints || ruler.systemPoints < node.spCost) {
      alert('Not enough System Points');
      return;
    }

    gameManager.unlockConstellationNode(nodeId);
  };

  const renderNodeStatus = (node: any) => {
    if (node.unlocked) {
      return <span className="status-unlocked">✓ Unlocked</span>;
    }
    return <span className="status-locked">🔒 Locked</span>;
  };

  return (
    <div className="constellation-mastery-view">
      <div className="constellation-header">
        <h2>Constellation Mastery Tree</h2>
        <div className="system-points-display">
          <span className="label">System Points Available:</span>
          <span className="value">{ruler.systemPoints || 0}</span>
        </div>
      </div>

      <div className="constellation-container">
        <div className="constellation-tree">
          {constellation.nodes.map((node) => (
            <div
              key={node.id}
              className={`constellation-node ${node.unlocked ? 'unlocked' : 'locked'}`}
              onClick={() => setSelectedNode(node.id)}
            >
              <div className="constellation-icon">
                {node.constellation === 'Celestial' && '✨'}
                {node.constellation === 'Royal' && '👑'}
                {node.constellation === 'Arcane' && '🔮'}
                {node.constellation === 'Divine' && '⚡'}
              </div>

              <div className="constellation-info">
                <h4>{node.name}</h4>
                <p>{node.description}</p>

                <div className="constellation-passive">
                  <strong>Passive:</strong> {node.permanentPassive.description}
                </div>

                <div className="node-meta">
                  <span className="sp-cost">
                    Cost: <strong>{node.spCost} SP</strong>
                  </span>
                  {renderNodeStatus(node)}
                </div>
              </div>

              {!node.unlocked && (
                <button
                  className="constellation-btn unlock-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnlockNode(node.id);
                  }}
                  disabled={!ruler.systemPoints || ruler.systemPoints < node.spCost}
                >
                  Unlock
                </button>
              )}
              {node.unlocked && (
                <div className="unlocked-badge">Unlocked ✓</div>
              )}
            </div>
          ))}
        </div>

        {/* Total Passive Bonuses */}
        <div className="total-bonuses">
          <h3>Total Passive Bonuses</h3>
          <div className="bonuses-grid">
            {constellation.totalPassiveBonus.layers && (
              <div className="bonus-item">
                <span className="bonus-name">Layers Unlocked:</span>
                <span className="bonus-value">{constellation.totalPassiveBonus.layers}</span>
              </div>
            )}
            {constellation.totalPassiveBonus.manaGeneration && (
              <div className="bonus-item">
                <span className="bonus-name">Mana Generation Bonus:</span>
                <span className="bonus-value">+{constellation.totalPassiveBonus.manaGeneration}%</span>
              </div>
            )}
            {constellation.totalPassiveBonus.goldCost && (
              <div className="bonus-item">
                <span className="bonus-name">Gold Cost Reduction:</span>
                <span className="bonus-value">{constellation.totalPassiveBonus.goldCost}%</span>
              </div>
            )}
            {Object.keys(constellation.totalPassiveBonus).length === 0 && (
              <p className="no-bonuses">Unlock constellation nodes to gain passive bonuses</p>
            )}
          </div>
        </div>
      </div>

      {/* Node Details Panel */}
      {selectedNode && constellation.nodes.find(n => n.id === selectedNode) && (
        <div className="node-details-panel">
          <div className="panel-content">
            {(() => {
              const node = constellation.nodes.find(n => n.id === selectedNode);
              return (
                <>
                  <h3>{node?.name}</h3>
                  <div className="detail-section">
                    <h4>Description</h4>
                    <p>{node?.description}</p>
                  </div>

                  <div className="detail-section">
                    <h4>Permanent Passive Effect</h4>
                    <div className="passive-effect">
                      <strong>{node?.permanentPassive.name}</strong>
                      <p>{node?.permanentPassive.description}</p>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h4>Constellation</h4>
                    <p>{node?.constellation}</p>
                  </div>

                  <div className="detail-section">
                    <h4>Cost</h4>
                    <p className="cost-highlight">{node?.spCost} System Points</p>
                  </div>

                  {!node?.unlocked && (
                    <button
                      className="constellation-btn full-width"
                      onClick={() => {
                        if (node) handleUnlockNode(node.id);
                        setSelectedNode(null);
                      }}
                      disabled={!ruler.systemPoints || ruler.systemPoints < (node?.spCost || 0)}
                    >
                      Unlock Node
                    </button>
                  )}

                  <button
                    className="constellation-btn close-btn"
                    onClick={() => setSelectedNode(null)}
                  >
                    Close
                  </button>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConstellationMastery;
