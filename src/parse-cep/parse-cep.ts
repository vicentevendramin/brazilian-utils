import { sanitizeToDigits } from "../_internals/sanitize-to-digits/sanitize-to-digits";

/**
 * Removes CEP formatting characters and returns only digits.
 *
 * @param {string|number} value - The CEP value to be parsed.
 * @returns {string} The CEP value without formatting.
 */
export const parseCep = (value: string | number): string =>
	sanitizeToDigits(value);
