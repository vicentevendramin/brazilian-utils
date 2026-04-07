import { describe, expect, test } from "../_internals/test/runtime";
import { isValidPassport } from "./is-valid-passport";

describe("isValidPassport", () => {
	describe("should return false", () => {
		test("when passport is not a string", () => {
			expect(isValidPassport(1 as unknown as string)).toBe(false);
		});

		test("when passport length is different from 8", () => {
			expect(isValidPassport("1")).toBe(false);
		});

		test("when passport does not match the expected format", () => {
			expect(isValidPassport("1112223334-")).toBe(false);
		});
	});

	describe("should return true", () => {
		test("when passport is valid", () => {
			expect(isValidPassport("AA111111")).toBe(true);
			expect(isValidPassport("CL125167")).toBe(true);
		});
	});
});
