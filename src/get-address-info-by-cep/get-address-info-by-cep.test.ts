/**
 * Tests for getAddressInfoByCep function.
 *
 * Most tests run against real APIs (ViaCEP, Widenet, BrasilAPI).
 * Error handling tests use mocks to test specific error scenarios.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "../_internals/test/runtime";
import {
	GetAddressInfoByCepNotFoundError,
	GetAddressInfoByCepServiceError,
	GetAddressInfoByCepValidationError,
	getAddressInfoByCep,
} from "./get-address-info-by-cep";

describe("getAddressInfoByCep", () => {
	describe("validation", () => {
		it("should throw GetAddressInfoByCepValidationError for invalid CEP format", async () => {
			await expect(getAddressInfoByCep("12345")).rejects.toThrow(
				GetAddressInfoByCepValidationError,
			);
			await expect(getAddressInfoByCep("123456789")).rejects.toThrow(
				GetAddressInfoByCepValidationError,
			);
			await expect(getAddressInfoByCep("")).rejects.toThrow(GetAddressInfoByCepValidationError);
		});

		it("should throw GetAddressInfoByCepValidationError for empty providers array", async () => {
			await expect(getAddressInfoByCep("01310100", { providers: [] })).rejects.toThrow(
				GetAddressInfoByCepValidationError,
			);
		});

		it("should accept valid CEP as string", async () => {
			const result = await getAddressInfoByCep("01310100");
			expect(result).toBeDefined();
			expect(result.cep).toBe("01310100");
			expect(result.state).toBe("SP");
			expect(result.city).toBe("São Paulo");
		}, 15000);

		it("should accept valid CEP as number and pad with leading zeros", async () => {
			const result = await getAddressInfoByCep(1310100);
			expect(result).toBeDefined();
			// Should have padded 1310100 to 01310100
			expect(result.cep).toBe("01310100");
			expect(result.state).toBe("SP");
			expect(result.city).toBe("São Paulo");
		}, 15000);

		it("should accept CEP with mask", async () => {
			const result = await getAddressInfoByCep("01310-100");
			expect(result).toBeDefined();
			expect(result.cep).toBe("01310100");
		}, 15000);
	});

	describe("provider selection", () => {
		it("should use all providers by default", async () => {
			const result = await getAddressInfoByCep("01310100");
			expect(result).toBeDefined();
			expect(result.cep).toBe("01310100");
			expect(result.state).toBe("SP");
			expect(result.city).toBe("São Paulo");
		}, 15000);

		it("should use only specified providers", async () => {
			const result = await getAddressInfoByCep("01310100", {
				providers: ["brasilapi"],
			});

			expect(result).toBeDefined();
			expect(result.cep).toBe("01310100");
			expect(result.state).toBe("SP");
			expect(result.city).toBe("São Paulo");
		}, 15000);

		it("should use multiple specified providers", async () => {
			const result = await getAddressInfoByCep("01310100", {
				providers: ["viacep", "brasilapi"],
			});

			expect(result).toBeDefined();
			expect(result.cep).toBe("01310100");
			expect(result.state).toBe("SP");
			expect(result.city).toBe("São Paulo");
		}, 15000);

		it("should filter out invalid provider names", async () => {
			const result = await getAddressInfoByCep("01310100", {
				providers: ["viacep", "invalid" as any, "brasilapi"],
			});

			expect(result).toBeDefined();
			expect(result.cep).toBe("01310100");
		}, 15000);
	});

	describe("response structure", () => {
		it("should return normalized address information from ViaCEP", async () => {
			const result = await getAddressInfoByCep("01310100", {
				providers: ["viacep"],
			});

			expect(result).toBeDefined();
			expect(result).toHaveProperty("cep");
			expect(result).toHaveProperty("state");
			expect(result).toHaveProperty("city");
			expect(result).toHaveProperty("neighborhood");
			expect(result).toHaveProperty("street");
			expect(result.cep).toBe("01310100");
			expect(result.state).toBe("SP");
			expect(result.city).toBe("São Paulo");
		}, 15000);

		it("should return normalized address information from Widenet", async () => {
			try {
				const result = await getAddressInfoByCep("01310100", {
					providers: ["widenet"],
				});

				expect(result).toBeDefined();
				expect(result).toHaveProperty("cep");
				expect(result).toHaveProperty("state");
				expect(result).toHaveProperty("city");
				expect(result).toHaveProperty("neighborhood");
				expect(result).toHaveProperty("street");
				expect(result.cep).toBe("01310100");
			} catch (error) {
				// Widenet may be temporarily unavailable
				if (error instanceof GetAddressInfoByCepServiceError) {
					// Service unavailable is acceptable for this test
					expect(error).toBeInstanceOf(GetAddressInfoByCepServiceError);
				} else {
					throw error;
				}
			}
		}, 15000);

		it("should return normalized address information from BrasilAPI", async () => {
			const result = await getAddressInfoByCep("01310100", {
				providers: ["brasilapi"],
			});

			expect(result).toBeDefined();
			expect(result).toHaveProperty("cep");
			expect(result).toHaveProperty("state");
			expect(result).toHaveProperty("city");
			expect(result).toHaveProperty("neighborhood");
			expect(result).toHaveProperty("street");
			expect(result.cep).toBe("01310100");
			expect(result.state).toBe("SP");
			expect(result.city).toBe("São Paulo");
		}, 15000);
	});

	// Error handling tests use mocks to test specific error scenarios
	describe("error handling", () => {
		const fetchMock = vi.fn();
		const originalFetch = globalThis.fetch;

		beforeEach(() => {
			globalThis.fetch = fetchMock as unknown as typeof fetch;
			fetchMock.mockClear();
		});

		afterEach(() => {
			globalThis.fetch = originalFetch;
			vi.restoreAllMocks();
		});

		it("should throw GetAddressInfoByCepNotFoundError when ViaCEP returns erro", async () => {
			fetchMock.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					erro: true,
				}),
			});

			await expect(getAddressInfoByCep("00000000", { providers: ["viacep"] })).rejects.toThrow(
				GetAddressInfoByCepNotFoundError,
			);
		});

		it("should throw GetAddressInfoByCepNotFoundError when Widenet returns invalid status", async () => {
			fetchMock.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					status: 404,
					ok: false,
				}),
			});

			await expect(getAddressInfoByCep("00000000", { providers: ["widenet"] })).rejects.toThrow(
				GetAddressInfoByCepNotFoundError,
			);
		});

		it("should throw GetAddressInfoByCepNotFoundError when BrasilAPI returns errors", async () => {
			fetchMock.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					errors: [{ message: "CEP não encontrado" }],
				}),
			});

			await expect(getAddressInfoByCep("00000000", { providers: ["brasilapi"] })).rejects.toThrow(
				GetAddressInfoByCepNotFoundError,
			);
		});

		it("should throw GetAddressInfoByCepNotFoundError when all providers return not found", async () => {
			fetchMock
				.mockResolvedValueOnce({
					ok: true,
					json: async () => ({
						erro: true,
					}),
				})
				.mockResolvedValueOnce({
					ok: true,
					json: async () => ({
						status: 404,
						ok: false,
					}),
				})
				.mockResolvedValueOnce({
					ok: true,
					json: async () => ({
						errors: [{ message: "CEP não encontrado" }],
					}),
				});

			await expect(getAddressInfoByCep("00000000")).rejects.toThrow(
				GetAddressInfoByCepNotFoundError,
			);
		});

		it("should throw GetAddressInfoByCepServiceError when all providers fail with network errors", async () => {
			fetchMock
				.mockRejectedValueOnce(new Error("Network error"))
				.mockRejectedValueOnce(new Error("Timeout"))
				.mockRejectedValueOnce(new Error("Connection failed"));

			await expect(getAddressInfoByCep("01310100")).rejects.toThrow(
				GetAddressInfoByCepServiceError,
			);
		});

		it("should throw GetAddressInfoByCepServiceError when all providers return HTTP errors", async () => {
			fetchMock
				.mockResolvedValueOnce({
					ok: false,
					status: 500,
				})
				.mockResolvedValueOnce({
					ok: false,
					status: 503,
				})
				.mockResolvedValueOnce({
					ok: false,
					status: 500,
				});

			await expect(getAddressInfoByCep("01310100")).rejects.toThrow(
				GetAddressInfoByCepServiceError,
			);
		});

		it("should return first successful response when some providers fail", async () => {
			fetchMock
				.mockRejectedValueOnce(new Error("Network error"))
				.mockResolvedValueOnce({
					ok: true,
					json: async () => ({
						cep: "01310-100",
						logradouro: "Avenida Paulista",
						bairro: "Bela Vista",
						localidade: "São Paulo",
						uf: "SP",
					}),
				})
				.mockResolvedValueOnce({
					ok: true,
					json: async () => ({
						cep: "01310100",
						state: "SP",
						city: "São Paulo",
						neighborhood: "Bela Vista",
						street: "Avenida Paulista",
					}),
				});

			const result = await getAddressInfoByCep("01310100");
			expect(result).toBeDefined();
			expect(result.cep).toBe("01310100");
		});

		it("should prioritize GetAddressInfoByCepNotFoundError over GetAddressInfoByCepServiceError when mixed", async () => {
			fetchMock
				.mockResolvedValueOnce({
					ok: true,
					json: async () => ({
						erro: true,
					}),
				})
				.mockRejectedValueOnce(new Error("Network error"))
				.mockResolvedValueOnce({
					ok: true,
					json: async () => ({
						errors: [{ message: "CEP não encontrado" }],
					}),
				});

			await expect(getAddressInfoByCep("00000000")).rejects.toThrow(
				GetAddressInfoByCepNotFoundError,
			);
		});
	});

	describe("real API integration", () => {
		it("should fetch real address from ViaCEP", async () => {
			const result = await getAddressInfoByCep("01310100", {
				providers: ["viacep"],
			});

			expect(result).toBeDefined();
			expect(result.cep).toBe("01310100");
			expect(result.state).toBe("SP");
			expect(result.city).toBe("São Paulo");
			expect(result.neighborhood).toBeTruthy();
			expect(result.street).toBeTruthy();
		}, 15000);

		it("should fetch real address from Widenet", async () => {
			try {
				const result = await getAddressInfoByCep("01310100", {
					providers: ["widenet"],
				});

				expect(result).toBeDefined();
				expect(result.cep).toBe("01310100");
				expect(result.state).toBe("SP");
				expect(result.city).toBe("São Paulo");
			} catch (error) {
				// Widenet may be temporarily unavailable, skip test in that case
				if (error instanceof GetAddressInfoByCepServiceError) {
					// Service unavailable is acceptable for this test
					expect(error).toBeInstanceOf(GetAddressInfoByCepServiceError);
				} else {
					throw error;
				}
			}
		}, 15000);

		it("should fetch real address from BrasilAPI", async () => {
			const result = await getAddressInfoByCep("01310100", {
				providers: ["brasilapi"],
			});

			expect(result).toBeDefined();
			expect(result.cep).toBe("01310100");
			expect(result.state).toBe("SP");
			expect(result.city).toBe("São Paulo");
		}, 15000);

		it("should return first successful response from multiple real providers", async () => {
			const result = await getAddressInfoByCep("01310100");

			expect(result).toBeDefined();
			expect(result.cep).toBe("01310100");
			expect(result.state).toBe("SP");
			expect(result.city).toBe("São Paulo");
		}, 15000);
	});
});
