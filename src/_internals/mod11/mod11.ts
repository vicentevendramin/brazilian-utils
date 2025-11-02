/**
 * Calculates the modulus 11 check digit for a given string.
 *
 * @param {string} str - The string to calculate the check digit for.
 * @returns {number} The calculated check digit (1-11).
 *
 * @example
 * ```typescript
 * mod11("0019000009011497186016852452211467586000010265"); // 6
 * ```
 */
export const mod11 = (str: string): number => {
	let weight = 2;
	let sum = 0;
	for (let i = str.length - 1; i >= 0; i--) {
		const digit = str.charCodeAt(i) - 48;
		sum += digit * weight;
		weight = weight < 9 ? weight + 1 : 2;
	}
	const mod = sum % 11;
	return mod === 0 || mod === 1 ? 1 : 11 - mod;
};
