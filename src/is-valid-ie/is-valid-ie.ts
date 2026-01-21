import type { StateCode } from "../_internals/constants/states";
import { sanitizeToDigits } from "../_internals/sanitize-to-digits/sanitize-to-digits";

type IeValidator = (ie: string) => boolean;

const checkLength = (ie: string, length: number | number[]): boolean => {
	if (typeof length === "number") return ie.length === length;
	return length.includes(ie.length);
};

const startsWith = (ie: string, prefix: string): boolean =>
	ie.substring(0, prefix.length) === prefix;

type CalcDigitDecreasingParams = {
	body: string;
	startWeight: number;
	minWeight: number;
	mod?: number;
};

const calcDigitDecreasing = ({
	body,
	startWeight,
	minWeight,
	mod = 11,
}: CalcDigitDecreasingParams): number => {
	let weight = startWeight;
	let sum = 0;

	for (let i = 0; i < body.length; i++) {
		const digit = body.charCodeAt(i) - 48;
		sum += digit * weight;
		weight--;
		if (weight < minWeight) {
			weight = minWeight === 1 ? 9 : 11;
		}
	}

	const rest = sum % mod;
	const dig = mod - rest;
	return dig >= 10 ? 0 : dig;
};

const validateAC: IeValidator = (ie: string) => {
	if (!checkLength(ie, 13)) return false;
	if (!startsWith(ie, "01")) return false;

	const body = ie.substring(0, 11);
	let weight = body.length - 7;
	let sum = 0;

	for (let i = 0; i < body.length; i++) {
		const digit = ie.charCodeAt(i) - 48;
		sum += digit * weight;
		weight--;
		if (weight === 1) {
			weight = 9;
		}
	}

	const mod = 11;
	const rest = sum % mod;
	let firstDig = mod - rest;
	if (firstDig >= 10) {
		firstDig = 0;
	}

	const bodyWithFirst = body + firstDig;
	weight = bodyWithFirst.length - 7;
	sum = 0;

	for (let i = 0; i < bodyWithFirst.length; i++) {
		const digit = i < body.length ? ie.charCodeAt(i) - 48 : firstDig;
		sum += digit * weight;
		weight--;
		if (weight === 1) {
			weight = 9;
		}
	}

	const rest2 = sum % mod;
	let secondDig = mod - rest2;
	if (secondDig >= 10) {
		secondDig = 0;
	}

	return (
		Number.parseInt(ie.charAt(11), 10) === firstDig &&
		Number.parseInt(ie.charAt(12), 10) === secondDig
	);
};

const validateAL: IeValidator = (ie: string) => {
	if (!checkLength(ie, 9)) return false;
	if (!startsWith(ie, "24")) return false;

	let weight = 9;
	const position = 8;
	let sum = 0;

	for (let i = 0; i < position; i++) {
		const digit = ie.charCodeAt(i) - 48;
		sum += digit * weight;
		weight--;
	}

	const product = sum * 10;
	let digit = product - Math.floor(product / 11) * 11;
	if (digit >= 10) {
		digit = 0;
	}

	return digit === Number.parseInt(ie.charAt(position), 10);
};

const validateAP: IeValidator = (ie: string) => {
	if (!checkLength(ie, 9)) return false;
	if (!startsWith(ie, "03")) return false;

	const length = ie.length;
	const position = length - 1;
	let weight = length;
	const body = ie.substring(0, position);
	const bodyInt = Number.parseInt(body, 10);
	let p = 0;
	let d = 0;

	if (bodyInt >= 3_000_001 && bodyInt <= 3_017_000) {
		p = 5;
		d = 0;
	} else if (bodyInt >= 3_017_001 && bodyInt <= 3_019_022) {
		p = 9;
		d = 1;
	}

	let sum = p;
	for (let i = 0; i < body.length; i++) {
		const digit = ie.charCodeAt(i) - 48;
		sum += digit * weight;
		weight--;
	}

	let dig = 11 - (sum % 11);
	if (dig === 10) {
		dig = 0;
	}

	if (dig === 11) {
		dig = d;
	}

	return dig === Number.parseInt(ie.charAt(position), 10);
};

const validateAM: IeValidator = (ie: string) => {
	if (!checkLength(ie, 9)) return false;

	const body = ie.substring(0, 8);
	const dig = calcDigitDecreasing({
		body,
		startWeight: body.length + 1,
		minWeight: 1,
	});

	return Number.parseInt(ie.charAt(8), 10) === dig;
};

