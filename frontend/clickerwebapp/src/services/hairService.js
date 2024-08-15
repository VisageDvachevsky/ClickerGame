import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/API';
const BATCH_SIZE = 100;
const FLUSH_INTERVAL = 10000; 

let hairBuffer = [];
let lastFlushTime = Date.now();

/**
 * Отправка данных о удалении волос на сервер.
 * @param {Array} batch - Массив объектов с данными для отправки.
 */
const sendBatch = async (batch) => {
    try {
        await axios.post(`${API_BASE_URL}/remove-hair-batch`, { batch });
        console.log('Batch sent successfully.');
    } catch (error) {
        console.error('Error sending batch:', error);
    }
};

/**
 * Добавление данных об удалении волос в буфер и отправка при необходимости.
 * @param {string} userId - Идентификатор пользователя.
 * @param {number} removedHair - Количество удаленных волос.
 */
export const addToBuffer = (userId, removedHair) => {
    hairBuffer.push({ userId, removedHair });

    if (hairBuffer.length >= BATCH_SIZE || (Date.now() - lastFlushTime) > FLUSH_INTERVAL) {
        sendBatch(hairBuffer);
        hairBuffer = [];
        lastFlushTime = Date.now();
    }
};

setInterval(() => {
    if (hairBuffer.length > 0) {
        sendBatch(hairBuffer);
        hairBuffer = [];
    }
}, FLUSH_INTERVAL);

/**
 * Получение текущего состояния волос пользователя.
 * @param {string} userId - Идентификатор пользователя.
 * @returns {Promise<number>} - Общее количество волос.
 */
export const getHairStatus = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/hair-status`, {
            params: { userId }
        });
        return response.data.hairCount;
    } catch (error) {
        console.error('Error fetching hair status:', error);
        return 0; 
    }
};
