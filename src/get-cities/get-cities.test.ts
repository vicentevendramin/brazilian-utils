import { describe, expect, it } from "vitest";
import { DATA } from "../_internals/cities";
import { getStates } from "../get-states/get-states";
import { getCities } from "./get-cities";

/**
 * https://cidades.ibge.gov.br/brasil/panorama
 */
const NUMBER_OF_BRAZILIAN_CITIES = 5570;

describe("getCities", () => {
	it("should return cities of all states", () => {
		expect(getCities().length).toEqual(NUMBER_OF_BRAZILIAN_CITIES);
	});

	it("should return empty array if state does not exist", () => {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		expect(getCities("ACC" as any)).toEqual([]);
	});

	describe("return cities from states", () => {
		const states = getStates();

		for (const { code, name } of states) {
			it(`should return cities from code ${code}/${name}`, () => {
				const stateCities = DATA[code];
				expect(getCities(code)).toMatchObject(stateCities);
				expect(getCities(name)).toMatchObject(stateCities);
			});
		}
	});
});
