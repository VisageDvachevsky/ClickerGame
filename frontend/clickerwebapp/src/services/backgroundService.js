import axios from 'axios';
const API_BASE_URL = '/API';

const BACKGROUNDS = [
    'first_bg.jpg',
    'second_bg.jpg',
    'third_bg.jpg',
    'fourth_bg.jpg',
    'fifth_bg.jpg',
    'sixth_bg.jpg'
  ];
  
const POINTS_PER_BACKGROUND = 10000;

const getBackgroundIndex = (points) => {
  return Math.floor(points / POINTS_PER_BACKGROUND) % BACKGROUNDS.length;
};

const getBackgroundUrl = (index) => {
    return `backgrounds/${BACKGROUNDS[index]}`;
};

const fetchCurrentBackground = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getCurrentBackground`, {
      params: { userId }
    });
    return response.data.backgroundIndex;
  } catch (error) {
    console.error('Error fetching current background:', error);
    throw error;
  }
};

const updateBackground = async (userId, points) => {
  const newBackgroundIndex = getBackgroundIndex(points);
  try {
    await axios.post(`${API_BASE_URL}/updateBackground`, {
      userId,
      backgroundIndex: newBackgroundIndex
    });
    return newBackgroundIndex;
  } catch (error) {
    console.error('Error updating background:', error);
    throw error;
  }
};

export {
  getBackgroundIndex,
  getBackgroundUrl,
  fetchCurrentBackground,
  updateBackground
};