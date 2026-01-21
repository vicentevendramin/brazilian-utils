import { sanitizeToDigits } from "../_internals/sanitize-to-digits/sanitize-to-digits";
import { LENGTH, RESERVED_NUMBERS } from "./constants";

const RESERVED_SET = new Set(RESERVED_NUMBERS);

const FORMAT_REGEX = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;

const isValidChecksum = (cpf: string): boolean => {
	// First digit (index 9) - weights from 10 to 2
	let sum = 0;
	for (let i = 0; i < 9; i++) {
		sum += (cpf.charCodeAt(i) - 48) * (10 - i);
	}
	let mod = sum % 11;
	const expected1 = mod < 2 ? 48 : 48 + 11 - mod;
	if (cpf.charCodeAt(9) !== expected1) return false;

	// Second digit (index 10) - weights from 11 to 2
	sum = 0;
	for (let i = 0; i < 10; i++) {
		sum += (cpf.charCodeAt(i) - 48) * (11 - i);
	}
	mod = sum % 11;
	const expected2 = mod < 2 ? 48 : 48 + 11 - mod;
	return cpf.charCodeAt(10) === expected2;
};

/**
 * Validates if a CPF (Cadastro de Pessoas Físicas) is valid.
 *
 * @param {string} cpf - The CPF value to be validated.
 * @returns {boolean} True if the CPF is valid, false otherwise.
 *
 * @example
 * ```typescript
 * isValidCpf("123.456.789-09"); // true
 * isValidCpf("12345678909"); // true
 * isValidCpf("00000000000"); // false (reserved number)
 * isValidCpf("12345678900"); // false (invalid checksum)
 * ```
 */
export const isValidCpf = (cpf: string): boolean => {
	if (!cpf || typeof cpf !== "string") return false;

	const digits = sanitizeToDigits(cpf);

	if (digits.length !== LENGTH) return false;

	if (!FORMAT_REGEX.test(cpf)) return false;

	if (RESERVED_SET.has(digits)) return false;

	return isValidChecksum(digits);
};
