import { describe, expect, test } from "vitest";

import * as brazilianUtils from ".";

const PUBLIC = [
	"describeNumber",
	"formatCep",
	"formatCnpj",
	"formatCpf",
	"formatCurrency",
	"parseCurrency",
	"formatPis",
	"isValidPis",
	"getStates",
	"getCities",
	"formatBoleto",
	"capitalize",
	"formatCep",
	"formatCnpj",
	"formatProcessoJuridico",
	"formatCpf",
	"formatCurrency",
	"parseCurrency",
	"formatPis",
	"getStates",
	"getCities",
	"isValidBoleto",
	"generateBoleto",
	"isValidCep",
	"isValidEmail",
	"isValidProcessoJuridico",
	"isValidPhone",
	"isValidMobilePhone",
	"isValidLandlinePhone",
	"isValidCnpj",
	"generateCnpj",
	"isValidCpf",
	"generateCpf",
	"isValidIe",
];

describe("Public API", () => {
	for (const util of Object.keys(brazilianUtils)) {
		test(`${util} is available on the public API`, () => {
			expect(PUBLIC).toContain(util);
		});
	}
});
