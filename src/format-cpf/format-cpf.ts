import { type FormatParams, format } from "../_internals/format/format";
import { sanitizeToDigits } from "../_internals/sanitize-to-digits/sanitize-to-digits";

export type FormatCpfOptions = Pick<FormatParams, "pad">;
/**
 * Formats a given CPF (Cadastro de Pessoas Físicas) value according to the Brazilian standard.
 *
 * @param {string|number} value - The CPF value to be formatted. It can be a string or a number.
 * @param {Object} options - Optional formatting options.
 * @param {boolean} options.pad - If true, the value will be padded with leading zeros if necessary.
 * @returns {string} The formatted CPF string in the pattern "000.000.000-00".
 *
 * @example
 * ```typescript
 * formatCpf("12345678909"); // "123.456.789-09"
 * formatCpf(12345678909); // "123.456.789-09"
 * formatCpf("123456789", { pad: true }); // "001.234.567-89"
 * ```
 */
export const formatCpf = (
	value: string | number,
	options?: FormatCpfOptions,
): string =>
	format({
		pad: options?.pad,
		value: sanitizeToDigits(value),
		pattern: "000.000.000-00",
	});
