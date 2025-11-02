import { describe, expect, test } from "vitest";
import { isValidPhone } from "./is-valid-phone";

describe("isValidPhone", () => {
	describe("should return false", () => {
		test("when it is an empty string", () => {
			expect(isValidPhone("")).toBe(false);
		});

		test("when it is null", () => {
			// biome-ignore lint/suspicious/noExplicitAny: test case
			expect(isValidPhone(null as any)).toBe(false);
		});

		test("when length is invalid", () => {
			expect(isValidPhone("123")).toBe(false);
		});

		test("when DDD is invalid", () => {
			expect(isValidPhone("00999999999")).toBe(false);
		});
	});

	describe("should return true", () => {
		test("when is a valid mobile phone version 2", () => {
			expect(isValidPhone("(11) 98765-4321")).toBe(true);
			expect(isValidPhone("11987654321", { version: 2 })).toBe(true);
		});

		test("when is a valid landline phone", () => {
			expect(isValidPhone("(11) 3000-0000")).toBe(true);
			expect(isValidPhone("1130000000")).toBe(true);
		});

		test("when is a valid mobile phone version 1", () => {
			expect(isValidPhone("11712345678", { version: 1 })).toBe(true);
		});
	});
});
