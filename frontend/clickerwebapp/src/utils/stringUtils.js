/**
 * Преобразует строку (ник пользователя) в числовую последовательность.
 * Работает с любым языком.
 * @param {string} str - Ник пользователя.
 * @returns {number} - Числовая последовательность.
 */
export const stringToNumber = (str) => {
    const bytes = [];
    for (let i = 0; i < str.length; i++) {
        bytes.push(str.charCodeAt(i));
    }
    return bytes;
};

/**
 * Преобразует числовую последовательность обратно в строку (ник пользователя).
 * @param {number} num - Числовая последовательность.
 * @returns {string} - Ник пользователя.
 */
export const numberToString = (bytes) => {
    let str = '';
    for (let i = 0; i < bytes.length; i++) {
        str += String.fromCharCode(bytes[i]);
    }
    return str;
};