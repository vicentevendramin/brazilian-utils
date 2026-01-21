import { describe, expect, test } from "vitest";

import * as brazilianUtils from ".";

const PUBLIC = [
	"formatCep",
	"formatCnpj",
	"formatCpf",
	"isValidRenavam",
	"formatCurrency",
	"parseCurrency",
	"formatPis",
	"isValidPis",
	"getStates",
	"getCities",
	"isValidBankAccount",
	"formatBoleto",
	"capitalize",
	"formatCep",
	"formatCnpj",
	"formatProcessoJuridico",
	"formatCpf",
	"formatCurrency",
	"formatPhone",
	"parseCurrency",
	"formatPis",
	"getStates",
	"getCities",
	"getHolidays",
	"getAddressInfoByCep",
	"GetAddressInfoByCepError",
	"GetAddressInfoByCepNotFoundError",
	"GetAddressInfoByCepServiceError",
	"GetAddressInfoByCepValidationError",
	"isValidBoleto",
	"generateBoleto",
	"getBoletoInfo",
	"isValidCep",
	"isValidEmail",
	"isValidProcessoJuridico",
	"isValidPhone",
	"isValidMobilePhone",
	"isValidLandlinePhone",
	"isValidLicensePlate",
	"isValidCnpj",
	"generateCnpj",
	"isValidCpf",
	"generateCpf",
	"isValidIe",
	// Deprecated exports (will be removed in v3.0.0)
	"formatCEP",
	"formatCNPJ",
	"formatCPF",
	"isValidCEP",
	"isValidCNPJ",
	"isValidCPF",
	"isValidPIS",
	"isValidIE",
	"generateCNPJ",
	"generateCPF",
];

describe("Public API", () => {
	for (const util of Object.keys(brazilianUtils)) {
		test(`${util} is available on the public API`, () => {
			expect(PUBLIC).toContain(util);
		});
	}
});
