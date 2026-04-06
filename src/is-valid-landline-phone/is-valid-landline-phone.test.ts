import { describe, expect, test } from "vite-plus/test";

import { isValidLandlinePhone } from "./is-valid-landline-phone";

describe("isValidLandlinePhone", () => {
	describe("should return false", () => {
		test("when it is an empty string", () => {
			expect(isValidLandlinePhone("")).toBe(false);
		});

		test("when it is a mobile phone", () => {
			expect(isValidLandlinePhone("11987654321")).toBe(false);
		});

		test("when length is invalid", () => {
			expect(isValidLandlinePhone("113000000")).toBe(false);
		});
	});

	describe("should return true", () => {
		test("when is a valid landline phone", () => {
			expect(isValidLandlinePhone("(11) 3000-0000")).toBe(true);
			expect(isValidLandlinePhone("1130000000")).toBe(true);
		});
	});
});
