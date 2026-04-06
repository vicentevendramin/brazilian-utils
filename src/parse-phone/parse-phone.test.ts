import { describe, expect, it } from "../_internals/test/runtime";
import { parsePhone } from "./parse-phone";

describe("parsePhone", () => {
	it("should remove phone mask characters", () => {
		expect(parsePhone("(11) 98888-7777")).toBe("11988887777");
		expect(parsePhone("98888-7777")).toBe("988887777");
	});

	it("should remove non numeric characters", () => {
		expect(parsePhone("+55 (11) 98888-7777")).toBe("5511988887777");
	});
});
