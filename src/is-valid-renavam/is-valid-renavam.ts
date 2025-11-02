import { sanitizeToDigits } from "../_internals/sanitize-to-digits/sanitize-to-digits";

const RENAVAM_LENGTH = 11;

/**
 * Pads a string with zeros on the left to reach the desired length.
 *
 * @param {string} input - The input string to pad.
 * @param {number} padLength - The desired length after padding.
 * @returns {string} The padded string.
 */
const padLeft = (input: string, padLength: number): string => {
	const currentLength = input.length;
	if (currentLength >= padLength) return input;
	return "0".repeat(padLength - currentLength) + input;
};

/**
 * Validates if a RENAVAM (Registro Nacional de Veículos Automotores) is valid.
 *
 * RENAVAM can be in two formats:
 * - Old format: 9 digits (will be padded to 11 with zeros)
 * - New format: 11 digits
 *
 * The validation uses a checksum algorithm based on modulo 11.
 *
 * @param {string} renavam - The RENAVAM value to be validated.
 * @returns {boolean} True if the RENAVAM is valid, false otherwise.
 *
 * @example
 * ```typescript
 * isValidRenavam("639884962"); // true (9 digits, old format)
 * isValidRenavam("00639884962"); // true (11 digits, new format)
 * isValidRenavam("12345678901"); // false (invalid checksum)
 * ```
 */
export const isValidRenavam = (renavam: string | number): boolean => {
	if (!renavam) return false;

	const digits = sanitizeToDigits(renavam);

	if (digits.length !== 9 && digits.length !== 11) return false;

	const paddedDigits = padLeft(digits, RENAVAM_LENGTH);

	if (!/^\d{11}$/.test(paddedDigits)) return false;

	const renavamWithoutDigit = paddedDigits.substring(0, 10);

	const reversedRenavam = renavamWithoutDigit.split("").reverse().join("");

	let sum = 0;
	let multiplier = 2;
	for (let i = 0; i < 10; i++) {
		const digit = Number.parseInt(reversedRenavam[i] ?? "0", 10);
		sum += digit * multiplier;

		if (multiplier >= 9) {
			multiplier = 2;
		} else {
			multiplier++;
		}
	}

	const mod11 = sum % 11;

	let expectedDigit = 11 - mod11;

	if (expectedDigit >= 10) {
		expectedDigit = 0;
	}

	const actualDigit = Number.parseInt(paddedDigits[10] ?? "0", 10);

	return expectedDigit === actualDigit;
};
