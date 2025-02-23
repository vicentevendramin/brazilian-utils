import { type FormatParams, format } from "../_internals/format";
import { sanitizeToDigits } from "../_internals/sanitize-to-digits";

export const LENGTH = 20;

export type FormatProcessoJuridicoOptions = Pick<FormatParams, "pad">;

/**
 * Formats a legal process number (processo jurídico) according to a specific pattern.
 *
 * @param {string|number} value - The legal process number to be formatted. It can be a string or a number.
 * @param {Object} options - Optional formatting options.
 * @param {boolean} options.pad - If true, the value will be padded with leading zeros if necessary.
 * @returns {string} The formatted legal process number as a string.
 */
export const formatProcessoJuridico = (
	value: string | number,
	options?: FormatProcessoJuridicoOptions,
): string =>
	format({
		pad: options?.pad,
		value: sanitizeToDigits(value),
		pattern: "0000000-00.0000.000.0000",
	});
