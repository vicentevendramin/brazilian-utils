import { describe, expect, it } from "vitest";
import { parseCnpj } from "./parse-cnpj";

describe("parseCnpj", () => {
	it("should remove CNPJ mask characters", () => {
		expect(parseCnpj("46.843.485/0001-86")).toBe("46843485000186");
	});

	it("should remove non numeric characters", () => {
		expect(parseCnpj("46.?ABC843.485/0001-86abc")).toBe("46843485000186");
	});

	it("should keep alphanumeric characters for version 2", () => {
		expect(parseCnpj("Q0.SLF.MBD/7VX4-39", { version: 2 })).toBe(
			"Q0SLFMBD7VX439",
		);
	});
});
