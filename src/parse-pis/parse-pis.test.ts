import { describe, expect, it } from "vitest";
import { parsePis } from "./parse-pis";

describe("parsePis", () => {
	it("should remove PIS mask characters", () => {
		expect(parsePis("123.45678.90-1")).toBe("12345678901");
	});

	it("should remove non numeric characters", () => {
		expect(parsePis("123#Error*&@#45678#Char!90-1")).toBe("12345678901");
	});
});
