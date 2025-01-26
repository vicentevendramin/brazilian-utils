import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		browser: {
			provider: "webdriverio",
			headless: false,
			instances: [
				{ browser: "edge" },
				{ browser: "chrome" },
				{ browser: "safari" },
				{ browser: "firefox" },
			],
		},
	},
});
