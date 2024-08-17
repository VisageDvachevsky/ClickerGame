/**
 * Преобразует строку (ник пользователя) в шестнадцатеричную строку.
 * Работает с любым языком.
 * @param {string} str - Ник пользователя.
 * @returns {string} - Шестнадцатеричная строка, представляющая ник.
 */
export const stringToHex = (str) => {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);
    let hexString = '';
    bytes.forEach(byte => {
        hexString += byte.toString(16).padStart(2, '0');
    });
    return hexString;
};

/**
 * Преобразует шестнадцатеричную строку обратно в оригинальную строку (ник пользователя).
 * @param {string} hexString - Шестнадцатеричная строка.
 * @returns {string} - Оригинальная строка.
 */
export const hexToString = (hexString) => {
    const bytes = [];
    for (let i = 0; i < hexString.length; i += 2) {
        bytes.push(parseInt(hexString.substr(i, 2), 16));
    }
    const decoder = new TextDecoder();
    return decoder.decode(new Uint8Array(bytes));
};
