import axios from 'axios';

const API_BASE_URL = '/API';

const BASE_POINTS_PER_HAIR = 2;

const calculatePoints = (hair, level) => {
    const pointsPerHair = BASE_POINTS_PER_HAIR + (level - 1) * 2;
    return Math.floor(hair * pointsPerHair);
};

const fetchPoints = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getPoints`, {
            params: { userId }
        });
        return response.data.points;
    } catch (error) {
        console.error('Error fetching points:', error);
        throw error;
    }
};

const updatePoints = async (userId, points) => {
    try {
        await axios.post(`${API_BASE_URL}/updatePoints`, {
            userId,
            points
        });
    } catch (error) {
        console.error('Error updating points:', error);
        throw error;
    }
};

const processHairRemoval = async (userId, currentPoints, hairRemoved, level) => {
    const pointsToAdd = calculatePoints(hairRemoved, level);
    const newPoints = currentPoints + pointsToAdd;
    
    await updatePoints(userId, newPoints);
    
    return newPoints;
};

export {
    fetchPoints,
    processHairRemoval,
    calculatePoints
};