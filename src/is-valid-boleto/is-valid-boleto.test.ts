import { describe, expect, test } from "vitest";
import { isValidBoleto, LENGTH } from "./is-valid-boleto";

describe("isValidBoleto", () => {
	describe("should return false", () => {
		test("when it is an empty string", () => {
			expect(isValidBoleto("")).toBe(false);
		});

		test("when it is null", () => {
			// biome-ignore lint/suspicious/noExplicitAny: test case
			expect(isValidBoleto(null as any)).toBe(false);
		});

		test("when it is undefined", () => {
			// biome-ignore lint/suspicious/noExplicitAny: test case
			expect(isValidBoleto(undefined as any)).toBe(false);
		});

		test(`when length is less than ${LENGTH}`, () => {
			expect(isValidBoleto("123456789")).toBe(false);
		});

		test("when is array", () => {
			// biome-ignore lint/suspicious/noExplicitAny: test case
			expect(isValidBoleto([] as any)).toBe(false);
		});

		test("when is object", () => {
			// biome-ignore lint/suspicious/noExplicitAny: test case
			expect(isValidBoleto({} as any)).toBe(false);
		});

		test("when is boolean", () => {
			// biome-ignore lint/suspicious/noExplicitAny: test case
			expect(isValidBoleto(true as any)).toBe(false);
			// biome-ignore lint/suspicious/noExplicitAny: test case
			expect(isValidBoleto(false as any)).toBe(false);
		});

		test("when check digit mod10 is invalid", () => {
			expect(
				isValidBoleto("00190000020114971860168524522114675860000102656"),
			).toBe(false);
		});

		test("check digit mod11 is invalid", () => {
			expect(
				isValidBoleto("00190000090114971860168524522114975860000102656"),
			).toBe(false);
		});
	});

	describe("should return true", () => {
		test("when is a boleto valid without mask", () => {
			expect(
				isValidBoleto("00190000090114971860168524522114675860000102656"),
			).toBe(true);
		});

		test("when is a boleto valid with mask", () => {
			expect(
				isValidBoleto("0019000009 01149.718601 68524.522114 6 75860000102656"),
			).toBe(true);
		});
	});
});