const validateBA: IeValidator = (ie: string) => {
	if (!checkLength(ie, [8, 9])) return false;

	const pos = ie.length === 9 ? 1 : 0;
	const charAt = Number.parseInt(ie.substring(pos, pos + 1), 10);
	const arr = [0, 1, 2, 3, 4, 5, 8];
	const mod = arr.includes(charAt) ? 10 : 11;

	const body = ie.substring(0, ie.length - 2);
	let weight = body.length + 1;
	let sum = 0;

	for (let i = 0; i < body.length; i++) {
		const digit = ie.charCodeAt(i) - 48;
		sum += digit * weight;
		weight--;
	}

	let rest = sum % mod;
	let secondDig = mod - rest;
	if (secondDig >= 10) {
		secondDig = 0;
	}

	const bodyWithSecond = body + secondDig;
	weight = bodyWithSecond.length + 1;
	sum = 0;

	for (let i = 0; i < bodyWithSecond.length; i++) {
		const digit = i < body.length ? ie.charCodeAt(i) - 48 : secondDig;
		sum += digit * weight;
		weight--;
	}

	rest = sum % mod;
	let firstDig = mod - rest;
	if (firstDig >= 10) {
		firstDig = 0;
	}

	return (
		Number.parseInt(ie.charAt(ie.length - 2), 10) === firstDig &&
		Number.parseInt(ie.charAt(ie.length - 1), 10) === secondDig
	);
};

const validateCE: IeValidator = (ie: string) => {
	if (!checkLength(ie, 9)) return false;

	const body = ie.substring(0, 8);
	const dig = calcDigitDecreasing({
		body,
		startWeight: body.length + 1,
		minWeight: 1,
	});

	return Number.parseInt(ie.charAt(8), 10) === dig;
};

const validateDF: IeValidator = (ie: string) => {
	if (!checkLength(ie, 13)) return false;
	if (!startsWith(ie, "07")) return false;

	const length = ie.length;
	const body = ie.substring(0, length - 2);

	const firstDig = calcDFDigit(body);
	const secondDig = calcDFDigit(body + firstDig);

	return (
		Number.parseInt(ie.charAt(length - 2), 10) === firstDig &&
		Number.parseInt(ie.charAt(length - 1), 10) === secondDig
	);
};

const calcDFDigit = (body: string): number => {
	let weight = body.length - 7;
	let sum = 0;

	for (let i = 0; i < body.length; i++) {
		const digit = Number.parseInt(body.charAt(i), 10);
		sum += digit * weight;
		weight--;
		if (weight === 1) {
			weight = 9;
		}
	}

	const mod = 11;
	const rest = sum % mod;
	let dig = mod - rest;
	if (dig >= 10) {
		dig = 0;
	}

	return dig;
};

const validateES: IeValidator = (ie: string) => {
	if (!checkLength(ie, 9)) return false;

	const body = ie.substring(0, 8);
	const dig = calcDigitDecreasing({
		body,
		startWeight: body.length + 1,
		minWeight: 1,
	});

	return Number.parseInt(ie.charAt(8), 10) === dig;
};

const validateGO: IeValidator = (ie: string) => {
	if (!checkLength(ie, 9)) return false;

	const beginWith = ["10", "11", "12", "20"];
	const begin = ie.substring(0, 2);
	if (!beginWith.includes(begin)) return false;

	const body = ie.substring(0, 8);
	const bodyInt = Number.parseInt(body, 10);
	let weight = 9;
	let sum = 0;

	for (let i = 0; i < body.length; i++) {
		const digit = ie.charCodeAt(i) - 48;
		sum += digit * weight;
		weight--;
	}

	const rest = sum % 11;
	let dig = 11 - rest;

	if (dig >= 10) {
		if (dig === 11 && bodyInt >= 10_103_105 && bodyInt <= 10_119_997) {
			dig = 1;
		} else {
			dig = 0;
		}
	}

	return Number.parseInt(ie.charAt(8), 10) === dig;
};

const validateMA: IeValidator = (ie: string) => {
	if (!checkLength(ie, 9)) return false;
	if (!startsWith(ie, "12")) return false;

	const body = ie.substring(0, 8);
	const dig = calcDigitDecreasing({
		body,
		startWeight: body.length + 1,
		minWeight: 1,
	});

	return Number.parseInt(ie.charAt(8), 10) === dig;
};

