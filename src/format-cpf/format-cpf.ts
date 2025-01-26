import { type FormatParams, format } from "../_internals/format";
import { sanitizeToDigits } from "../_internals/sanitize-to-digits";

export const LENGTH = 11;

export type FormatCpfOptions = Pick<FormatParams, "pad">;

/**
 * Formats a given CPF (Cadastro de Pessoas Físicas) value according to the Brazilian standard.
 *
 * @param value - The CPF value to be formatted. It can be a string or a number.
 * @param options - Optional formatting options.
 * @param options.pad - If true, the value will be padded with leading zeros if necessary.
 * @returns The formatted CPF string in the pattern "000.000.000-00".
 */
export const formatCpf = (value: string | number, options?: FormatCpfOptions) =>
	format({
		pad: options?.pad,
		value: sanitizeToDigits(value),
		pattern: "000.000.000-00",
	});
