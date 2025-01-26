export type FormatParams = { value: string; pattern: string; pad?: boolean };

/**
 * Formats a given value according to a specified pattern.
 *
 * @param {Object} params - The parameters for formatting.
 * @param {boolean} params.pad - Whether to pad the value with leading zeros.
 * @param {string} params.value - The value to be formatted.
 * @param {string} params.pattern - The pattern to format the value against.
 * @returns {string} The formatted value.
 */
export const format = ({ pad, value, pattern }: FormatParams) => {
	let formatted = "";
	let digitIndex = 0;

	if (pad) {
		const separatorsLength = pattern
			.split("")
			.filter((char) => char !== "0").length;
		value = value.padStart(pattern.length - separatorsLength, "0");
	}

	for (let i = 0; i < pattern.length; i++) {
		if (pattern[i] === "0") {
			if (digitIndex < value.length) {
				formatted += value[digitIndex++];
			} else {
				break;
			}
		} else {
			if (digitIndex < value.length) {
				formatted += pattern[i];
			}
		}
	}

	return formatted;
};
