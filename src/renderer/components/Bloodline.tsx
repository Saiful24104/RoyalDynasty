import React, { useState } from 'react';
import { GameState } from '../../shared/types';
import { GameManager } from '../../game/manager';
import { IMAGE_ASSETS } from '../config';

interface BloodlineProps {
  gameState: GameState;
  gameManager: GameManager;
}

const Bloodline: React.FC<BloodlineProps> = ({ gameState, gameManager }) => {
  const [activeTab, setActiveTab] = useState<'family' | 'succession' | 'houses'>('family');
  const bloodline = gameState.kingdom.enhancedBloodline;
  const ruler = gameState.kingdom.ruler;

  const renderPortrait = (portraitPath?: string, name?: string) => {
    return (
      <div className="portrait-frame">
        {portraitPath ? (
          <img src={portraitPath} alt={name} className="portrait-img" />
        ) : (
          <div className="portrait-placeholder">{name?.[0] || '?'}</div>
        )}
      </div>
    );
  };

  const renderCharacterCard = (character: any, title: string) => {
    return (
      <div className="character-card">
        {renderPortrait(character.portraitPath, character.name)}
        <h4>{character.name}</h4>
        <p className="character-title">{title}</p>
        
        <div className="character-stats">
          <div className="stat-row">
            <span>Age Stage:</span>
            <span className="stat-value">{character.ageStage}</span>
          </div>
          <div className="stat-row">
            <span>Cultivation:</span>
            <span className="stat-value">{character.cultivationLevel || 0}</span>
          </div>
          <div className="cultivation-bar">
            <div 
              className="cultivation-progress"
              style={{ width: `${character.cultivationProgress || 0}%` }}
            />
          </div>
          {character.systemEyePotential && (
            <div className="trait-badge">👁️ System Eye Potential</div>
          )}
        </div>
      </div>
    );
  };

  const renderFamilyTree = () => {
    if (!bloodline) return <div>No family data available</div>;

    return (
      <div className="family-tree-section">
        <div 
          className="family-tree-background"
          style={{ backgroundImage: `url(${IMAGE_ASSETS.backgrounds.throneRoom})` }}
        >
          <div className="family-tree-container">
            {/* Emperor */}
            <div className="generation-level">
              <div className="generation-label">Emperor</div>
              {renderCharacterCard(bloodline.emperor, 'Emperor')}
            </div>

            {/* Consort */}
            {bloodline.consort && (
              <div className="generation-level">
                <div className="generation-label">Royal Consort</div>
                {renderCharacterCard(bloodline.consort, 'Consort')}
              </div>
            )}

            {/* Children */}
            {bloodline.children.length > 0 && (
              <div className="generation-level">
                <div className="generation-label">Children ({bloodline.children.length})</div>
                <div className="children-container">
                  {bloodline.children.map((child, idx) => (
                    <div key={idx} className="child-card">
                      {renderPortrait(child.portraitPath, child.name)}
                      <h5>{child.name}</h5>
                      <div className="child-stats">
                        <div className="stat">Cult: {child.cultivationLevel || 0}</div>
                        <div className="stat">{child.ageStage}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* House Affiliations */}
        <div className="house-affiliations">
          <h4>House Affiliations</h4>
          <div className="house-badges">
            {bloodline.houseBuffs.map((buff, idx) => (
              <div key={idx} className="house-buff-badge">
                <span className="house-name">{buff.houseName}</span>
                <div className="buff-effects">
                  {Object.entries(buff.attributeBonus).map(([attr, value]) => (
                    <div key={attr} className="buff-line">
                      {attr}: +{value}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSuccessionTab = () => {
    const heir = ruler.heir;
    if (!heir) {
      return <div className="no-heir">No heir currently appointed</div>;
    }

    const inheritanceChance = 
      heir.cultivationLevel && heir.cultivationLevel > 50 
        ? Math.min(100, 50 + (heir.cultivationLevel / 2))
        : 50;

    return (
      <div className="succession-section">
        <h3>Succession Information</h3>
        
        <div className="heir-primary-card">
          <div className="heir-portrait">
            {renderPortrait(heir.portraitPath, heir.name)}
          </div>
          <div className="heir-details">
            <h4>{heir.name}</h4>
            <div className="heir-stats">
              <div className="stat-row">
                <span>Age:</span>
                <span className="stat-value">{heir.age}</span>
              </div>
              <div className="stat-row">
                <span>Legitimacy:</span>
                <span className="stat-value">{(heir.legitimacy * 100).toFixed(0)}%</span>
              </div>
              <div className="stat-row">
                <span>Cultivation Level:</span>
                <span className="stat-value">{heir.cultivationLevel || 0}</span>
              </div>

              {heir.isIncubating && (
                <div className="incubation-status">
                  <div className="status-badge">🤰 Incubating</div>
                  <div className="incubation-progress">
                    <div className="label">
                      Months Remaining: {heir.incubationMonthsRemaining || 0}
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ 
                          width: `${((9 - (heir.incubationMonthsRemaining || 0)) / 9) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="inheritance-chance">
                <div className="label">Inheritance Chance:</div>
                <div className="percentage-bar">
                  <div 
                    className="percentage-fill"
                    style={{ width: `${inheritanceChance}%` }}
                  />
                  <span className="percentage-text">{inheritanceChance.toFixed(0)}%</span>
                </div>
              </div>

              {heir.divineOmen?.triggered && (
                <div className="divine-omen">
                  <h5>✨ Divine Omen Stats</h5>
                  <div className="omen-stats">
                    {Object.entries(heir.divineOmen.stats).map(([attr, value]) => (
                      <div key={attr} className="omen-stat">
                        <span className="attr-name">{attr}:</span>
                        <span className="attr-value">{(value as number).toFixed(0)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {heir.unlockedTraits && heir.unlockedTraits.length > 0 && (
                <div className="unlocked-traits">
                  <h5>Unlocked Traits:</h5>
                  <div className="traits-list">
                    {heir.unlockedTraits.map((trait, idx) => (
                      <div key={idx} className="trait-badge-lg">{trait}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Potential Stats */}
        <div className="heir-potential">
          <h4>Potential Attributes</h4>
          <div className="potential-grid">
            <div className="potential-stat">
              <span className="label">Leadership</span>
              <div className="stat-bar">
                <div className="bar-fill" style={{ width: `${Math.min(heir.potential.leadership / 2, 100)}%` }} />
              </div>
              <span className="value">{heir.potential.leadership.toFixed(0)}</span>
            </div>
            <div className="potential-stat">
              <span className="label">Military</span>
              <div className="stat-bar">
                <div className="bar-fill" style={{ width: `${Math.min(heir.potential.military / 2, 100)}%` }} />
              </div>
              <span className="value">{heir.potential.military.toFixed(0)}</span>
            </div>
            <div className="potential-stat">
              <span className="label">Wisdom</span>
              <div className="stat-bar">
                <div className="bar-fill" style={{ width: `${Math.min(heir.potential.wisdom / 2, 100)}%` }} />
              </div>
              <span className="value">{heir.potential.wisdom.toFixed(0)}</span>
            </div>
            <div className="potential-stat">
              <span className="label">Diplomacy</span>
              <div className="stat-bar">
                <div className="bar-fill" style={{ width: `${Math.min(heir.potential.diplomacy / 2, 100)}%` }} />
              </div>
              <span className="value">{heir.potential.diplomacy.toFixed(0)}</span>
            </div>
            <div className="potential-stat">
              <span className="label">Charisma</span>
              <div className="stat-bar">
                <div className="bar-fill" style={{ width: `${Math.min(heir.potential.charisma / 2, 100)}%` }} />
              </div>
              <span className="value">{heir.potential.charisma.toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderHousesTab = () => {
    const namedHouses = gameState.kingdom.namedHouses || [];
    
    return (
      <div className="houses-section">
        <h3>Named Houses</h3>
        <div className="houses-grid-large">
          {namedHouses.map((house) => (
            <div key={house.id} className="house-panel">
              {house.crestPath && (
                <img src={house.crestPath} alt={house.name} className="house-crest" />
              )}
              <h4>{house.name}</h4>
              <p className="house-lord">{house.lordName}</p>
              
              <div className="house-metrics">
                <div className="metric">
                  <span className="label">Loyalty:</span>
                  <div className="metric-bar">
                    <div 
                      className="metric-fill loyalty"
                      style={{ width: `${house.loyalty}%` }}
                    />
                  </div>
                  <span className="value">{house.loyalty.toFixed(0)}%</span>
                </div>
                
                {house.demonicInfluence > 0 && (
                  <div className="metric">
                    <span className="label">Demonic Influence:</span>
                    <div className="metric-bar">
                      <div 
                        className="metric-fill demonic"
                        style={{ width: `${house.demonicInfluence}%` }}
                      />
                    </div>
                    <span className="value">{house.demonicInfluence.toFixed(0)}%</span>
                  </div>
                )}

                <div className="metric">
                  <span className="label">Power:</span>
                  <span className="value">{house.power}</span>
                </div>

                <div className="metric">
                  <span className="label">Wealth:</span>
                  <span className="value">{house.wealth.toLocaleString()}</span>
                </div>
              </div>

              {house.isBossNode && (
                <div className="boss-node-badge">⚔️ BOSS NODE</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bloodline-view">
      <div className="bloodline-header">
        <h2>Bloodline & Dynasty</h2>
        <div className="bloodline-tabs">
          <button 
            className={`tab-btn ${activeTab === 'family' ? 'active' : ''}`}
            onClick={() => setActiveTab('family')}
          >
            Family Tree
          </button>
          <button 
            className={`tab-btn ${activeTab === 'succession' ? 'active' : ''}`}
            onClick={() => setActiveTab('succession')}
          >
            Succession
          </button>
          <button 
            className={`tab-btn ${activeTab === 'houses' ? 'active' : ''}`}
            onClick={() => setActiveTab('houses')}
          >
            Named Houses
          </button>
        </div>
      </div>

      <div className="bloodline-content">
        {activeTab === 'family' && renderFamilyTree()}
        {activeTab === 'succession' && renderSuccessionTab()}
        {activeTab === 'houses' && renderHousesTab()}
      </div>
    </div>
  );
};

export default Bloodline;
