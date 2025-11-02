import { generateRandomNumber } from "../_internals/generate-random-number/generate-random-number";
import { mod10 } from "../_internals/mod10/mod10";
import { mod11 } from "../_internals/mod11/mod11";

export const LENGTH = 47;

/**
 * Generates a valid random Brazilian bank slip (boleto) number.
 *
 * @returns {string} A valid 47-digit boleto string without formatting.
 *
 * @example
 * ```typescript
 * generateBoleto(); // "00190000090114971860168524522114675860000102656"
 * ```
 */
export const generateBoleto = (): string => {
	const line = new Array(47);

	const p1Base = generateRandomNumber(9);
	for (let i = 0; i < 9; i++) line[i] = p1Base[i];
	line[9] = mod10(p1Base).toString();

	const p2Base = generateRandomNumber(10);
	for (let i = 0; i < 10; i++) line[10 + i] = p2Base[i];
	line[20] = mod10(p2Base).toString();

	const p3Base = generateRandomNumber(10);
	for (let i = 0; i < 10; i++) line[21 + i] = p3Base[i];
	line[31] = mod10(p3Base).toString();

	const lastDigits = generateRandomNumber(15);
	for (let i = 0; i < 15; i++) line[32 + i] = lastDigits[i];

	const boletoWithoutCheck =
		line
			.slice(0, 4)
			.join("") + // [0-3]
		line.slice(33, 47).join("") + // [33-46] (skip [32])
		line.slice(4, 9).join("") + // [4-8]
		line.slice(10, 20).join("") + // [10-19]
		line.slice(21, 31).join(""); // [21-30]

	const mainCheck = mod11(boletoWithoutCheck);

	// Update only position 32 in digitable line (corresponds to boleto[4])
	line[32] = mainCheck.toString();

	return line.join("");
};
