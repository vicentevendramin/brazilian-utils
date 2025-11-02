import { describe, expect, test } from "vitest";
import { isValidRenavam } from "./is-valid-renavam";

describe("isValidRenavam", () => {
	describe("should return false", () => {
		test("when it is an empty string", () => {
			expect(isValidRenavam("")).toBe(false);
		});

		test("when it is null", () => {
			// biome-ignore lint/suspicious/noExplicitAny: test case
			expect(isValidRenavam(null as any)).toBe(false);
		});

		test("when it is undefined", () => {
			// biome-ignore lint/suspicious/noExplicitAny: test case
			expect(isValidRenavam(undefined as any)).toBe(false);
		});

		test("when it is a boolean", () => {
			// biome-ignore lint/suspicious/noExplicitAny: test case
			expect(isValidRenavam(true as any)).toBe(false);
			// biome-ignore lint/suspicious/noExplicitAny: test case
			expect(isValidRenavam(false as any)).toBe(false);
		});

		test("when it is an object", () => {
			// biome-ignore lint/suspicious/noExplicitAny: test case
			expect(isValidRenavam({} as any)).toBe(false);
		});

		test("when it is an array", () => {
			// biome-ignore lint/suspicious/noExplicitAny: test case
			expect(isValidRenavam([] as any)).toBe(false);
		});

		test("when it has less than 9 digits", () => {
			expect(isValidRenavam("12345678")).toBe(false);
		});

		test("when it has more than 11 digits", () => {
			expect(isValidRenavam("123456789012")).toBe(false);
		});

		test("when it contains only letters or special characters", () => {
			expect(isValidRenavam("abcdefghij")).toBe(false);
		});

		test("when it is a RENAVAM with invalid checksum", () => {
			expect(isValidRenavam("639884963")).toBe(false); // Last digit changed
			expect(isValidRenavam("12345678901")).toBe(false);
		});

		test("when it has mixed characters that result in invalid RENAVAM", () => {
			// Mixed characters that sanitize to an invalid RENAVAM (invalid checksum)
			expect(isValidRenavam("12345678901abc")).toBe(false);
			expect(isValidRenavam("639884963xyz")).toBe(false); // Invalid checksum
		});
	});

	describe("should return true", () => {
		test("when is a RENAVAM valid with 9 digits (old format)", () => {
			expect(isValidRenavam("639884962")).toBe(true);
		});

		test("when is a RENAVAM valid with 11 digits (new format)", () => {
			expect(isValidRenavam("00639884962")).toBe(true);
		});

		test("when is a RENAVAM valid as number", () => {
			expect(isValidRenavam(639884962)).toBe(true);
		});

		test("when is a RENAVAM with invalid length", () => {
			expect(isValidRenavam("12345678")).toBe(false); // 8 digits - too short
			expect(isValidRenavam("1234567890")).toBe(false); // 10 digits - invalid length
			expect(isValidRenavam("123456789012")).toBe(false); // 12 digits - too long
		});

		test("when is a RENAVAM valid with various formats", () => {
			// Test with known valid RENAVAMs
			expect(isValidRenavam("639884962")).toBe(true);
			expect(isValidRenavam("00639884962")).toBe(true);
		});

		test("when is a RENAVAM valid with mixed characters that sanitize correctly", () => {
			// Mixed characters that sanitize to a valid RENAVAM
			expect(isValidRenavam("639884962abc")).toBe(true);
		});
	});
});
