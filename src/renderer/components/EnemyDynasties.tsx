import React, { useState } from 'react';
import { GameState } from '../../shared/types';

interface EnemyDynastiesProps {
  gameState: GameState;
  onDeclareWar: (dynastyId: string) => void;
  onMakePeace: (dynastyId: string) => void;
}

export const EnemyDynasties: React.FC<EnemyDynastiesProps> = ({
  gameState,
  onDeclareWar,
  onMakePeace,
}) => {
  const [selectedDynasty, setSelectedDynasty] = useState<string | null>(null);

  const getThreatColor = (threat: number): string => {
    if (threat >= 80) return '#ef4444'; // red
    if (threat >= 60) return '#f97316'; // orange
    if (threat >= 40) return '#fbbf24'; // amber
    return '#10b981'; // green
  };

  const getThreatLevel = (threat: number): string => {
    if (threat >= 80) return 'CRITICAL';
    if (threat >= 60) return 'HIGH';
    if (threat >= 40) return 'MODERATE';
    return 'LOW';
  };

  return (
    <div className="enemy-dynasties-container" style={{ padding: '20px' }}>
      <h2 style={{ color: '#f59e0b', marginBottom: '20px' }}>⚔️ Enemy Dynasties</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
        {gameState.enemyDynasties.map((dynasty) => {
          const isSelected = selectedDynasty === dynasty.id;
          return (
            <div
              key={dynasty.id}
              style={{
                border: `2px solid ${dynasty.isAtWar ? '#ef4444' : getThreatColor(dynasty.threat_level)}`,
                borderRadius: '8px',
                padding: '15px',
                backgroundColor: '#1e1e2e',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                transform: isSelected ? 'scale(1.02)' : 'scale(1)',
              }}
              onClick={() => setSelectedDynasty(isSelected ? null : dynasty.id)}
            >
              <h3 style={{ color: '#f59e0b', marginBottom: '8px' }}>{dynasty.name}</h3>
              <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '8px' }}>Kingdom: {dynasty.kingdom}</p>

              {dynasty.isAtWar && (
                <p style={{ fontSize: '11px', color: '#ef4444', fontWeight: 'bold', marginBottom: '8px' }}>
                  ⚡ AT WAR
                </p>
              )}

              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px' }}>Threat Level</span>
                  <span style={{ fontSize: '12px', color: getThreatColor(dynasty.threat_level), fontWeight: 'bold' }}>
                    {dynasty.threat_level}/100
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#374151',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${dynasty.threat_level}%`,
                      height: '100%',
                      backgroundColor: getThreatColor(dynasty.threat_level),
                      transition: 'width 0.3s',
                    }}
                  />
                </div>
              </div>

              <p style={{ fontSize: '11px', color: getThreatColor(dynasty.threat_level), marginBottom: '10px' }}>
                Status: {getThreatLevel(dynasty.threat_level)}
              </p>

              <div style={{ display: 'flex', gap: '8px' }}>
                {!dynasty.isAtWar ? (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeclareWar(dynasty.id);
                      }}
                      style={{
                        flex: 1,
                        padding: '6px 10px',
                        backgroundColor: '#ef4444',
                        color: '#1e1e2e',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                    >
                      Declare War
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      style={{
                        flex: 1,
                        padding: '6px 10px',
                        backgroundColor: '#374151',
                        color: '#e5e7eb',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '11px',
                        cursor: 'pointer',
                      }}
                    >
                      Negotiate
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onMakePeace(dynasty.id);
                      }}
                      style={{
                        flex: 1,
                        padding: '6px 10px',
                        backgroundColor: '#10b981',
                        color: '#1e1e2e',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                    >
                      Make Peace
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      style={{
                        flex: 1,
                        padding: '6px 10px',
                        backgroundColor: '#374151',
                        color: '#e5e7eb',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '11px',
                        cursor: 'pointer',
                      }}
                    >
                      Spy
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedDynasty && (
        <div
          style={{
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#2d2d44',
            borderRadius: '8px',
            borderLeft: `4px solid ${getThreatColor(gameState.enemyDynasties.find(d => d.id === selectedDynasty)?.threat_level || 0)}`,
          }}
        >
          {gameState.enemyDynasties.find((d) => d.id === selectedDynasty) && (
            <div>
              {(() => {
                const dynasty = gameState.enemyDynasties.find((d) => d.id === selectedDynasty)!;
                return (
                  <>
                    <h3 style={{ color: '#f59e0b', marginBottom: '15px' }}>{dynasty.name}</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                      <div>
                        <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '5px' }}>Kingdom</p>
                        <p style={{ color: '#e5e7eb', marginBottom: '15px' }}>{dynasty.kingdom}</p>

                        <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '5px' }}>Elite Threat</p>
                        <p style={{ color: '#e5e7eb', marginBottom: '15px' }}>{dynasty.eliteThreat}</p>
                      </div>

                      <div>
                        <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '5px' }}>Rival House</p>
                        <p style={{ color: '#e5e7eb', marginBottom: '15px' }}>{dynasty.rivalHouse}</p>

                        <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '5px' }}>War Status</p>
                        <p style={{ color: dynasty.isAtWar ? '#ef4444' : '#10b981', fontWeight: 'bold' }}>
                          {dynasty.isAtWar ? 'AT WAR' : 'PEACE'}
                        </p>
                      </div>
                    </div>

                    {dynasty.isAtWar && (
                      <div
                        style={{
                          backgroundColor: '#1e1e2e',
                          padding: '15px',
                          borderRadius: '6px',
                          border: '1px solid #ef4444',
                        }}
                      >
                        <p style={{ color: '#ef4444', fontWeight: 'bold', marginBottom: '8px' }}>⚠️ War Alert</p>
                        <p style={{ fontSize: '12px', color: '#e5e7eb' }}>
                          This dynasty is actively at war with your kingdom. Military casualties and resource drain will increase significantly.
                        </p>
                      </div>
                    )}

                    <button
                      onClick={() => setSelectedDynasty(null)}
                      style={{
                        marginTop: '15px',
                        padding: '8px 16px',
                        backgroundColor: '#374151',
                        color: '#e5e7eb',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      Close
                    </button>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
