#!/usr/bin/env bun

import { resolve } from "node:path";

const scriptsDir = import.meta.dir;

const cities = Bun.spawn(["bun", resolve(scriptsDir, "cities.ts")], {
	stdout: "inherit",
	stderr: "inherit",
});

const states = Bun.spawn(["bun", resolve(scriptsDir, "states.ts")], {
	stdout: "inherit",
	stderr: "inherit",
});

const [citiesResult, statesResult] = await Promise.all([
	cities.exited,
	states.exited,
]);

if (citiesResult !== 0 || statesResult !== 0) {
	process.exit(1);
}

// Now run biome check on both generated files in parallel
const biomeCities = Bun.spawn(
	["biome", "check", "--write", "./src/_internals/constants/cities.ts"],
	{
		stdout: "inherit",
		stderr: "inherit",
	},
);

const biomeStates = Bun.spawn(
	["biome", "check", "--write", "./src/_internals/constants/states.ts"],
	{
		stdout: "inherit",
		stderr: "inherit",
	},
);

const [biomeCitiesResult, biomeStatesResult] = await Promise.all([
	biomeCities.exited,
	biomeStates.exited,
]);

if (biomeCitiesResult !== 0 || biomeStatesResult !== 0) {
	process.exit(1);
}

process.exit(0);
