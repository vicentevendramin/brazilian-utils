const FIXED_HOLIDAYS = {
  'Ano novo': { day: 1, month: 1 },
  Tiradentes: { day: 21, month: 4 },
  'Dia do trabalhador': { day: 1, month: 5 },
  'Independência do Brasil': { day: 7, month: 9 },
  'Nossa Senhora Aparecida': { day: 12, month: 10 },
  Finados: { day: 2, month: 11 },
  'Proclamação da República': { day: 15, month: 11 },
  'Dia da Consciência Negra': { day: 20, month: 11 },
  Natal: { day: 25, month: 12 },
};

function calculateEaster(year: number): Date {
  // Calculation based on the computus algorithm
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

function calculateHolidayFromEaster(year: number, offset: number): Date {
  // Calculates the date of Easter
  const easterDate = calculateEaster(year);

  // Creates a new Date object for the holiday
  const holidayDate = new Date(easterDate);

  // Adds or subtracts the offset to get the holiday date
  holidayDate.setDate(easterDate.getDate() + offset);

  return holidayDate;
}

export function getAllNationalHolidays(year: number): Object[] {
  const allHolidays: Object[] = [];

  // Add fixed holidays
  for (const [key, { day, month }] of Object.entries(FIXED_HOLIDAYS)) {
    const holiday = {
      name: key,
      date: new Date(year, month - 1, day),
    };
    allHolidays.push(holiday);
  }

  // Calculate and add Easter
  const easterHoliday = {
    name: 'Páscoa',
    date: calculateEaster(year),
  };
  allHolidays.push(easterHoliday);

  // Calculate Gras
  const mardiGrasHoliday = {
    name: 'Carnaval (terça-feira)',
    date: calculateHolidayFromEaster(year, -47),
  };
  allHolidays.push(mardiGrasHoliday);

  // Calculate Good Friday
  const goodFridayHoliday = {
    name: 'Sexta-feira Santa',
    date: calculateHolidayFromEaster(year, -2),
  };
  allHolidays.push(goodFridayHoliday);

  // Calculate and add Corpus Christi
  const corpusChristiHoliday = {
    name: 'Corpus Christi',
    date: calculateHolidayFromEaster(year, 70),
  };
  allHolidays.push(corpusChristiHoliday);

  return allHolidays;
}
