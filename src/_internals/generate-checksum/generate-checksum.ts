import { sanitizeToDigits } from "../sanitize-to-digits/sanitize-to-digits";

export interface GenerateChecksumParams {
	base: string | number;
	weight: number | number[];
}

export function generateChecksum({ base, weight }: GenerateChecksumParams): number {
	const digits = sanitizeToDigits(base);

	let sum = 0;

	const len = digits.length;

	if (typeof weight === "number") {
		let w = weight;
		for (let i = 0; i < len; i++, w--) {
			const digit = digits.charCodeAt(i) - 48; // '0'.charCodeAt(0) === 48
			sum += digit * w;
		}
	} else {
		for (let i = 0; i < len; i++) {
			const digit = digits.charCodeAt(i) - 48;
			sum += digit * weight[i];
		}
	}

	return sum;
}
