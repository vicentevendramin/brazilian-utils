import { sanitizeToDigits } from "../_internals/sanitize-to-digits/sanitize-to-digits";
import { isValidBoleto } from "../is-valid-boleto/is-valid-boleto";

const BANCO_CENTRAL_BASE_DATE = new Date(1997, 9, 7);

export type BoletoInfo = {
	amount: number;
	expirationDate: Date | null;
	bankCode: string;
};

/**
 * Extracts information from a Brazilian bank slip (boleto).
 *
 * @param {string} value - The boleto digitable line (can be with or without mask).
 * @returns {BoletoInfo | undefined} An object containing amount (in cents), expirationDate, and bankCode, or undefined if the boleto is invalid.
 *
 * @example
 * ```typescript
 * getBoletoInfo('00190000090114971860168524522114675860000102656');
 * // { amount: 102656, expirationDate: new Date(2018, 6, 15), bankCode: '001' }
 * ```
 */
export const getBoletoInfo = (value: string): BoletoInfo | undefined => {
	if (!value || !isValidBoleto(value)) return;

	const sanitized = sanitizeToDigits(value);

	const bankCode = sanitized.slice(0, 3);

	const daysSinceBaseDayStr = sanitized.slice(33, 37);
	const daysSinceBaseDay = Number(daysSinceBaseDayStr);

	let expirationDate: Date | null = null;
	if (daysSinceBaseDay && daysSinceBaseDay > 0) {
		const resultDate = new Date(BANCO_CENTRAL_BASE_DATE);
		resultDate.setDate(resultDate.getDate() + daysSinceBaseDay);
		expirationDate = resultDate;
	}

	const amount = Number(sanitized.slice(37, 47)) || 0;

	return { amount, expirationDate, bankCode };
};
