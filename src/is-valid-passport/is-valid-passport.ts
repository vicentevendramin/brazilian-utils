import { PASSPORT_REGEX } from "./constants";

/**
 * Checks if a Brazilian passport number is valid.
 * To be considered valid, the input must be a string containing exactly two
 * alphabetical characters followed by exactly six numerical digits.
 * This function does not verify if the input is a real passport number,
 * as there are no checksums for the Brazilian passport.
 *
 * @param passport - The string containing the passport number to be checked.
 * @returns True if the passport number is valid (2 letters followed by 6 digits).
 *
 * @example
 * isValidPassport("Ab123456") // false - must be uppercase
 * isValidPassport("AB123456") // true
 * isValidPassport("12345678") // false
 * isValidPassport("DC-221345") // false
 */
export const isValidPassport = (passport: string | number): boolean => {
	if (passport === null || passport === undefined) return false;
	return PASSPORT_REGEX.test(String(passport));
};
