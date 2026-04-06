import { describe, expect, test } from "vite-plus/test";

import { generateChecksum } from "./generate-checksum";

describe("generateChecksum", () => {
	test("should generate the right checksum", () => {
		expect(generateChecksum({ base: 12, weight: 10 })).toBe(28);
	});

	test("should generate the right checksum", () => {
		expect(generateChecksum({ base: 12, weight: [10, 9] })).toBe(28);
	});
});
