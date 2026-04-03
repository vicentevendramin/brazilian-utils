/**
 * Removes symbols ('-', '.', and whitespaces) from a passport number.
 *
 * @param passport - The string containing a passport number.
 * @returns The passport number with dashes, dots, and whitespaces removed.
 *
 * @example
 * parsePassport("Ab123456") // "Ab123456"
 * parsePassport("Ab-123456") // "Ab123456"
 * parsePassport("Ab -. 123456") // "Ab123456"
 */
export const parsePassport = (passport: string): string => {
	if (!passport || typeof passport !== "string") return "";
	return passport.replace(/[^a-zA-Z0-9]/g, "");
};
