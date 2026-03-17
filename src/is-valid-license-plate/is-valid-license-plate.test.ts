import { describe, expect, it } from "vitest";
import { isValidLicensePlate } from "./is-valid-license-plate";

describe("isValidLicensePlate", () => {
	describe("should return false", () => {
		it("when it is an empty string", () => {
			expect(isValidLicensePlate("")).toBe(false);
		});

		it("when it is null", () => {
			// biome-ignore lint/suspicious/noExplicitAny: testing invalid inputs
			expect(isValidLicensePlate(null as any)).toBe(false);
		});

		it("when it is undefined", () => {
			// biome-ignore lint/suspicious/noExplicitAny: testing invalid inputs
			expect(isValidLicensePlate(undefined as any)).toBe(false);
		});

		it("when it is a boolean", () => {
			// biome-ignore lint/suspicious/noExplicitAny: testing invalid inputs
			expect(isValidLicensePlate(true as any)).toBe(false);
			// biome-ignore lint/suspicious/noExplicitAny: testing invalid inputs
			expect(isValidLicensePlate(false as any)).toBe(false);
		});

		it("when it is an object", () => {
			// biome-ignore lint/suspicious/noExplicitAny: testing invalid inputs
			expect(isValidLicensePlate({} as any)).toBe(false);
		});

		it("when it is an array", () => {
			// biome-ignore lint/suspicious/noExplicitAny: testing invalid inputs
			expect(isValidLicensePlate([] as any)).toBe(false);
		});

		it("when brazilian license plate format is invalid", () => {
			expect(isValidLicensePlate("abc12345")).toBe(false);
			expect(isValidLicensePlate("5abc1234")).toBe(false);
			expect(isValidLicensePlate("abcd1234")).toBe(false);
			expect(isValidLicensePlate("abcd234")).toBe(false);
		});
	});

  describe("should return true", () => {
    it("when brazilian license plate format is valid", () => {
      expect(isValidLicensePlate("abc1234")).toBe(true);
      expect(isValidLicensePlate("ABC1234")).toBe(true);
      expect(isValidLicensePlate("abc-1234")).toBe(true);
      expect(isValidLicensePlate("ABC-1234")).toBe(true);
    });

    it("when mercosul license plate format is valid", () => {
      // Placas de Carro Mercosul (Letra na 5ª posição)
      expect(isValidLicensePlate("abc1d23")).toBe(true);
      expect(isValidLicensePlate("ABC1D23")).toBe(true);
      
      // Placas de Moto Mercosul (Letra na 6ª posição) - ADICIONE ESTAS LINHAS:
      expect(isValidLicensePlate("ABC12D3")).toBe(true);
      expect(isValidLicensePlate("abc12d3")).toBe(true);
		});
	});
});
