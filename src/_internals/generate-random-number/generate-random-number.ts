/**
 * Generates a random numeric string of specified length.
 *
 * @param {number} length - The length of the random number string to generate.
 * @returns {string} A string containing random digits (0-9) of the specified length.
 *
 * @example
 * ```typescript
 * generateRandomNumber(3); // "123"
 * generateRandomNumber(5); // "67890"
 * generateRandomNumber(11); // "12345678901"
 * ```
 */
export const generateRandomNumber = (length: number): string => {
	let result = "";
	for (let i = 0; i < length; i++) {
		result += Math.floor(Math.random() * 10).toString();
	}
	return result;
};
