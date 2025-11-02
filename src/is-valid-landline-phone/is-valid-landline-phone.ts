import { sanitizeToDigits } from "../_internals/sanitize-to-digits/sanitize-to-digits";
import { VALID_AREA_CODES } from "../_internals/area-codes";

export const PHONE_MIN_LENGTH = 10;

const AREA_CODE_SET = new Set(VALID_AREA_CODES);

const LANDLINE_VALID_FIRST_NUMBERS = [2, 3, 4, 5];

const isValidDDD = (value: string): boolean => {
	const ddd = (value.charCodeAt(0) - 48) * 10 + (value.charCodeAt(1) - 48);
	return AREA_CODE_SET.has(ddd as (typeof VALID_AREA_CODES)[number]);
};

const isValidLandlineFirstNumber = (value: string): boolean => {
	const firstDigit = value.charCodeAt(2) - 48;
	return LANDLINE_VALID_FIRST_NUMBERS.includes(firstDigit);
};

/**
 * Validates if a phone number is a valid Brazilian landline phone.
 *
 * @param {string} value - The phone number to validate.
 * @returns {boolean} True if the phone number is a valid landline phone, false otherwise.
 *
 * @example
 * ```typescript
 * isValidLandlinePhone("(11) 3000-0000"); // true
 * isValidLandlinePhone("1130000000"); // true
 * isValidLandlinePhone("11987654321"); // false (mobile)
 * ```
 */
export const isValidLandlinePhone = (value: string): boolean => {
	if (!value || typeof value !== "string") return false;

	const digits = sanitizeToDigits(value);

	if (digits.length !== PHONE_MIN_LENGTH) return false;

	if (!isValidDDD(digits)) return false;

	return isValidLandlineFirstNumber(digits);
};
