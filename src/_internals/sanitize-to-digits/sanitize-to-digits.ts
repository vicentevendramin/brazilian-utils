/**
 * Sanitizes the input value by removing all non-digit characters.
 *
 * @param value - The input value to be sanitized. It can be a string or a number.
 * @returns A string containing only the digit characters from the input value.
 */
export const sanitizeToDigits = (value: string | number) =>
	value.toString().replace(/\D/g, "");
