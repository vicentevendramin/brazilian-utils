/**
 * @type {Array<{code: string, name: string, regionCode: string, regionName: string}>}
 */
export const DATA = [
	{ code: "AC", name: "Acre", regionCode: "N", regionName: "Norte" },
	{ code: "AL", name: "Alagoas", regionCode: "NE", regionName: "Nordeste" },
	{ code: "AP", name: "Amapá", regionCode: "N", regionName: "Norte" },
	{ code: "AM", name: "Amazonas", regionCode: "N", regionName: "Norte" },
	{ code: "BA", name: "Bahia", regionCode: "NE", regionName: "Nordeste" },
	{ code: "CE", name: "Ceará", regionCode: "NE", regionName: "Nordeste" },
	{ code: "DF", name: "Distrito Federal", regionCode: "CO", regionName: "Centro-Oeste" },
	{ code: "ES", name: "Espírito Santo", regionCode: "SE", regionName: "Sudeste" },
	{ code: "GO", name: "Goiás", regionCode: "CO", regionName: "Centro-Oeste" },
	{ code: "MA", name: "Maranhão", regionCode: "NE", regionName: "Nordeste" },
	{ code: "MT", name: "Mato Grosso", regionCode: "CO", regionName: "Centro-Oeste" },
	{ code: "MS", name: "Mato Grosso do Sul", regionCode: "CO", regionName: "Centro-Oeste" },
	{ code: "MG", name: "Minas Gerais", regionCode: "SE", regionName: "Sudeste" },
	{ code: "PR", name: "Paraná", regionCode: "S", regionName: "Sul" },
	{ code: "PB", name: "Paraíba", regionCode: "NE", regionName: "Nordeste" },
	{ code: "PA", name: "Pará", regionCode: "N", regionName: "Norte" },
	{ code: "PE", name: "Pernambuco", regionCode: "NE", regionName: "Nordeste" },
	{ code: "PI", name: "Piauí", regionCode: "NE", regionName: "Nordeste" },
	{ code: "RN", name: "Rio Grande do Norte", regionCode: "NE", regionName: "Nordeste" },
	{ code: "RS", name: "Rio Grande do Sul", regionCode: "S", regionName: "Sul" },
	{ code: "RJ", name: "Rio de Janeiro", regionCode: "SE", regionName: "Sudeste" },
	{ code: "RO", name: "Rondônia", regionCode: "N", regionName: "Norte" },
	{ code: "RR", name: "Roraima", regionCode: "N", regionName: "Norte" },
	{ code: "SC", name: "Santa Catarina", regionCode: "S", regionName: "Sul" },
	{ code: "SE", name: "Sergipe", regionCode: "NE", regionName: "Nordeste" },
	{ code: "SP", name: "São Paulo", regionCode: "SE", regionName: "Sudeste" },
	{ code: "TO", name: "Tocantins", regionCode: "N", regionName: "Norte" },
] as const;

export type State = (typeof DATA)[number];

export type StateName = (typeof DATA)[number]["name"];

export type StateCode = (typeof DATA)[number]["code"];
