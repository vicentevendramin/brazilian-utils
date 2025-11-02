import { describe, expect, test } from "vitest";
import { DATA } from "../_internals/states";
import { LENGTH, generateCpf } from "./generate-cpf";
import { isValidCpf } from "../is-valid-cpf/is-valid-cpf";

describe("generateCpf", () => {
	test(`should have the right length without mask (${LENGTH})`, () => {
		expect(generateCpf().length).toBe(LENGTH);
	});

	test("should return valid CPF", () => {
		for (let i = 0; i < 100; i++) {
			expect(isValidCpf(generateCpf())).toBe(true);
		}
	});

	describe("should return a valid CPF for each brazilian state with initials", () => {
		for (const state of DATA) {
			test(state.code, () => {
				const cpf = generateCpf(state.code);
				expect(isValidCpf(cpf)).toBe(true);
				expect(cpf.length).toBe(LENGTH);
			});
		}
	});
});