const validateMG: IeValidator = (ie: string) => {
	if (!checkLength(ie, 13)) return false;

	const body = ie.substring(0, 11);
	const bodyWithZero = `${body.substring(0, 3)}0${body.substring(3)}`;

	let concat = "";
	for (let i = 0; i < bodyWithZero.length; i++) {
		const digit = bodyWithZero.charCodeAt(i) - 48;
		const weight = (i + 3) % 2 === 0 ? 2 : 1;
		concat += String(digit * weight);
	}

	let sum = 0;
	for (let i = 0; i < concat.length; i++) {
		sum += concat.charCodeAt(i) - 48;
	}

	const sumStr = String(sum);
	const lastChar = sumStr.charAt(sumStr.length - 1);
	const lastCharInt = Number.parseInt(lastChar, 10);
	const firstDig = lastCharInt === 0 ? 0 : 10 - lastCharInt;

	let weight = 3;
	let sum2 = 0;
	const bodyWithFirst = body + firstDig;
	for (let i = 0; i < bodyWithFirst.length; i++) {
		const digit = bodyWithFirst.charCodeAt(i) - 48;
		sum2 += digit * weight;
		weight--;
		if (weight === 1) {
			weight = 11;
		}
	}

	const rest = sum2 % 11;
	let secondDig = 11 - rest;
	if (secondDig >= 10) {
		secondDig = 0;
	}

	return (
		Number.parseInt(ie.charAt(11), 10) === firstDig &&
		Number.parseInt(ie.charAt(12), 10) === secondDig
	);
};

const validateMT: IeValidator = (ie: string) => {
	if (!checkLength(ie, 11)) return false;

	const body = ie.substring(0, 10);
	let weight = 3;
	let sum = 0;

	for (let i = 0; i < body.length; i++) {
		const digit = ie.charCodeAt(i) - 48;
		sum += digit * weight;
		weight--;
		if (weight === 1) {
			weight = 9;
		}
	}

	const rest = sum % 11;
	let dig = 11 - rest;
	if (dig >= 10) {
		dig = 0;
	}

	return Number.parseInt(ie.charAt(10), 10) === dig;
};

const validateMS: IeValidator = (ie: string) => {
	if (!checkLength(ie, 9)) return false;
	if (!startsWith(ie, "28")) return false;

	const body = ie.substring(0, 8);
	const dig = calcDigitDecreasing({
		body,
		startWeight: body.length + 1,
		minWeight: 1,
	});

	return Number.parseInt(ie.charAt(8), 10) === dig;
};

const validatePA: IeValidator = (ie: string) => {
	if (!checkLength(ie, 9)) return false;
	if (!startsWith(ie, "15")) return false;

	const body = ie.substring(0, 8);
	const dig = calcDigitDecreasing({
		body,
		startWeight: body.length + 1,
		minWeight: 1,
	});

	return Number.parseInt(ie.charAt(8), 10) === dig;
};

const validatePB: IeValidator = (ie: string) => {
	if (!checkLength(ie, 9)) return false;

	const body = ie.substring(0, 8);
	const dig = calcDigitDecreasing({
		body,
		startWeight: body.length + 1,
		minWeight: 1,
	});

	return Number.parseInt(ie.charAt(8), 10) === dig;
};

const validatePE: IeValidator = (ie: string) => {
	if (!checkLength(ie, 9)) return false;

	const body = ie.substring(0, 7);
	let weight = body.length + 1;
	let sum = 0;

	for (let i = 0; i < body.length; i++) {
		const digit = ie.charCodeAt(i) - 48;
		sum += digit * weight;
		weight--;
	}

	const mod = 11;
	const rest = sum % mod;
	let firstDig = mod - rest;
	if (firstDig >= 10) {
		firstDig = 0;
	}

	const bodyWithFirst = body + firstDig;
	weight = bodyWithFirst.length + 1;
	sum = 0;

	for (let i = 0; i < bodyWithFirst.length; i++) {
		const digit = i < body.length ? ie.charCodeAt(i) - 48 : firstDig;
		sum += digit * weight;
		weight--;
	}

	const rest2 = sum % mod;
	let secondDig = mod - rest2;
	if (secondDig >= 10) {
		secondDig = 0;
	}

	return (
		Number.parseInt(ie.charAt(7), 10) === firstDig &&
		Number.parseInt(ie.charAt(8), 10) === secondDig
	);
};

const validatePI: IeValidator = (ie: string) => {
	if (!checkLength(ie, 9)) return false;

	const body = ie.substring(0, 8);
	const dig = calcDigitDecreasing({
		body,
		startWeight: body.length + 1,
		minWeight: 1,
	});

	return Number.parseInt(ie.charAt(8), 10) === dig;
};

