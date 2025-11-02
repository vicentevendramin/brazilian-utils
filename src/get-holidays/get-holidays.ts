import type { StateCode } from "../_internals/states";

export type Holiday = {
	name: string;
	date: Date;
};

export type GetHolidaysOptions = {
	year: number;
	stateCode?: StateCode;
};

/**
 * Fixed holidays that occur on the same date every year.
 * Month is 1-based (1 = January, 12 = December).
 */
const FIXED_HOLIDAYS = {
	"Ano novo": { day: 1, month: 1 },
	Tiradentes: { day: 21, month: 4 },
	"Dia do trabalhador": { day: 1, month: 5 },
	"Independência do Brasil": { day: 7, month: 9 },
	"Nossa Senhora Aparecida": { day: 12, month: 10 },
	Finados: { day: 2, month: 11 },
	"Proclamação da República": { day: 15, month: 11 },
	"Dia da Consciência Negra": { day: 20, month: 11 },
	Natal: { day: 25, month: 12 },
} as const;

/**
 * State-specific holidays by state code.
 * Month is 1-based (1 = January, 12 = December).
 */
const STATE_HOLIDAYS: Partial<
	Record<StateCode, Array<{ name: string; day: number; month: number }>>
> = {
	AC: [
		{ name: "Dia do Evangélico", day: 23, month: 1 },
		{ name: "Dia Internacional da Mulher", day: 8, month: 3 },
		{ name: "Aniversário do Acre", day: 15, month: 6 },
		{ name: "Dia da Amazônia", day: 5, month: 9 },
		{ name: "Assinatura do Tratado de Petrópolis", day: 17, month: 11 },
	],
	AL: [
		{ name: "São João", day: 24, month: 6 },
		{ name: "São Pedro", day: 29, month: 6 },
		{ name: "Emancipação Política de Alagoas", day: 16, month: 9 },
	],
	AP: [
		{ name: "Dia de São José", day: 19, month: 3 },
		{ name: "Criação do Território Federal do Amapá", day: 13, month: 9 },
	],
	AM: [
		{ name: "Elevação do Amazonas à categoria de Província", day: 5, month: 9 },
		{ name: "Nossa Senhora da Conceição", day: 8, month: 12 },
	],
	BA: [{ name: "Independência da Bahia", day: 2, month: 7 }],
	CE: [
		{ name: "Dia de São José", day: 19, month: 3 },
		{ name: "Abolição da Escravidão no Ceará", day: 25, month: 3 },
	],
	DF: [
		{ name: "Fundação de Brasília", day: 21, month: 4 },
		{ name: "Dia do Evangélico", day: 30, month: 11 },
	],
	ES: [{ name: "Dia do Estado do Espírito Santo", day: 23, month: 5 }],
	GO: [
		{ name: "Dia do Estado de Goiás", day: 5, month: 7 },
		{ name: "Nossa Senhora Sant'Ana", day: 26, month: 7 },
	],
	MA: [{ name: "Adesão do Maranhão à Independência", day: 28, month: 7 }],
	MT: [
		{ name: "Criação do Estado de Mato Grosso", day: 9, month: 5 },
		{ name: "Consciência Negra", day: 20, month: 11 },
	],
	MS: [{ name: "Criação do Estado de Mato Grosso do Sul", day: 11, month: 10 }],
	MG: [{ name: "Aniversário de Minas Gerais", day: 21, month: 7 }],
	PA: [{ name: "Adesão do Pará à Independência", day: 15, month: 8 }],
	PB: [
		{
			name: "Fundação do Estado e Dia de Nossa Senhora das Neves",
			day: 5,
			month: 8,
		},
	],
	PR: [{ name: "Emancipação Política do Paraná", day: 19, month: 12 }],
	PE: [{ name: "Revolução Pernambucana", day: 6, month: 3 }],
	PI: [{ name: "Dia do Piauí", day: 19, month: 10 }],
	RJ: [
		{ name: "São Sebastião", day: 20, month: 1 },
		{ name: "São Jorge", day: 23, month: 4 },
		{ name: "Consciência Negra", day: 20, month: 11 },
	],
	RN: [
		{ name: "Mártires de Cunhaú e Uruaçu", day: 3, month: 10 },
		{ name: "Dia do Rio Grande do Norte", day: 7, month: 9 },
	],
	RS: [{ name: "Revolução Farroupilha", day: 20, month: 9 }],
	RO: [
		{ name: "Criação do Estado de Rondônia", day: 4, month: 1 },
		{ name: "Dia do Evangélico", day: 18, month: 6 },
	],
	RR: [{ name: "Criação do Estado de Roraima", day: 5, month: 10 }],
	SC: [
		{ name: "Criação da Capitania de Santa Catarina", day: 11, month: 8 },
		{ name: "Dia de Santa Catarina de Alexandria", day: 25, month: 11 },
	],
	SP: [{ name: "Revolução Constitucionalista", day: 9, month: 7 }],
	SE: [{ name: "Emancipação Política de Sergipe", day: 8, month: 7 }],
	TO: [
		{
			name: "Padroeira do Estado (Nossa Senhora da Natividade)",
			day: 8,
			month: 9,
		},
		{ name: "Criação do Estado do Tocantins", day: 5, month: 10 },
	],
} as const;

