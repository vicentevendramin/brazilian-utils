/**
 * Validates if an email address is valid.
 *
 * @param {string} email - The email address to be validated.
 * @returns {boolean} True if the email is valid, false otherwise.
 *
 * @example
 * ```typescript
 * isValidEmail("user@example.com"); // true
 * isValidEmail("invalid.email"); // false
 * isValidEmail("test@domain.co.uk"); // true
 * ```
 */

const EMAIL_REGEX =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const isValidEmail = (value: string): boolean => {
	if (!value || typeof value !== "string") return false;

	return EMAIL_REGEX.test(value);
};
