import { sanitizeToDigits } from "../_internals/sanitize-to-digits/sanitize-to-digits";

export const LENGTH = 8;

/**
 * Validates if a CEP (Brazilian postal code) is valid.
 *
 * @param {string} cep - The CEP value to be validated.
 * @returns {boolean} True if the CEP is valid, false otherwise.
 *
 * @example
 * ```typescript
 * isValidCep("01310100"); // true
 * isValidCep("01310-100"); // true
 * isValidCep("12345"); // false (invalid length)
 * ```
 */
export const isValidCep = (cep: string): boolean => {
	if (!cep || typeof cep !== "string") return false;

	const digits = sanitizeToDigits(cep);

	return digits.length === LENGTH;
};
