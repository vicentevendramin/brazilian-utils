import { sanitizeToDigits } from "../_internals/sanitize-to-digits/sanitize-to-digits";
import { isValidLandlinePhone } from "../is-valid-landline-phone/is-valid-landline-phone";
import { isValidMobilePhone } from "../is-valid-mobile-phone/is-valid-mobile-phone";

export const PHONE_MIN_LENGTH = 10;

export const PHONE_MAX_LENGTH = 11;

export type PhoneVersion = 1 | 2;

export type IsValidPhoneOptions = {
	version?: PhoneVersion;
};

/**
 * Validates a Brazilian phone number.
 *
 * @param {string} value - The phone number to validate.
 * @param {IsValidPhoneOptions} options - Optional validation options.
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

	if (digits.length === PHONE_MIN_LENGTH) {
		return isValidLandlinePhone(value);
	}

	if (digits.length === PHONE_MAX_LENGTH) {
		return isValidMobilePhone(value, options);
	}

	return false;
};
