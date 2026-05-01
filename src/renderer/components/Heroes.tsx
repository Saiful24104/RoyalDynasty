import React from 'react';
import { GameState } from '../../shared/types';
import { GameManager } from '../../game/manager';

interface HeroesProps {
  gameState: GameState;
  gameManager: GameManager;
}

const Heroes: React.FC<HeroesProps> = ({ gameState, gameManager }) => {
  const heroes = gameState.heroes;

  return (
    <div className="heroes-view">
      <h2>Heroes & Legends</h2>

      <div className="heroes-grid">
        {heroes.map(hero => (
          <div key={hero.id} className="hero-card">
            <h3>{hero.name}</h3>
            <p className="hero-title">{hero.title}</p>

            <div className="hero-stats">
              <div className="stat">
                <span>Level:</span>
                <span>{hero.level}</span>
              </div>
              <div className="stat">
                <span>Experience:</span>
                <span>{hero.experience.toLocaleString()}</span>
              </div>
            </div>

            <div className="hero-section">
              <h4>Skills</h4>
              <div className="skills-list">
                {hero.skills.map(skill => (
                  <div key={skill.id} className="skill-item">
                    <div className="skill-name">{skill.name}</div>
                    <div className="skill-level">
                      <span>Level {skill.level}</span>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${skill.level * 10}%` }}></div>
                      </div>
                    </div>
                    <small>{skill.effect}</small>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-section">
              <h4>Equipment</h4>
              {hero.equipment.length > 0 ? (
                <div className="equipment-list">
                  {hero.equipment.map(item => (
                    <div key={item.id} className="equipment-item">
                      <span>{item.name}</span>
                      <span className="rarity">{item.rarity}</span>
                      <span className="bonus">+{item.bonus}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">No equipment equipped</p>
              )}
            </div>

            <p className="hero-story">{hero.story}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Heroes;
