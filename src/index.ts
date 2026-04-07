export { type CapitalizeOptions, capitalize } from "./capitalize/capitalize";
export { type FormatBoletoOptions, formatBoleto } from "./format-boleto/format-boleto";
export { type FormatCepOptions, formatCep } from "./format-cep/format-cep";
export { type FormatCnpjOptions, formatCnpj } from "./format-cnpj/format-cnpj";
export { type FormatCpfOptions, formatCpf } from "./format-cpf/format-cpf";
export { type FormatCurrencyOptions, formatCurrency } from "./format-currency/format-currency";
export { formatPassport } from "./format-passport/format-passport";
export { type FormatPhoneOptions, formatPhone } from "./format-phone/format-phone";
export { type FormatPisOptions, formatPis } from "./format-pis/format-pis";
export {
	type FormatProcessoJuridicoOptions,
	formatProcessoJuridico,
} from "./format-processo-juridico/format-processo-juridico";
export { generateBoleto } from "./generate-boleto/generate-boleto";
export { generateCnpj } from "./generate-cnpj/generate-cnpj";
export { generateCpf } from "./generate-cpf/generate-cpf";
export { generatePassport } from "./generate-passport/generate-passport";
export {
	GetAddressInfoByCepError,
	GetAddressInfoByCepNotFoundError,
	type GetAddressInfoByCepOptions,
	GetAddressInfoByCepServiceError,
	GetAddressInfoByCepValidationError,
	getAddressInfoByCep,
} from "./get-address-info-by-cep/get-address-info-by-cep";
export { getBoletoInfo } from "./get-boleto-info/get-boleto-info";
export { getCities } from "./get-cities/get-cities";
export { type GetHolidaysOptions, getHolidays } from "./get-holidays/get-holidays";
export { getStates } from "./get-states/get-states";
export {
	type IsValidBankAccountParams,
	isValidBankAccount,
} from "./is-valid-bank-account/is-valid-bank-account";
export { isValidBoleto } from "./is-valid-boleto/is-valid-boleto";
export { isValidCep } from "./is-valid-cep/is-valid-cep";
export { isValidCnpj } from "./is-valid-cnpj/is-valid-cnpj";
export { isValidCpf } from "./is-valid-cpf/is-valid-cpf";
export { isValidEmail } from "./is-valid-email/is-valid-email";
export { isValidIe } from "./is-valid-ie/is-valid-ie";
export { isValidLandlinePhone } from "./is-valid-landline-phone/is-valid-landline-phone";
export { isValidLicensePlate } from "./is-valid-license-plate/is-valid-license-plate";
export {
	type IsValidMobilePhoneOptions,
	isValidMobilePhone,
} from "./is-valid-mobile-phone/is-valid-mobile-phone";
export { isValidPassport } from "./is-valid-passport/is-valid-passport";
export { type IsValidPhoneOptions, isValidPhone } from "./is-valid-phone/is-valid-phone";
export { isValidPis } from "./is-valid-pis/is-valid-pis";
export { isValidProcessoJuridico } from "./is-valid-processo-juridico/is-valid-processo-juridico";
export { isValidRenavam } from "./is-valid-renavam/is-valid-renavam";
export { parseBoleto } from "./parse-boleto/parse-boleto";
export { parseCep } from "./parse-cep/parse-cep";
export { parseCnpj } from "./parse-cnpj/parse-cnpj";
export { parseCpf } from "./parse-cpf/parse-cpf";
export { parseCurrency } from "./parse-currency/parse-currency";
export { parsePassport } from "./parse-passport/parse-passport";
export { parsePhone } from "./parse-phone/parse-phone";
export { parsePis } from "./parse-pis/parse-pis";
export { parseProcessoJuridico } from "./parse-processo-juridico/parse-processo-juridico";

// ============================================================================
// DEPRECATED EXPORTS - Will be removed in v3.0.0
// ============================================================================

/**
 * @deprecated Use `formatCep` instead. This alias will be removed in v3.0.0
 */
export { formatCep as formatCEP } from "./format-cep/format-cep";

/**
 * @deprecated Use `formatCnpj` instead. This alias will be removed in v3.0.0
 */
export { formatCnpj as formatCNPJ } from "./format-cnpj/format-cnpj";

/**
 * @deprecated Use `formatCpf` instead. This alias will be removed in v3.0.0
 */
export { formatCpf as formatCPF } from "./format-cpf/format-cpf";
/**
 * @deprecated Use `generateCnpj` instead. This alias will be removed in v3.0.0
 */
export { generateCnpj as generateCNPJ } from "./generate-cnpj/generate-cnpj";
/**
 * @deprecated Use `generateCpf` instead. This alias will be removed in v3.0.0
 */
export { generateCpf as generateCPF } from "./generate-cpf/generate-cpf";
/**
 * @deprecated Use `isValidCep` instead. This alias will be removed in v3.0.0
 */
export { isValidCep as isValidCEP } from "./is-valid-cep/is-valid-cep";
/**
 * @deprecated Use `isValidCnpj` instead. This alias will be removed in v3.0.0
 */
export { isValidCnpj as isValidCNPJ } from "./is-valid-cnpj/is-valid-cnpj";
/**
 * @deprecated Use `isValidCpf` instead. This alias will be removed in v3.0.0
 */
export { isValidCpf as isValidCPF } from "./is-valid-cpf/is-valid-cpf";
/**
 * @deprecated Use `isValidIe` instead. This alias will be removed in v3.0.0
 */
export { isValidIe as isValidIE } from "./is-valid-ie/is-valid-ie";
/**
 * @deprecated Use `isValidPis` instead. This alias will be removed in v3.0.0
 */
export { isValidPis as isValidPIS } from "./is-valid-pis/is-valid-pis";
