import { sanitizeToDigits } from "../_internals/sanitize-to-digits/sanitize-to-digits";

export type FormatCurrencyOptions = {
	symbol?: boolean;
	precision?: number;
};

/**
 * Formats a given value as a currency string in Brazilian Real (BRL).
 *
 * @param {string|number} value - The value to be formatted. Can be a string or a number.
 * @param {Object} options - Optional formatting options.
 * @param {boolean} options.symbol - If true, includes the currency symbol in the formatted string.
 * @param {number} options.precision - The number of decimal places to include in the formatted string. Defaults to 2.
 * @returns {string} The formatted currency string.
 *
 * @example
 * ```typescript
 * formatCurrency(1234.56); // "1.234,56"
 * formatCurrency(1234.56, { symbol: true }); // "R$ 1.234,56"
 * formatCurrency("1234.56", { precision: 3 }); // "1.234,560"
 * ```
 */
export const formatCurrency = (
	value: string | number,
	options?: FormatCurrencyOptions,
): string => {
	const enhancedValue =
		typeof value === "string"
			? Number.parseFloat(sanitizeToDigits(value) || "0")
			: value;

	return new Intl.NumberFormat("pt-BR", {
		style: options?.symbol ? "currency" : "decimal",
		currency: "BRL",
		currencyDisplay: options?.symbol ? "symbol" : undefined,
		maximumFractionDigits: options?.precision ?? 2,
		minimumFractionDigits: options?.precision ?? 2,
	})
		.format(enhancedValue)
		.replace(" ", " ");
};
