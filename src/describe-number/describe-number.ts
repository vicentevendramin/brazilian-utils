/**
 * based on https://github.com/LenonBordini/numero-por-extenso
 */
const firstPlace = [
	"zero",
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

const secondPlace = [
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

const thirdPlace = [
	"",
	"cento",
	"duzentos",
	"trezentos",
	"quatrocentos",
	"quinhentos",
	"seiscentos",
	"setecentos",
	"oitocentos",
	"novecentos",
];

const names = [firstPlace, secondPlace, thirdPlace];

const tens = [
	"dez",
	"onze",
	"doze",
	"treze",
	"quatorze",
	"quinze",
	"dezesseis",
	"dezessete",
	"dezoito",
	"dezenove",
];

const places = [
	"",
	"mil",
	"milhões",
	"bilhões",
	"trilhões",
	"quatrilhões",
	"quintilhões",
	"sextilhões",
	"septilhões",
	"octilhões",
	"nonilhões",
	"decilhões",
	"undecilhões",
	"duodecilhões",
	"tredecilhões",
];

const decimalPlaces = [
	"décimo",
	"centésimo",
	"milésimo",
	"décimo de milésimo",
	"centésimo de milésimo",
	"milionésimo",
	"décimo de milionésimo",
	"centésimo de milionésimo",
	"bilionésimo",
	"décimo de bilionésimo",
	"centésimo de bilionésimo",
	"trilionésimo",
	"décimo de trilionésimo",
	"centésimo de trilionésimo",
	"quatrilionésimo",
	"décimo de quatrilionésimo",
	"centésimo de quatrilionésimo",
	"quintilionésimo",
	"décimo de quintilionésimo",
	"centésimo de quintilionésimo",
];

const LARGE_UNITS_PATTERN =
	/\b(milhão|bilhão|trilhão|quatrilhão|quintilhão|sextilhão|septilhão|octilhão|nonilhão|decilhão|undecilhão|duodecilhão|tredecilhão)s?\b$/;

const SCIENTIFIC_NOTATION_PATTERN = /^[+-]?\d+(\.\d+)?[eE][+-]?\d+$/;

const VALID_NUMBER_PATTERN = /^[+-]?(\d+\.?\d*|\.\d+)$/;

/**
 * Converts a group of up to 3 digits to Portuguese text.
 *
 * @param {string} number - The number group (up to 3 digits) as a string.
 * @returns {string} The Portuguese text representation of the group.
 */
const getGroup = (number: string): string => {
	if (number === "100") return "cem";
	if (number === "0" || +number === 0) return "zero";

	const parts: string[] = [];
	const length = number.length;

	for (let i = 0; i < length; i++) {
		const digit = number[i];
		if (digit === "0") continue;

		if (parts.length > 0) parts.push("e");

		if (
			((length === 2 && i === 0) || (length === 3 && i === 1)) &&
			digit === "1"
		) {
			return parts.length > 0
				? `${parts.join(" ")} ${tens[+number[i + 1]]}`
				: tens[+number[i + 1]];
		}

		parts.push(names[length - i - 1][+digit]);
	}

	return parts.length > 0 ? parts.join(" ") : "zero";
};

/**
 * Converts a number to its full Portuguese text representation.
 *
 * @param {string|number} number - The number to convert.
 * @returns {string} The Portuguese text representation of the number.
 */
const numberInFull = (number: string | number): string => {
	const numberStr = typeof number === "string" ? number : String(number);
	const length = numberStr.length;

	if (length === 0) return "zero";

	const groups: Array<{ value: number; text: string }> = [];

	for (let i = length; i > 0; i -= 3) {
		const start = Math.max(0, i - 3);
		const piece = numberStr.slice(start, i);
		const value = +piece;
		groups.push({ value, text: getGroup(piece) });
	}

	if (groups.length === 1 && groups[0].value === 0) {
		return groups[0].text;
	}

	if (groups.length === 1) {
		return groups[0].text;
	}

	const output: string[] = [];
	const groupsLength = groups.length;

	for (let i = groupsLength - 1; i > 0; i--) {
		const group = groups[i];
		if (group.value !== 0) {
			const place =
				group.value === 1 ? places[i].replace("ões", "ão") : places[i];
			const text = group.text;

			// Check if we need "e" before this group
			// Need "e" if there's already output and this is an intermediate group (< groupsLength - 1)
			// and the value is < 100 (not >= 100)
			const needsAnd =
				output.length > 0 && i < groupsLength - 1 && group.value < 100;

			const prefix = needsAnd ? "e " : "";
			output.push(prefix + (text ? `${text} ${place}` : place));
		}
	}

	const firstGroup = groups[0];
	if (firstGroup.value > 0) {
		const needsAnd =
			groupsLength > 1 &&
			(firstGroup.value < 100 || firstGroup.value % 100 === 0);

		const shouldAddAnd = needsAnd && output.length > 0;
		output.push(`${shouldAddAnd ? "e " : ""}${firstGroup.text}`);
	}

	return output.join(" ");
};

/**
 * Discovers the name of the decimal place for a given decimal part.
 *
 * @param {string} numberAfter - The decimal part as a string.
 * @returns {string} The name of the decimal place.
 */
const getDecimalPlaceName = (numberAfter: string): string => {
	const index = numberAfter.length - 1;
	if (index < 0) return "";

	const decimalPlace = decimalPlaces[index];
	if (!decimalPlace) return "";

	if (+numberAfter === 1) return decimalPlace;

	const spaceIndex = decimalPlace.indexOf(" ");
	if (spaceIndex === -1) {
		return `${decimalPlace}s`;
	}

	return `${decimalPlace.slice(0, spaceIndex)}s${decimalPlace.slice(spaceIndex)}`;
};

/**
 * Converts a number to Portuguese text in normal style.
 *
 * @param {string|number|"INFINITY"|"-INFINITY"} number - The number to convert.
 * @returns {string} The Portuguese text representation.
 */
const toNormal = (
	number: string | number | "INFINITY" | "-INFINITY",
): string => {
	// Handle Infinity cases
	if (number === "INFINITY") return "infinito";
	if (number === "-INFINITY") return "menos infinito";

	const numberStr = typeof number === "string" ? number : String(number);
	const isNegative = numberStr.startsWith("-");
	const parts = numberStr.replace("-", "").split(".");
	const numberBefore = parts[0] || "0";
	const numberAfter = parts[1];

	const beforeText = numberInFull(numberBefore);
	let result = (isNegative ? "menos " : "") + beforeText;

	if (numberAfter) {
		const cleaned = numberAfter.replace(/0+$/, "");
		if (cleaned) {
			result += ` vírgula ${numberInFull(cleaned)}`;
			const decimalPlace = getDecimalPlaceName(cleaned);
			if (decimalPlace) {
				result += ` ${decimalPlace}`;
			}
		}
	}

	return result;
};

/**
 * Converts a number to Portuguese text in currency style (reais/centavos).
 *
 * @param {string|number|"INFINITY"|"-INFINITY"} number - The number to convert.
 * @returns {string} The Portuguese text representation in currency format.
 */
const toCurrency = (
	number: string | number | "INFINITY" | "-INFINITY",
): string => {
	// Handle Infinity cases
	if (number === "INFINITY") return "infinito reais";
	if (number === "-INFINITY") return "menos infinito reais";

	const numberStr = typeof number === "string" ? number : String(number);
	const isNegative = numberStr.startsWith("-");
	const parts = numberStr.replace("-", "").split(".");
	const numberBefore = parts[0] || "0";
	const numberAfterRaw = parts[1] || "";
	const numberAfter = `${numberAfterRaw}00`.slice(0, 2);

	const beforeValue = +numberBefore;
	const afterValue = +numberAfter;

	const result: string[] = [];

	if (isNegative) result.push("menos");

	if (beforeValue > 0) {
		const beforeText = numberInFull(numberBefore);
		result.push(beforeText);
		// Add "de" before "reais" when the number ends with milhão/milhões, bilhão/bilhões, etc.
		const needsDe = LARGE_UNITS_PATTERN.test(beforeText);
		if (needsDe) result.push("de");
		result.push(beforeValue === 1 ? "real" : "reais");
	}

	if (afterValue > 0) {
		if (beforeValue > 0) result.push("e");
		result.push(numberInFull(numberAfter));
		result.push(afterValue === 1 ? "centavo" : "centavos");
	}

	return result.join(" ");
};

/**
 * Converts a number to Portuguese text in percentage style.
 *
 * @param {string|number|"INFINITY"|"-INFINITY"} number - The number to convert.
 * @returns {string} The Portuguese text representation with "por cento".
 */
const toPercentage = (
	number: string | number | "INFINITY" | "-INFINITY",
): string => `${toNormal(number)} por cento`;

export type DescribeNumberStyle = "normal" | "currency" | "percentage";

export type DescribeNumberOptions = {
	style?: DescribeNumberStyle;
};

/**
 * Sanitizes and normalizes the input value for number conversion.
 *
 * Handles edge cases like Infinity, NaN, scientific notation, and invalid inputs.
 *
 * @param {string|number} value - The input value to sanitize.
 * @returns {string|"INFINITY"|"-INFINITY"} The normalized number string, "INFINITY" for Infinity, "-INFINITY" for -Infinity, or "0" for invalid inputs.
 */
const sanitize = (
	value: string | number,
): string | "INFINITY" | "-INFINITY" => {
	if (value == null || value === "") return "0";

	if (typeof value === "number") {
		if (value === Infinity) return "INFINITY";
		if (value === -Infinity) return "-INFINITY";
		if (Number.isNaN(value)) return "0";
		return String(value);
	}

	const str = String(value).trim().toLowerCase();

	if (str === "") return "0";

	if (str === "infinity" || str === "+infinity") return "INFINITY";
	if (str === "-infinity") return "-INFINITY";

	if (SCIENTIFIC_NOTATION_PATTERN.test(str)) {
		const num = Number.parseFloat(str);
		if (num === Infinity) return "INFINITY";
		if (num === -Infinity) return "-INFINITY";
		if (Number.isFinite(num)) return String(num);
		return "0";
	}

	if (!VALID_NUMBER_PATTERN.test(str)) return "0";

	return str;
};

/**
 * Converts a number to its Portuguese text representation (por extenso).
 *
 * @param {string|number} value - The number to convert. Can be a string or a number.
 * @param {Object} options - Optional conversion options.
 * @param {string} options.style - The style of the conversion: "normal" (default), "currency", or "percentage".
 * @returns {string} The Portuguese text representation of the number.
 *
 * @example
 * ```typescript
 * describeNumber(128); // "cento e vinte e oito"
 * describeNumber(128, { style: "currency" }); // "cento e vinte e oito reais"
 * describeNumber(128, { style: "percentage" }); // "cento e vinte e oito por cento"
 * describeNumber(10.50, { style: "currency" }); // "dez reais e cinquenta centavos"
 * ```
 */
export const describeNumber = (
	value: string | number,
	options?: DescribeNumberOptions,
): string => {
	const enhancedValue = sanitize(value);

	const style = options?.style ?? "normal";

	if (style === "currency") return toCurrency(enhancedValue);

	if (style === "percentage") return toPercentage(enhancedValue);

	return toNormal(enhancedValue);
};
