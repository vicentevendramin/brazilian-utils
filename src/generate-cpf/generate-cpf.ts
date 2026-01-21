import type { StateCode } from "../_internals/constants/states";
import { generateChecksum } from "../_internals/generate-checksum/generate-checksum";
import { generateRandomNumber } from "../_internals/generate-random-number/generate-random-number";
import { BASE_LENGTH, STATE_CODES } from "./constants";

const VALID_STATE_CODES = new Set(Object.keys(STATE_CODES));

const getStateCode = (state?: StateCode): string => {
	if (state && VALID_STATE_CODES.has(state)) return STATE_CODES[state];
	return generateRandomNumber(1);
};

const calculateCheckDigit = (base: string, weight: number): string => {
	const mod = generateChecksum({ base, weight }) % 11;
	return (mod < 2 ? 0 : 11 - mod).toString();
};

/**
 * Generates a valid random CPF (Cadastro de Pessoas Físicas).
 *
 * @param {StateCode} state - Optional. The Brazilian state code to generate a CPF for.
 * @returns {string} A valid 11-digit CPF string without formatting.
 *
 * @example
 * ```typescript
 * generateCpf(); // "12345678909"
 * generateCpf("SP"); // "12345678909" (with SP state code in 9th digit)
 * ```
 */
export const generateCpf = (state?: StateCode): string => {
	const base = generateRandomNumber(BASE_LENGTH) + getStateCode(state);
	const firstCheckDigit = calculateCheckDigit(base, 10);
	const secondCheckDigit = calculateCheckDigit(base + firstCheckDigit, 11);
	return base + firstCheckDigit + secondCheckDigit;
};
