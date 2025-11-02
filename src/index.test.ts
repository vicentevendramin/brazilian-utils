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
];

describe("Public API", () => {
	for (const util of Object.keys(brazilianUtils)) {
		test(`${util} is available on the public API`, () => {
			expect(PUBLIC).toContain(util);
		});
	}
});
