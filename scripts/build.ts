import { type BuildConfig, build } from "bun";
import dts from "bun-plugin-dts";

type CustomBuildConfig = Omit<BuildConfig, "naming"> & {
	naming: string;
};

const CONFIG: CustomBuildConfig = {
	minify: true,
	outdir: "./dist",
	naming: "[dir]/brazilian-utils.{format}.[ext]",
	plugins: [dts()],
	splitting: true,
	sourcemap: "linked",
	entrypoints: ["./src/index.ts"],
};

const FORMATS: Exclude<BuildConfig["format"], undefined>[] = ["esm", "cjs"];

for (const format of FORMATS) {
	build({
		...CONFIG,
		naming:
			typeof CONFIG.naming === "string"
				? CONFIG.naming.replace("{format}", format)
				: CONFIG.naming,
		format,
	});
}
