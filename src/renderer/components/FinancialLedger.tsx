import React, { useState } from 'react';
import { GameState } from '../../shared/types';

interface FinancialLedgerProps {
  gameState: GameState;
  onAuditHouse: (houseId: string) => void;
}

export const FinancialLedger: React.FC<FinancialLedgerProps> = ({
  gameState,
  onAuditHouse,
}) => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'entries' | 'audits'>('overview');

  const ledger = gameState.generalLedger;
  const netBalance = ledger.netBalance;
  const balanceColor = netBalance >= 0 ? '#10b981' : '#ef4444';

  const incomeEntries = ledger.entries.filter(e => e.category === 'income');
  const expenseEntries = ledger.entries.filter(e => e.category === 'expense');

  const getTopIncomeSource = () => {
    if (incomeEntries.length === 0) return { source: 'None', amount: 0 };
    const sorted = [...incomeEntries].sort((a, b) => b.amount - a.amount);
    return { source: sorted[0].source || 'Unknown', amount: sorted[0].amount };
  };

  const getTopExpense = () => {
    if (expenseEntries.length === 0) return { category: 'None', amount: 0 };
    const sorted = [...expenseEntries].sort((a, b) => b.amount - a.amount);
    return { category: sorted[0].description, amount: sorted[0].amount };
  };

  return (
    <div className="financial-ledger-container" style={{ padding: '20px' }}>
      <h2 style={{ color: '#f59e0b', marginBottom: '20px' }}>💰 General Ledger</h2>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {(['overview', 'entries', 'audits'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            style={{
              padding: '8px 16px',
              backgroundColor: selectedTab === tab ? '#f59e0b' : '#374151',
              color: selectedTab === tab ? '#1e1e2e' : '#e5e7eb',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {selectedTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          {/* Balance Summary */}
          <div style={{ backgroundColor: '#2d2d44', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ color: '#e5e7eb', marginBottom: '15px' }}>Balance Summary</h3>

            <div style={{ marginBottom: '15px' }}>
              <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '5px' }}>Total Income</p>
              <p style={{ color: '#10b981', fontSize: '18px', fontWeight: 'bold' }}>
                {ledger.totalIncome.toFixed(0)} gold
              </p>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '5px' }}>Total Expenses</p>
              <p style={{ color: '#ef4444', fontSize: '18px', fontWeight: 'bold' }}>
                {ledger.totalExpense.toFixed(0)} gold
              </p>
            </div>

            <div
              style={{
                padding: '15px',
                backgroundColor: '#1e1e2e',
                borderRadius: '6px',
                border: `2px solid ${balanceColor}`,
              }}
            >
              <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '8px' }}>Net Balance</p>
              <p style={{ color: balanceColor, fontSize: '24px', fontWeight: 'bold' }}>
                {netBalance.toFixed(0)} gold
              </p>
              {netBalance < 0 && (
                <p style={{ fontSize: '10px', color: '#ef4444', marginTop: '5px' }}>⚠️ In deficit!</p>
              )}
            </div>
          </div>

          {/* Key Metrics */}
          <div style={{ backgroundColor: '#2d2d44', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ color: '#e5e7eb', marginBottom: '15px' }}>Key Metrics</h3>

            <div style={{ marginBottom: '15px' }}>
              <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '5px' }}>Top Income Source</p>
              <p style={{ color: '#e5e7eb' }}>{getTopIncomeSource().source}</p>
              <p style={{ fontSize: '12px', color: '#10b981', fontWeight: 'bold' }}>
                {getTopIncomeSource().amount.toFixed(0)} gold
              </p>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '5px' }}>Largest Expense</p>
              <p style={{ color: '#e5e7eb' }}>{getTopExpense().category}</p>
              <p style={{ fontSize: '12px', color: '#ef4444', fontWeight: 'bold' }}>
                {getTopExpense().amount.toFixed(0)} gold
              </p>
            </div>

            <div>
              <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '5px' }}>Transaction Count</p>
              <p style={{ color: '#e5e7eb', fontSize: '16px', fontWeight: 'bold' }}>{ledger.entries.length}</p>
            </div>
          </div>
        </div>
      )}

      {/* ENTRIES TAB */}
      {selectedTab === 'entries' && (
        <div style={{ backgroundColor: '#2d2d44', padding: '20px', borderRadius: '8px' }}>
          <h3 style={{ color: '#e5e7eb', marginBottom: '15px' }}>Recent Transactions</h3>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {ledger.entries.length === 0 ? (
              <p style={{ fontSize: '12px', color: '#a0aec0' }}>No transactions recorded yet.</p>
            ) : (
              <div>
                {[...ledger.entries].reverse().map((entry, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '2fr 1fr 1fr',
                      padding: '10px 12px',
                      borderBottom: '1px solid #374151',
                      alignItems: 'center',
                      fontSize: '12px',
                    }}
                  >
                    <div>
                      <p style={{ color: '#e5e7eb', marginBottom: '2px' }}>{entry.description}</p>
                      <p style={{ fontSize: '10px', color: '#a0aec0' }}>
                        {new Date(entry.date).toLocaleDateString()}
                      </p>
                    </div>
                    <p
                      style={{
                        color: entry.category === 'income' ? '#10b981' : '#ef4444',
                        fontWeight: 'bold',
                      }}
                    >
                      {entry.category === 'income' ? '+' : '-'}{entry.amount.toFixed(0)}
                    </p>
                    <p style={{ color: '#a0aec0', textAlign: 'right' }}>
                      {entry.category === 'income' ? '📈' : '📉'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* AUDITS TAB */}
      {selectedTab === 'audits' && (
        <div style={{ backgroundColor: '#2d2d44', padding: '20px', borderRadius: '8px' }}>
          <h3 style={{ color: '#e5e7eb', marginBottom: '15px' }}>Rival House Audits</h3>
          <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '20px' }}>
            Audit rival noble houses to uncover financial irregularities and corruption.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px' }}>
            {gameState.nobleHouses.map((house) => (
              <button
                key={house.id}
                onClick={() => onAuditHouse(house.id)}
                style={{
                  padding: '12px 16px',
                  backgroundColor: '#1e1e2e',
                  border: '1px solid #374151',
                  borderRadius: '4px',
                  color: '#e5e7eb',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#2d3748';
                  (e.target as HTMLButtonElement).style.borderColor = '#f59e0b';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#1e1e2e';
                  (e.target as HTMLButtonElement).style.borderColor = '#374151';
                }}
              >
                <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>{house.name}</p>
                <p style={{ fontSize: '11px', color: '#a0aec0' }}>Cost: 500 gold</p>
                <p style={{ fontSize: '10px', color: '#fbbf24', marginTop: '6px' }}>🔍 Audit this house</p>
              </button>
            ))}
          </div>

          <p style={{ fontSize: '10px', color: '#a0aec0', marginTop: '15px', fontStyle: 'italic' }}>
            Audits cost 500 gold and reveal suspicious financial activities and potential rebellion plots.
          </p>
        </div>
      )}
    </div>
  );
};
