import React from 'react';
import { GameState } from '../../shared/types';
import { GameManager } from '../../game/manager';

interface MarketPlaceProps {
  gameState: GameState;
  gameManager: GameManager;
}

const MarketPlace: React.FC<MarketPlaceProps> = ({ gameState, gameManager }) => {
  const { market } = gameState;

  return (
    <div className="market-place">
      <h2>Kingdom Market</h2>

      <div className="market-sections">
        <div className="section">
          <h3>Available Goods</h3>
          <div className="goods-grid">
            {market.goods.map(good => {
              const price = market.prices.get(good.id) || good.basePrice;
              return (
                <div key={good.id} className="good-card">
                  <h4>{good.name}</h4>
                  <div className="good-info">
                    <div className="info-row">
                      <span>Type:</span>
                      <span>{good.type}</span>
                    </div>
                    <div className="info-row">
                      <span>Available:</span>
                      <span>{good.quantity.toLocaleString()}</span>
                    </div>
                    <div className="info-row">
                      <span>Price:</span>
                      <span className="price">{price.toFixed(2)} gold</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="section">
          <h3>Trading Routes</h3>
          {market.tradingRoutes.length > 0 ? (
            <div className="routes-list">
              {market.tradingRoutes.map(route => (
                <div key={route.id} className="route-card">
                  <h4>{route.from} → {route.to}</h4>
                  <div className="route-info">
                    <div className="info-row">
                      <span>Goods:</span>
                      <span>{route.goods.join(', ')}</span>
                    </div>
                    <div className="info-row">
                      <span>Profit Margin:</span>
                      <span>{(route.profitMargin * 100).toFixed(0)}%</span>
                    </div>
                    <div className="info-row">
                      <span>Risk Level:</span>
                      <span className={route.riskLevel > 0.5 ? 'high-risk' : 'low-risk'}>
                        {(route.riskLevel * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="info-row">
                      <span>Status:</span>
                      <span>{route.isActive ? '✓ Active' : '✗ Inactive'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No trading routes established yet</p>
          )}
        </div>

        <div className="section">
          <h3>Merchants</h3>
          {market.merchants.length > 0 ? (
            <div className="merchants-list">
              {market.merchants.map(merchant => (
                <div key={merchant.id} className="merchant-card">
                  <h4>{merchant.name}</h4>
                  <div className="merchant-info">
                    <div className="info-row">
                      <span>Wealth:</span>
                      <span className="gold">{merchant.wealth.toLocaleString()}</span>
                    </div>
                    <div className="info-row">
                      <span>Reputation:</span>
                      <span>{merchant.reputation}%</span>
                    </div>
                    <div className="info-row">
                      <span>Specialties:</span>
                      <span>{merchant.specialties.join(', ')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No merchants in the market yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
