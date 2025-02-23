export type FormatParams = { value: string; pattern: string; pad?: boolean };

/**
 * Formats a given value according to a specified pattern.
 *
 * @param {Object} params - The parameters for formatting.
 * @param {boolean} params.pad - Whether to pad the value with leading zeros.
 * @param {string} params.value - The value to be formatted.
 * @param {string} params.pattern - The pattern to format the value against.
 * @returns {string} The formatted value.
 *
 * @example
 * ```typescript
 * format({ value: "123456", pattern: "000-000" }); // "123-456"
 * format({ value: "123", pattern: "0000-000", pad: true }); // "0123-000"
 * ```
 */
export const format = ({ pad, value, pattern }: FormatParams): string => {
	let formatted = "";
	let digitIndex = 0;

	if (pad) {
		const separatorsLength = pattern.replace(/0/g, "").length;
		value = value.padStart(pattern.length - separatorsLength, "0");
	}

	for (const char of pattern) {
		if (char === "0") {
			if (digitIndex >= value.length) break;
			formatted += value[digitIndex++];
		} else if (digitIndex < value.length) {
			formatted += char;
		}
	}

	return formatted;
};
