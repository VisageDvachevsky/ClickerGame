import React, { useState, useEffect } from 'react';
import ChallengeService from './ChallengeService';
import './challenge.css';

const ChallengeComponent = ({ userId, onClose }) => {
  const [challenges, setChallenges] = useState([]);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChallengesAndPoints();
  }, []);

  const fetchChallengesAndPoints = async () => {
    try {
      setLoading(true);
      const [fetchedChallenges, fetchedPoints] = await Promise.all([
        ChallengeService.getChallenges(userId),
        ChallengeService.fetchPoints(userId)
      ]);
      setChallenges(fetchedChallenges);
      setPoints(fetchedPoints);
    } catch (err) {
      setError('Failed to fetch challenges and points. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteChallenge = async (challengeId) => {
    try {
      setLoading(true);
      const result = await ChallengeService.completeChallenge(userId, challengeId);
      setChallenges(challenges.map(challenge => 
        challenge.id === challengeId ? { ...challenge, completed: true } : challenge
      ));
      setPoints(result.newPoints);
    } catch (err) {
      setError('Failed to complete the challenge. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="taskModalBackdrop">
      <div className="taskModalContent">
        <p>Loading challenges...</p>
      </div>
    </div>;
  }

  if (error) {
    return <div className="taskModalBackdrop">
      <div className="taskModalContent">
        <p>{error}</p>
        <button className="closeButton" onClick={onClose}>Close</button>
      </div>
    </div>;
  }

  return (
    <div className="taskModalBackdrop">
      <div className="taskModalContent">
        <h2 className="taskTitle">Your Challenges</h2>
        <p className="pointsDisplay">Current Points: {points}</p>
        <div className="taskList">
          {challenges.map((challenge) => (
            <div key={challenge.id} className={`taskItem ${challenge.completed ? 'completedTask' : ''}`}>
              <h3 className="taskName">{challenge.title}</h3>
              <p className="taskReward">Reward: {challenge.reward} points</p>
              <button 
                className="completeButton"
                onClick={() => handleCompleteChallenge(challenge.id)}
                disabled={challenge.completed}
              >
                {challenge.completed ? 'Completed' : 'Complete Challenge'}
              </button>
            </div>
          ))}
        </div>
        <button className="closeButton" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ChallengeComponent;