import { mod10 } from "../_internals/mod10/mod10";
import { mod11 } from "../_internals/mod11/mod11";
import { sanitizeToDigits } from "../_internals/sanitize-to-digits/sanitize-to-digits";

export type IsValidBankAccountParams = {
	bankCode: string;
	agency: string;
	account: string;
	digit: string;
};

const validateBancoDoBrasil = (params: IsValidBankAccountParams): boolean => {
	const { agency, account, digit } = params;

	if (agency.length < 4 || agency.length > 5) return false;
	if (account.length < 8 || account.length > 10) return false;
	if (digit.length !== 1) return false;

	const accountWithoutLeadingZeros = account.replace(/^0+/, "") || "0";
	const fullNumber = agency.padStart(5, "0") + accountWithoutLeadingZeros.padStart(8, "0");

	let sum = 0;
	let weight = 2;
	for (let i = fullNumber.length - 1; i >= 0; i--) {
		const digitValue = fullNumber.charCodeAt(i) - 48;
		sum += digitValue * weight;
		weight = weight === 9 ? 2 : weight + 1;
	}

	const remainder = sum % 11;
	const calculatedDigit = remainder === 0 || remainder === 1 ? 0 : 11 - remainder;

	const digitChar = String(calculatedDigit);
	return digitChar === digit;
};

const validateItau = (params: IsValidBankAccountParams): boolean => {
	const { agency, account, digit } = params;

	if (agency.length !== 4) return false;
	if (account.length !== 5) return false;
	if (digit.length !== 1) return false;

	const fullNumber = agency + account;
	let sum = 0;

	for (let i = 0; i < fullNumber.length; i++) {
		const digitValue = fullNumber.charCodeAt(i) - 48;
		const weight = i % 2 === 0 ? 2 : 1;
		let result = digitValue * weight;
		if (result > 9) {
			result = Math.floor(result / 10) + (result % 10);
		}
		sum += result;
	}

	const remainder = sum % 10;
	const calculatedDigit = remainder === 0 ? 0 : 10 - remainder;

	return String(calculatedDigit) === digit;
};

const validateBradesco = (params: IsValidBankAccountParams): boolean => {
	const { agency, account, digit } = params;

	if (agency.length !== 4) return false;
	if (account.length !== 7) return false;
	if (digit.length !== 1) return false;

	let sum = 0;
	let weight = 2;

	for (let i = account.length - 1; i >= 0; i--) {
		const digitValue = account.charCodeAt(i) - 48;
		sum += digitValue * weight;
		weight = weight === 7 ? 2 : weight + 1;
	}

	const remainder = sum % 11;
	const calculatedDigit = remainder === 0 || remainder === 1 ? 0 : 11 - remainder;

	return String(calculatedDigit) === digit;
};

const validateSantander = (params: IsValidBankAccountParams): boolean => {
	const { agency, account, digit } = params;

	if (agency.length !== 4) return false;
	if (account.length !== 8) return false;
	if (digit.length !== 1) return false;

	const calculatedDigit = mod11(account);
	const digitValue = calculatedDigit > 9 ? 0 : calculatedDigit;

	return String(digitValue) === digit;
};

const validateCaixa = (params: IsValidBankAccountParams): boolean => {
	const { agency, account, digit } = params;

	if (agency.length !== 4) return false;
	if (account.length !== 11) return false;
	if (digit.length !== 1) return false;

	const accountWithoutDigit = account.substring(0, 10);
	const calculatedDigit = mod11(accountWithoutDigit);
	const digitValue = calculatedDigit > 9 ? 0 : calculatedDigit;

	return String(digitValue) === digit;
};

const validateGeneric = (params: IsValidBankAccountParams): boolean => {
	const { account, digit } = params;

	if (digit.length < 1 || digit.length > 2) return false;

	const mod11Result = mod11(account);
	if (mod11Result <= 9 && String(mod11Result) === digit) {
		return true;
	}

	const mod10Result = mod10(account);
	if (String(mod10Result) === digit) {
		return true;
	}

	return false;
};

const VALIDATORS: Record<string, (params: IsValidBankAccountParams) => boolean> = {
	"001": validateBancoDoBrasil,
	"341": validateItau,
	"237": validateBradesco,
	"033": validateSantander,
	"104": validateCaixa,
};

/**
 * Validates if a Brazilian bank account is valid.
 * Supports specific validation algorithms for major banks:
 * - Banco do Brasil (001)
 * - Itaú (341)
 * - Bradesco (237)
 * - Santander (033)
 * - Caixa Econômica Federal (104)
 *
 * For other banks, uses generic mod10/mod11 validation.
 *
 * @param {IsValidBankAccountParams} params - The bank account parameters.
 * @param {string} params.bankCode - The bank code (3 digits).
 * @param {string} params.agency - The agency number (1-5 digits).
 * @param {string} params.account - The account number (1-13 digits).
 * @param {string} params.digit - The verification digit (1-2 digits).
 * @returns {boolean} True if the bank account is valid, false otherwise.
 *
 * @example
 * ```typescript
 * isValidBankAccount({
 *   bankCode: "001",
 *   agency: "1234",
 *   account: "12345678",
 *   digit: "5"
 * }); // true (if valid Banco do Brasil account)
 *
 * isValidBankAccount({
 *   bankCode: "341",
 *   agency: "1234",
 *   account: "12345",
 *   digit: "6"
 * }); // true (if valid Itaú account)
 * ```
 */
export const isValidBankAccount = (params: IsValidBankAccountParams): boolean => {
	const { bankCode, agency, account, digit } = params;

	if (
		!bankCode ||
		!agency ||
		!account ||
		!digit ||
		typeof bankCode !== "string" ||
		typeof agency !== "string" ||
		typeof account !== "string" ||
		typeof digit !== "string"
	) {
		return false;
	}

	const bankCodeDigits = sanitizeToDigits(bankCode);
	const agencyDigits = sanitizeToDigits(agency);
	const accountDigits = sanitizeToDigits(account);
	const digitDigits = sanitizeToDigits(digit);

	if (bankCodeDigits.length !== 3) return false;
	if (agencyDigits.length === 0 || agencyDigits.length > 5) return false;
	if (accountDigits.length === 0 || accountDigits.length > 13) return false;
	if (digitDigits.length === 0 || digitDigits.length > 2) return false;

	const validator = bankCodeDigits in VALIDATORS ? VALIDATORS[bankCodeDigits] : validateGeneric;

	return validator({
		bankCode: bankCodeDigits,
		agency: agencyDigits,
		account: accountDigits,
		digit: digitDigits,
	});
};
