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
export const isValidPassport = (passport: string): boolean => {
    if (typeof passport !== "string") return false;
    return /^[A-Z]{2}[0-9]{6}$/.test(passport);
};

/**
 * Removes symbols ('-', '.', and whitespaces) from a passport number.
 * 
 * @param passport - The string containing a passport number.
 * @returns The passport number with dashes, dots, and whitespaces removed.
 * 
 * @example
 * removeSymbolsFromPassport("Ab123456") // "Ab123456"
 * removeSymbolsFromPassport("Ab-123456") // "Ab123456"
 * removeSymbolsFromPassport("Ab -. 123456") // "Ab123456"
 */
export const removeSymbolsFromPassport = (passport: string): string =>
    passport.replace(/[\s.\-]/g, "");

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
    const cleaned = removeSymbolsFromPassport(passport.toUpperCase());
    return isValidPassport(cleaned) ? cleaned : null;
}

/**
 * Generates a random valid Brazilian passport number.
 * 
 * @returns A random valid passport number string (e.g. "RY393097").
 * 
 * @example
 * generatePassport() // "RY393097"
 * generatePassport() // "ZS840088"
 */
export const generatePassport = (): string => {
    const letters = Array.from({ length: 2 }, () =>
        String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join("");

    const digits = Array.from({ length: 6 }, () =>
        Math.floor(Math.random() * 10)
    ).join("");

    return `${letters}${digits}`;
}
