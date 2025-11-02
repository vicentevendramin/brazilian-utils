import { describe, expect, test } from "vitest";
import { LENGTH, isValidProcessoJuridico } from "./is-valid-processo-juridico";

describe("isValidProcessoJuridico", () => {
	describe("should return false", () => {
		test("when it is an empty string", () => {
			expect(isValidProcessoJuridico("")).toBe(false);
		});

		test("when it is null", () => {
			// biome-ignore lint/suspicious/noExplicitAny: test case
			expect(isValidProcessoJuridico(null as any)).toBe(false);
		});

		test("when it is undefined", () => {
			// biome-ignore lint/suspicious/noExplicitAny: test case
			expect(isValidProcessoJuridico(undefined as any)).toBe(false);
		});

		test(`when length is less than ${LENGTH}`, () => {
			expect(isValidProcessoJuridico("123")).toBe(false);
		});
	});

	describe("should return true", () => {
		test("when is a processo juridico valid without mask", () => {
			expect(isValidProcessoJuridico("00020802520125150049")).toBe(true);
		});

		test("when is a processo juridico valid with mask", () => {
			expect(isValidProcessoJuridico("0002080-25.2012.515.0049")).toBe(true);
		});
	});
});

