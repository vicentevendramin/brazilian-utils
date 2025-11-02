import { format } from "../_internals/format/format";
import { sanitizeToDigits } from "../_internals/sanitize-to-digits/sanitize-to-digits";

type Mask = "sn" | "nanp";

export type FormatPhoneOptions = {
	mask?: "auto" | Mask;
};

const LENGTH: Record<Mask, number> = {
	sn: 9,
	nanp: 11,
};

const MASK: Record<Mask, string> = {
	sn: "00000-0000",
	nanp: "(00) 00000-0000",
};

/**
 * Formats a phone number according to Brazilian phone number patterns.
 *
 * @param {string|number} value - The phone number to format, either as a string or a number.
 * @param {Object} options - Optional formatting options.
 * @param {string} options.mask - The mask to apply for formatting the phone number.
 * @returns {string} The formatted phone number as a string.
 */
export const formatPhone = (
	value: string | number,
	options?: FormatPhoneOptions,
): string => {
	let mask = options?.mask ?? "sn";

	const enhancedValue = sanitizeToDigits(value);

	if (mask === "auto") {
		mask = enhancedValue.length > LENGTH.sn ? "nanp" : "sn";
	}

	return format({ value: enhancedValue, pattern: MASK[mask] });
};
