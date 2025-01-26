import { describe, expect, it } from "vitest";
import { formatCnpj, LENGTH } from "./format-cnpj";

describe("format", () => {
	it("should format cnpj with mask", () => {
		expect(formatCnpj("")).toBe("");
		expect(formatCnpj("4")).toBe("4");
		expect(formatCnpj("46")).toBe("46");
		expect(formatCnpj("468")).toBe("46.8");
		expect(formatCnpj("4684")).toBe("46.84");
		expect(formatCnpj("46843")).toBe("46.843");
		expect(formatCnpj("468434")).toBe("46.843.4");
		expect(formatCnpj("4684348")).toBe("46.843.48");
		expect(formatCnpj("46843485")).toBe("46.843.485");
		expect(formatCnpj("468434850")).toBe("46.843.485/0");
		expect(formatCnpj("4684348500")).toBe("46.843.485/00");
		expect(formatCnpj("46843485000")).toBe("46.843.485/000");
		expect(formatCnpj("468434850001")).toBe("46.843.485/0001");
		expect(formatCnpj("4684348500018")).toBe("46.843.485/0001-8");
		expect(formatCnpj("46843485000186")).toBe("46.843.485/0001-86");
	});

	it("should format number cnpj with mask", () => {
		expect(formatCnpj(4)).toBe("4");
		expect(formatCnpj(46)).toBe("46");
		expect(formatCnpj(468)).toBe("46.8");
		expect(formatCnpj(4684)).toBe("46.84");
		expect(formatCnpj(46843)).toBe("46.843");
		expect(formatCnpj(468434)).toBe("46.843.4");
		expect(formatCnpj(4684348)).toBe("46.843.48");
		expect(formatCnpj(46843485)).toBe("46.843.485");
		expect(formatCnpj(468434850)).toBe("46.843.485/0");
		expect(formatCnpj(4684348500)).toBe("46.843.485/00");
		expect(formatCnpj(46843485000)).toBe("46.843.485/000");
		expect(formatCnpj(468434850001)).toBe("46.843.485/0001");
		expect(formatCnpj(4684348500018)).toBe("46.843.485/0001-8");
		expect(formatCnpj(46843485000186)).toBe("46.843.485/0001-86");
	});

	it("should format cnpj with mask filling zeroes", () => {
		expect(formatCnpj("", { pad: true })).toBe("00.000.000/0000-00");
		expect(formatCnpj("4", { pad: true })).toBe("00.000.000/0000-04");
		expect(formatCnpj("46", { pad: true })).toBe("00.000.000/0000-46");
		expect(formatCnpj("468", { pad: true })).toBe("00.000.000/0004-68");
		expect(formatCnpj("4684", { pad: true })).toBe("00.000.000/0046-84");
		expect(formatCnpj("46843", { pad: true })).toBe("00.000.000/0468-43");
		expect(formatCnpj("468434", { pad: true })).toBe("00.000.000/4684-34");
		expect(formatCnpj("4684348", { pad: true })).toBe("00.000.004/6843-48");
		expect(formatCnpj("46843485", { pad: true })).toBe("00.000.046/8434-85");
		expect(formatCnpj("468434850", { pad: true })).toBe("00.000.468/4348-50");
		expect(formatCnpj("4684348500", { pad: true })).toBe("00.004.684/3485-00");
		expect(formatCnpj("46843485000", { pad: true })).toBe("00.046.843/4850-00");
		expect(formatCnpj("468434850001", { pad: true })).toBe(
			"00.468.434/8500-01",
		);
		expect(formatCnpj("4684348500018", { pad: true })).toBe(
			"04.684.348/5000-18",
		);
		expect(formatCnpj("46843485000186", { pad: true })).toBe(
			"46.843.485/0001-86",
		);
	});

	it("should format number cnpj with mask filling zeroes", () => {
		expect(formatCnpj(4, { pad: true })).toBe("00.000.000/0000-04");
		expect(formatCnpj(46, { pad: true })).toBe("00.000.000/0000-46");
		expect(formatCnpj(468, { pad: true })).toBe("00.000.000/0004-68");
		expect(formatCnpj(4684, { pad: true })).toBe("00.000.000/0046-84");
		expect(formatCnpj(46843, { pad: true })).toBe("00.000.000/0468-43");
		expect(formatCnpj(468434, { pad: true })).toBe("00.000.000/4684-34");
		expect(formatCnpj(4684348, { pad: true })).toBe("00.000.004/6843-48");
		expect(formatCnpj(46843485, { pad: true })).toBe("00.000.046/8434-85");
		expect(formatCnpj(468434850, { pad: true })).toBe("00.000.468/4348-50");
		expect(formatCnpj(4684348500, { pad: true })).toBe("00.004.684/3485-00");
		expect(formatCnpj(46843485000, { pad: true })).toBe("00.046.843/4850-00");
		expect(formatCnpj(468434850001, { pad: true })).toBe("00.468.434/8500-01");
		expect(formatCnpj(4684348500018, { pad: true })).toBe("04.684.348/5000-18");
		expect(formatCnpj(46843485000186, { pad: true })).toBe(
			"46.843.485/0001-86",
		);
	});

	it(`should NOT add digits after the CNPJ length (${LENGTH})`, () => {
		expect(formatCnpj("468434850001860000000000")).toBe("46.843.485/0001-86");
	});

	it("should remove all non numeric characters", () => {
		expect(formatCnpj("46.?ABC843.485/0001-86abc")).toBe("46.843.485/0001-86");
	});

	it("should format cnpj alphanumeric with mask for version 2", () => {
		expect(formatCnpj("", { version: 2 })).toBe("");
		expect(formatCnpj("Q", { version: 2 })).toBe("Q");
		expect(formatCnpj("Q0", { version: 2 })).toBe("Q0");
		expect(formatCnpj("Q0S", { version: 2 })).toBe("Q0.S");
		expect(formatCnpj("Q0SL", { version: 2 })).toBe("Q0.SL");
		expect(formatCnpj("Q0SLF", { version: 2 })).toBe("Q0.SLF");
		expect(formatCnpj("Q0SLFM", { version: 2 })).toBe("Q0.SLF.M");
		expect(formatCnpj("Q0SLFMB", { version: 2 })).toBe("Q0.SLF.MB");
		expect(formatCnpj("Q0SLFMBD", { version: 2 })).toBe("Q0.SLF.MBD");
		expect(formatCnpj("Q0SLFMBD7", { version: 2 })).toBe("Q0.SLF.MBD/7");
		expect(formatCnpj("Q0SLFMBD7V", { version: 2 })).toBe("Q0.SLF.MBD/7V");
		expect(formatCnpj("Q0SLFMBD7VX", { version: 2 })).toBe("Q0.SLF.MBD/7VX");
		expect(formatCnpj("Q0SLFMBD7VX4", { version: 2 })).toBe("Q0.SLF.MBD/7VX4");
		expect(formatCnpj("Q0SLFMBD7VX43", { version: 2 })).toBe(
			"Q0.SLF.MBD/7VX4-3",
		);
		expect(formatCnpj("q0SLFMBD7VX439", { version: 2 })).toBe(
			"Q0.SLF.MBD/7VX4-39",
		);
	});

	it("should remove non-alphanumeric characters for version 2", () => {
		expect(formatCnpj("46.?ABC843.485/0001-86abc", { version: 2 })).toBe(
			"46.ABC.843/4850-00",
		);
	});
});