const validatePR: IeValidator = (ie: string) => {
	if (!checkLength(ie, 10)) return false;

	const body = ie.substring(0, 8);
	let weight = body.length - 5;
	let sum = 0;

	for (let i = 0; i < body.length; i++) {
		const digit = ie.charCodeAt(i) - 48;
		sum += digit * weight;
		weight--;
		if (weight === 1) {
			weight = 7;
		}
	}

	const rest = sum % 11;
	let firstDig = 11 - rest;
	if (firstDig >= 10) {
		firstDig = 0;
	}

	const bodyWithFirst = body + firstDig;
	weight = bodyWithFirst.length - 5;
	sum = 0;

	for (let i = 0; i < bodyWithFirst.length; i++) {
		const digit = Number.parseInt(bodyWithFirst.charAt(i), 10);
		sum += digit * weight;
		weight--;
		if (weight === 1) {
			weight = 7;
		}
	}

	const rest2 = sum % 11;
	let secondDig = 11 - rest2;
	if (secondDig >= 10) {
		secondDig = 0;
	}

	return (
		Number.parseInt(ie.charAt(8), 10) === firstDig &&
		Number.parseInt(ie.charAt(9), 10) === secondDig
	);
};

const validateRJ: IeValidator = (ie: string) => {
	if (!checkLength(ie, 8)) return false;

	const body = ie.substring(0, 7);
	let weight = 2;
	let sum = 0;

	for (let i = 0; i < body.length; i++) {
		const digit = Number.parseInt(ie.charAt(i), 10);
		sum += digit * weight;
		weight--;
		if (weight === 1) {
			weight = 7;
		}
	}

	const rest = sum % 11;
	let dig = 11 - rest;
	if (dig >= 10) {
		dig = 0;
	}

	return Number.parseInt(ie.charAt(7), 10) === dig;
};

const validateRN: IeValidator = (ie: string) => {
	if (!checkLength(ie, [9, 10])) return false;
	if (!startsWith(ie, "20")) return false;

	const length = ie.length;
	const position = length - 1;
	let weight = length;
	const body = ie.substring(0, position);
	let sum = 0;

	for (let i = 0; i < body.length; i++) {
		const digit = ie.charCodeAt(i) - 48;
		sum += digit * weight;
		weight--;
	}

	const rest = sum % 11;
	let dig = 11 - rest;
	if (dig >= 10) {
		dig = 0;
	}

	return Number.parseInt(ie.charAt(position), 10) === dig;
};

const validateRO: IeValidator = (ie: string) => {
	if (!checkLength(ie, 14)) return false;

	const length = ie.length;
	const position = length - 1;
	let weight = 6;
	const body = ie.substring(0, position);
	let sum = 0;

	for (let i = 0; i < body.length; i++) {
		const digit = Number.parseInt(ie.charAt(i), 10);
		sum += digit * weight;
		weight--;
		if (weight === 1) {
			weight = 9;
		}
	}

	const rest = sum % 11;
	let dig = 11 - rest;

	if (dig >= 10) {
		dig -= 10;
	}

	return dig === Number.parseInt(ie.charAt(position), 10);
};

const validateRR: IeValidator = (ie: string) => {
	if (!checkLength(ie, 9)) return false;
	if (!startsWith(ie, "24")) return false;

	const body = ie.substring(0, 8);
	let weight = 1;
	let sum = 0;

	for (let i = 0; i < body.length; i++) {
		const digit = ie.charCodeAt(i) - 48;
		sum += digit * weight;
		weight++;
	}

	const rest = sum % 9;
	return Number.parseInt(ie.charAt(8), 10) === rest;
};

const validateRS: IeValidator = (ie: string) => {
	if (!checkLength(ie, 10)) return false;

	const body = ie.substring(0, 9);
	let weight = 2;
	let sum = 0;

	for (let i = 0; i < body.length; i++) {
		const digit = ie.charCodeAt(i) - 48;
		sum += digit * weight;
		weight--;
		if (weight === 1) {
			weight = 9;
		}
	}

	const rest = sum % 11;
	let dig = 11 - rest;
	if (dig >= 10) {
		dig = 0;
	}

	return Number.parseInt(ie.charAt(9), 10) === dig;
};

const validateSC: IeValidator = (ie: string) => {
	if (!checkLength(ie, 9)) return false;

	const body = ie.substring(0, 8);
	const dig = calcDigitDecreasing({
		body,
		startWeight: body.length + 1,
		minWeight: 1,
	});

	return Number.parseInt(ie.charAt(8), 10) === dig;
};

