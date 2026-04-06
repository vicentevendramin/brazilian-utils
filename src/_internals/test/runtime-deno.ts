import { assertEquals, assertExists, assertInstanceOf, assertObjectMatch } from "jsr:@std/assert";
import { afterEach, beforeEach, describe, it } from "jsr:@std/testing/bdd";

type MockImplementation<TArgs extends unknown[] = unknown[], TResult = unknown> = (
	...args: TArgs
) => TResult;

type MockFunction<TArgs extends unknown[] = unknown[], TResult = unknown> = ((
	...args: TArgs
) => TResult) & {
	mockClear: () => void;
	mockResolvedValueOnce: (value: Awaited<TResult>) => MockFunction<TArgs, TResult>;
	mockImplementation: (
		implementation: MockImplementation<TArgs, TResult>,
	) => MockFunction<TArgs, TResult>;
};

type AnyMockFunction = MockFunction<any[], any>;

const registeredMocks = new Set<AnyMockFunction>();

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function createAssertionError(message: string): Error {
	return new Error(message);
}

function createMock<TArgs extends unknown[] = unknown[], TResult = unknown>(
	implementation?: MockImplementation<TArgs, TResult>,
): MockFunction<TArgs, TResult> {
	const queue: Array<MockImplementation<TArgs, TResult>> = [];
	const mockFn = ((...args: TArgs) => {
		if (queue.length > 0) {
			const nextImplementation = queue.shift();

			return nextImplementation!(...args);
		}

		if (implementation) {
			return implementation(...args);
		}

		return undefined as TResult;
	}) as MockFunction<TArgs, TResult>;

	mockFn.mockClear = () => {
		queue.length = 0;
	};

	mockFn.mockResolvedValueOnce = (value: Awaited<TResult>) => {
		queue.push(() => Promise.resolve(value) as TResult);

		return mockFn;
	};

	mockFn.mockImplementation = (nextImplementation: MockImplementation<TArgs, TResult>) => {
		implementation = nextImplementation;

		return mockFn;
	};

	registeredMocks.add(mockFn as AnyMockFunction);

	return mockFn;
}

function createExpect(actual: unknown) {
	return {
		toBe(expected: unknown) {
			if (!Object.is(actual, expected)) {
				throw createAssertionError(`Expected ${String(actual)} to be ${String(expected)}`);
			}
		},
		toEqual(expected: unknown) {
			assertEquals(actual, expected);
		},
		toStrictEqual(expected: unknown) {
			assertEquals(actual, expected);
		},
		toContain(expected: unknown) {
			if (typeof actual === "string") {
				if (!actual.includes(String(expected))) {
					throw createAssertionError(`Expected ${actual} to contain ${String(expected)}`);
				}

				return;
			}

			if (!Array.isArray(actual) || !actual.includes(expected)) {
				throw createAssertionError(`Expected value to contain ${String(expected)}`);
			}
		},
		toContainEqual(expected: unknown) {
			if (!Array.isArray(actual)) {
				throw createAssertionError("Expected value to be an array");
			}

			const found = actual.some((value) => {
				try {
					assertEquals(value, expected);

					return true;
				} catch {
					return false;
				}
			});

			if (!found) {
				throw createAssertionError("Expected array to contain a deeply equal value");
			}
		},
		toHaveProperty(property: string) {
			if (!isRecord(actual) || !(property in actual)) {
				throw createAssertionError(`Expected object to have property ${property}`);
			}
		},
		toHaveLength(expected: number) {
			if (!isRecord(actual) && typeof actual !== "string" && !Array.isArray(actual)) {
				throw createAssertionError("Expected value to have a length");
			}

			if ((actual as { length: number }).length !== expected) {
				throw createAssertionError(
					`Expected length ${(actual as { length: number }).length} to be ${expected}`,
				);
			}
		},
		toBeDefined() {
			assertExists(actual);
		},
		toBeInstanceOf(expected: new (...args: any[]) => unknown) {
			assertInstanceOf(actual, expected);
		},
		toBeGreaterThan(expected: number) {
			if (!(typeof actual === "number" && actual > expected)) {
				throw createAssertionError(`Expected ${String(actual)} to be greater than ${expected}`);
			}
		},
		toBeGreaterThanOrEqual(expected: number) {
			if (!(typeof actual === "number" && actual >= expected)) {
				throw createAssertionError(
					`Expected ${String(actual)} to be greater than or equal to ${expected}`,
				);
			}
		},
		toBeLessThanOrEqual(expected: number) {
			if (!(typeof actual === "number" && actual <= expected)) {
				throw createAssertionError(
					`Expected ${String(actual)} to be less than or equal to ${expected}`,
				);
			}
		},
		toMatchObject(expected: Record<string, unknown>) {
			if (!isRecord(actual)) {
				throw createAssertionError("Expected value to be an object");
			}

			assertObjectMatch(actual, expected);
		},
		get rejects() {
			return {
				async toThrow(expected?: new (...args: any[]) => unknown) {
					try {
						await (actual as Promise<unknown>);
					} catch (error) {
						if (expected) {
							assertInstanceOf(error, expected);
						}

						return;
					}

					throw createAssertionError("Expected promise to reject");
				},
			};
		},
	};
}

export { afterEach, beforeEach, describe, it };

export const test = it;

export const expect = createExpect;

export const vi = {
	fn: createMock,
	restoreAllMocks: () => {
		for (const mockFn of registeredMocks) {
			mockFn.mockClear();
		}
	},
};
