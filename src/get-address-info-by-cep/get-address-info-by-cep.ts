/**
 * based on https://github.com/BrasilAPI/cep-promise
 */
import { sanitizeToDigits } from "../_internals/sanitize-to-digits/sanitize-to-digits";
import { isValidCep } from "../is-valid-cep/is-valid-cep";

export class GetAddressInfoByCepError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "GetAddressInfoByCepError";
	}
}

export class GetAddressInfoByCepValidationError extends GetAddressInfoByCepError {
	constructor(message: string) {
		super(message);
		this.name = "GetAddressInfoByCepValidationError";
	}
}

export class GetAddressInfoByCepNotFoundError extends GetAddressInfoByCepError {
	constructor(message: string) {
		super(message);
		this.name = "GetAddressInfoByCepNotFoundError";
	}
}

export class GetAddressInfoByCepServiceError extends GetAddressInfoByCepError {
	constructor(message: string) {
		super(message);
		this.name = "GetAddressInfoByCepServiceError";
	}
}

export type AddressInfo = {
	cep: string;
	state: string;
	city: string;
	neighborhood: string;
	street: string;
};

export type CepProvider = "viacep" | "widenet" | "brasilapi";

export type GetAddressInfoByCepOptions = {
	providers?: CepProvider[];
};

type ViaCepResponse = {
	cep?: string;
	logradouro?: string;
	complemento?: string;
	bairro?: string;
	localidade?: string;
	uf?: string;
	erro?: boolean;
};

type WidenetResponse = {
	code?: string;
	status?: number;
	ok?: boolean;
	state?: string;
	city?: string;
	district?: string;
	address?: string;
	message?: string;
};

type BrasilApiResponse = {
	cep?: string;
	state?: string;
	city?: string;
	neighborhood?: string;
	street?: string;
	errors?: Array<{ message: string }>;
};

const fetchViaCep = async (cep: string): Promise<AddressInfo> => {
	const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

	if (!response.ok) {
		throw new Error(`ViaCEP request failed with status ${response.status}`);
	}

	const data = (await response.json()) as ViaCepResponse;

	if (data.erro || !data.cep) {
		throw new GetAddressInfoByCepNotFoundError("CEP não encontrado");
	}

	return {
		cep: data.cep.replace(/\D/g, ""),
		state: data.uf || "",
		city: data.localidade || "",
		neighborhood: data.bairro || "",
		street: data.logradouro || "",
	};
};

const fetchWidenet = async (cep: string): Promise<AddressInfo> => {
	const response = await fetch(
		`https://apps.widenet.com.br/busca-cep/api/cep/${cep}.json`,
	);

	if (!response.ok) {
		throw new Error(`Widenet request failed with status ${response.status}`);
	}

	const data = (await response.json()) as WidenetResponse;

	if (data.status !== 200 || !data.ok || !data.code) {
		throw new GetAddressInfoByCepNotFoundError("CEP não encontrado");
	}

	return {
		cep: data.code.replace(/\D/g, ""),
		state: data.state || "",
		city: data.city || "",
		neighborhood: data.district || "",
		street: data.address || "",
	};
};

const fetchBrasilApi = async (cep: string): Promise<AddressInfo> => {
	const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);

	if (!response.ok) {
		throw new Error(`BrasilAPI request failed with status ${response.status}`);
	}

	const data = (await response.json()) as BrasilApiResponse;

	if (data.errors || !data.cep) {
		throw new GetAddressInfoByCepNotFoundError("CEP não encontrado");
	}

	return {
		cep: data.cep.replace(/\D/g, ""),
		state: data.state || "",
		city: data.city || "",
		neighborhood: data.neighborhood || "",
		street: data.street || "",
	};
};

const providerMap: Record<CepProvider, (cep: string) => Promise<AddressInfo>> =
	{
		viacep: fetchViaCep,
		widenet: fetchWidenet,
		brasilapi: fetchBrasilApi,
	};

/**
 * Fetches address information for a given CEP using multiple providers simultaneously.
 * Returns the result from the first provider that responds successfully.
 *
 * @param {string|number} cep - The CEP (Brazilian postal code) to search for. Can be a string or number.
 * @param {GetAddressInfoByCepOptions} options - Optional configuration for the function.
 * @param {CepProvider[]} options.providers - List of providers to use. Defaults to all providers if not specified.
 * @returns {Promise<AddressInfo>} A promise that resolves to the address information.
 * @throws {GetAddressInfoByCepValidationError} If the CEP format is invalid.
 * @throws {GetAddressInfoByCepNotFoundError} If the CEP is not found in any of the services.
 * @throws {GetAddressInfoByCepServiceError} If all services are unavailable.
 *
 * @example
 * ```typescript
 * // Using all providers (default)
 * const address = await getAddressInfoByCep("01310100");
 *
 * // Using specific providers
 * const address = await getAddressInfoByCep("01310-100", {
 *   providers: ["viacep", "brasilapi"]
 * });
 *
 * // Using number input
 * const address = await getAddressInfoByCep(1310100);
 * ```
 */
export const getAddressInfoByCep = async (
	cep: string | number,
	options?: GetAddressInfoByCepOptions,
): Promise<AddressInfo> => {
	let cepString = sanitizeToDigits(cep);

	if (typeof cep === "number" && cepString.length < 8) {
		cepString = cepString.padStart(8, "0");
	}

	if (!isValidCep(cepString)) {
		throw new GetAddressInfoByCepValidationError("CEP inválido");
	}

	let providersToUse: CepProvider[];
	if (options?.providers !== undefined) {
		if (options.providers.length === 0) {
			throw new GetAddressInfoByCepValidationError(
				"Nenhum provedor válido especificado",
			);
		}
		providersToUse = options.providers.filter((p) => p in providerMap);
		if (providersToUse.length === 0) {
			throw new GetAddressInfoByCepValidationError(
				"Nenhum provedor válido especificado",
			);
		}
	} else {
		providersToUse = ["viacep", "widenet", "brasilapi"] as CepProvider[];
	}

	const providerPromises = providersToUse.map((provider) =>
		providerMap[provider](cepString).catch((error) => {
			return Promise.reject({ provider, error });
		}),
	);

	try {
		return await Promise.any(providerPromises);
	} catch {
		const results = await Promise.allSettled(providerPromises);

		const rejections = results.filter(
			(result) => result.status === "rejected",
		) as PromiseRejectedResult[];

		const notFoundErrors = rejections.filter((rejection) => {
			const error = rejection.reason?.error || rejection.reason;
			return error instanceof GetAddressInfoByCepNotFoundError;
		});

		const networkErrors = rejections.filter((rejection) => {
			const error = rejection.reason?.error || rejection.reason;
			return !(error instanceof GetAddressInfoByCepNotFoundError);
		});

		if (notFoundErrors.length === rejections.length) {
			throw new GetAddressInfoByCepNotFoundError(
				"CEP não encontrado em nenhum serviço",
			);
		}

		if (networkErrors.length === rejections.length) {
			throw new GetAddressInfoByCepServiceError(
				"Todos os serviços estão fora de serviço ou indisponíveis",
			);
		}

		if (notFoundErrors.length > 0) {
			throw new GetAddressInfoByCepNotFoundError(
				"CEP não encontrado em nenhum serviço",
			);
		}

		throw new GetAddressInfoByCepServiceError(
			"Erro ao consultar os serviços de CEP",
		);
	}
};
