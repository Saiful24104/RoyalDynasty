import React from 'react';
import { GameState } from '../../shared/types';

interface InfluenceSystemProps {
  gameState: GameState;
  onExertInfluence: (source: string, amount: number) => void;
  onResolveBacklash: () => void;
}

export const InfluenceSystem: React.FC<InfluenceSystemProps> = ({
  gameState,
  onExertInfluence,
  onResolveBacklash,
}) => {
  const influence = gameState.influenceSystem;

  const getInfluenceColor = (): string => {
    const current = influence.currentInfluence;
    if (current > 80) return '#ef4444'; // red - critical
    if (current > 60) return '#f97316'; // orange - high
    if (current > 40) return '#fbbf24'; // amber - moderate
    return '#10b981'; // green - safe
  };

  const getInfluenceStatus = (): string => {
    const current = influence.currentInfluence;
    if (current > 80) return 'CRITICAL - Backlash Imminent';
    if (current > 60) return 'HIGH - Risk of Backlash';
    if (current > 40) return 'MODERATE - Caution Advised';
    return 'SAFE - No Backlash Risk';
  };

  const getBacklashSeverity = (): string => {
    if (influence.backlashCounter > 50) return 'SEVERE';
    if (influence.backlashCounter > 30) return 'SIGNIFICANT';
    if (influence.backlashCounter > 10) return 'NOTABLE';
    return 'MINOR';
  };

  return (
    <div className="influence-system-container" style={{ padding: '20px' }}>
      <h2 style={{ color: '#f59e0b', marginBottom: '20px' }}>👑 Influence & Backlash System</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Influence Gauge */}
        <div style={{ backgroundColor: '#2d2d44', padding: '20px', borderRadius: '8px' }}>
          <h3 style={{ color: '#e5e7eb', marginBottom: '15px' }}>Royal Influence</h3>

          <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '8px' }}>Current Influence Level</p>
          <div
            style={{
              marginBottom: '15px',
              padding: '15px',
              backgroundColor: '#1e1e2e',
              borderRadius: '6px',
              border: `2px solid ${getInfluenceColor()}`,
            }}
          >
            <div
              style={{
                width: '100%',
                height: '30px',
                backgroundColor: '#374151',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '10px',
              }}
            >
              <div
                style={{
                  width: `${influence.currentInfluence}%`,
                  height: '100%',
                  backgroundColor: getInfluenceColor(),
                  transition: 'width 0.3s',
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#e5e7eb', fontWeight: 'bold' }}>
                {influence.currentInfluence.toFixed(0)} / 100
              </span>
              <span style={{ color: getInfluenceColor(), fontWeight: 'bold', fontSize: '12px' }}>
                {getInfluenceStatus()}
              </span>
            </div>
          </div>

          <p style={{ fontSize: '11px', color: '#a0aec0', marginBottom: '8px' }}>⚠️ Danger Zone: 70+ Influence</p>
          <p style={{ fontSize: '10px', color: '#e5e7eb', marginBottom: '15px' }}>
            Using influence on major decisions causes internal friction and external opposition.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button
              onClick={() => onExertInfluence('council_control', 15)}
              style={{
                padding: '8px 12px',
                backgroundColor: '#374151',
                color: '#e5e7eb',
                border: '1px solid #4b5563',
                borderRadius: '4px',
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              Council Control +15
            </button>
            <button
              onClick={() => onExertInfluence('marriage_arrangement', 30)}
              style={{
                padding: '8px 12px',
                backgroundColor: '#374151',
                color: '#e5e7eb',
                border: '1px solid #4b5563',
                borderRadius: '4px',
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              Arrange Marriage +30
            </button>
            <button
              onClick={() => onExertInfluence('academy_placement', 20)}
              style={{
                padding: '8px 12px',
                backgroundColor: '#374151',
                color: '#e5e7eb',
                border: '1px solid #4b5563',
                borderRadius: '4px',
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              Academy Placement +20
            </button>
            <button
              onClick={() => onExertInfluence('noble_appointment', 25)}
              style={{
                padding: '8px 12px',
                backgroundColor: '#374151',
                color: '#e5e7eb',
                border: '1px solid #4b5563',
                borderRadius: '4px',
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              Noble Appointment +25
            </button>
          </div>
        </div>

        {/* Backlash Tracking */}
        <div style={{ backgroundColor: '#2d2d44', padding: '20px', borderRadius: '8px' }}>
          <h3 style={{ color: '#e5e7eb', marginBottom: '15px' }}>Opposition Forces</h3>

          {/* Backlash Counter */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '8px' }}>Backlash Counter</p>
            <div
              style={{
                padding: '12px',
                backgroundColor: '#1e1e2e',
                borderRadius: '6px',
                border: influence.backlashCounter > 0 ? '2px solid #ef4444' : '2px solid #6b7280',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#e5e7eb', fontWeight: 'bold' }}>
                  {influence.backlashCounter.toFixed(0)}
                </span>
                {influence.backlashCounter > 0 && (
                  <span style={{ color: '#ef4444', fontSize: '12px', fontWeight: 'bold' }}>
                    {getBacklashSeverity()}
                  </span>
                )}
              </div>
              <p style={{ fontSize: '10px', color: '#a0aec0', marginTop: '5px' }}>
                Accumulates when influence exceeds 70. Causes stability loss and noble unrest.
              </p>
            </div>
          </div>

          {/* Internal Friction */}
          <div style={{ marginBottom: '12px' }}>
            <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '5px' }}>Internal Friction</p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 12px',
                backgroundColor: '#1e1e2e',
                borderRadius: '4px',
              }}
            >
              <span style={{ color: '#e5e7eb' }}>{influence.internalFriction.toFixed(1)}</span>
              <span style={{ fontSize: '10px', color: '#a0aec0' }}>Resistance within court</span>
            </div>
          </div>

          {/* External Backlash */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '5px' }}>External Backlash</p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 12px',
                backgroundColor: '#1e1e2e',
                borderRadius: '4px',
              }}
            >
              <span style={{ color: '#e5e7eb' }}>{influence.externalBacklash.toFixed(1)}</span>
              <span style={{ fontSize: '10px', color: '#a0aec0' }}>Public opposition</span>
            </div>
          </div>

          {influence.backlashCounter > 0 && (
            <button
              onClick={onResolveBacklash}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#10b981',
                color: '#1e1e2e',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Resolve Backlash (Appease Nobles)
            </button>
          )}
        </div>
      </div>

      {/* Influence Sources */}
      <div style={{ marginTop: '20px', backgroundColor: '#2d2d44', padding: '20px', borderRadius: '8px' }}>
        <h3 style={{ color: '#e5e7eb', marginBottom: '15px' }}>Recent Influence Actions</h3>
        <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
          {influence.sources.length === 0 ? (
            <p style={{ fontSize: '12px', color: '#a0aec0' }}>No influence actions taken yet.</p>
          ) : (
            <div>
              {influence.sources.slice(-5).map((source) => (
                <div
                  key={source.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px',
                    borderBottom: '1px solid #374151',
                    fontSize: '11px',
                  }}
                >
                  <span style={{ color: '#a0aec0' }}>{source.source}</span>
                  <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>+{source.amount}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
