import { sanitizeToDigits } from "../_internals/sanitize-to-digits/sanitize-to-digits";

/**
 * Removes CPF formatting characters and returns only digits.
 *
 * @param {string|number} value - The CPF value to be parsed.
 * @returns {string} The CPF value without formatting.
 */
export const parseCpf = (value: string | number): string => sanitizeToDigits(value);
