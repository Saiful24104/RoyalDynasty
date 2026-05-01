import React, { useState } from 'react';
import { GameState } from '../../shared/types';

interface HeirIncubationProps {
  gameState: GameState;
  onStartIncubation: (consortName: string) => void;
  onInvestResource: (resourceType: string, amount: number) => void;
}

export const HeirIncubation: React.FC<HeirIncubationProps> = ({
  gameState,
  onStartIncubation,
  onInvestResource,
}) => {
  const [consortName, setConsortName] = useState('');
  const [showIncubationForm, setShowIncubationForm] = useState(false);
  const [selectedResource, setSelectedResource] = useState<string>('gold');
  const [investmentAmount, setInvestmentAmount] = useState(100);

  const heir = gameState.kingdom.ruler.heir;
  const isIncubating = heir?.isIncubating;

  const handleStartIncubation = () => {
    if (consortName.trim()) {
      onStartIncubation(consortName);
      setConsortName('');
      setShowIncubationForm(false);
    }
  };

  const getIncubationProgress = (): number => {
    if (!isIncubating || heir?.incubationMonthsRemaining === undefined) return 0;
    return ((9 - heir.incubationMonthsRemaining) / 9) * 100;
  };

  const getStatGrowthPercent = (invested: number): number => {
    return (invested / 1000) * 15; // 15% growth per 1000 resources
  };

  return (
    <div className="heir-incubation-container" style={{ padding: '20px' }}>
      <h2 style={{ color: '#f59e0b', marginBottom: '20px' }}>👶 Heir Succession</h2>

      {!heir ? (
        <div style={{ backgroundColor: '#2d2d44', padding: '20px', borderRadius: '8px' }}>
          <p style={{ color: '#e5e7eb', marginBottom: '15px' }}>No heir established. Create a consort to begin the incubation process.</p>
          <button
            onClick={() => setShowIncubationForm(!showIncubationForm)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#f59e0b',
              color: '#1e1e2e',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            {showIncubationForm ? 'Cancel' : 'Establish Consort & Heir'}
          </button>

          {showIncubationForm && (
            <div style={{ marginTop: '15px' }}>
              <input
                type="text"
                placeholder="Consort/Heir Name"
                value={consortName}
                onChange={(e) => setConsortName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: '#1e1e2e',
                  border: '1px solid #374151',
                  color: '#e5e7eb',
                  borderRadius: '4px',
                  marginBottom: '10px',
                  boxSizing: 'border-box',
                }}
              />
              <button
                onClick={handleStartIncubation}
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
                Start Incubation (9 months)
              </button>
            </div>
          )}
        </div>
      ) : (
        <div style={{ backgroundColor: '#2d2d44', padding: '20px', borderRadius: '8px' }}>
          <h3 style={{ color: '#e5e7eb', marginBottom: '15px' }}>Heir: {heir.name}</h3>

          {isIncubating ? (
            <div>
              <p style={{ color: '#a0aec0', fontSize: '12px', marginBottom: '8px' }}>Incubation Progress</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div
                  style={{
                    flex: 1,
                    height: '20px',
                    backgroundColor: '#374151',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${getIncubationProgress()}%`,
                      height: '100%',
                      backgroundColor: '#f59e0b',
                      transition: 'width 0.3s',
                    }}
                  />
                </div>
                <span style={{ color: '#e5e7eb', fontSize: '12px', minWidth: '40px' }}>
                  {heir.incubationMonthsRemaining} months
                </span>
              </div>

              <p style={{ color: '#e5e7eb', marginBottom: '15px', fontSize: '12px' }}>
                Invest resources to improve heir stats. Each resource develops different skills:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                <div style={{ backgroundColor: '#1e1e2e', padding: '10px', borderRadius: '4px' }}>
                  <p style={{ fontSize: '11px', color: '#a0aec0', marginBottom: '5px' }}>Gold → Leadership</p>
                  <p style={{ color: '#fbbf24', fontSize: '12px' }}>+{getStatGrowthPercent(heir.incubationResources?.goldInvested || 0).toFixed(1)}%</p>
                </div>
                <div style={{ backgroundColor: '#1e1e2e', padding: '10px', borderRadius: '4px' }}>
                  <p style={{ fontSize: '11px', color: '#a0aec0', marginBottom: '5px' }}>Food → Military</p>
                  <p style={{ color: '#fbbf24', fontSize: '12px' }}>+{getStatGrowthPercent(heir.incubationResources?.foodInvested || 0).toFixed(1)}%</p>
                </div>
                <div style={{ backgroundColor: '#1e1e2e', padding: '10px', borderRadius: '4px' }}>
                  <p style={{ fontSize: '11px', color: '#a0aec0', marginBottom: '5px' }}>Mana → Wisdom</p>
                  <p style={{ color: '#fbbf24', fontSize: '12px' }}>+{getStatGrowthPercent(heir.incubationResources?.manaInvested || 0).toFixed(1)}%</p>
                </div>
              </div>

              <p style={{ color: '#a0aec0', fontSize: '12px', marginBottom: '8px' }}>Invest Resources</p>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <select
                  value={selectedResource}
                  onChange={(e) => setSelectedResource(e.target.value)}
                  style={{
                    padding: '8px',
                    backgroundColor: '#1e1e2e',
                    border: '1px solid #374151',
                    color: '#e5e7eb',
                    borderRadius: '4px',
                  }}
                >
                  <option value="gold">Gold (Leadership)</option>
                  <option value="food">Food (Military)</option>
                  <option value="mana">Mana (Wisdom)</option>
                </select>
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Math.max(10, parseInt(e.target.value) || 10))}
                  min="10"
                  step="10"
                  style={{
                    width: '80px',
                    padding: '8px',
                    backgroundColor: '#1e1e2e',
                    border: '1px solid #374151',
                    color: '#e5e7eb',
                    borderRadius: '4px',
                  }}
                />
                <button
                  onClick={() => onInvestResource(selectedResource, investmentAmount)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#10b981',
                    color: '#1e1e2e',
                    border: 'none',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  Invest
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p style={{ color: '#a0aec0', marginBottom: '15px' }}>Age: {heir.age.toFixed(1)} years</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ backgroundColor: '#1e1e2e', padding: '10px', borderRadius: '4px' }}>
                  <p style={{ fontSize: '11px', color: '#a0aec0' }}>Leadership</p>
                  <p style={{ color: '#fbbf24' }}>{heir.potential.leadership.toFixed(0)}</p>
                </div>
                <div style={{ backgroundColor: '#1e1e2e', padding: '10px', borderRadius: '4px' }}>
                  <p style={{ fontSize: '11px', color: '#a0aec0' }}>Military</p>
                  <p style={{ color: '#fbbf24' }}>{heir.potential.military.toFixed(0)}</p>
                </div>
                <div style={{ backgroundColor: '#1e1e2e', padding: '10px', borderRadius: '4px' }}>
                  <p style={{ fontSize: '11px', color: '#a0aec0' }}>Wisdom</p>
                  <p style={{ color: '#fbbf24' }}>{heir.potential.wisdom.toFixed(0)}</p>
                </div>
                <div style={{ backgroundColor: '#1e1e2e', padding: '10px', borderRadius: '4px' }}>
                  <p style={{ fontSize: '11px', color: '#a0aec0' }}>Legitimacy</p>
                  <p style={{ color: '#fbbf24' }}>{(heir.legitimacy * 100).toFixed(0)}%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
