import { describe, expect, test } from "vitest";
import { LENGTH, RESERVED_NUMBERS, isValidPis } from "./is-valid-pis";

describe("isValidPis", () => {
	describe("should return false", () => {
		test("when it is on the RESERVED_NUMBERS", () => {
			for (const pis of RESERVED_NUMBERS) {
				expect(isValidPis(pis)).toBe(false);
			}
		});

		test("when it is an empty string", () => {
			expect(isValidPis("")).toBe(false);
		});

		test("when it is null", () => {
			// biome-ignore lint/suspicious/noExplicitAny: test case
			expect(isValidPis(null as any)).toBe(false);
		});

		test("when it is undefined", () => {
			// biome-ignore lint/suspicious/noExplicitAny: test case
			expect(isValidPis(undefined as any)).toBe(false);
		});

		test("when it is a boolean", () => {
			// biome-ignore lint/suspicious/noExplicitAny: test case
			expect(isValidPis(true as any)).toBe(false);
			// biome-ignore lint/suspicious/noExplicitAny: test case
			expect(isValidPis(false as any)).toBe(false);
		});

		test("when is an object", () => {
			// biome-ignore lint/suspicious/noExplicitAny: test case
			expect(isValidPis({} as any)).toBe(false);
		});

		test("when is an array", () => {
			// biome-ignore lint/suspicious/noExplicitAny: test case
			expect(isValidPis([] as any)).toBe(false);
		});

		test(`when dont match with PIS length (${LENGTH})`, () => {
			expect(isValidPis("123456")).toBe(false);
		});

		test("when contains letters or special characters", () => {
			expect(isValidPis("12056Aabb412847")).toBe(false);
		});

		test("when contains only letters or special characters", () => {
			expect(isValidPis("abcabcabcde")).toBe(false);
		});

		test("when is an invalid PIS", () => {
			expect(isValidPis("12056412547")).toBe(false);
			expect(isValidPis("12081636639")).toBe(false);
		});
	});

	describe("should return true", () => {
		test("when is a valid PIS without mask", () => {
			expect(isValidPis("12056412847")).toBe(true);
		});

		test("when is valid PIS with mask", () => {
			expect(isValidPis("120.5641.284-7")).toBe(true);
		});

		test("when is a valid PIS with last digit 0", () => {
			expect(isValidPis("120.1213.266-0")).toBe(true);
			expect(isValidPis("120.7041.469-0")).toBe(true);
		});
	});
});
