import { describe, expect, it } from "vitest";
import { parseBoleto } from "./parse-boleto";

describe("parseBoleto", () => {
	it("should remove boleto mask characters", () => {
		expect(
			parseBoleto("10491.44338 55119.000002 00000.000141 3 25230000093423"),
		).toBe("10491443385511900000200000000141325230000093423");
	});

	it("should remove non numeric characters", () => {
		expect(
			parseBoleto(
				"10491.44A338 55119.000002? ABC00000.000?141 3 25230000093423",
			),
		).toBe("10491443385511900000200000000141325230000093423");
	});
});
