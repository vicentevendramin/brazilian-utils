import { generateRandomNumber } from "../_internals/generate-random-number/generate-random-number";
import { LETTERS_LENGTH, DIGITS_LENGTH, ALPHABET_LENGTH, CHAR_CODE_A } from "./constants";

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
    const letters = Array.from({ length: LETTERS_LENGTH }, () =>
        String.fromCharCode(CHAR_CODE_A + Math.floor(Math.random() * ALPHABET_LENGTH)),
    ).join("");

    const digits = generateRandomNumber(DIGITS_LENGTH);

    return `${letters}${digits}`;
};
