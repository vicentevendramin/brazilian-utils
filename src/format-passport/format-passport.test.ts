import { beforeEach, describe, expect, test, vi } from "vitest";
import { isValidPassport } from "../is-valid-passport/is-valid-passport";
import { formatPassport } from "./format-passport";

describe("formatPassport", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	describe("should return the formatted passport", () => {
		test("when passport is valid", () => {
			vi.spyOn({ isValidPassport }, "isValidPassport").mockReturnValue(true);
			expect(formatPassport("yz 987654")).toBe("YZ987654");
		});
	});

	describe("should return null", () => {
		test("when passport is not valid", () => {
			vi.spyOn({ isValidPassport }, "isValidPassport").mockReturnValue(false);
			expect(formatPassport("acd12736")).toBeNull();
		});
	});
});
