# Utilities

Here you will find all the utilities available for use.

## isValidCpf

Check if CPF is valid.

```javascript
import { isValidCpf } from '@brazilian-utils/brazilian-utils';

isValidCpf('155151475'); // false
```

## formatCpf

Format CPF.

```javascript
import { formatCpf } from '@brazilian-utils/brazilian-utils';

formatCpf('74650688000'); // 746.506.880-00
formatCpf('746506880', { pad: true }); // 007.465.068-80
```

## parseCpf

Remove CPF formatting and return only digits.

```javascript
import { parseCpf } from '@brazilian-utils/brazilian-utils';

parseCpf('746.506.880-00'); // 74650688000
```

## generateCpf

Generate a valid random CPF.

```javascript
import { generateCpf } from '@brazilian-utils/brazilian-utils'

generateCpf();
```

## isValidCnpj

Check if CNPJ is valid.

```javascript
import { isValidCnpj } from '@brazilian-utils/brazilian-utils';

isValidCnpj('15515147234255'); // false
```

## formatCnpj

Format CNPJ.

```javascript
import { formatCnpj } from '@brazilian-utils/brazilian-utils';

formatCnpj('24522200000174'); // 24.522.200/0001-74
formatCnpj('245222000174', { pad: true }); // 00.245.222/0001-74
formatCnpj('12OUT345000199', { version: 2 }); // 12.OUT.345/0001-99
```

## parseCnpj

Remove CNPJ formatting and return a normalized value.

```javascript
import { parseCnpj } from '@brazilian-utils/brazilian-utils';

parseCnpj('24.522.200/0001-74'); // 24522200000174
parseCnpj('12.OUT.345/0001-99', { version: 2 }); // 12OUT345000199
```

## isValidCep

