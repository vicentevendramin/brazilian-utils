import { sanitizeToDigits } from "../_internals/sanitize-to-digits/sanitize-to-digits";
import { VALID_AREA_CODES } from "../_internals/area-codes";

export const PHONE_MIN_LENGTH = 10;

export const PHONE_MAX_LENGTH = 11;

export type PhoneVersion = 1 | 2;

export type IsValidPhoneOptions = {
	version?: PhoneVersion;
};

const AREA_CODE_SET = new Set(VALID_AREA_CODES);

const isValidDDD = (value: string): boolean => {
	const ddd = (value.charCodeAt(0) - 48) * 10 + (value.charCodeAt(1) - 48);
	return AREA_CODE_SET.has(ddd as (typeof VALID_AREA_CODES)[number]);
};

const isValidFirstNumber = (value: string, version: PhoneVersion): boolean => {
	const firstDigit = value.charCodeAt(2) - 48;
	const length = value.length;

	if (version === 1) {
		// Version 1: 8 digits for landline (2-5), 9 digits for mobile (6-9)
		if (length === PHONE_MIN_LENGTH) {
			// Landline: first digit 2-5
			return firstDigit >= 2 && firstDigit <= 5;
		}
		// Mobile: first digit 6-9
		return firstDigit >= 6 && firstDigit <= 9;
	}

	// Version 2: 8 digits for landline (2-5), 9 digits for mobile (starts with 9)
	if (length === PHONE_MIN_LENGTH) {
		// Landline: first digit 2-5
		return firstDigit >= 2 && firstDigit <= 5;
	}
	// Mobile: first digit 6-9 (version 1) or starts with 9 (version 2)
	// Version 2: mobile must start with 9
	return firstDigit === 9;
};

/**
 * Validates a Brazilian phone number.
 *
 * @param {string} value - The phone number to validate.
 * @param {PhoneOptions} options - Optional validation options.
 * @returns {boolean} True if the phone number is valid, false otherwise.
 *
 * @example
 * ```typescript
 * isValidPhone("(11) 98765-4321"); // true
 * isValidPhone("11987654321", { version: 2 }); // true
 * isValidPhone("1130000000"); // true (landline)
 * ```
 */
export const isValidPhone = (
	value: string,
	options?: IsValidPhoneOptions,
): boolean => {
	if (!value || typeof value !== "string") return false;

	const digits = sanitizeToDigits(value);
	const version = options?.version ?? 2;

	if (digits.length < PHONE_MIN_LENGTH || digits.length > PHONE_MAX_LENGTH) {
		return false;
	}

	if (!isValidDDD(digits)) return false;

	return isValidFirstNumber(digits, version);
};
