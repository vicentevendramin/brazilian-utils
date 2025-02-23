import { type FormatParams, format } from "../_internals/format";
import { sanitizeToDigits } from "../_internals/sanitize-to-digits";

export const LENGTH = 8;

export type FormatCepOptions = Pick<FormatParams, "pad">;

/**
 * Formats a given value as a Brazilian postal code (CEP).
 *
 * @param {string|number} value - The value to be formatted, either as a string or a number.
 * @param {Object} options - Optional formatting options.
 * @param {boolean} options.pad - Whether to pad the value with leading zeros.
 * @returns {string} The formatted CEP string in the pattern "00000-000".
 */
export const formatCep = (
	value: string | number,
	options?: FormatCepOptions,
): string =>
	format({
		pad: options?.pad,
		value: sanitizeToDigits(value),
		pattern: "00000-000",
	});
