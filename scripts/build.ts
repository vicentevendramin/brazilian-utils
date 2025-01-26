import { type BuildConfig, build } from "bun";
import dts from "bun-plugin-dts";

const CONFIG: BuildConfig = {
	minify: true,
	outdir: "./dist",
	plugins: [dts()],
	splitting: true,
	sourcemap: "linked",
	entrypoints: ["./src/index.ts"],
};

await Promise.all([
	build({
		...CONFIG,
		naming: "[dir]/brazilian-utils.esm.[ext]",
		format: "esm",
	}),
	build({
		...CONFIG,
		naming: "[dir]/brazilian-utils.esm.[ext]",
		format: "cjs",
	}),
]);
