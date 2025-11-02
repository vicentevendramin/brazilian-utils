import { DATA as CITIES_DATA } from "../_internals/cities";
import type { StateCode } from "../_internals/states";

const sortAlphabetically = (a: string, b: string): number => a.localeCompare(b);

/**
 * Returns a list of city names for a given Brazilian state, or all cities if no state is specified.
 *
 * If a state code is provided, the function returns its cities sorted alphabetically.
 * If no state is provided, it returns all cities from all states, sorted alphabetically.
 *
 * @param state - The code of the Brazilian state to filter cities by. Optional.
 * @returns An array of city names, sorted alphabetically. Returns an empty array if the state is not found.
 */
export const getCities = (state?: StateCode): string[] => {
	if (!state) {
		return Object.values(CITIES_DATA)
			.flat()
			.sort((a, b) => a.localeCompare(b));
	}

	if (!(state in CITIES_DATA)) return [];

	return [...CITIES_DATA[state]];
};
