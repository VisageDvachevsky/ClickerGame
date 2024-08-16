import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/API';
const INITIAL_BATCH_SIZE = 100;
const INITIAL_FLUSH_INTERVAL = 10000; // 10 seconds

let hairBuffer = [];
let lastFlushTime = Date.now();
let dynamicFlushInterval = INITIAL_FLUSH_INTERVAL;
let dynamicBatchSize = INITIAL_BATCH_SIZE;

/**
 * Отправка данных о удалении волос на сервер.
 * @param {Array} batch - Массив объектов с данными для отправки.
 */
const sendBatch = async (batch) => {
    try {
        const userTimestamp = new Date().toISOString(); 

        await axios.post(`${API_BASE_URL}/remove-hair-batch`, {
            batch,
            userTimestamp, 
        });

        console.log('Batch sent successfully.');
    } catch (error) {
        console.error('Error sending batch:', error);
    }
};


/**
 * Управление динамическими параметрами на основе текущего состояния буфера.
 */
const adjustFlushParameters = () => {
    const timeSinceLastFlush = Date.now() - lastFlushTime;

    if (hairBuffer.length >= dynamicBatchSize) {
        dynamicFlushInterval = Math.max(1000, dynamicFlushInterval / 2); // Уменьшение интервала
        dynamicBatchSize = Math.min(500, dynamicBatchSize * 1.5); // Увеличение размера батча
    } else if (timeSinceLastFlush > dynamicFlushInterval * 2) {
        dynamicFlushInterval = Math.min(INITIAL_FLUSH_INTERVAL, dynamicFlushInterval * 1.5); // Увеличение интервала
        dynamicBatchSize = Math.max(INITIAL_BATCH_SIZE, dynamicBatchSize / 1.5); // Уменьшение размера батча
    }
};

/**
 * Добавление данных об удалении волос в буфер и отправка при необходимости.
 * @param {string} userId - Идентификатор пользователя.
 * @param {number} removedHair - Количество удаленных волос.
 */
export const addToBuffer = (userId, removedHair) => {
    hairBuffer.push({ userId, removedHair });

    adjustFlushParameters();

    if (hairBuffer.length >= dynamicBatchSize || (Date.now() - lastFlushTime) > dynamicFlushInterval) {
        sendBatch(hairBuffer);
        hairBuffer = [];
        lastFlushTime = Date.now();
    }
};

setInterval(() => {
    if (hairBuffer.length > 0) {
        sendBatch(hairBuffer);
        hairBuffer = [];
        lastFlushTime = Date.now();
    }
}, dynamicFlushInterval);

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
