/**
 * Преобразует строку (ник пользователя) в числовую последовательность.
 * Работает с любым языком.
 * @param {string} str - Ник пользователя.
 * @returns {number} - Числовая последовательность.
 */
export const stringToNumber = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; 
    }
    return Math.abs(hash); 
};

/**
 * Преобразует числовую последовательность обратно в строку (ник пользователя).
 * @param {number} num - Числовая последовательность.
 * @returns {string} - Ник пользователя.
 */
export const numberToString = (num) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let str = '';
    num = Math.abs(num); // Убедимся, что число положительное

    do {
        str = chars[num % chars.length] + str;
        num = Math.floor(num / chars.length);
    } while (num > 0);

    return str || 'Anonymous';
};