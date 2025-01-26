import { format, type FormatParams } from "../_internals/format";
import { sanitizeToDigits } from "../_internals/sanitize-to-digits";

export const LENGTH = 11;

export type FormatCpfOptions = Pick<FormatParams, "pad">;

/**
 * Formats a PIS (Programa de Integração Social) number according to the specified pattern.
 *
 * @param value - The PIS number to be formatted. It can be a string or a number.
 * @param options - Optional formatting options.
 * @param options.pad - If true, pads the value with leading zeros if necessary.
 * @returns The formatted PIS number as a string.
 */
export const formatPis = (value: string | number, options?: FormatCpfOptions) =>
	format({
		pad: options?.pad,
		value: sanitizeToDigits(value),
		pattern: "000.00000.00-0",
	});
