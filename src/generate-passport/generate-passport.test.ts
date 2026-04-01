import { describe, expect, test } from "vitest";
import { isValidPassport } from "../is-valid-passport/is-valid-passport";
import { generatePassport } from "./generate-passport";

describe("generatePassport", () => {
	test("should always generate a valid passport", () => {
		for (let i = 0; i < 10_000; i++) {
			expect(isValidPassport(generatePassport())).toBe(true);
		}
	});
});
