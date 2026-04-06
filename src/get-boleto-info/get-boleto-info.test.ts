import { describe, expect, test } from "vite-plus/test";

import { getBoletoInfo } from "./get-boleto-info";

describe("getBoletoInfo", () => {
	describe("should return undefined", () => {
		test("when boleto is empty string", () => {
			expect(getBoletoInfo("")).toBeUndefined();
		});

		test("when boleto is invalid", () => {
			expect(getBoletoInfo("00190000090114971860168524522114775860000102656")).toBeUndefined();
		});
	});

	describe("should return boleto info", () => {
		test("when boleto is valid without mask", () => {
			expect(getBoletoInfo("00190000090114971860168524522114675860000102656")).toStrictEqual({
				amount: 102656,
				expirationDate: new Date(2018, 6, 15),
				bankCode: "001",
			});
		});

		test("when boleto is valid with mask", () => {
			expect(getBoletoInfo("0019000009 01149.718601 68524.522114 6 75860000102656")).toStrictEqual({
				amount: 102656,
				expirationDate: new Date(2018, 6, 15),
				bankCode: "001",
			});
		});
	});
});
