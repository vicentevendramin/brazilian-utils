import { describe, expect, test } from "vitest";

import * as brazilianUtils from ".";

const PUBLIC = [
	"describeNumber",
	"formatCep",
	"formatCnpj",
	"formatCpf",
	"formatCurrency",
	"formatPis",
	"formatProcessoJuridico",
];

describe("Public API", () => {
	for (const util of Object.keys(brazilianUtils)) {
		test(`${util} is available on the public API`, () => {
			expect(PUBLIC).toContain(util);
		});
	}
});
