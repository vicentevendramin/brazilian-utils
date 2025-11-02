import { DATA as CITIES_DATA } from "../_internals/cities";
import type { StateCode, StateName } from "../_internals/states";
import { getStates } from "../get-states/get-states";

const sortAlphabetically = (a: string, b: string): number => a.localeCompare(b);

/**
 * Returns a list of city names for a given Brazilian state, or all cities if no state is specified.
 *
 * If a state name or code is provided, the function searches for the corresponding state and returns its cities sorted alphabetically.
 * If no state is provided, it returns all cities from all states, sorted alphabetically.
 *
 * @param state - The name or code of the Brazilian state to filter cities by. Optional.
 * @returns An array of city names, sorted alphabetically. Returns an empty array if the state is not found.
 */
export const getCities = (state?: StateName | StateCode): string[] => {
	if (!state) return Object.values(CITIES_DATA).flat().sort(sortAlphabetically);

	const foundState = getStates().find(({ name, code }) =>
		[name, code].includes(state),
	);

	if (!foundState) return [];

	return [...CITIES_DATA[foundState.code]].sort((a, b) => a.localeCompare(b));
};
