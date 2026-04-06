import { mod10 } from "../_internals/mod10/mod10";
import { mod11 } from "../_internals/mod11/mod11";
import { sanitizeToDigits } from "../_internals/sanitize-to-digits/sanitize-to-digits";
import { CHECK_DIGIT_POSITION, CONVERT_POSITIONS, LENGTH, PARTIALS } from "./constants";

const isValidPartials = (digits: string): boolean => {
	for (const { start, end, checkIdx } of PARTIALS) {
		const partial = digits.substring(start, end);
		const expected = mod10(partial);
		if (digits.charCodeAt(checkIdx) - 48 !== expected) return false;
	}
	return true;
};

const parseToBoleto = (digits: string): string => {
	let result = "";
	for (const [start, end] of CONVERT_POSITIONS) {
		result += digits.substring(start, end);
	}
	return result;
};

const isValidCheckDigit = (boleto: string): boolean => {
	const withoutCheckDigit =
		boleto.substring(0, CHECK_DIGIT_POSITION) + boleto.substring(CHECK_DIGIT_POSITION + 1);
	const expected = mod11(withoutCheckDigit);
	return boleto.charCodeAt(CHECK_DIGIT_POSITION) - 48 === expected;
};

/**
 * Validates if a Brazilian bank slip (boleto) number is valid.
 *
 * @param {string} value - The bank slip number to validate.
 * @returns {boolean} True if the bank slip number is valid, false otherwise.
 *
 * @example
 * ```typescript
 * isValidBoleto("00190000090114971860168524522114675860000102656"); // true
 * isValidBoleto("0019000009 01149.718601 68524.522114 6 75860000102656"); // true
 * ```
 */
export const isValidBoleto = (value: string): boolean => {
	if (!value || typeof value !== "string") return false;

	const digits = sanitizeToDigits(value);

	if (digits.length !== LENGTH) return false;

	if (!isValidPartials(digits)) return false;

	const boleto = parseToBoleto(digits);

	return isValidCheckDigit(boleto);
};
