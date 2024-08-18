import axios from 'axios';

const API_BASE_URL = '/API';

const ChallengeService = {
  getChallenges: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getChallenges`, {
        params: { userId }
      });
      return response.data.challenges;
    } catch (error) {
      console.error('Error fetching challenges:', error);
      throw error;
    }
  },

  completeChallenge: async (userId, challengeId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/completeChallenge`, {
        userId,
        challengeId
      });
      return response.data;
    } catch (error) {
      console.error('Error completing challenge:', error);
      throw error;
    }
  },

  fetchPoints: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getPoints`, {
        params: { userId }
      });
      return response.data.points;
    } catch (error) {
      console.error('Error fetching points:', error);
      throw error;
    }
  }
};

export default ChallengeService;