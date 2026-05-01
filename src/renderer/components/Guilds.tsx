import React, { useState } from 'react';
import { GameState } from '../../shared/types';
import { GameManager } from '../../game/manager';

interface GuildsProps {
  gameState: GameState;
  gameManager: GameManager;
}

const Guilds: React.FC<GuildsProps> = ({ gameState, gameManager }) => {
  const [selectedGuild, setSelectedGuild] = useState(0);
  const guilds = gameState.guilds;
  const guild = guilds[selectedGuild];

  return (
    <div className="guilds-view">
      <h2>Guilds & Organizations</h2>

      <div className="guild-selector">
        <h3>Select Guild</h3>
        <div className="guild-buttons">
          {guilds.map((g, index) => (
            <button
              key={g.id}
              className={`guild-button ${selectedGuild === index ? 'active' : ''}`}
              onClick={() => setSelectedGuild(index)}
            >
              {g.name}
            </button>
          ))}
        </div>
      </div>

      {guild && (
        <div className="guild-details">
          <div className="section">
            <h3>{guild.name}</h3>
            <div className="info-block">
              <div className="stat-row">
                <span>Type:</span>
                <span>{guild.type}</span>
              </div>
              <div className="stat-row">
                <span>Level:</span>
                <span>{guild.level}</span>
              </div>
              <div className="stat-row">
                <span>Members:</span>
                <span>{guild.members.length}</span>
              </div>
              <div className="stat-row">
                <span>Treasury:</span>
                <span className="gold">{guild.treasury.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="section">
            <h3>Guild Members</h3>
            {guild.members.length > 0 ? (
              <div className="members-grid">
                {guild.members.map(member => (
                  <div key={member.id} className="member-card">
                    <h4>{member.name}</h4>
                    <div className="member-info">
                      <div className="info-row">
                        <span>Rank:</span>
                        <span>{member.rank}</span>
                      </div>
                      <div className="info-row">
                        <span>Reputation:</span>
                        <span>{member.reputation}%</span>
                      </div>
                      <div className="info-row">
                        <span>Skills:</span>
                        <span>{member.skills.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No members yet</p>
            )}
          </div>

          <div className="section">
            <h3>Available Quests</h3>
            {guild.quests.length > 0 ? (
              <div className="quests-list">
                {guild.quests.map(quest => (
                  <div key={quest.id} className="quest-card">
                    <h4>{quest.title}</h4>
                    <p>{quest.description}</p>
                    <div className="quest-info">
                      <span>Difficulty: {quest.difficulty}</span>
                      <span className="reward">Reward: {quest.reward}</span>
                      <span className="status">{quest.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No quests available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Guilds;
