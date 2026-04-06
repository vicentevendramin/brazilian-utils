/// <reference lib="deno.ns" />
import "./globals.d.ts";

type TestCallback = () => void | Promise<void>;

type Suite = {
	name: string;
	afterEach: TestCallback[];
	beforeEach: TestCallback[];
};

type MockImplementation<TArgs extends unknown[] = unknown[], TResult = unknown> = (
	...args: TArgs
) => TResult;

type MockFunction<TArgs extends unknown[] = unknown[], TResult = unknown> = ((
	...args: TArgs
) => TResult) & {
	mockClear: () => void;
	mockRejectedValueOnce: (value: unknown) => MockFunction<TArgs, TResult>;
	mockResolvedValueOnce: (value: Awaited<TResult>) => MockFunction<TArgs, TResult>;
	mockImplementation: (
		implementation: MockImplementation<TArgs, TResult>,
	) => MockFunction<TArgs, TResult>;
};

type AnyMockFunction = MockFunction<any[], any>;

const registeredMocks = new Set<AnyMockFunction>();
const suiteStack: Suite[] = [];

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function createAssertionError(message: string): Error {
	return new Error(message);
}

function deepEqual(a: unknown, b: unknown): boolean {
	if (Object.is(a, b)) {
		return true;
	}

	if (a instanceof Date && b instanceof Date) {
		return a.getTime() === b.getTime();
	}

	if (Array.isArray(a) && Array.isArray(b)) {
		return a.length === b.length && a.every((value, index) => deepEqual(value, b[index]));
	}

	if (isRecord(a) && isRecord(b)) {
		const aKeys = Object.keys(a);
		const bKeys = Object.keys(b);

		return (
			aKeys.length === bKeys.length &&
			aKeys.every((key) => bKeys.includes(key) && deepEqual(a[key], b[key]))
		);
	}

	return false;
}

function objectMatches(
	actual: Record<string, unknown>,
	expected: Record<string, unknown>,
): boolean {
	return Object.entries(expected).every(([key, value]) => {
		if (!(key in actual)) {
			return false;
		}

		const actualValue = actual[key];

		if (isRecord(value) && isRecord(actualValue)) {
			return objectMatches(actualValue, value);
		}

		return deepEqual(actualValue, value);
	});
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

	mockFn.mockRejectedValueOnce = (value: unknown) => {
		queue.push(() => Promise.reject(value) as TResult);

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
			if (!deepEqual(actual, expected)) {
				throw createAssertionError("Expected values to be deeply equal");
			}
		},
		toStrictEqual(expected: unknown) {
			if (!deepEqual(actual, expected)) {
				throw createAssertionError("Expected values to be strictly equal");
			}
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

			if (!actual.some((value) => deepEqual(value, expected))) {
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
			if (actual === undefined || actual === null) {
				throw createAssertionError("Expected value to be defined");
			}
		},
		toBeUndefined() {
			if (actual !== undefined) {
				throw createAssertionError(`Expected ${String(actual)} to be undefined`);
			}
		},
		toBeTruthy() {
			if (!actual) {
				throw createAssertionError(`Expected ${String(actual)} to be truthy`);
			}
		},
		toBeInstanceOf(expected: new (...args: any[]) => unknown) {
			if (!(actual instanceof expected)) {
				throw createAssertionError(`Expected value to be instance of ${expected.name}`);
			}
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
			if (!isRecord(actual) || !objectMatches(actual, expected)) {
				throw createAssertionError("Expected object to match");
			}
		},
		get rejects() {
			return {
				async toThrow(expected?: new (...args: any[]) => unknown) {
					try {
						await (actual as Promise<unknown>);
					} catch (error) {
						if (expected && !(error instanceof expected)) {
							throw createAssertionError(`Expected error to be instance of ${expected.name}`);
						}

						return;
					}

					throw createAssertionError("Expected promise to reject");
				},
			};
		},
	};
}

async function runHooks(hooks: TestCallback[]) {
	for (const hook of hooks) {
		await hook();
	}
}

function currentSuiteChain() {
	return [...suiteStack];
}

type DescribeFunction = ((name: string, callback: TestCallback) => void) & {
	skip: (name: string, callback: TestCallback) => void;
};

const describe: DescribeFunction = (name, callback) => {
	suiteStack.push({
		afterEach: [],
		beforeEach: [],
		name,
	});

	try {
		callback();
	} finally {
		suiteStack.pop();
	}
};

describe.skip = () => {};

export function beforeEach(callback: TestCallback) {
	const currentSuite = suiteStack.at(-1);

	if (!currentSuite) {
		throw new Error("beforeEach must be used inside describe");
	}

	currentSuite.beforeEach.push(callback);
}

export function afterEach(callback: TestCallback) {
	const currentSuite = suiteStack.at(-1);

	if (!currentSuite) {
		throw new Error("afterEach must be used inside describe");
	}

	currentSuite.afterEach.push(callback);
}

export function it(name: string, callback: TestCallback, timeout?: number) {
	const suites = currentSuiteChain();
	const testName = [...suites.map((suite) => suite.name), name].join(" > ");

	Deno.test({
		fn: async () => {
			await runHooks(suites.flatMap((suite) => suite.beforeEach));

			try {
				await callback();
			} finally {
				await runHooks([...suites].reverse().flatMap((suite) => suite.afterEach));
			}
		},
		name: testName,
		sanitizeOps: false,
		sanitizeResources: false,
		...(timeout ? { sanitizeExit: false } : {}),
	});
}

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

export { describe };
