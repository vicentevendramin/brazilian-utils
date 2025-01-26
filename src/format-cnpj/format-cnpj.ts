import { format, type FormatParams } from "../_internals/format";
import { sanitizeToDigits } from "../_internals/sanitize-to-digits";

export const LENGTH = 14;

type FormatCnpjOptions = Pick<FormatParams, "pad"> & { version?: 1 | 2 };

const sanitize = (
	value: string | number,
	version?: FormatCnpjOptions["version"],
) => {
	if (version === 2) {
		const allowedChars = "0123456789ABCDFGHIJKLMNPQRSVWXYZ";
		const enhancedValue = value.toString();

		let result = "";

		for (let i = 0; i < enhancedValue.length; i++) {
			if (allowedChars.includes(enhancedValue[i].toUpperCase())) {
				result += enhancedValue[i].toUpperCase();
			}
		}

		return result;
	}

	return sanitizeToDigits(value);
};

/**
 * Formats a given CNPJ (Cadastro Nacional da Pessoa Jurídica) value according to the specified options.
 *
 * @param value - The CNPJ value to be formatted. It can be a string or a number.
 * @param options - Optional configuration for formatting the CNPJ.
 * @param options.pad - If true, the value will be padded with leading zeros if necessary.
 * @param options.version - The version of the CNPJ to be sanitized.
 * @returns The formatted CNPJ string in the pattern "00.000.000/0000-00".
 */
export const formatCnpj = (
	value: string | number,
	options?: FormatCnpjOptions,
) =>
	format({
		pad: options?.pad,
		value: sanitize(value, options?.version),
		pattern: "00.000.000/0000-00",
	});
