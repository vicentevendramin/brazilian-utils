import { sanitizeToDigits } from "../_internals/sanitize-to-digits/sanitize-to-digits";
import type { FormatCnpjOptions } from "../format-cnpj/format-cnpj";

const sanitize = (
	value: string | number,
	version?: FormatCnpjOptions["version"],
): string => {
	if (version === 2) {
		return value
			.toString()
			.replace(/[^A-Za-z0-9]/g, "")
			.toUpperCase();
	}

	return sanitizeToDigits(value);
};

/**
 * Removes CNPJ formatting characters and returns a normalized value.
 *
 * @param {string|number} value - The CNPJ value to be parsed.
 * @param {Object} options - Optional parsing options.
 * @param {1|2} options.version - The CNPJ version to normalize.
 * @returns {string} The CNPJ value without formatting.
 */
export const parseCnpj = (
	value: string | number,
	options?: Pick<FormatCnpjOptions, "version">,
): string => sanitize(value, options?.version);
