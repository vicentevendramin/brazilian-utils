import { describe, expect, test } from "vitest";
import { isValidBoleto } from "../is-valid-boleto/is-valid-boleto";
import { LENGTH } from "./constants";
import { generateBoleto } from "./generate-boleto";

describe("generateBoleto", () => {
	test("should generate a valid boleto", () => {
		const boleto = generateBoleto();
		expect(boleto).toHaveLength(LENGTH);
		expect(/^\d+$/.test(boleto)).toBe(true);
		expect(isValidBoleto(boleto)).toBe(true);
	});

	test("should generate different boleto on multiple calls", () => {
		const boleto1 = generateBoleto();
		const boleto2 = generateBoleto();
		const boleto3 = generateBoleto();

		// Very unlikely but possible to generate same boleto
		const allSame = boleto1 === boleto2 && boleto2 === boleto3;
		if (allSame) {
			// If all same, generate more to verify randomness
			const set = new Set([boleto1, generateBoleto(), generateBoleto()]);
			expect(set.size).toBeGreaterThan(1);
		}
	});

	test("should generate valid boletos that pass validation with formatting", () => {
		for (let i = 0; i < 10; i++) {
			const boleto = generateBoleto();
			// Add formatting and validate
			const formatted = `${boleto.slice(0, 9)} ${boleto.slice(9, 20)} ${boleto.slice(20, 31)} ${boleto.slice(31, 32)} ${boleto.slice(32)}`;
			expect(isValidBoleto(formatted)).toBe(true);
		}
	});

	test("should generate multiple valid boletos", () => {
		const boletos = new Set<string>();
		for (let i = 0; i < 100; i++) {
			const boleto = generateBoleto();
			expect(isValidBoleto(boleto)).toBe(true);
			expect(boletos.has(boleto)).toBe(false);
			boletos.add(boleto);
		}
		expect(boletos.size).toBe(100);
	});
});
