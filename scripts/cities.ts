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

await write(
	resolve(import.meta.dir, "..", "./src/_internals/cities.ts"),
	`/**
 * A collection of Brazilian cities categorized by their respective states.
 * 
 * @constant
 * @type {Object}
 * @property {string[]} GO - Cities in the state of Goiás.
 * @property {string[]} MG - Cities in the state of Minas Gerais.
 * @property {string[]} PA - Cities in the state of Pará.
 * @property {string[]} CE - Cities in the state of Ceará.
 * @property {string[]} BA - Cities in the state of Bahia.
 * @property {string[]} PR - Cities in the state of Paraná.
 * @property {string[]} SC - Cities in the state of Santa Catarina.
 * @property {string[]} PE - Cities in the state of Pernambuco.
 * @property {string[]} TO - Cities in the state of Tocantins.
 * @property {string[]} RN - Cities in the state of Rio Grande do Norte.
 * @property {string[]} PI - Cities in the state of Piauí.
 * @property {string[]} RS - Cities in the state of Rio Grande do Sul.
 * @property {string[]} MT - Cities in the state of Mato Grosso.
 * @property {string[]} AC - Cities in the state of Acre.
 * @property {string[]} SP - Cities in the state of São Paulo.
 * @property {string[]} ES - Cities in the state of Espírito Santo.
 * @property {string[]} MA - Cities in the state of Maranhão.
 */
export const DATA = ${JSON.stringify(cities)}`,
);
