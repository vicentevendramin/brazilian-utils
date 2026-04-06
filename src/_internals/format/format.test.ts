import { describe, expect, it } from "../test/runtime";
import { format } from "./format";

describe("format", () => {
	it("should format value according to pattern without padding", () => {
		const result = format({ value: "123456", pattern: "00-00-00" });
		expect(result).toBe("12-34-56");
	});

	it("should format value according to pattern with padding", () => {
		const result = format({ value: "1234", pattern: "00-00-00", pad: true });
		expect(result).toBe("00-12-34");
	});

	it("should handle pattern longer than value without padding", () => {
		const result = format({ value: "12", pattern: "00-00-00" });
		expect(result).toBe("12");
	});

	it("should handle pattern longer than value with padding", () => {
		const result = format({ value: "12", pattern: "00-00-00", pad: true });
		expect(result).toBe("00-00-12");
	});

	it("should handle pattern with non-digit characters", () => {
		const result = format({ value: "123456", pattern: "(00) 0000-0000" });
		expect(result).toBe("(12) 3456");
	});

	it("should handle empty value", () => {
		const result = format({ value: "", pattern: "00-00-00" });
		expect(result).toBe("");
	});

	it("should handle empty pattern", () => {
		const result = format({ value: "123456", pattern: "" });
		expect(result).toBe("");
	});
});
