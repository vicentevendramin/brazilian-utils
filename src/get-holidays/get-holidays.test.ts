import { describe, expect, test } from "../_internals/test/runtime";
import { getHolidays } from "./get-holidays";

describe("getHolidays", () => {
	test("should return fixed holidays for the given year", () => {
		const year = 2024;
		const holidays = getHolidays(year);

		const fixedHolidays = [
			{ name: "Ano novo", date: new Date(year, 0, 1) },
			{ name: "Tiradentes", date: new Date(year, 3, 21) },
			{ name: "Dia do trabalhador", date: new Date(year, 4, 1) },
			{ name: "Independência do Brasil", date: new Date(year, 8, 7) },
			{ name: "Nossa Senhora Aparecida", date: new Date(year, 9, 12) },
			{ name: "Finados", date: new Date(year, 10, 2) },
			{ name: "Proclamação da República", date: new Date(year, 10, 15) },
			{ name: "Dia da Consciência Negra", date: new Date(year, 10, 20) },
			{ name: "Natal", date: new Date(year, 11, 25) },
		];

		fixedHolidays.forEach(({ name, date }) => {
			expect(holidays).toContainEqual({ name, date });
		});
	});

	test("should calculate Easter-related holidays correctly", () => {
		const year = 2024;
		const holidays = getHolidays(year);

		const easterDate = new Date(2024, 2, 31); // Easter Sunday 2024
		const expectedHolidays = [
			{ name: "Páscoa", date: easterDate },
			{ name: "Carnaval (terça-feira)", date: new Date(2024, 1, 13) },
			{ name: "Sexta-feira Santa", date: new Date(2024, 2, 29) },
			{ name: "Corpus Christi", date: new Date(2024, 5, 9) },
		];

		expectedHolidays.forEach(({ name, date }) => {
			expect(holidays).toContainEqual({ name, date });
		});
	});

	test("should return the correct number of holidays", () => {
		const year = 2024;
		const holidays = getHolidays(year);

		expect(holidays.length).toBe(13); // 9 fixed + 4 Easter-related holidays
	});

	test("should work for leap years", () => {
		const year = 2020;
		const holidays = getHolidays(year);

		expect(holidays).toContainEqual({
			name: "Ano novo",
			date: new Date(year, 0, 1),
		});

		const easterDate = new Date(2020, 3, 12); // Easter Sunday 2020
		expect(holidays).toContainEqual({ name: "Páscoa", date: easterDate });
	});

	test("should accept year as number parameter", () => {
		const holidays = getHolidays(2024);
		expect(holidays.length).toBeGreaterThan(0);
		expect(holidays.every((h) => h.date.getFullYear() === 2024)).toBe(true);
	});

	test("should accept options object with year", () => {
		const holidays = getHolidays({ year: 2024 });
		expect(holidays.length).toBeGreaterThan(0);
		expect(holidays.every((h) => h.date.getFullYear() === 2024)).toBe(true);
	});

	test("should include state-specific holidays when stateCode is provided", () => {
		const holidays = getHolidays({ year: 2024, stateCode: "SP" });

		// Should include national holidays
		expect(holidays).toContainEqual({
			name: "Ano novo",
			date: new Date(2024, 0, 1),
		});

		// Should include state holiday
		expect(holidays).toContainEqual({
			name: "Revolução Constitucionalista",
			date: new Date(2024, 6, 9),
		});

		// Should have more holidays than just national ones
		expect(holidays.length).toBeGreaterThan(13);
	});

	test("should include multiple state holidays for states with multiple holidays", () => {
		const holidays = getHolidays({ year: 2024, stateCode: "RJ" });

		// Should include São Sebastião
		expect(holidays).toContainEqual({
			name: "São Sebastião",
			date: new Date(2024, 0, 20),
		});

		// Should include São Jorge
		expect(holidays).toContainEqual({
			name: "São Jorge",
			date: new Date(2024, 3, 23),
		});

		// Should include Consciência Negra (state-specific)
		expect(holidays).toContainEqual({
			name: "Consciência Negra",
			date: new Date(2024, 10, 20),
		});
	});

	test("should return only national holidays when stateCode is not provided", () => {
		const nationalHolidays = getHolidays(2024);
		const spHolidays = getHolidays({ year: 2024, stateCode: "SP" });

		// SP holidays should include all national holidays
		nationalHolidays.forEach((nationalHoliday) => {
			expect(spHolidays).toContainEqual(nationalHoliday);
		});

		// SP holidays should have more than national holidays
		expect(spHolidays.length).toBeGreaterThan(nationalHolidays.length);
	});

	test("should work with different state codes", () => {
		const rsHolidays = getHolidays({ year: 2024, stateCode: "RS" });
		const mgHolidays = getHolidays({ year: 2024, stateCode: "MG" });

		// RS should have Revolução Farroupilha
		expect(rsHolidays.some((h) => h.name === "Revolução Farroupilha")).toBe(true);

		// MG should have Aniversário de Minas Gerais
		expect(mgHolidays.some((h) => h.name === "Aniversário de Minas Gerais")).toBe(true);
	});
});
