import React from 'react';
import { GameState } from '../../shared/types';
import { GameManager } from '../../game/manager';

interface ImperialOverviewProps {
  gameState: GameState;
  gameManager: GameManager;
}

const ImperialOverview: React.FC<ImperialOverviewProps> = ({ gameState, gameManager }) => {
  const imperial = gameState.kingdom.imperialOverview;
  const kingdom = gameState.kingdom;
  const prophecy = gameState.kingdom.prophecyCountdown;
  const realmMgmt = gameState.kingdom.realmManagement;

  if (!imperial) {
    return <div className="empty-state">Imperial Overview not initialized</div>;
  }

  const getModeIcon = (mode?: string): string => {
    switch (mode) {
      case 'nurture': return '🌱';
      case 'rule': return '⚖️';
      case 'extract': return '⚡';
      default: return '⚖️';
    }
  };

  const getModeColor = (mode?: string): string => {
    switch (mode) {
      case 'nurture': return '#90ee90';
      case 'rule': return '#ffd700';
      case 'extract': return '#ff6b6b';
      default: return '#ffd700';
    }
  };

  return (
    <div className="imperial-overview-view imperial-overview-bg">
      <h2>Imperial Overview</h2>

      <div className="imperial-metrics">
        {/* Vassal Count */}
        <div className="metric-card">
          <div className="metric-icon">👑</div>
          <div className="metric-content">
            <h3>Vassal Count</h3>
            <div className="metric-value">{imperial.vasselCount}</div>
            <p className="metric-detail">Minor Vassals Under Your Rule</p>
            <div className="metric-effect">
              <strong>Effects:</strong>
              <ul>
                <li>↑ Levy Recovery Speed</li>
                <li>↑ Tax Base</li>
                <li>↑ Corruption over time</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Empire Stability */}
        <div className="metric-card stability-card">
          <div className="metric-icon">🏰</div>
          <div className="metric-content">
            <h3>Empire Stability</h3>
            <div className="stability-display">
              <div className="stability-percentage">{imperial.empireStability}%</div>
              <div className="stability-bar">
                <div
                  className={`stability-fill ${
                    imperial.empireStability < 30 ? 'critical' : 
                    imperial.empireStability < 60 ? 'warning' : 'stable'
                  }`}
                  style={{ width: `${imperial.empireStability}%` }}
                />
              </div>
            </div>
            <p className="metric-detail">Average Loyalty of 15 Named Houses</p>
            {imperial.empireStability < 30 && (
              <div className="alert alert-danger">
                ⚠️ Low stability! Civil War events may occur on Layer 2 map
              </div>
            )}
          </div>
        </div>

        {/* Demonic Influence */}
        <div className="metric-card demonic-card">
          <div className="metric-icon">👹</div>
          <div className="metric-content">
            <h3>Demonic Influence</h3>
            <div className="influence-display">
              <div className="influence-percentage">{imperial.demonicInfluence}%</div>
              <div className="influence-bar">
                <div
                  className="influence-fill"
                  style={{ width: `${imperial.demonicInfluence}%` }}
                />
              </div>
            </div>
            <p className="metric-detail">Corruption spreading through Named Houses</p>
            {imperial.demonicInfluence >= 100 && (
              <div className="alert alert-critical">
                ⚠️ Critical! A Named House has become a Boss Node!
              </div>
            )}
          </div>
        </div>

        {/* Realm Management Mode */}
        {realmMgmt && (
          <div className="metric-card mode-card">
            <div className="metric-icon" style={{ color: getModeColor(realmMgmt.currentMode) }}>
              {getModeIcon(realmMgmt.currentMode)}
            </div>
            <div className="metric-content">
              <h3>Realm Management Mode</h3>
              <div className="mode-display" style={{ color: getModeColor(realmMgmt.currentMode) }}>
                {realmMgmt.currentMode?.toUpperCase()}
              </div>
              <p className="metric-detail">Active Governance Strategy</p>

              {realmMgmt.currentMode === 'nurture' && (
                <div className="mode-effects">
                  <strong>Nurture Effects:</strong>
                  <ul>
                    <li>✓ Stability +10%</li>
                    <li>✓ Mana +10%</li>
                    <li>✗ Gold -5%</li>
                  </ul>
                </div>
              )}
              {realmMgmt.currentMode === 'extract' && (
                <div className="mode-effects warning">
                  <strong>Extract Effects:</strong>
                  <ul>
                    <li>✓ Gold +50%</li>
                    <li>✓ Demonic Influence +20%</li>
                    <li>✗ Stability -20%</li>
                    <li>⚠️ Layer 3 maps corrupted</li>
                    <li>⚠️ Rebels spawn</li>
                  </ul>
                </div>
              )}
              {realmMgmt.currentMode === 'rule' && (
                <div className="mode-effects">
                  <strong>Rule Effects:</strong>
                  <ul>
                    <li>⚖️ Balanced approach</li>
                    <li>⚖️ Normal resource flow</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Prophecy Progress */}
        {prophecy && (
          <div className="metric-card prophecy-card">
            <div className="metric-icon">🌍</div>
            <div className="metric-content">
              <h3>Prophecy Countdown</h3>
              <div className="prophecy-progress">
                <div className="progress-label">Kingdoms Conquered:</div>
                <div className="kingdoms-display">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={`kingdom-dot ${i < prophecy.kingdomsConquered ? 'conquered' : 'unconquered'}`}
                    />
                  ))}
                </div>
                <div className="counter">{prophecy.kingdomsConquered}/10</div>
              </div>

              {prophecy.endOfDaysTriggered && (
                <div className="alert alert-critical end-of-days">
                  ✨ END OF DAYS ✨ - Royal Dynasty 2.0 Initiated!
                </div>
              )}

              <div className="milestones">
                <strong>Milestones:</strong>
                {prophecy.milestoneEvents.map((milestone) => (
                  <div key={milestone.id} className={`milestone ${milestone.triggered ? 'triggered' : ''}`}>
                    <span className="milestone-name">{milestone.name}</span>
                    <span className={`milestone-status ${milestone.triggered ? 'complete' : 'pending'}`}>
                      {milestone.triggered ? '✓' : '○'} {milestone.kingdomsRequired}/10
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Named Houses Summary */}
      {kingdom.namedHouses && kingdom.namedHouses.length > 0 && (
        <div className="named-houses-summary">
          <h3>Named Houses Status</h3>
          <div className="houses-mini-grid">
            {kingdom.namedHouses.slice(0, 6).map((house) => (
              <div key={house.id} className="house-mini-card">
                <h4>{house.name}</h4>
                <div className="mini-stat">
                  <span>Loyalty:</span>
                  <span style={{ color: house.loyalty > 70 ? '#90ee90' : house.loyalty > 40 ? '#ffd700' : '#ff6b6b' }}>
                    {house.loyalty.toFixed(0)}%
                  </span>
                </div>
                {house.demonicInfluence > 0 && (
                  <div className="mini-stat warning">
                    <span>Demonic:</span>
                    <span>{house.demonicInfluence.toFixed(0)}%</span>
                  </div>
                )}
                {house.isBossNode && (
                  <div className="boss-indicator">⚔️ BOSS NODE</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImperialOverview;
