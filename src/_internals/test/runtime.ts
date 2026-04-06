const runtimeModule =
	"Bun" in globalThis
		? await import("./runtime-bun")
		: "Deno" in globalThis
			? await import("./runtime-deno")
			: await import("./runtime-vitest");

export const { afterEach, beforeEach, describe, expect, it, test, vi } = runtimeModule;
