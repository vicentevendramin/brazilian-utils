const mercosulRegex =
	/^[a-z]{3}[0-9]{1}[a-z]{1}[0-9]{2}$|^[a-z]{3}[0-9]{2}[a-z]{1}[0-9]{1}$/i;

const brazilianLicensePlateRegex = /^[a-z]{3}-?[0-9]{4}$/i;

/**
 * Validates if a Brazilian license plate (placa de carro ou moto) is valid.
 * Supports the old Brazilian format (ABC-1234) and the Mercosul format for cars (ABC1D23) and motorcycles (ABC12D3).
 *
 * @param {string} value - The license plate value to be validated.
 * @returns {boolean} True if the license plate is valid, false otherwise.
 *
 * @example
 * ```typescript
 * isValidLicensePlate("abc1234"); // true (Brazilian format)
 * isValidLicensePlate("ABC-1234"); // true (Brazilian format with hyphen)
 * isValidLicensePlate("abc1d23"); // true (Mercosul format - Car)
 * isValidLicensePlate("ABC12D3"); // true (Mercosul format - Motorcycle)
 * isValidLicensePlate("invalid"); // false
 * ```
 */
export const isValidLicensePlate = (value: string): boolean => {
	if (!value || typeof value !== "string") return false;

	return mercosulRegex.test(value) || brazilianLicensePlateRegex.test(value);
};
