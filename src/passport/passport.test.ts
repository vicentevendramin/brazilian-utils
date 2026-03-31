import { describe, expect, test, vi, beforeEach } from "vitest";
import {
    isValidPassport,
    generatePassport,
    removeSymbolsFromPassport,
    formatPassport,
} from "./passport";

describe("passport", () => {
    describe("isValidPassport", () => {
      describe("should return false", () => {
        test("when passport is not a string", () => {
          expect(isValidPassport(1 as any)).toBe(false);
        });
    
        test("when passport length is different from 8", () => {
          expect(isValidPassport("1")).toBe(false);
        });
    
        test("when passport does not match the expected format", () => {
          expect(isValidPassport("1112223334-")).toBe(false);
        });
      });
    
      describe("should return true", () => {
        test("when passport is valid", () => {
          expect(isValidPassport("AA111111")).toBe(true);
          expect(isValidPassport("CL125167")).toBe(true);
        });
      });
    });
    
    describe("generatePassport", () => {
      test("should always generate a valid passport", () => {
        for (let i = 0; i < 10_000; i++) {
          expect(isValidPassport(generatePassport())).toBe(true);
        }
      });
    });
    
    describe("removeSymbolsFromPassport", () => {
      test("when there are no symbols, returns the same string", () => {
        expect(removeSymbolsFromPassport("Ab123456")).toBe("Ab123456");
      });
    
      test("when there are spaces, returns the string without them", () => {
        expect(removeSymbolsFromPassport(" AB 123 456 ")).toBe("AB123456");
      });
    
      test("when there are dashes, returns the string without them", () => {
        expect(removeSymbolsFromPassport("-AB1-23-4-56-")).toBe("AB123456");
      });
    
      test("when there are dots, returns the string without them", () => {
        expect(removeSymbolsFromPassport(".AB.1.23.456.")).toBe("AB123456");
      });
    
      test("when there are multiple symbols, returns the string without any of them", () => {
        expect(removeSymbolsFromPassport(".A B.1.2-3.45 -. 6.")).toBe("AB123456");
      });
    });
    
    describe("formatPassport", () => {
      beforeEach(() => {
        vi.restoreAllMocks();
      });
    
      test("when passport is valid, returns the formatted passport", () => {
        vi.spyOn({ isValidPassport }, "isValidPassport").mockReturnValue(true);
        expect(formatPassport("yz 987654")).toBe("YZ987654");
      });
    
      test("when passport is not valid, returns null", () => {
        vi.spyOn({ isValidPassport }, "isValidPassport").mockReturnValue(false);
        expect(formatPassport("acd12736")).toBeNull();
      });
    });
});
