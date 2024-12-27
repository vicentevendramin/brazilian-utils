import { getAllNationalHolidays } from '.';

describe('getAllNationalHolidays', () => {
  test('should return fixed holidays for the given year', () => {
    const year = 2024;
    const holidays = getAllNationalHolidays(year);

    const fixedHolidays = [
      { name: 'Ano novo', date: new Date(year, 0, 1) },
      { name: 'Tiradentes', date: new Date(year, 3, 21) },
      { name: 'Dia do trabalhador', date: new Date(year, 4, 1) },
      { name: 'Independência do Brasil', date: new Date(year, 8, 7) },
      { name: 'Nossa Senhora Aparecida', date: new Date(year, 9, 12) },
      { name: 'Finados', date: new Date(year, 10, 2) },
      { name: 'Proclamação da República', date: new Date(year, 10, 15) },
      { name: 'Dia da Consciência Negra', date: new Date(year, 10, 20) },
      { name: 'Natal', date: new Date(year, 11, 25) },
    ];

    fixedHolidays.forEach(({ name, date }) => {
      expect(holidays).toContainEqual({ name, date });
    });
  });

  test('should calculate Easter-related holidays correctly', () => {
    const year = 2024;
    const holidays = getAllNationalHolidays(year);

    const easterDate = new Date(2024, 2, 31); // Easter Sunday 2024
    const expectedHolidays = [
      { name: 'Páscoa', date: easterDate },
      { name: 'Carnaval (terça-feira)', date: new Date(2024, 1, 13) },
      { name: 'Sexta-feira Santa', date: new Date(2024, 2, 29) },
      { name: 'Corpus Christi', date: new Date(2024, 5, 9) },
    ];

    expectedHolidays.forEach(({ name, date }) => {
      expect(holidays).toContainEqual({ name, date });
    });
  });

  test('should return the correct number of holidays', () => {
    const year = 2024;
    const holidays = getAllNationalHolidays(year);

    expect(holidays.length).toBe(13); // 9 fixed + 4 Easter-related holidays
  });

  test('should work for leap years', () => {
    const year = 2020;
    const holidays = getAllNationalHolidays(year);

    expect(holidays).toContainEqual({
      name: 'Ano novo',
      date: new Date(year, 0, 1),
    });

    const easterDate = new Date(2020, 3, 12); // Easter Sunday 2020
    expect(holidays).toContainEqual({ name: 'Páscoa', date: easterDate });
  });
});