/**
 * Calculates the date of Easter Sunday for a given year using the Computus algorithm.
 *
 * @param {number} year - The year for which to calculate Easter
 * @returns {Date} The date of Easter Sunday
 */
function calculateEaster(year: number): Date {
	const a = year % 19;
	const b = Math.floor(year / 100);
	const c = year % 100;
	const d = Math.floor(b / 4);
	const e = b % 4;
	const f = Math.floor((b + 8) / 25);
	const g = Math.floor((b - f + 1) / 3);
	const h = (19 * a + b - d - g + 15) % 30;
	const i = Math.floor(c / 4);
	const k = c % 4;
	const l = (32 + 2 * e + 2 * i - h - k) % 7;
	const m = Math.floor((a + 11 * h + 22 * l) / 451);

	const month = Math.floor((h + l - 7 * m + 114) / 31) - 1; // 0-based month
	const day = ((h + l - 7 * m + 114) % 31) + 1;

	return new Date(year, month, day);
}

/**
 * Calculates a holiday date based on Easter Sunday with a given offset in days.
 *
 * @param {number} year - The year for which to calculate the holiday
 * @param {number} offset - The number of days to add or subtract from Easter (negative for before, positive for after)
 * @returns {Date} The date of the holiday
 */
function calculateHolidayFromEaster(year: number, offset: number): Date {
	const easterDate = calculateEaster(year);
	const holidayDate = new Date(easterDate);
	holidayDate.setDate(easterDate.getDate() + offset);
	return holidayDate;
}

/**
 * Retrieves all Brazilian holidays for a given year.
 *
 * The function returns both fixed holidays (that occur on the same date every year)
 * and movable holidays (that are calculated based on Easter Sunday).
 * If a state code is provided, state-specific holidays are also included.
 *
 * Holidays are returned sorted by date (chronological order).
 *
 * @param {number} year - The year for which to retrieve holidays (must be between 1900 and 2099)
 * @returns {Holiday[]} An array of holidays sorted by date
 *
 * @example
 * ```typescript
 * // Get all national holidays
 * const holidays = getHolidays(2024);
 *
 * // Get holidays for a specific state
 * const spHolidays = getHolidays({ year: 2024, stateCode: 'SP' });
 * ```
 */
export function getHolidays(year: number): Holiday[];
export function getHolidays(options: GetHolidaysOptions): Holiday[];
export function getHolidays(
	yearOrOptions: number | GetHolidaysOptions,
): Holiday[] {
	let year: number;
	let stateCode: StateCode | undefined;

	// Handle overload: either a number (year) or an options object
	if (typeof yearOrOptions === "number") {
		year = yearOrOptions;
		stateCode = undefined;
	} else {
		year = yearOrOptions.year;
		stateCode = yearOrOptions.stateCode;
	}

	// Validate year
	if (
		typeof year !== "number" ||
		!Number.isInteger(year) ||
		year < 1900 ||
		year > 2099
	) {
		return [];
	}

	const holidays: Holiday[] = [];

	// Add fixed national holidays
	for (const [name, { day, month }] of Object.entries(FIXED_HOLIDAYS)) {
		holidays.push({
			name,
			date: new Date(year, month - 1, day),
		});
	}

	// Calculate and add movable holidays based on Easter
	const easterDate = calculateEaster(year);

	// Carnaval (Shrove Tuesday) - 47 days before Easter
	holidays.push({
		name: "Carnaval (terça-feira)",
		date: calculateHolidayFromEaster(year, -47),
	});

	// Sexta-feira Santa (Good Friday) - 2 days before Easter
	holidays.push({
		name: "Sexta-feira Santa",
		date: calculateHolidayFromEaster(year, -2),
	});

	// Páscoa (Easter Sunday)
	holidays.push({
		name: "Páscoa",
		date: easterDate,
	});

	// Corpus Christi - 60 days after Easter Sunday
	holidays.push({
		name: "Corpus Christi",
		date: calculateHolidayFromEaster(year, 70),
	});

	// Add state-specific holidays if stateCode is provided
	if (stateCode) {
		const stateHolidays = STATE_HOLIDAYS[stateCode];
		if (stateHolidays) {
			for (const { name, day, month } of stateHolidays) {
				holidays.push({
					name,
					date: new Date(year, month - 1, day),
				});
			}
		}
	}

	// Sort holidays by date (chronological order)
	holidays.sort((a, b) => a.date.getTime() - b.date.getTime());

	return holidays;
}
