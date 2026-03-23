import { type FormatParams, format } from "../_internals/format/format";
import { sanitizeToDigits } from "../_internals/sanitize-to-digits/sanitize-to-digits";

export type FormatCnpjOptions = Pick<FormatParams, "pad"> & { version?: 1 | 2 };

const sanitize = (
    value: string | number,
    version?: FormatCnpjOptions["version"],
) => {
    if (version === 2) {
        const enhancedValue = value.toString();
        return enhancedValue.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    }

    return sanitizeToDigits(value);
};

/**
 * Formats a given CNPJ (Cadastro Nacional da Pessoa Jurídica) value according to the specified options.
 *
 * @param {string|number} value - The CNPJ value to be formatted. It can be a string or a number.
 * @param {Object} options - Optional configuration for formatting the CNPJ.
 * @param {boolean} options.pad - If true, the value will be padded with leading zeros if necessary.
 * @param {1|2} options.version - The version of the CNPJ to be sanitized.
 * @returns {string} The formatted CNPJ string in the pattern "00.000.000/0000-00".
 *
 * @example
 * ```typescript
 * formatCnpj("12345678000195"); // "12.345.678/0001-95"
 * formatCnpj(12345678000195); // "12.345.678/0001-95"
 * formatCnpj("12345678000195", { pad: true }); // "12.345.678/0001-95"
 * formatCnpj("12345678", { pad: true }); // "00.000.012/3456-78"
 * formatCnpj("q0SLFMBD7VX439", { version: 2 }); // "Q0.SLF.MBD/7VX4-39"
 * ```
 */
export const formatCnpj = (
	value: string | number,
	options?: FormatCnpjOptions,
): string =>
	format({
		pad: options?.pad,
		value: sanitize(value, options?.version),
		pattern: "00.000.000/0000-00",
	});
