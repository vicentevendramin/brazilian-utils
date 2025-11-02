import { describe, expect, it } from "vitest";
import { DATA } from "../_internals/states";
import { getStates } from "./get-states";

describe("getStates", () => {
	it(`should return an array with ${DATA.length} states`, () => {
		expect(getStates().length).toBe(DATA.length);
	});

	it("should return an array sort by name", () => {
		expect(getStates()).toEqual(DATA);
	});
});
