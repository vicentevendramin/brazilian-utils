import { generateChecksum } from "../_internals/generate-checksum/generate-checksum";
import { sanitizeToDigits } from "../_internals/sanitize-to-digits/sanitize-to-digits";
import { LENGTH, RESERVED_NUMBERS } from "./constants";

const RESERVED_SET = new Set(RESERVED_NUMBERS);

const WEIGHTS = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

/**
 * Validates a Brazilian PIS (Programa de Integração Social) number.
 *
 * @param {string} pis - The PIS number to validate.
 * @returns {boolean} True if the PIS number is valid, false otherwise.
 *
 * @example
 * ```typescript
 * isValidPis("120.56874.10-7"); // true
 * isValidPis("12056874107"); // true
 * isValidPis("00000000000"); // false (reserved number)
 * ```
 */
export const isValidPis = (pis: string): boolean => {
	if (!pis || typeof pis !== "string") return false;

	// Check if contains invalid characters (letters that are not separators)
	// Valid separators: space, parentheses, dots, commas, asterisks, hyphens
	const hasInvalidChars = /[^0-9 ().,*-]/.test(pis);

	if (hasInvalidChars) return false;

	const digits = sanitizeToDigits(pis);

	if (digits.length !== LENGTH) return false;

	if (RESERVED_SET.has(digits)) return false;

	const base = digits.substring(0, LENGTH - 1);
	const checkDigit = digits.charCodeAt(LENGTH - 1) - 48;

	const weightedChecksum = generateChecksum({ base, weight: WEIGHTS });
	const calculatedDigit = 11 - (weightedChecksum % 11);

	const finalDigit = calculatedDigit >= 10 ? 0 : calculatedDigit;

	return checkDigit === finalDigit;
};
