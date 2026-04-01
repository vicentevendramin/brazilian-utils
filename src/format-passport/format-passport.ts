import { isValidPassport } from "../is-valid-passport/is-valid-passport";
import { parsePassport } from "../parse-passport/parse-passport";

/**
 * Formats a Brazilian passport number for display.
 * Returns the passport uppercased and without symbols, or null if invalid.
 *
 * @param passport - A Brazilian passport number (any case, possibly with symbols).
 * @returns The formatted passport number (uppercase, no symbols), or null if invalid.
 *
 * @example
 * formatPassport("Ab123456") // "AB123456"
 * formatPassport("Ab-123456") // "AB123456"
 * formatPassport("111111") // null
 */
export const formatPassport = (passport: string): string | null => {
	const cleaned = parsePassport(passport.toUpperCase());
	return isValidPassport(cleaned) ? cleaned : null;
};
