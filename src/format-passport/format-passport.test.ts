import { describe, expect, test } from "../_internals/test/runtime";
import { formatPassport } from "./format-passport";

describe("formatPassport", () => {
	describe("should return the formatted passport", () => {
		test("when passport is valid", () => {
			expect(formatPassport("AB123456")).toBe("AB123456");
		});

		test("when passport has lowercase letters", () => {
			expect(formatPassport("acd12736")).toBe("ACD12736");
		});
	});
});