const validateSE: IeValidator = (ie: string) => {
	if (!checkLength(ie, 9)) return false;

	const body = ie.substring(0, 8);
	const dig = calcDigitDecreasing({
		body,
		startWeight: body.length + 1,
		minWeight: 1,
	});

	return Number.parseInt(ie.charAt(8), 10) === dig;
};

const validateSP: IeValidator = (ie: string) => {
	if (!checkLength(ie, 12)) return false;

	const body = ie.substring(0, 8);
	const weightFirst = [1, 3, 4, 5, 6, 7, 8, 10];
	let sum = 0;

	for (let i = 0; i < body.length; i++) {
		const digit = ie.charCodeAt(i) - 48;
		sum += digit * weightFirst[i];
	}

	const dig = sum % 11;
	const digitStr = String(dig);
	const firstDig = Number.parseInt(digitStr.charAt(digitStr.length - 1), 10);

	const bodyForSecond = ie.substring(0, 11);
	let weight = 3;
	let sum2 = 0;

	for (let i = 0; i < bodyForSecond.length; i++) {
		const digit = ie.charCodeAt(i) - 48;
		sum2 += digit * weight;
		weight--;
		if (weight === 1) {
			weight = 10;
		}
	}

	const dig2 = sum2 % 11;
	const digitStr2 = String(dig2);
	const secondDig = Number.parseInt(digitStr2.charAt(digitStr2.length - 1), 10);

	return (
		Number.parseInt(ie.charAt(8), 10) === firstDig &&
		Number.parseInt(ie.charAt(11), 10) === secondDig
	);
};

const validateTO: IeValidator = (ie: string) => {
	if (!checkLength(ie, [9, 11])) return false;

	if (ie.length === 11) {
		const begin = ie.substring(2, 4);
		const beginWith = ["01", "02", "03", "99"];
		if (beginWith.includes(begin)) {
			const body = ie.substring(0, 2) + ie.substring(4, 10);
			let weight = 9;
			let sum = 0;

			for (let i = 0; i < body.length; i++) {
				const digit = Number.parseInt(body.charAt(i), 10);
				sum += digit * weight;
				weight--;
			}

			const rest = sum % 11;
			let dig = 11 - rest;
			if (rest < 2) {
				dig = 0;
			}

			return Number.parseInt(ie.charAt(10), 10) === dig;
		}
	}

	const body = ie.substring(0, 8);
	let weight = 9;
	let sum = 0;

	for (let i = 0; i < body.length; i++) {
		const digit = ie.charCodeAt(i) - 48;
		sum += digit * weight;
		weight--;
	}

	const rest = sum % 11;
	let dig = 11 - rest;
	if (rest < 2) {
		dig = 0;
	}

	return Number.parseInt(ie.charAt(8), 10) === dig;
};

const IE_VALIDATORS: Record<StateCode, IeValidator> = {
	AC: validateAC,
	AL: validateAL,
	AP: validateAP,
	AM: validateAM,
	BA: validateBA,
	CE: validateCE,
	DF: validateDF,
	ES: validateES,
	GO: validateGO,
	MA: validateMA,
	MG: validateMG,
	MT: validateMT,
	MS: validateMS,
	PA: validatePA,
	PB: validatePB,
	PE: validatePE,
	PI: validatePI,
	PR: validatePR,
	RJ: validateRJ,
	RN: validateRN,
	RO: validateRO,
	RR: validateRR,
	RS: validateRS,
	SC: validateSC,
	SE: validateSE,
	SP: validateSP,
	TO: validateTO,
};

/**
 * Validates a Brazilian state registration number (Inscrição Estadual).
 *
 * @param {StateCode} stateCode - The state abbreviation (e.g., 'SP', 'RJ', 'MG')
 * @param {string} ie - The state registration number to validate
 * @returns {boolean} True if the state registration number is valid, false otherwise
 *
 * @example
 * ```typescript
 * isValidIe('SP', '110042490114'); // true
 * isValidIe('RJ', '12345'); // false
 * ```
 */
export const isValidIe = (stateCode: StateCode, ie: string): boolean => {
	if (!stateCode || !ie || typeof ie !== "string") return false;

	const digits = sanitizeToDigits(ie);
	if (!digits) return false;

	const validator = IE_VALIDATORS[stateCode];
	if (!validator) return false;

	return validator(digits);
};
