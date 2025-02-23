import { sanitizeToDigits } from "../_internals/sanitize-to-digits";

const MEGAS_SINGULAR = ["", "mil", "milhão", "mil milhões", "bilião"];

const MEGAS_PLURAL = ["", "mil", "milhões", "mil milhões", "bilhões"];

const UNITS = [
	"",
	"um",
	"dois",
	"três",
	"quatro",
	"cinco",
	"seis",
	"sete",
	"oito",
	"nove",
];

const HUNDREDS = [
	"",
	"cem",
	"duzentos",
	"trezentos",
	"quatrocentos",
	"quinhentos",
	"seiscentos",
	"setecentos",
	"oitocentos",
	"novecentos",
	"cento",
];

const TENS = [
	"",
	"dez",
	"vinte",
	"trinta",
	"quarenta",
	"cinquenta",
	"sessenta",
	"setenta",
	"oitenta",
	"noventa",
];

const TEENS = [
	"dez",
	"onze",
	"doze",
	"treze",
	"catorze",
	"quinze",
	"dezasseis",
	"dezasete",
	"dezoito",
	"dezanove",
];

const integerToTriplets = (number: number) => {
	const triplets: number[] = [];

	let acc = number;

	while (acc > 0) {
		triplets.push(acc % 1000);
		acc = Math.floor(acc / 1000);
	}

	return triplets;
};

/**
 * Converts a numeric value into its Portuguese textual representation.
 * This function was based on {@link https://github.com/moul/number-to-words/blob/master/pt-pt.go number-to-words}
 *
 * @param {string|number} value - The numeric value to be described. It can be a string or a number.
 * @returns {string} The Portuguese textual representation of the given number.
 *
 * @remarks
 * - If the value is a string, it will be sanitized and parsed into a number.
 * - The function handles negative numbers by prefixing "menos".
 * - The function handles numbers up to quintillions.
 * - The function returns "zero" for a value of 0.
 *
 * @example
 * ```typescript
 * describeNumber(123); // "cento e vinte e três"
 * describeNumber(-45); // "menos quarenta e cinco"
 * describeNumber("1.234,56"); // "mil duzentos e trinta e quatro e cinquenta e seis"
 * ```
 */
export const describeNumber = (value: number | string): string => {
	let enhancedValue =
		typeof value === "string"
			? Number.parseFloat(sanitizeToDigits(value) || "0")
			: value;

	const words: string[] = [];

	if (enhancedValue < 0) {
		words.push("menos");
		enhancedValue = Math.abs(enhancedValue);
	}

	const triplets = integerToTriplets(enhancedValue);

	if (triplets.length === 0) return "zero";

	for (let i = triplets.length - 1; i >= 0; i--) {
		const triplet = triplets[i];

		if (triplet === 0) continue;

		const hundreds = Math.floor(triplet / 100) % 10;

		const tens = Math.floor(triplet / 10) % 10;

		const units = triplet % 10;

		if (hundreds > 0 && units === 0 && tens === 0) {
			words.push(
				i === 0 && words.length
					? `e ${HUNDREDS[hundreds]}`
					: HUNDREDS[hundreds],
			);
		} else if (hundreds > 0) {
			words.push(`${hundreds === 1 ? HUNDREDS[10] : HUNDREDS[hundreds]} e`);
		}

		if (tens === 0 && units === 0) continue;

		if (tens === 1) {
			words.push(TEENS[units]);
		} else if (tens > 1) {
			words.push(units > 0 ? `${TENS[tens]} e ${UNITS[units]}` : TENS[tens]);
		} else {
			words.push(UNITS[units]);
		}

		if (triplet === 1) {
			const mega = MEGAS_SINGULAR[i];

			if (mega) {
				if (i === 4 && triplets.slice(0, -1).some((t) => t > 0)) {
					words.push("um");
				} else if (i === 1 && words[0] === UNITS[1]) {
					words.shift();
				}
				words.push(mega);
			}
		} else {
			const mega = MEGAS_PLURAL[i];

			if (mega) {
				if (i === 1 && words[0] === UNITS[1]) {
					words.shift();
				}
				words.push(mega);
			}
		}
	}

	return words.join(" ");
};
