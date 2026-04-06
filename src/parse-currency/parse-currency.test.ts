import { describe, expect, test } from "../_internals/test/runtime";
import { parseCurrency } from "./parse-currency";

describe("parseCurrency", () => {
	describe("should return correct values", () => {
		test("when parsing currency with symbol", () => {
			expect(parseCurrency("R$ 1.234,56")).toBe(1234.56);
		});

		test("when parsing currency without symbol", () => {
			expect(parseCurrency("1234,56")).toBe(1234.56);
		});

		test("when parsing small values", () => {
			expect(parseCurrency("R$ 0,50")).toBe(0.5);
		});

		test("when parsing zero", () => {
			expect(parseCurrency("0")).toBe(0);
			expect(parseCurrency("0,00")).toBe(0);
		});

		test("when parsing large values", () => {
			expect(parseCurrency("R$ 10.000,00")).toBe(10000);
			expect(parseCurrency("1.000.000,50")).toBe(1000000.5);
		});
	});

	describe("should return 0", () => {
		test("when it is an empty string", () => {
			expect(parseCurrency("")).toBe(0);
		});

		test("when it is null", () => {
			expect(parseCurrency(null as any)).toBe(0);
		});

		test("when it is undefined", () => {
			expect(parseCurrency(undefined as any)).toBe(0);
		});

		test("should transform a formatted value into a float", () => {
			expect(parseCurrency("")).toBe(0);
			expect(parseCurrency("R$ 1,00")).toBe(1);
			expect(parseCurrency("R$ 1,10")).toBe(1.1);
			expect(parseCurrency("R$ 1,01")).toBe(1.01);
			expect(parseCurrency("R$ 10,01")).toBe(10.01);
			expect(parseCurrency("R$ 100,01")).toBe(100.01);
			expect(parseCurrency("R$ 1.000,01")).toBe(1000.01);
			expect(parseCurrency("R$ 10.000,01")).toBe(10000.01);
			expect(parseCurrency("R$ 100.000,01")).toBe(100000.01);
			expect(parseCurrency("R$ 1.000.000,01")).toBe(1000000.01);
		});
	});
});
