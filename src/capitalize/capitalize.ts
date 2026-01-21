import { ACRONYMS, PREPOSITIONS } from "./constants";

export type CapitalizeOptions = {
	lowerCaseWords?: string[];
	upperCaseWords?: string[];
};

/**
 * Capitalizes a given string according to specific rules for lower-case and upper-case words.
 *
 * - Words listed in `lowerCaseWords` (default: `PREPOSITIONS`) will be converted to lower case, except for the first word.
 * - Words listed in `upperCaseWords` (default: `ACRONYMS`) will be converted to upper case.
 * - All other words will be capitalized (first letter upper case, rest lower case).
 *
 * @param value - The input string to be capitalized.
 * @param options - Optional configuration for capitalization.
 * @param options.lowerCaseWords - Array of words to keep in lower case (default: `PREPOSITIONS`).
 * @param options.upperCaseWords - Array of words to keep in upper case (default: `ACRONYMS`).
 * @returns The capitalized string according to the specified rules.
 */
export const capitalize = (
	value: string,
	{
		lowerCaseWords = PREPOSITIONS,
		upperCaseWords = ACRONYMS,
	}: CapitalizeOptions = {},
): string => {
	const lowerCaseSet = new Set(lowerCaseWords);

	const upperCaseSet = new Set(upperCaseWords);

	const words = value.split(" ");

	const result: string[] = [];

	for (let i = 0, len = words.length; i < len; i++) {
		const word = words[i];

		if (!word) continue;

		const lowerCaseWord = word.toLocaleLowerCase();

		if (i > 0 && lowerCaseSet.has(lowerCaseWord)) {
			result.push(lowerCaseWord);
			continue;
		}

		const upperCaseWord = word.toLocaleUpperCase();

		if (upperCaseSet.has(upperCaseWord)) {
			result.push(upperCaseWord);
			continue;
		}

		result.push(upperCaseWord.charAt(0) + lowerCaseWord.slice(1));
	}

	return result.join(" ");
};
