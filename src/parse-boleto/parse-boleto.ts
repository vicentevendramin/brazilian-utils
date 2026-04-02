import { sanitizeToDigits } from "../_internals/sanitize-to-digits/sanitize-to-digits";

/**
 * Removes boleto formatting characters and returns only digits.
 *
 * @param {string|number} value - The boleto value to be parsed.
 * @returns {string} The boleto value without formatting.
 */
export const parseBoleto = (value: string | number): string =>
	sanitizeToDigits(value);
