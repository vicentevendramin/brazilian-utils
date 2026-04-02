import { sanitizeToDigits } from "../_internals/sanitize-to-digits/sanitize-to-digits";

/**
 * Removes legal process formatting characters and returns only digits.
 *
 * @param {string|number} value - The legal process value to be parsed.
 * @returns {string} The legal process value without formatting.
 */
export const parseProcessoJuridico = (value: string | number): string =>
	sanitizeToDigits(value);
