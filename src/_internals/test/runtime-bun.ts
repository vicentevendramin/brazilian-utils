import { afterEach, beforeEach, describe, expect, it, jest, test } from "bun:test";

export { afterEach, beforeEach, describe, expect, it, test };

export const vi = {
	fn: jest.fn,
	restoreAllMocks: () => {
		jest.restoreAllMocks();
	},
};
