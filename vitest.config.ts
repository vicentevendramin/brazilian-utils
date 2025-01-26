import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		browser: {
			provider: "webdriverio",
			instances: [
				{ browser: "edge" },
				{ browser: "chrome" },
				{ browser: "safari", headless: false },
				{ browser: "firefox" },
			],
		},
	},
});
