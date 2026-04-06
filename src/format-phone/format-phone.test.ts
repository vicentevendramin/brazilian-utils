import { describe, expect, it } from "vite-plus/test";

import { formatPhone } from "./format-phone";

describe("formatPhone", () => {
	it("should sn format phone", () => {
		expect(formatPhone("")).toBe("");
		expect(formatPhone("9")).toBe("9");
		expect(formatPhone("98")).toBe("98");
		expect(formatPhone("988")).toBe("988");
		expect(formatPhone("9888")).toBe("9888");
		expect(formatPhone("98888")).toBe("98888");
		expect(formatPhone("988887")).toBe("98888-7");
		expect(formatPhone("9888877")).toBe("98888-77");
		expect(formatPhone("98888777")).toBe("98888-777");
		expect(formatPhone("988887777")).toBe("98888-7777");
	});

	it("should nanp format phone", () => {
		expect(formatPhone("", { mask: "nanp" })).toBe("");
		expect(formatPhone("1", { mask: "nanp" })).toBe("(1");
		expect(formatPhone("11", { mask: "nanp" })).toBe("(11");
		expect(formatPhone("119", { mask: "nanp" })).toBe("(11) 9");
		expect(formatPhone("1198", { mask: "nanp" })).toBe("(11) 98");
		expect(formatPhone("11988", { mask: "nanp" })).toBe("(11) 988");
		expect(formatPhone("119888", { mask: "nanp" })).toBe("(11) 9888");
		expect(formatPhone("1198888", { mask: "nanp" })).toBe("(11) 98888");
		expect(formatPhone("11988887", { mask: "nanp" })).toBe("(11) 98888-7");
		expect(formatPhone("119888877", { mask: "nanp" })).toBe("(11) 98888-77");
		expect(formatPhone("1198888777", { mask: "nanp" })).toBe("(11) 98888-777");
		expect(formatPhone("11988887777", { mask: "nanp" })).toBe("(11) 98888-7777");
	});

	it("should auto format phone", () => {
		expect(formatPhone("", { mask: "auto" })).toBe("");
		expect(formatPhone("1", { mask: "auto" })).toBe("1");
		expect(formatPhone("11", { mask: "auto" })).toBe("11");
		expect(formatPhone("119", { mask: "auto" })).toBe("119");
		expect(formatPhone("1198", { mask: "auto" })).toBe("1198");
		expect(formatPhone("11988", { mask: "auto" })).toBe("11988");
		expect(formatPhone("119888", { mask: "auto" })).toBe("11988-8");
		expect(formatPhone("1198888", { mask: "auto" })).toBe("11988-88");
		expect(formatPhone("11988887", { mask: "auto" })).toBe("11988-887");
		expect(formatPhone("119888877", { mask: "auto" })).toBe("11988-8877");
		expect(formatPhone("1198888777", { mask: "auto" })).toBe("(11) 98888-777");
		expect(formatPhone("11988887777", { mask: "auto" })).toBe("(11) 98888-7777");
	});
});
