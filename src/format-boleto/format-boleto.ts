import { type FormatParams, format } from "../_internals/format/format";
import { sanitizeToDigits } from "../_internals/sanitize-to-digits/sanitize-to-digits";

export type FormatBoletoOptions = Pick<FormatParams, "pad">;

/**
 * Formats a given value as a Brazilian boleto.
 *
 * @param {string|number} value - The value to be formatted, either as a string or a number.
 * @param {Object} options - Optional formatting options.
 * @param {boolean} options.pad - Whether to pad the value with leading zeros.
 * @returns {string} The formatted boleto string in the pattern "00000000000000000000000000000000000000000000000".
 */
export const formatBoleto = (
	value: string | number,
	options?: FormatBoletoOptions,
): string =>
	format({
		pad: options?.pad,
		value: sanitizeToDigits(value),
		pattern: "00000.00000 00000.000000 00000.000000 0 00000000000000",
	});
