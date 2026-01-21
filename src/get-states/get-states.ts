import { DATA, type State } from "../_internals/constants/states";

/**
 * Retrieves a list of all Brazilian states with their codes and names.
 *
 * Returns an array of state objects containing the two-letter state code
 * and the full state name. The list is automatically sorted alphabetically
 * by state name.
 *
 * @returns {State[]} An array of all Brazilian states sorted by name
 */
export const getStates = (): State[] => [...DATA];
