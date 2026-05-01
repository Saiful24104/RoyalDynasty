import React, { useState } from 'react';
import { GameState, NobleHouse } from '../../shared/types';

interface NobleHousesProps {
  gameState: GameState;
  onImproveRelation: (houseId: string, amount: number) => void;
  onUnlockEliteUnit: (houseId: string) => void;
}

export const NobleHouses: React.FC<NobleHousesProps> = ({
  gameState,
  onImproveRelation,
  onUnlockEliteUnit,
}) => {
  const [selectedHouse, setSelectedHouse] = useState<NobleHouse | null>(null);

  const getRelationColor = (relationship: number | undefined): string => {
    const rel = relationship || 0;
    if (rel >= 70) return '#4ade80'; // green - Can unlock elite unit
    if (rel >= 50) return '#fbbf24'; // amber
    if (rel >= 30) return '#f97316'; // orange
    return '#ef4444'; // red
  };

  const getRelationStatus = (relationship: number | undefined): string => {
    const rel = relationship || 0;
    if (rel >= 70) return 'Allied';
    if (rel >= 50) return 'Friendly';
    if (rel >= 30) return 'Neutral';
    return 'Hostile';
  };

  return (
    <div className="noble-houses-container" style={{ padding: '20px' }}>
      <h2 style={{ color: '#f59e0b', marginBottom: '20px' }}>⚜️ Noble Houses</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
        {gameState.nobleHouses.map((house) => (
          <div
            key={house.id}
            style={{
              border: `2px solid ${getRelationColor(house.relationship)}`,
              borderRadius: '8px',
              padding: '15px',
              backgroundColor: '#1e1e2e',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onClick={() => setSelectedHouse(house)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <h3 style={{ color: '#f59e0b', marginBottom: '8px' }}>{house.name}</h3>
            <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '8px' }}>
              Trait: {house.trait}
            </p>
            <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '10px' }}>
              {house.description}
            </p>

            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px' }}>Relationship</span>
                <span style={{ fontSize: '12px', color: getRelationColor(house.relationship) }}>
                  {house.relationship ? Math.round(house.relationship) : 0}/100
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
                    width: `${house.relationship ? house.relationship : 0}%`,
                    height: '100%',
                    backgroundColor: getRelationColor(house.relationship),
                    transition: 'width 0.3s',
                  }}
                />
              </div>
            </div>

            <p style={{ fontSize: '11px', color: getRelationColor(house.relationship), marginBottom: '10px' }}>
              Status: {getRelationStatus(house.relationship)}
            </p>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => onImproveRelation(house.id, 10)}
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
                Improve +10
              </button>
              {(house.relationship || 0) >= 70 && (
                <button
                  onClick={() => onUnlockEliteUnit(house.id)}
                  style={{
                    flex: 1,
                    padding: '6px 10px',
                    backgroundColor: '#4ade80',
                    color: '#1e1e2e',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  Elite Unit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedHouse && (
        <div
          style={{
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#2d2d44',
            borderRadius: '8px',
            borderLeft: `4px solid ${getRelationColor(selectedHouse.relationship)}`,
          }}
        >
          <h3 style={{ color: '#f59e0b', marginBottom: '15px' }}>{selectedHouse.name} - Detailed View</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '5px' }}>Trait</p>
              <p style={{ color: '#e5e7eb', marginBottom: '15px' }}>{selectedHouse.trait}</p>

              <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '5px' }}>Elite Unit</p>
              <p style={{ color: '#e5e7eb', marginBottom: '15px' }}>{selectedHouse.eliteUnit}</p>
            </div>

            <div>
              <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '5px' }}>Unique Ability</p>
              <p style={{ color: '#e5e7eb', fontSize: '12px', marginBottom: '15px' }}>{selectedHouse.uniqueAbility}</p>

              <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '5px' }}>Member Count</p>
              <p style={{ color: '#e5e7eb' }}>{selectedHouse.members?.length || 0} members</p>
            </div>
          </div>

          <button
            onClick={() => setSelectedHouse(null)}
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
        </div>
      )}
    </div>
  );
};
