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
		String.fromCharCode(65 + Math.floor(Math.random() * 26)),
	).join("");

	const digits = Array.from({ length: 6 }, () =>
		Math.floor(Math.random() * 10),
	).join("");

	return `${letters}${digits}`;
};
