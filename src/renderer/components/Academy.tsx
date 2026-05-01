import React from 'react';
import { GameState } from '../../shared/types';
import { GameManager } from '../../game/manager';

interface AcademyProps {
  gameState: GameState;
  gameManager: GameManager;
}

const Academy: React.FC<AcademyProps> = ({ gameState, gameManager }) => {
  const academy = gameState.kingdom.capital.academy;

  return (
    <div className="academy-view">
      <h2>{academy.name}</h2>

      <div className="academy-sections">
        <div className="section">
          <h3>Academy Status</h3>
          <div className="info-block">
            <div className="stat-row">
              <span>Academy Level:</span>
              <span>{academy.level}</span>
            </div>
            <div className="stat-row">
              <span>Students:</span>
              <span>{academy.students.length}</span>
            </div>
            <div className="stat-row">
              <span>Knowledge Pool:</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(academy.knowledgePool / 1000) * 100}%` }}></div>
              </div>
              <span>{academy.knowledgePool}</span>
            </div>
          </div>
        </div>

        <div className="section">
          <h3>Enrolled Scholars</h3>
          {academy.students.length > 0 ? (
            <div className="scholars-list">
              {academy.students.map(scholar => (
                <div key={scholar.id} className="scholar-card">
                  <h4>{scholar.name}</h4>
                  <div className="scholar-info">
                    <div className="info-row">
                      <span>Specialization:</span>
                      <span>{scholar.specialization}</span>
                    </div>
                    <div className="info-row">
                      <span>Level:</span>
                      <span>{scholar.level}</span>
                    </div>
                    <div className="info-row">
                      <span>Progress:</span>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${scholar.progress}%` }}></div>
                      </div>
                      <span>{scholar.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No scholars enrolled yet</p>
          )}
        </div>

        <div className="section">
          <h3>Available Courses</h3>
          {academy.courses.length > 0 ? (
            <div className="courses-grid">
              {academy.courses.map(course => (
                <div key={course.id} className="course-card">
                  <h4>{course.name}</h4>
                  <div className="course-info">
                    <div className="info-row">
                      <span>Subject:</span>
                      <span>{course.subject}</span>
                    </div>
                    <div className="info-row">
                      <span>Duration:</span>
                      <span>{course.duration} months</span>
                    </div>
                    <p className="benefit">Benefit: {course.benefit}</p>
                  </div>
                  <button className="enroll-button">Enroll Scholar</button>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No courses available yet</p>
          )}
        </div>

        <div className="section">
          <h3>Research Projects</h3>
          <div className="research-section">
            <p>Unlock magical discoveries and increase kingdom knowledge through magical research.</p>
            <div className="research-buttons">
              <button className="research-button">Research Arcane Arts (100 mana)</button>
              <button className="research-button">Study Alchemy (100 mana)</button>
              <button className="research-button">Explore Necromancy (150 mana)</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Academy;
