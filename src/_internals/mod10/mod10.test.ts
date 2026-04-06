import { describe, expect, test } from "vite-plus/test";

import { mod10 } from "./mod10";

describe("mod10", () => {
	test("should calculate correct check digit for first partial", () => {
		expect(mod10("001900000")).toBe(9);
	});

	test("should calculate correct check digit for second partial", () => {
		expect(mod10("0114971860")).toBe(1);
	});

	test("should calculate correct check digit for third partial", () => {
		expect(mod10("6852452211")).toBe(4);
	});

	test("should return 0 when mod is 0", () => {
		expect(mod10("000000000")).toBe(0);
	});
});
