import { sanitizeToDigits } from "../_internals/sanitize-to-digits/sanitize-to-digits";

/**
 * Parses a string representing Brazilian currency format into a number.
 * Removes all non-digit characters and converts the result to a decimal number.
 *
 * @param {string} value - The string value to be parsed (e.g., "R$ 1.234,56" or "1234,56")
 * @returns {number} The parsed number value (e.g., 1234.56)
 *
 * @example
 * ```typescript
 * parseCurrency("R$ 1.234,56"); // returns 1234.56
 * parseCurrency("1234,56"); // returns 1234.56
 * parseCurrency("R$ 0,50"); // returns 0.50
 * parseCurrency(""); // returns 0
 * ```
 */
export const parseCurrency = (value: string): number => {
	if (!value || typeof value !== "string") return 0;

	const digits = sanitizeToDigits(value) || "0";

	return Number.parseInt(digits, 10) / 100;
};
