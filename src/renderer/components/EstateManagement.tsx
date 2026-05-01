import React, { useState } from 'react';
import { GameState } from '../../shared/types';

interface EstateManagementProps {
  gameState: GameState;
  onDevelopEstate: (estateId: string) => void;
  onBuildDefenses: (estateId: string) => void;
}

export const EstateManagement: React.FC<EstateManagementProps> = ({
  gameState,
  onDevelopEstate,
  onBuildDefenses,
}) => {
  const [selectedEstate, setSelectedEstate] = useState<string | null>(null);

  const getProsperityColor = (prosperity: number): string => {
    if (prosperity >= 80) return '#4ade80'; // green
    if (prosperity >= 60) return '#fbbf24'; // amber
    if (prosperity >= 40) return '#f97316'; // orange
    return '#ef4444'; // red
  };

  const getProsperityStatus = (prosperity: number): string => {
    if (prosperity >= 80) return 'Thriving';
    if (prosperity >= 60) return 'Prosperous';
    if (prosperity >= 40) return 'Struggling';
    return 'Declining';
  };

  const getDefenseStatus = (defenses: number): string => {
    if (defenses >= 80) return 'Heavily Fortified';
    if (defenses >= 60) return 'Well-Defended';
    if (defenses >= 40) return 'Lightly Defended';
    return 'Vulnerable';
  };

  return (
    <div className="estate-management-container" style={{ padding: '20px' }}>
      <h2 style={{ color: '#f59e0b', marginBottom: '20px' }}>🏰 Estate Management</h2>

      {gameState.estates.length === 0 ? (
        <div style={{ backgroundColor: '#2d2d44', padding: '20px', borderRadius: '8px' }}>
          <p style={{ color: '#a0aec0' }}>No estates under your control yet.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
          {gameState.estates.map((estate) => {
            const isSelected = selectedEstate === estate.id;
            return (
              <div
                key={estate.id}
                style={{
                  border: `2px solid ${getProsperityColor(estate.prosperity)}`,
                  borderRadius: '8px',
                  padding: '15px',
                  backgroundColor: '#1e1e2e',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                }}
                onClick={() => setSelectedEstate(isSelected ? null : estate.id)}
              >
                <h3 style={{ color: '#f59e0b', marginBottom: '8px' }}>{estate.name}</h3>
                <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '8px' }}>
                  Population: {estate.population.toLocaleString()}
                </p>

                {/* Prosperity */}
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px' }}>Prosperity</span>
                    <span style={{ fontSize: '12px', color: getProsperityColor(estate.prosperity), fontWeight: 'bold' }}>
                      {estate.prosperity.toFixed(0)}/100
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
                        width: `${estate.prosperity}%`,
                        height: '100%',
                        backgroundColor: getProsperityColor(estate.prosperity),
                        transition: 'width 0.3s',
                      }}
                    />
                  </div>
                </div>

                {/* Defenses */}
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px' }}>Defenses</span>
                    <span style={{ fontSize: '12px', color: '#60a5fa', fontWeight: 'bold' }}>
                      {estate.defenses.toFixed(0)}/100
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
                        width: `${estate.defenses}%`,
                        height: '100%',
                        backgroundColor: '#60a5fa',
                        transition: 'width 0.3s',
                      }}
                    />
                  </div>
                </div>

                <p style={{ fontSize: '11px', color: getProsperityColor(estate.prosperity), marginBottom: '10px' }}>
                  {getProsperityStatus(estate.prosperity)}
                </p>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDevelopEstate(estate.id);
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
                    Develop
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onBuildDefenses(estate.id);
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
                    Fortify
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedEstate && gameState.estates.find((e) => e.id === selectedEstate) && (
        <div
          style={{
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#2d2d44',
            borderRadius: '8px',
            borderLeft: `4px solid ${getProsperityColor(gameState.estates.find((e) => e.id === selectedEstate)?.prosperity || 0)}`,
          }}
        >
          {(() => {
            const estate = gameState.estates.find((e) => e.id === selectedEstate)!;
            return (
              <>
                <h3 style={{ color: '#f59e0b', marginBottom: '15px' }}>{estate.name} - Detailed View</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                  <div>
                    <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '5px' }}>Location</p>
                    <p style={{ color: '#e5e7eb', marginBottom: '15px' }}>
                      ({estate.location.x}, {estate.location.y})
                    </p>

                    <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '5px' }}>Population</p>
                    <p style={{ color: '#e5e7eb', marginBottom: '15px' }}>{estate.population.toLocaleString()}</p>
                  </div>

                  <div>
                    <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '5px' }}>Prosperity Status</p>
                    <p style={{ color: getProsperityColor(estate.prosperity), marginBottom: '15px', fontWeight: 'bold' }}>
                      {getProsperityStatus(estate.prosperity)}
                    </p>

                    <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '5px' }}>Defense Status</p>
                    <p style={{ color: '#60a5fa', marginBottom: '15px', fontWeight: 'bold' }}>
                      {getDefenseStatus(estate.defenses)}
                    </p>
                  </div>
                </div>

                {/* Resources */}
                <h4 style={{ color: '#e5e7eb', marginBottom: '10px' }}>Estate Resources</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '8px', marginBottom: '20px' }}>
                  {estate.resources.food !== undefined && (
                    <div style={{ backgroundColor: '#1e1e2e', padding: '8px', borderRadius: '4px' }}>
                      <p style={{ fontSize: '10px', color: '#a0aec0' }}>Food</p>
                      <p style={{ color: '#e5e7eb', fontWeight: 'bold' }}>{estate.resources.food}</p>
                    </div>
                  )}
                  {estate.resources.wood !== undefined && (
                    <div style={{ backgroundColor: '#1e1e2e', padding: '8px', borderRadius: '4px' }}>
                      <p style={{ fontSize: '10px', color: '#a0aec0' }}>Wood</p>
                      <p style={{ color: '#e5e7eb', fontWeight: 'bold' }}>{estate.resources.wood}</p>
                    </div>
                  )}
                  {estate.resources.stone !== undefined && (
                    <div style={{ backgroundColor: '#1e1e2e', padding: '8px', borderRadius: '4px' }}>
                      <p style={{ fontSize: '10px', color: '#a0aec0' }}>Stone</p>
                      <p style={{ color: '#e5e7eb', fontWeight: 'bold' }}>{estate.resources.stone}</p>
                    </div>
                  )}
                  {estate.resources.gold !== undefined && (
                    <div style={{ backgroundColor: '#1e1e2e', padding: '8px', borderRadius: '4px' }}>
                      <p style={{ fontSize: '10px', color: '#a0aec0' }}>Gold</p>
                      <p style={{ color: '#e5e7eb', fontWeight: 'bold' }}>{estate.resources.gold}</p>
                    </div>
                  )}
                </div>

                {estate.prosperity < 50 && (
                  <div
                    style={{
                      backgroundColor: '#1e1e2e',
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid #f97316',
                      marginBottom: '15px',
                    }}
                  >
                    <p style={{ color: '#f97316', fontWeight: 'bold', marginBottom: '4px' }}>⚠️ Estate Alert</p>
                    <p style={{ fontSize: '11px', color: '#e5e7eb' }}>
                      This estate is struggling. Develop it to improve prosperity and prevent rebellion.
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setSelectedEstate(null)}
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
  );
};
