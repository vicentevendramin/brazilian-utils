import { describe, expect, it } from "vitest";
import { describeNumber } from "./describe-number";

describe("describeNumber", () => {
	describe("normal style", () => {
		it("should convert numbers from 0 to 9", () => {
			const expected = [
				"zero",
				"um",
				"dois",
				"três",
				"quatro",
				"cinco",
				"seis",
				"sete",
				"oito",
				"nove",
			];
			for (let i = 0; i <= 9; i++) {
				expect(describeNumber(i)).toBe(expected[i]);
			}
		});

		it("should convert numbers from 10 to 19", () => {
			const expected = [
				"dez",
				"onze",
				"doze",
				"treze",
				"quatorze",
				"quinze",
				"dezesseis",
				"dezessete",
				"dezoito",
				"dezenove",
			];
			for (let i = 10; i <= 19; i++) {
				expect(describeNumber(i)).toBe(expected[i - 10]);
			}
		});

		it("should convert tens", () => {
			const expected = [
				"dez",
				"vinte",
				"trinta",
				"quarenta",
				"cinquenta",
				"sessenta",
				"setenta",
				"oitenta",
				"noventa",
			];
			for (let i = 1; i <= 9; i++) {
				expect(describeNumber(i * 10)).toBe(expected[i - 1]);
			}
		});

		it("should convert hundreds", () => {
			const expected = [
				"cem",
				"duzentos",
				"trezentos",
				"quatrocentos",
				"quinhentos",
				"seiscentos",
				"setecentos",
				"oitocentos",
				"novecentos",
			];
			for (let i = 1; i <= 9; i++) {
				expect(describeNumber(i * 100)).toBe(expected[i - 1]);
			}
		});

		it("should convert thousands", () => {
			expect(describeNumber(1000)).toBe("um mil");
			expect(describeNumber(2000)).toBe("dois mil");
		});

		it("should convert tens of thousands", () => {
			expect(describeNumber(10000)).toBe("dez mil");
			expect(describeNumber(30000)).toBe("trinta mil");
		});

		it("should convert hundreds of thousands", () => {
			const expected = [
				"cem",
				"duzentos",
				"trezentos",
				"quatrocentos",
				"quinhentos",
				"seiscentos",
				"setecentos",
				"oitocentos",
				"novecentos",
			];
			for (let i = 0; i < 9; i++) {
				expect(describeNumber((i + 1) * 100000)).toBe(`${expected[i]} mil`);
			}
		});

		it("should convert negative numbers", () => {
			expect(describeNumber(-1)).toBe("menos um");
			expect(describeNumber(-200)).toBe("menos duzentos");
			expect(describeNumber(-0.5)).toBe("menos zero vírgula cinco décimos");
		});

		it("should convert decimal numbers", () => {
			expect(describeNumber(10.5)).toBe("dez vírgula cinco décimos");
			expect(describeNumber(10.5)).toBe("dez vírgula cinco décimos");
		});

		it("should convert large numbers", () => {
			expect(describeNumber(128)).toBe("cento e vinte e oito");
			expect(describeNumber(9_876_543_210)).toBe(
				"nove bilhões oitocentos e setenta e seis milhões quinhentos e quarenta e três mil duzentos e dez",
			);
		});

		it("should handle string inputs", () => {
			expect(describeNumber("128")).toBe("cento e vinte e oito");
			expect(describeNumber("10.5")).toBe("dez vírgula cinco décimos");
		});

		it("should handle very large numbers as strings", () => {
			expect(
				describeNumber(
					"999999999999999999999999999999999999999999999.99999999999999999999",
				),
			).toBe(
				"novecentos e noventa e nove tredecilhões novecentos e noventa e nove duodecilhões novecentos e noventa e nove undecilhões novecentos e noventa e nove decilhões novecentos e noventa e nove nonilhões novecentos e noventa e nove octilhões novecentos e noventa e nove septilhões novecentos e noventa e nove sextilhões novecentos e noventa e nove quintilhões novecentos e noventa e nove quatrilhões novecentos e noventa e nove trilhões novecentos e noventa e nove bilhões novecentos e noventa e nove milhões novecentos e noventa e nove mil novecentos e noventa e nove vírgula noventa e nove quintilhões novecentos e noventa e nove quatrilhões novecentos e noventa e nove trilhões novecentos e noventa e nove bilhões novecentos e noventa e nove milhões novecentos e noventa e nove mil novecentos e noventa e nove centésimos de quintilionésimo",
			);
		});
	});

	describe("currency style", () => {
		it("should convert integer amounts", () => {
			expect(describeNumber(128, { style: "currency" })).toBe(
				"cento e vinte e oito reais",
			);
			expect(describeNumber(1, { style: "currency" })).toBe("um real");
			expect(describeNumber(0, { style: "currency" })).toBe("");
		});

		it("should convert decimal amounts", () => {
			expect(describeNumber(10.5, { style: "currency" })).toBe(
				"dez reais e cinquenta centavos",
			);
			expect(describeNumber(10.5, { style: "currency" })).toBe(
				"dez reais e cinquenta centavos",
			);
			expect(describeNumber(0.01, { style: "currency" })).toBe("um centavo");
			expect(describeNumber(0.1, { style: "currency" })).toBe("dez centavos");
		});

		it("should convert negative amounts", () => {
			expect(describeNumber(-87_654_321, { style: "currency" })).toBe(
				"menos oitenta e sete milhões seiscentos e cinquenta e quatro mil trezentos e vinte e um reais",
			);
		});

		it("should handle large amounts", () => {
			expect(describeNumber("1000090000.00", { style: "currency" })).toBe(
				"um bilhão e noventa mil reais",
			);
		});

		it("should handle small decimal amounts", () => {
			expect(describeNumber(0.5, { style: "currency" })).toBe(
				"cinquenta centavos",
			);
			expect(describeNumber(0.25, { style: "currency" })).toBe(
				"vinte e cinco centavos",
			);
			expect(describeNumber(0.99, { style: "currency" })).toBe(
				"noventa e nove centavos",
			);
			expect(describeNumber(0.02, { style: "currency" })).toBe("dois centavos");
		});

		it("should handle mixed integer and decimal amounts", () => {
			expect(describeNumber(1.01, { style: "currency" })).toBe(
				"um real e um centavo",
			);
			expect(describeNumber(100.99, { style: "currency" })).toBe(
				"cem reais e noventa e nove centavos",
			);
			expect(describeNumber(999.5, { style: "currency" })).toBe(
				"novecentos e noventa e nove reais e cinquenta centavos",
			);
			expect(describeNumber(1_000.01, { style: "currency" })).toBe(
				"um mil reais e um centavo",
			);
		});

		it("should handle amounts with two decimal places as strings", () => {
			expect(describeNumber("10.50", { style: "currency" })).toBe(
				"dez reais e cinquenta centavos",
			);
			expect(describeNumber("0.75", { style: "currency" })).toBe(
				"setenta e cinco centavos",
			);
			expect(describeNumber("1234.56", { style: "currency" })).toBe(
				"um mil duzentos e trinta e quatro reais e cinquenta e seis centavos",
			);
		});

		it("should handle amounts with more than two decimal places", () => {
			expect(describeNumber(10.123, { style: "currency" })).toBe(
				"dez reais e doze centavos",
			);
			expect(describeNumber(100.999, { style: "currency" })).toBe(
				"cem reais e noventa e nove centavos",
			);
		});

		it("should handle very large amounts", () => {
			expect(describeNumber(1_000_000, { style: "currency" })).toBe(
				"um milhão de reais",
			);
			expect(describeNumber(1_000_000_000, { style: "currency" })).toBe(
				"um bilhão de reais",
			);
			expect(describeNumber(1_000_000_000_000, { style: "currency" })).toBe(
				"um trilhão de reais",
			);
			expect(describeNumber(987_654_321.12, { style: "currency" })).toBe(
				"novecentos e oitenta e sete milhões seiscentos e cinquenta e quatro mil trezentos e vinte e um reais e doze centavos",
			);
		});

		it("should handle negative currency amounts", () => {
			expect(describeNumber(-10.5, { style: "currency" })).toBe(
				"menos dez reais e cinquenta centavos",
			);
			expect(describeNumber(-0.01, { style: "currency" })).toBe(
				"menos um centavo",
			);
			expect(describeNumber(-100_000.99, { style: "currency" })).toBe(
				"menos cem mil reais e noventa e nove centavos",
			);
		});

		it("should handle zero and edge cases", () => {
			expect(describeNumber(0, { style: "currency" })).toBe("");
			expect(describeNumber(0.0, { style: "currency" })).toBe("");
			expect(describeNumber("0", { style: "currency" })).toBe("");
			expect(describeNumber("0.00", { style: "currency" })).toBe("");
		});
	});

	describe("percentage style", () => {
		it("should convert integer percentages", () => {
			expect(describeNumber(128, { style: "percentage" })).toBe(
				"cento e vinte e oito por cento",
			);
		});

		it("should convert decimal percentages", () => {
			expect(describeNumber(10.5, { style: "percentage" })).toBe(
				"dez vírgula cinco décimos por cento",
			);
			expect(describeNumber(50.05, { style: "percentage" })).toBe(
				"cinquenta vírgula cinco centésimos por cento",
			);
			expect(describeNumber(3.01, { style: "percentage" })).toBe(
				"três vírgula um centésimo por cento",
			);
			expect(describeNumber(1.049, { style: "percentage" })).toBe(
				"um vírgula quarenta e nove milésimos por cento",
			);
		});

		it("should convert large percentages", () => {
			expect(describeNumber(123_456.7891, { style: "percentage" })).toBe(
				"cento e vinte e três mil quatrocentos e cinquenta e seis vírgula sete mil oitocentos e noventa e um décimos de milésimo por cento",
			);
		});

		it("should handle common percentage values", () => {
			expect(describeNumber(0, { style: "percentage" })).toBe("zero por cento");
			expect(describeNumber(1, { style: "percentage" })).toBe("um por cento");
			expect(describeNumber(10, { style: "percentage" })).toBe("dez por cento");
			expect(describeNumber(25, { style: "percentage" })).toBe(
				"vinte e cinco por cento",
			);
			expect(describeNumber(50, { style: "percentage" })).toBe(
				"cinquenta por cento",
			);
			expect(describeNumber(75, { style: "percentage" })).toBe(
				"setenta e cinco por cento",
			);
			expect(describeNumber(100, { style: "percentage" })).toBe(
				"cem por cento",
			);
		});

		it("should handle decimal percentages with various precisions", () => {
			expect(describeNumber(0.1, { style: "percentage" })).toBe(
				"zero vírgula um décimo por cento",
			);
			expect(describeNumber(0.5, { style: "percentage" })).toBe(
				"zero vírgula cinco décimos por cento",
			);
			expect(describeNumber(1.5, { style: "percentage" })).toBe(
				"um vírgula cinco décimos por cento",
			);
			expect(describeNumber(12.34, { style: "percentage" })).toBe(
				"doze vírgula trinta e quatro centésimos por cento",
			);
			expect(describeNumber(99.99, { style: "percentage" })).toBe(
				"noventa e nove vírgula noventa e nove centésimos por cento",
			);
		});

		it("should handle percentages above 100", () => {
			expect(describeNumber(101, { style: "percentage" })).toBe(
				"cento e um por cento",
			);
			expect(describeNumber(150, { style: "percentage" })).toBe(
				"cento e cinquenta por cento",
			);
			expect(describeNumber(200, { style: "percentage" })).toBe(
				"duzentos por cento",
			);
			expect(describeNumber(250.5, { style: "percentage" })).toBe(
				"duzentos e cinquenta vírgula cinco décimos por cento",
			);
			expect(describeNumber(1000, { style: "percentage" })).toBe(
				"um mil por cento",
			);
		});

		it("should handle percentage strings", () => {
			expect(describeNumber("50", { style: "percentage" })).toBe(
				"cinquenta por cento",
			);
			expect(describeNumber("12.5", { style: "percentage" })).toBe(
				"doze vírgula cinco décimos por cento",
			);
			expect(describeNumber("0.01", { style: "percentage" })).toBe(
				"zero vírgula um centésimo por cento",
			);
		});

		it("should handle negative percentages", () => {
			expect(describeNumber(-10, { style: "percentage" })).toBe(
				"menos dez por cento",
			);
			expect(describeNumber(-25.5, { style: "percentage" })).toBe(
				"menos vinte e cinco vírgula cinco décimos por cento",
			);
			expect(describeNumber(-0.1, { style: "percentage" })).toBe(
				"menos zero vírgula um décimo por cento",
			);
		});

		it("should handle very small percentage values", () => {
			expect(describeNumber(0.01, { style: "percentage" })).toBe(
				"zero vírgula um centésimo por cento",
			);
			expect(describeNumber(0.001, { style: "percentage" })).toBe(
				"zero vírgula um milésimo por cento",
			);
			expect(describeNumber(0.0001, { style: "percentage" })).toBe(
				"zero vírgula um décimo de milésimo por cento",
			);
		});

		it("should handle very large percentage values", () => {
			expect(describeNumber(1_000_000, { style: "percentage" })).toBe(
				"um milhão por cento",
			);
			expect(describeNumber(10_000_000, { style: "percentage" })).toBe(
				"dez milhões por cento",
			);
			expect(describeNumber(999_999_999.99, { style: "percentage" })).toBe(
				"novecentos e noventa e nove milhões novecentos e noventa e nove mil novecentos e noventa e nove vírgula noventa e nove centésimos por cento",
			);
		});

		it("should handle percentages with high decimal precision", () => {
			expect(describeNumber(33.333, { style: "percentage" })).toBe(
				"trinta e três vírgula trezentos e trinta e três milésimos por cento",
			);
			expect(describeNumber(66.6666, { style: "percentage" })).toBe(
				"sessenta e seis vírgula seis mil seiscentos e sessenta e seis décimos de milésimo por cento",
			);
		});
	});

	describe("default style", () => {
		it("should default to normal style when no options provided", () => {
			expect(describeNumber(128)).toBe("cento e vinte e oito");
			expect(describeNumber(128, {})).toBe("cento e vinte e oito");
		});
	});

	describe("edge cases and invalid inputs", () => {
		it("should handle NaN", () => {
			expect(describeNumber(NaN)).toBe("zero");
		});

		it("should handle empty and invalid strings", () => {
			expect(describeNumber("")).toBe("zero");
			expect(describeNumber("abc")).toBe("zero");
			expect(describeNumber("invalid")).toBe("zero");
		});

		it("should handle scientific notation", () => {
			expect(describeNumber("1e10")).toBe("dez bilhões");
			expect(describeNumber("1e2")).toBe("cem");
			expect(describeNumber("1.5e3")).toBe("um mil e quinhentos");
		});

		it("should handle strings with leading/trailing dots", () => {
			expect(describeNumber(".5")).toBe("zero vírgula cinco décimos");
			expect(describeNumber("5.")).toBe("cinco");
		});

		it("should handle strings with multiple dots", () => {
			// Multiple dots should be treated as invalid
			expect(describeNumber("1.2.3")).toBe("zero");
		});

		it("should handle null and undefined as zero", () => {
			// biome-ignore lint/suspicious/noExplicitAny: testing invalid inputs
			expect(describeNumber(null as any)).toBe("zero");
			// biome-ignore lint/suspicious/noExplicitAny: testing invalid inputs
			expect(describeNumber(undefined as any)).toBe("zero");
		});

		it("should handle invalid inputs in currency style", () => {
			expect(describeNumber(NaN, { style: "currency" })).toBe("");
			expect(describeNumber("", { style: "currency" })).toBe("");
			expect(describeNumber("abc", { style: "currency" })).toBe("");
		});

		it("should handle Infinity in currency style", () => {
			expect(describeNumber(Infinity, { style: "currency" })).toBe(
				"infinito reais",
			);
			expect(describeNumber(-Infinity, { style: "currency" })).toBe(
				"menos infinito reais",
			);
		});

		it("should handle invalid inputs in percentage style", () => {
			expect(describeNumber(NaN, { style: "percentage" })).toBe(
				"zero por cento",
			);
			expect(describeNumber("", { style: "percentage" })).toBe(
				"zero por cento",
			);
			expect(describeNumber("abc", { style: "percentage" })).toBe(
				"zero por cento",
			);
		});

		it("should handle Infinity in percentage style", () => {
			expect(describeNumber(Infinity, { style: "percentage" })).toBe(
				"infinito por cento",
			);
			expect(describeNumber(-Infinity, { style: "percentage" })).toBe(
				"menos infinito por cento",
			);
		});

		it("should handle strings with whitespace", () => {
			expect(describeNumber("  123  ")).toBe("cento e vinte e três");
			expect(describeNumber("  -45  ")).toBe("menos quarenta e cinco");
		});

		it("should handle very large numbers in scientific notation", () => {
			expect(describeNumber("1e15")).toBe("um quatrilhão");
			expect(describeNumber("1e18")).toBe("um quintilhão");
		});
	});

	const CASES: Record<number, string> = {
		[-1]: "menos um",
		[0]: "zero",
		[1]: "um",
		[2]: "dois",
		[3]: "três",
		[4]: "quatro",
		[5]: "cinco",
		[6]: "seis",
		[7]: "sete",
		[8]: "oito",
		[9]: "nove",
		[10]: "dez",
		[11]: "onze",
		[12]: "doze",
		[13]: "treze",
		[14]: "quatorze",
		[15]: "quinze",
		[16]: "dezesseis",
		[17]: "dezessete",
		[18]: "dezoito",
		[19]: "dezenove",
		[20]: "vinte",
		[21]: "vinte e um",
		[22]: "vinte e dois",
		[23]: "vinte e três",
		[24]: "vinte e quatro",
		[25]: "vinte e cinco",
		[26]: "vinte e seis",
		[27]: "vinte e sete",
		[28]: "vinte e oito",
		[29]: "vinte e nove",
		[30]: "trinta",
		[31]: "trinta e um",
		[32]: "trinta e dois",
		[39]: "trinta e nove",
		[42]: "quarenta e dois",
		[80]: "oitenta",
		[90]: "noventa",
		[99]: "noventa e nove",
		[100]: "cem",
		[101]: "cento e um",
		[111]: "cento e onze",
		[120]: "cento e vinte",
		[121]: "cento e vinte e um",
		[200]: "duzentos",
		[300]: "trezentos",
		[400]: "quatrocentos",
		[500]: "quinhentos",
		[600]: "seiscentos",
		[700]: "setecentos",
		[800]: "oitocentos",
		[900]: "novecentos",
		[909]: "novecentos e nove",
		[919]: "novecentos e dezenove",
		[990]: "novecentos e noventa",
		[999]: "novecentos e noventa e nove",
		[1000]: "um mil",
		[1337]: "um mil trezentos e trinta e sete",
		[2000]: "dois mil",
		[4000]: "quatro mil",
		[5000]: "cinco mil",
		[11000]: "onze mil",
		[21000]: "vinte e um mil",
		[28000]: "vinte e oito mil",
		[31000]: "trinta e um mil",
		[32000]: "trinta e dois mil",
		[39000]: "trinta e nove mil",
		[42000]: "quarenta e dois mil",
		[999000]: "novecentos e noventa e nove mil",
		[999999]: "novecentos e noventa e nove mil novecentos e noventa e nove",
		[1000000]: "um milhão",
		[2000000]: "dois milhões",
		[4000000]: "quatro milhões",
		[5000000]: "cinco milhões",
		[100100100]: "cem milhões cem mil e cem",
		[500500500]: "quinhentos milhões quinhentos mil e quinhentos",
		[500500501]: "quinhentos milhões quinhentos mil quinhentos e um",
		[606606606]:
			"seiscentos e seis milhões seiscentos e seis mil seiscentos e seis",
		[999000000]: "novecentos e noventa e nove milhões",
		[999000999]:
			"novecentos e noventa e nove milhões novecentos e noventa e nove",
		[999999000]:
			"novecentos e noventa e nove milhões novecentos e noventa e nove mil",
		[999999999]:
			"novecentos e noventa e nove milhões novecentos e noventa e nove mil novecentos e noventa e nove",
		[1174315110]:
			"um bilhão cento e setenta e quatro milhões trezentos e quinze mil cento e dez",
		[1174315119]:
			"um bilhão cento e setenta e quatro milhões trezentos e quinze mil cento e dezenove",
		[1234567890]:
			"um bilhão duzentos e trinta e quatro milhões quinhentos e sessenta e sete mil oitocentos e noventa",
		[15174315119]:
			"quinze bilhões cento e setenta e quatro milhões trezentos e quinze mil cento e dezenove",
		[35174315119]:
			"trinta e cinco bilhões cento e setenta e quatro milhões trezentos e quinze mil cento e dezenove",
		[935174315119]:
			"novecentos e trinta e cinco bilhões cento e setenta e quatro milhões trezentos e quinze mil cento e dezenove",
		[1000000000000]: "um trilhão",
		[1935174315119]:
			"um trilhão novecentos e trinta e cinco bilhões cento e setenta e quatro milhões trezentos e quinze mil cento e dezenove",
		[2935174315119]:
			"dois trilhões novecentos e trinta e cinco bilhões cento e setenta e quatro milhões trezentos e quinze mil cento e dezenove",
	};

	describe("additional cases", () => {
		for (const [input, expectedOutput] of Object.entries(CASES)) {
			it(`should describe ${input} as ${expectedOutput}`, () => {
				expect(describeNumber(Number(input))).toBe(expectedOutput);
			});
		}
	});
});
