import { describe, expect, test } from "vitest";
import { isValidBankAccount } from "./is-valid-bank-account";

describe("isValidBankAccount", () => {
	describe("should return false", () => {
		test("when bankCode is an empty string", () => {
			expect(
				isValidBankAccount({
					bankCode: "",
					agency: "1234",
					account: "12345678",
					digit: "5",
				}),
			).toBe(false);
		});

		test("when agency is an empty string", () => {
			expect(
				isValidBankAccount({
					bankCode: "001",
					agency: "",
					account: "12345678",
					digit: "5",
				}),
			).toBe(false);
		});

		test("when account is an empty string", () => {
			expect(
				isValidBankAccount({
					bankCode: "001",
					agency: "1234",
					account: "",
					digit: "5",
				}),
			).toBe(false);
		});

		test("when digit is an empty string", () => {
			expect(
				isValidBankAccount({
					bankCode: "001",
					agency: "1234",
					account: "12345678",
					digit: "",
				}),
			).toBe(false);
		});

		test("when bankCode is null", () => {
			expect(
				isValidBankAccount({
					// biome-ignore lint/suspicious/noExplicitAny: testing invalid inputs
					bankCode: null as any,
					agency: "1234",
					account: "12345678",
					digit: "5",
				}),
			).toBe(false);
		});

		test("when bankCode is undefined", () => {
			expect(
				isValidBankAccount({
					// biome-ignore lint/suspicious/noExplicitAny: testing invalid inputs
					bankCode: undefined as any,
					agency: "1234",
					account: "12345678",
					digit: "5",
				}),
			).toBe(false);
		});

		test("when bankCode is not a string", () => {
			expect(
				isValidBankAccount({
					// biome-ignore lint/suspicious/noExplicitAny: testing invalid inputs
					bankCode: 123 as any,
					agency: "1234",
					account: "12345678",
					digit: "5",
				}),
			).toBe(false);
		});

		test("when bankCode length is not 3", () => {
			expect(
				isValidBankAccount({
					bankCode: "12",
					agency: "1234",
					account: "12345678",
					digit: "5",
				}),
			).toBe(false);

			expect(
				isValidBankAccount({
					bankCode: "1234",
					agency: "1234",
					account: "12345678",
					digit: "5",
				}),
			).toBe(false);
		});

		test("when agency length is less than 1", () => {
			expect(
				isValidBankAccount({
					bankCode: "001",
					agency: "",
					account: "12345678",
					digit: "5",
				}),
			).toBe(false);
		});

		test("when agency length is greater than 5", () => {
			expect(
				isValidBankAccount({
					bankCode: "001",
					agency: "123456",
					account: "12345678",
					digit: "5",
				}),
			).toBe(false);
		});

		test("when account length is less than 1", () => {
			expect(
				isValidBankAccount({
					bankCode: "001",
					agency: "1234",
					account: "",
					digit: "5",
				}),
			).toBe(false);
		});

		test("when account length is greater than 13", () => {
			expect(
				isValidBankAccount({
					bankCode: "001",
					agency: "1234",
					account: "12345678901234",
					digit: "5",
				}),
			).toBe(false);
		});

		test("when digit length is less than 1", () => {
			expect(
				isValidBankAccount({
					bankCode: "001",
					agency: "1234",
					account: "12345678",
					digit: "",
				}),
			).toBe(false);
		});

		test("when digit length is greater than 2", () => {
			expect(
				isValidBankAccount({
					bankCode: "001",
					agency: "1234",
					account: "12345678",
					digit: "123",
				}),
			).toBe(false);
		});

		test("when contains non-digit characters", () => {
			expect(
				isValidBankAccount({
					bankCode: "00a",
					agency: "1234",
					account: "12345678",
					digit: "5",
				}),
			).toBe(false);

			expect(
				isValidBankAccount({
					bankCode: "001",
					agency: "12a4",
					account: "12345678",
					digit: "5",
				}),
			).toBe(false);
		});

		test("when all characters are non-digit (empty after sanitization)", () => {
			expect(
				isValidBankAccount({
					bankCode: "abc",
					agency: "def",
					account: "ghi",
					digit: "j",
				}),
			).toBe(false);

			expect(
				isValidBankAccount({
					bankCode: "001",
					agency: "abc",
					account: "12345678",
					digit: "5",
				}),
			).toBe(false);

			expect(
				isValidBankAccount({
					bankCode: "001",
					agency: "1234",
					account: "abc",
					digit: "5",
				}),
			).toBe(false);
		});

		describe("Banco do Brasil (001)", () => {
			test("when agency length is less than 4", () => {
				expect(
					isValidBankAccount({
						bankCode: "001",
						agency: "123",
						account: "12345678",
						digit: "5",
					}),
				).toBe(false);
			});

			test("when agency length is greater than 5", () => {
				expect(
					isValidBankAccount({
						bankCode: "001",
						agency: "123456",
						account: "12345678",
						digit: "5",
					}),
				).toBe(false);
			});

			test("when account length is less than 8", () => {
				expect(
					isValidBankAccount({
						bankCode: "001",
						agency: "1234",
						account: "1234567",
						digit: "5",
					}),
				).toBe(false);
			});

			test("when account length is greater than 10", () => {
				expect(
					isValidBankAccount({
						bankCode: "001",
						agency: "1234",
						account: "12345678901",
						digit: "5",
					}),
				).toBe(false);
			});

			test("when digit length is not 1", () => {
				expect(
					isValidBankAccount({
						bankCode: "001",
						agency: "1234",
						account: "12345678",
						digit: "12",
					}),
				).toBe(false);
			});
		});

		describe("Itaú (341)", () => {
			test("when agency length is not 4", () => {
				expect(
					isValidBankAccount({
						bankCode: "341",
						agency: "123",
						account: "12345",
						digit: "6",
					}),
				).toBe(false);
			});

			test("when account length is not 5", () => {
				expect(
					isValidBankAccount({
						bankCode: "341",
						agency: "1234",
						account: "1234",
						digit: "6",
					}),
				).toBe(false);
			});

			test("when digit length is not 1", () => {
				expect(
					isValidBankAccount({
						bankCode: "341",
						agency: "1234",
						account: "12345",
						digit: "12",
					}),
				).toBe(false);
			});
		});

		describe("Bradesco (237)", () => {
			test("when agency length is not 4", () => {
				expect(
					isValidBankAccount({
						bankCode: "237",
						agency: "123",
						account: "1234567",
						digit: "5",
					}),
				).toBe(false);
			});

			test("when account length is not 7", () => {
				expect(
					isValidBankAccount({
						bankCode: "237",
						agency: "1234",
						account: "123456",
						digit: "5",
					}),
				).toBe(false);
			});

			test("when digit length is not 1", () => {
				expect(
					isValidBankAccount({
						bankCode: "237",
						agency: "1234",
						account: "1234567",
						digit: "12",
					}),
				).toBe(false);
			});
		});

		describe("Santander (033)", () => {
			test("when agency length is not 4", () => {
				expect(
					isValidBankAccount({
						bankCode: "033",
						agency: "123",
						account: "12345678",
						digit: "5",
					}),
				).toBe(false);
			});

			test("when account length is not 8", () => {
				expect(
					isValidBankAccount({
						bankCode: "033",
						agency: "1234",
						account: "1234567",
						digit: "5",
					}),
				).toBe(false);
			});

			test("when digit length is not 1", () => {
				expect(
					isValidBankAccount({
						bankCode: "033",
						agency: "1234",
						account: "12345678",
						digit: "12",
					}),
				).toBe(false);
			});
		});

		describe("Caixa (104)", () => {
			test("when agency length is not 4", () => {
				expect(
					isValidBankAccount({
						bankCode: "104",
						agency: "123",
						account: "00123456789",
						digit: "0",
					}),
				).toBe(false);
			});

			test("when account length is not 11", () => {
				expect(
					isValidBankAccount({
						bankCode: "104",
						agency: "1234",
						account: "1234567890",
						digit: "0",
					}),
				).toBe(false);
			});

			test("when digit length is not 1", () => {
				expect(
					isValidBankAccount({
						bankCode: "104",
						agency: "1234",
						account: "00123456789",
						digit: "12",
					}),
				).toBe(false);
			});
		});
	});

	describe("should return true", () => {
		describe("for valid inputs with generic validation", () => {
			test("when all fields are valid strings with mod10", () => {
				// mod10("123456") = 6
				expect(
					isValidBankAccount({
						bankCode: "999",
						agency: "1234",
						account: "123456",
						digit: "6",
					}),
				).toBe(true);
			});
			test("when all fields are valid strings with mod11", () => {
				// mod11("123456") = 1
				expect(
					isValidBankAccount({
						bankCode: "999",
						agency: "1234",
						account: "123456",
						digit: "1",
					}),
				).toBe(true);
			});
		});

		describe("when inputs contain formatting characters", () => {
			test("should sanitize and validate", () => {
				expect(
					isValidBankAccount({
						bankCode: "999",
						agency: "123-4",
						account: "123.456-78",
						digit: "2",
					}),
				).toBe(true);
			});
		});
	});
});
