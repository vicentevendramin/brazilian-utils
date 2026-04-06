#!/usr/bin/env node

import { writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = dirname(fileURLToPath(import.meta.url));

type State = {
	id: number;
	sigla: string;
	nome: string;
	regiao: {
		id: number;
		sigla: string;
		nome: string;
	};
};

const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");

const json = (await response.json()) as State[];

const states = json
	.sort((cityA, cityB) => (cityA.nome > cityB.nome ? 1 : -1))
	.map((state) => ({
		code: state.sigla,
		name: state.nome,
		regionCode: state.regiao.sigla,
		regionName: state.regiao.nome,
	}));

await writeFile(
	resolve(scriptsDir, "..", "./src/_internals/constants/states.ts"),
	`/**
 * @type {Array<{code: string, name: string, regionCode: string, regionName: string}>}
 */
export const DATA = ${JSON.stringify(states)} as const

export type State = (typeof DATA)[number];

export type StateName = (typeof DATA)[number]["name"];

export type StateCode = (typeof DATA)[number]["code"];`,
);
