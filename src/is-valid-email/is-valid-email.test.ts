import { describe, expect, test } from "vite-plus/test";

import { isValidEmail } from "./is-valid-email";

describe("isValidEmail", () => {
	describe("should return false", () => {
		test("when it is an empty string", () => {
			expect(isValidEmail("")).toBe(false);
		});

		test("when it is null", () => {
			expect(isValidEmail(null as any)).toBe(false);
		});

		test("when it is undefined", () => {
			expect(isValidEmail(undefined as any)).toBe(false);
		});

		test("when it is missing @", () => {
			expect(isValidEmail("invalid.email")).toBe(false);
		});

		test("when it is missing domain", () => {
			expect(isValidEmail("user@")).toBe(false);
		});

		test("when it is missing user", () => {
			expect(isValidEmail("@domain.com")).toBe(false);
		});
	});

	describe("should return true", () => {
		test("when is a valid email", () => {
			expect(isValidEmail("user@example.com")).toBe(true);
			expect(isValidEmail("user__@example.com")).toBe(true);
			expect(isValidEmail("user__user@example.com")).toBe(true);
		});

		test("when is a valid email with subdomain", () => {
			expect(isValidEmail("test@subdomain.example.com")).toBe(true);
		});

		test("when is a valid email with special characters", () => {
			expect(isValidEmail("user+tag@example.co.uk")).toBe(true);
		});
	});
});
