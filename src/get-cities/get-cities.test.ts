import { describe, expect, it } from "vite-plus/test";

import { DATA } from "../_internals/constants/cities";
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
		expect(getCities("ACC" as any)).toEqual([]);
	});

	describe("return cities from states", () => {
		const states = getStates();

		for (const { code } of states) {
			it(`should return cities from code ${code}`, () => {
				const stateCities = DATA[code];
				expect(getCities(code)).toMatchObject(stateCities);
			});
		}
	});
});
