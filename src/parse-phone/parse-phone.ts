import { sanitizeToDigits } from "../_internals/sanitize-to-digits/sanitize-to-digits";

/**
 * Removes phone formatting characters and returns only digits.
 *
 * @param {string|number} value - The phone value to be parsed.
 * @returns {string} The phone value without formatting.
 */
export const parsePhone = (value: string | number): string =>
	sanitizeToDigits(value);
