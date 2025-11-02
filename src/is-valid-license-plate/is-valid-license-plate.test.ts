import { describe, expect, it } from "vitest";
import { isValidLicensePlate } from "./is-valid-license-plate";

describe("isValidLicensePlate", () => {
	describe("should return false", () => {
		it("when it is an empty string", () => {
			expect(isValidLicensePlate("")).toBe(false);
		});

		it("when it is null", () => {
			expect(isValidLicensePlate(null as any)).toBe(false);
		});

		it("when it is undefined", () => {
			expect(isValidLicensePlate(undefined as any)).toBe(false);
		});

		it("when it is a boolean", () => {
			expect(isValidLicensePlate(true as any)).toBe(false);
			expect(isValidLicensePlate(false as any)).toBe(false);
		});

		it("when it is an object", () => {
			expect(isValidLicensePlate({} as any)).toBe(false);
		});

		it("when it is an array", () => {
			expect(isValidLicensePlate([] as any)).toBe(false);
		});

		it("when brazilian license plate format is invalid", () => {
			expect(isValidLicensePlate("abc12345")).toBe(false);
			expect(isValidLicensePlate("5abc1234")).toBe(false);
			expect(isValidLicensePlate("abcd1234")).toBe(false);
			expect(isValidLicensePlate("abcd234")).toBe(false);
		});
	});

	describe("should return true", () => {
		it("when brazilian license plate format is valid", () => {
			expect(isValidLicensePlate("abc1234")).toBe(true);
			expect(isValidLicensePlate("ABC1234")).toBe(true);
			expect(isValidLicensePlate("abc-1234")).toBe(true);
			expect(isValidLicensePlate("ABC-1234")).toBe(true);
		});

		it("when mercosul license plate format is valid", () => {
			expect(isValidLicensePlate("abc1d23")).toBe(true);
			expect(isValidLicensePlate("ABC1D23")).toBe(true);
		});
	});
});