Check if CEP ([brazilian postal code](https://en.wikipedia.org/wiki/C%C3%B3digo_de_Endere%C3%A7amento_Postal)) is valid.

```javascript
import { isValidCep } from '@brazilian-utils/brazilian-utils';

isValidCep('92500000'); // true
```

## generateCnpj

Generate a valid random CNPJ.

```javascript
import { generateCnpj } from '@brazilian-utils/brazilian-utils'

generateCnpj();
```

## isValidBoleto

Check if boleto ([brazilian payment method](https://en.wikipedia.org/wiki/Boleto)) is valid.

```javascript
import { isValidBoleto } from '@brazilian-utils/brazilian-utils';

isValidBoleto('00190000090114971860168524522114675860000102656'); // true
```

## formatBoleto

Format a boleto number.

```javascript
import { formatBoleto } from '@brazilian-utils/brazilian-utils';

formatBoleto('00190000090114971860168524522114675860000102656'); // 00190.00009 01149.718601 68524.522114 6 75860000102656
formatBoleto('1900000901149', { pad: true }); // 00000.00000 00000.000019 00000.901149 0 00000000000000
```

## parseBoleto

Remove boleto formatting and return only digits.

```javascript
import { parseBoleto } from '@brazilian-utils/brazilian-utils';

parseBoleto('00190.00009 01149.718601 68524.522114 6 75860000102656'); // 00190000090114971860168524522114675860000102656
```

## generateBoleto

Generate a valid random boleto.

```javascript
import { generateBoleto } from '@brazilian-utils/brazilian-utils';

generateBoleto(); // "00190000090114971860168524522114675860000102656"
```

## getBoletoInfo

Extract information from a boleto (amount, expiration date, bank code).

```javascript
import { getBoletoInfo } from '@brazilian-utils/brazilian-utils';

getBoletoInfo('00190000090114971860168524522114675860000102656');
// { amount: 102656, expirationDate: Date, bankCode: '001' }
```

## isValidEmail

Check if email is valid.

```javascript
import { isValidEmail } from '@brazilian-utils/brazilian-utils';

isValidEmail('john.doe@hotmail.com'); // true
```

## isValidPhone

Check if phone number (mobile or landline) is valid.

```javascript
import { isValidPhone } from '@brazilian-utils/brazilian-utils';

isValidPhone('11900000000'); // true
```

## formatPhone

Format phone number according to Brazilian patterns.

```javascript
import { formatPhone } from '@brazilian-utils/brazilian-utils';

formatPhone('11900000000'); // 90000-0000
formatPhone('11900000000', { mask: 'nanp' }); // (11) 90000-0000
formatPhone('11900000000', { mask: 'auto' }); // Automatically detects mask based on length
```

## parsePhone

Remove phone formatting and return only digits.

```javascript
import { parsePhone } from '@brazilian-utils/brazilian-utils';

parsePhone('(11) 90000-0000'); // 11900000000
```

## isValidMobilePhone

Check if mobile phone number is valid.

```javascript
import { isValidMobilePhone } from '@brazilian-utils/brazilian-utils';

isValidMobilePhone('11900000000'); // true
```

## isValidLandlinePhone

Check if landline phone number is valid.

```javascript
import { isValidLandlinePhone } from '@brazilian-utils/brazilian-utils';

isValidLandlinePhone('1130000000'); // true
```

## isValidLicensePlate

Check if license plate is valid. Supports the old Brazilian format (ABC-1234) and the Mercosul formats for cars (ABC1D23) and motorcycles (ABC12D3).

```javascript
import { isValidLicensePlate } from '@brazilian-utils/brazilian-utils';

isValidLicensePlate('ABC1234'); // true (Brazilian format)
isValidLicensePlate('ABC-1234'); // true (Brazilian format with hyphen)
isValidLicensePlate('ABC1D23'); // true (Mercosul car format)
isValidLicensePlate('ABC12D3'); // true (Mercosul motorcycle format)
```

## isValidRenavam

Check if RENAVAM (Registro Nacional de Veículos Automotores) is valid. Supports both the old format (9 digits) and the new format (11 digits).

```javascript
import { isValidRenavam } from '@brazilian-utils/brazilian-utils';

isValidRenavam('639884962'); // true (9 digits, old format)
isValidRenavam('00639884962'); // true (11 digits, new format)
isValidRenavam('12345678901'); // false (invalid checksum)
```

## isValidPis

Check if PIS is valid.

```javascript
import { isValidPis } from '@brazilian-utils/brazilian-utils';

isValidPis('12056412547'); // false
```

## formatPis

Format PIS number.

```javascript
import { formatPis } from '@brazilian-utils/brazilian-utils';

formatPis('12345678901'); // 123.45678.90-1
formatPis('123456789', { pad: true }); // 001.23456.78-9
```

## parsePis

Remove PIS formatting and return only digits.

```javascript
import { parsePis } from '@brazilian-utils/brazilian-utils';

parsePis('123.45678.90-1'); // 12345678901
```

## formatCep

Format CEP ([brazilian postal code](https://en.wikipedia.org/wiki/C%C3%B3digo_de_Endere%C3%A7amento_Postal)).

```javascript
import { formatCep } from '@brazilian-utils/brazilian-utils';

formatCep('92500000'); // 92500-000
```

## parseCep

Remove CEP formatting and return only digits.

```javascript
import { parseCep } from '@brazilian-utils/brazilian-utils';

parseCep('92500-000'); // 92500000
```

## getAddressInfoByCep

Fetch address information for a given CEP using multiple providers.

```javascript
import { getAddressInfoByCep } from '@brazilian-utils/brazilian-utils';

// Using all providers (default)
const address = await getAddressInfoByCep('01310100');
// { cep: '01310100', state: 'SP', city: 'São Paulo', neighborhood: 'Bela Vista', street: 'Avenida Paulista' }

// Using specific providers
const address = await getAddressInfoByCep('01310-100', {
  providers: ['viacep', 'brasilapi']
});

// Using number input (will be padded automatically)
const address = await getAddressInfoByCep(1310100);
```

## isValidProcessoJuridico

Validate the processo jurídico number according to [CNJ's definition](https://www.conjur.com.br/dl/resolucao-65-cnj.pdf).

```javascript
import { isValidProcessoJuridico } from '@brazilian-utils/brazilian-utils';

isValidProcessoJuridico('00020802520125150049'); // true
```

## formatProcessoJuridico

Format the processo jurídico number according to [CNJ's definition](https://www.conjur.com.br/dl/resolucao-65-cnj.pdf).

```javascript
import { formatProcessoJuridico } from '@brazilian-utils/brazilian-utils';

formatProcessoJuridico('00020802520125150049'); // 0002080-25.2012.515.0049
```

## parseProcessoJuridico

Remove processo jurídico formatting and return only digits.

```javascript
import { parseProcessoJuridico } from '@brazilian-utils/brazilian-utils';

parseProcessoJuridico('0002080-25.2012.515.0049'); // 00020802520125150049
```

## isValidIe

Check if inscrição estadual (state registration) is valid.

```javascript
import { isValidIe } from '@brazilian-utils/brazilian-utils';

isValidIe('AC', '0187634580933'); // false
```

## isValidBankAccount

Check if a Brazilian bank account is valid. Supports specific validation algorithms for major banks (Banco do Brasil, Itaú, Bradesco, Santander, Caixa Econômica Federal) and generic mod10/mod11 validation for other banks.

```javascript
import { isValidBankAccount } from '@brazilian-utils/brazilian-utils';

isValidBankAccount({
  bankCode: '001',
  agency: '1234',
  account: '12345678',
  digit: '5'
}); // true (if valid Banco do Brasil account)

isValidBankAccount({
  bankCode: '341',
  agency: '1234',
  account: '12345',
  digit: '6'
}); // true (if valid Itaú account)
```

## capitalize

Transforms the first letter into a capital one of each word ignoring prepositions.

```javascript
import { capitalize } from '@brazilian-utils/brazilian-utils';

capitalize('josé e maria'); // José e Maria
capitalize('josé Ama MARIA', { lowerCaseWords: ['ama'] }); // José ama Maria
capitalize('doc inválido', { upperCaseWords: ['DOC'] }); // DOC Inválido
```

## formatCurrency

Formats an integer or float to a string in the BRL pattern

```javascript
import { formatCurrency } from '@brazilian-utils/brazilian-utils';

formatCurrency(10); // 10,00
formatCurrency(10756.11); // 10.756,11
formatCurrency(10756.123, { precision: 3 }); // 10.756,123
```

## parseCurrency

Transforms a string to an integer or float format

```javascript
import { parseCurrency } from '@brazilian-utils/brazilian-utils';

parseCurrency('10.756,11'); // 10756.11
parseCurrency('R$ 10.59'); // 10.59
```

## getStates

Get all Brazilian states.

```javascript
import { getStates } from '@brazilian-utils/brazilian-utils';

getStates();
// [
//   { code: 'AC', name: 'Acre' },
//   { code: 'AL', name: 'Alagoas' },
//   { code: 'AP', name: 'Amapá' },
//   { code: 'AM', name: 'Amazonas' },
//   { code: 'BA', name: 'Bahia' },
//   { code: 'CE', name: 'Ceará' },
//   { code: 'DF', name: 'Distrito Federal' },
//   { code: 'ES', name: 'Espírito Santo' },
//   { code: 'GO', name: 'Goiás' },
//   { code: 'MA', name: 'Maranhão' },
//   { code: 'MT', name: 'Mato Grosso' },
//   { code: 'MS', name: 'Mato Grosso do Sul' },
//   { code: 'MG', name: 'Minas Gerais' },
//   { code: 'PA', name: 'Pará' },
//   { code: 'PB', name: 'Paraíba' },
//   { code: 'PR', name: 'Paraná' },
//   { code: 'PE', name: 'Pernambuco' },
//   { code: 'PI', name: 'Piauí' },
//   { code: 'RJ', name: 'Rio de Janeiro' },
//   { code: 'RN', name: 'Rio Grande do Norte' },
//   { code: 'RS', name: 'Rio Grande do Sul' },
//   { code: 'RO', name: 'Rondônia' },
//   { code: 'RR', name: 'Roraima' },
//   { code: 'SC', name: 'Santa Catarina' },
//   { code: 'SP', name: 'São Paulo' },
//   { code: 'SE', name: 'Sergipe' },
//   { code: 'TO', name: 'Tocantins' },
// ]
```

## getCities

Get Brazilian cities. Returns all cities if no state is provided, or cities from a specific state.

```javascript
import { getCities } from '@brazilian-utils/brazilian-utils';

// Return all Brazilian cities (sorted alphabetically).
getCities();
// [
//   'Abadia de Goiás',
//   'Abadia dos Dourados',
//   'Abadiânia',
//   'Abaeté',
//   'Abaetetuba',
//   'Abaiara',
//   'Abaíra',
//   'Abaré',
//   'Abatiá',
//   'Abdon Batista',
//   ... 5460 more items
// ]

// Return all Brazilian cities of the São Paulo state (sorted alphabetically).
getCities('SP');
// [
//   "Adamantina",
//   "Adolfo",
//   "Aguaí",
//   "Águas da Prata",
//   "Águas de Lindóia",
//   "Águas de Santa Bárbara",
//   "Águas de São Pedro",
//   "Agudos",
//   "Alambari",
//   "Alfredo Marcondes",
//   ... 635 more items
// ]
```

## getHolidays

Get Brazilian holidays for a given year. Returns national holidays and optionally state-specific holidays.

```javascript
import { getHolidays } from '@brazilian-utils/brazilian-utils';

// Get all national holidays for 2024
getHolidays(2024);
// [
//   { name: 'Ano novo', date: Date('2024-01-01') },
//   { name: 'Carnaval (terça-feira)', date: Date('2024-02-13') },
//   { name: 'Sexta-feira Santa', date: Date('2024-03-29') },
//   { name: 'Páscoa', date: Date('2024-03-31') },
//   // ... more holidays
// ]

// Get holidays for a specific state
getHolidays({ year: 2024, stateCode: 'SP' });
// Includes national holidays plus state-specific holidays (e.g., "Revolução Constitucionalista")
```

## isValidPassport

Check if a Brazilian passport number is valid (2 uppercase letters followed by 6 digits).

```javascript
import { isValidPassport } from '@brazilian-utils/brazilian-utils';

isValidPassport('AB123456'); // true
isValidPassport('Ab123456'); // false
isValidPassport('12345678'); // false
```

## formatPassport

Format a Brazilian passport number (uppercase, without symbols).

```javascript
import { formatPassport } from '@brazilian-utils/brazilian-utils';

formatPassport('ab123456'); // 'AB123456'
formatPassport('AB-123.456'); // 'AB123456'
```

## generatePassport

Generate a random valid Brazilian passport number.

```javascript
import { generatePassport } from '@brazilian-utils/brazilian-utils';

generatePassport(); // 'RY393097'
```

## parsePassport

Remove symbols ('-', '.', and whitespaces) from a passport number.

```javascript
import { parsePassport } from '@brazilian-utils/brazilian-utils';

parsePassport('AB-123.456'); // 'AB123456'
parsePassport(' AB 123 456 '); // 'AB123456'
```
