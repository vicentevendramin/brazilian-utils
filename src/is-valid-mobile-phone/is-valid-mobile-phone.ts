import { VALID_AREA_CODES } from "../_internals/area-codes";
import { sanitizeToDigits } from "../_internals/sanitize-to-digits/sanitize-to-digits";

export const PHONE_MAX_LENGTH = 11;

export type PhoneVersion = 1 | 2;

export type IsValidMobilePhoneOptions = {
	version?: PhoneVersion;
};

const AREA_CODE_SET = new Set(VALID_AREA_CODES);

const MOBILE_VALID_FIRST_NUMBERS_V1 = [6, 7, 8, 9];

const MOBILE_VALID_FIRST_NUMBERS_V2 = [9];

const isValidDDD = (value: string): boolean => {
	const ddd = (value.charCodeAt(0) - 48) * 10 + (value.charCodeAt(1) - 48);
	return AREA_CODE_SET.has(ddd as (typeof VALID_AREA_CODES)[number]);
};

const isValidMobileFirstNumber = (
	value: string,
	version: PhoneVersion,
): boolean => {
	const firstDigit = value.charCodeAt(2) - 48;
	if (version === 1) {
		return MOBILE_VALID_FIRST_NUMBERS_V1.includes(firstDigit);
	}
	return MOBILE_VALID_FIRST_NUMBERS_V2.includes(firstDigit);
};

/**
 * Validates if a phone number is a valid Brazilian mobile phone.
 *
 * @param {string} value - The phone number to validate.
 * @param {PhoneOptions} options - Optional validation options.
 * @returns {boolean} True if the phone number is a valid mobile phone, false otherwise.
 *
 * @example
 * ```typescript
 * isValidMobilePhone("(11) 98765-4321"); // true
 * isValidMobilePhone("11987654321", { version: 2 }); // true
 * isValidMobilePhone("11712345678", { version: 1 }); // true
 * ```
 */
export const isValidMobilePhone = (
	value: string,
	options?: IsValidMobilePhoneOptions,
): boolean => {
	if (!value || typeof value !== "string") return false;

	const digits = sanitizeToDigits(value);
	const version = options?.version ?? 2;

	if (digits.length !== PHONE_MAX_LENGTH) return false;

	if (!isValidDDD(digits)) return false;

	return isValidMobileFirstNumber(digits, version);
};
