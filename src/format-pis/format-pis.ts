import { type FormatParams, format } from "../_internals/format/format";
import { sanitizeToDigits } from "../_internals/sanitize-to-digits/sanitize-to-digits";

export type FormatPisOptions = Pick<FormatParams, "pad">;

/**
 * Formats a PIS (Programa de Integração Social) number according to the specified pattern.
 *
 * @param {string|number} value - The PIS number to be formatted. It can be a string or a number.
 * @param {Object} options - Optional formatting options.
 * @param {boolean} options.pad - If true, pads the value with leading zeros if necessary.
 * @returns {string} The formatted PIS number as a string.
 *
 * @example
 * ```typescript
 * formatPis("12345678901"); // "123.45678.90-1"
 * formatPis(12345678901); // "123.45678.90-1"
 * formatPis("123456789", { pad: true }); // "001.23456.78-9"
 * ```
 */
export const formatPis = (
	value: string | number,
	options?: FormatPisOptions,
): string =>
	format({
		pad: options?.pad,
		value: sanitizeToDigits(value),
		pattern: "000.00000.00-0",
	});
