import { resolve } from "node:path";
import { write } from "bun";

type City = {
	id: number;
	nome: string;
	microrregiao: {
		id: number;
		nome: string;
		mesorregiao: {
			id: number;
			nome: string;
			UF: {
				id: number;
				sigla: string;
				nome: string;
				regiao: {
					id: number;
					sigla: string;
					nome: string;
				};
			};
		};
	};
};

/**
 * https://servicodados.ibge.gov.br/api/docs/localidades?versao=1
 */
const response = await fetch(
	"https://servicodados.ibge.gov.br/api/v1/localidades/municipios",
);
const json = (await response.json()) as City[];

const cities = json
	.sort((cityA, cityB) => (cityA.nome > cityB.nome ? 1 : -1))
	.reduce(
		(acc, city) => {
			const stateInitials = city.microrregiao.mesorregiao.UF.sigla;
			if (!acc[stateInitials]) {
				acc[stateInitials] = [];
			}
			acc[stateInitials].push(city.nome);
			return acc;
		},
		{} as Record<string, string[]>,
	);

write(
	resolve(import.meta.dir, "..", "./src/_internals/cities.ts"),
	`export const DATA = ${JSON.stringify(cities, null, 2)}`,
);
