import { describe, expect, it } from "vite-plus/test";

import { parseCpf } from "./parse-cpf";

describe("parseCpf", () => {
	it("should remove CPF mask characters", () => {
		expect(parseCpf("943.895.751-04")).toBe("94389575104");
	});

	it("should remove non numeric characters", () => {
		expect(parseCpf("943.?ABC895.751-04abc")).toBe("94389575104");
	});
});
