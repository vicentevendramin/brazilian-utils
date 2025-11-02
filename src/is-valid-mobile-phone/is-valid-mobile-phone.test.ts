import { describe, expect, test } from "vitest";
import { isValidMobilePhone } from "./is-valid-mobile-phone";

describe("isValidMobilePhone", () => {
	describe("should return false", () => {
		test("when it is an empty string", () => {
			expect(isValidMobilePhone("")).toBe(false);
		});

		test("when it is a landline", () => {
			expect(isValidMobilePhone("1130000000")).toBe(false);
		});

		test("when length is invalid", () => {
			expect(isValidMobilePhone("1198765432")).toBe(false);
		});
	});

	describe("should return true", () => {
		test("when is a valid mobile phone version 2", () => {
			expect(isValidMobilePhone("(11) 98765-4321")).toBe(true);
			expect(isValidMobilePhone("11987654321", { version: 2 })).toBe(true);
		});

		test("when is a valid mobile phone version 1", () => {
			expect(isValidMobilePhone("11712345678", { version: 1 })).toBe(true);
		});
	});
});

