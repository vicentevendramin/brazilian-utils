# Guia de Migração: v1 para v2

Este guia irá ajudá-lo a migrar do Brazilian Utils v1.x para v2.0.0.

## Melhorias na v2.0.0

A versão 2.0.0 traz melhorias significativas em arquitetura, ferramentas e experiência do desenvolvedor:

### 🎯 Melhor Tree Shaking

A biblioteca agora usa exports de módulos ES modernos com o campo `exports` adequado no `package.json`, permitindo melhor tree shaking em bundlers modernos. Você pode importar apenas o que precisa:

```javascript
// Apenas as funções que você importar serão incluídas no seu bundle
import { isValidCpf, formatCpf } from '@brazilian-utils/brazilian-utils';
```

### 📁 Estrutura Mais Simples

O código foi reorganizado para melhor manutenibilidade:
- **v1**: Estrutura complexa com diretórios separados `utilities/` e `helpers/`
- **v2**: Estrutura plana com utilitários internos no diretório `_internals/`
- Cada utilitário é autocontido em seu próprio diretório
- Caminhos de importação mais limpos e melhor organização do código

### 🔧 Ferramentas Modernas

Atualizado para ferramentas modernas e mais rápidas:
- **Build**: Migrado de `tsdx` para **Bun** para builds e scripts mais rápidos
- **Testes**: Migrado de `jest` para **Vitest** (mais rápido, compatível com Jest, nativo ESM)
- **Linting/Formatação**: Migrado de `prettier` + `eslint` para **Biome** (mais rápido, tudo-em-um)
- **TypeScript**: Configuração moderna otimizada para bundlers

### 🌐 Testes em Browsers

Agora inclui suporte para testes cross-browser:
- Testes rodam em browsers reais (Chrome, Firefox, Safari, Edge)
- Garante compatibilidade entre diferentes ambientes de browser
- Melhor confiança na funcionalidade cross-platform

Execute testes em browsers com:
```bash
npm run test:chrome-browser
npm run test:firefox-browser
npm run test:safari-browser
npm run test:edge-browser
```

### 📦 Menos Dependências

Redução de dependências de desenvolvimento mantendo zero dependências de runtime:
- **v1**: Múltiplas ferramentas (tsdx, jest, prettier, eslint, husky, lint-staged, commitlint, etc.)
- **v2**: Dependências mínimas (biome, vitest, webdriverio, tipos do bun)
- Manutenção mais simples e pipelines CI/CD mais rápidos
- Zero dependências de runtime (mantido)

### ✨ Novas Funções

Adicionadas novas utilitários úteis:
- `getHolidays` - Obtém feriados brasileiros (nacionais e estaduais)
- `getBoletoInfo` - Extrai informações de boleto (valor, vencimento, código do banco)
- `formatPhone` - Formata números de telefone com padrões brasileiros
- `formatBoleto` - Formata números de boleto
- `generateBoleto` - Gera números de boleto válidos aleatórios
- `formatPis` - Formata números de PIS
- `isValidRenavam` - Valida RENAVAM (número de registro de veículos)
- `describeNumber` - Converte números para texto em português (por extenso) com suporte para estilos normal, currency (monetário) e percentage (porcentagem)

### 📈 Melhor Suporte TypeScript

- Configuração TypeScript moderna otimizada para bundlers
- Melhor inferência de tipos e exports
- Experiência do desenvolvedor melhorada com melhor autocomplete

## Mudanças Quebradoras

### Nomes de Funções Alterados (PascalCase → camelCase)

Todos os nomes de funções foram alterados de PascalCase para camelCase para seguir as convenções de nomenclatura JavaScript. Você precisará atualizar todas as suas importações e chamadas de funções.

#### Funções de Validação

| v1 | v2 |
|---|---|
| `isValidCPF` | `isValidCpf` |
| `isValidCNPJ` | `isValidCnpj` |
| `isValidCEP` | `isValidCep` |
| `isValidPIS` | `isValidPis` |
| `isValidIE` | `isValidIe` |
| `isValidProcessoJuridico` | `isValidProcessoJuridico` (inalterado) |
| `isValidBoleto` | `isValidBoleto` (inalterado) |
| `isValidEmail` | `isValidEmail` (inalterado) |
| `isValidPhone` | `isValidPhone` (inalterado) |
| `isValidMobilePhone` | `isValidMobilePhone` (inalterado) |
| `isValidLandlinePhone` | `isValidLandlinePhone` (inalterado) |
| `isValidLicensePlate` | `isValidLicensePlate` (inalterado) |
| `isValidRenavam` | `isValidRenavam` (novo) |

#### Funções de Formatação

| v1 | v2 |
|---|---|
| `formatCPF` | `formatCpf` |
| `formatCNPJ` | `formatCnpj` |
| `formatCEP` | `formatCep` |
| `formatPIS` | `formatPis` |
| `formatProcessoJuridico` | `formatProcessoJuridico` (inalterado) |
| `formatBoleto` | `formatBoleto` (inalterado) |
| `formatCurrency` | `formatCurrency` (inalterado) |
| `formatPhone` | `formatPhone` (novo) |

#### Funções de Geração

| v1 | v2 |
|---|---|
| `generateCPF` | `generateCpf` |
| `generateCNPJ` | `generateCnpj` |
| `generateBoleto` | `generateBoleto` (inalterado) |

#### Outras Funções

| v1 | v2 |
|---|---|
| `parseCurrency` | `parseCurrency` (inalterado) |
| `capitalize` | `capitalize` (inalterado) |
| `getStates` | `getStates` (inalterado) |
| `getCities` | `getCities` (inalterado) |
| `getAddressInfoByCep` | `getAddressInfoByCep` (API alterada, veja abaixo) |

### Exemplo de Migração

**Antes (v1):**
```javascript
import { isValidCPF, formatCPF, generateCNPJ } from '@brazilian-utils/brazilian-utils';

const isValid = isValidCPF('12345678909');
const formatted = formatCPF('12345678909');
const cnpj = generateCNPJ();
```

**Depois (v2):**
```javascript
import { isValidCpf, formatCpf, generateCnpj } from '@brazilian-utils/brazilian-utils';

const isValid = isValidCpf('12345678909');
const formatted = formatCpf('12345678909');
const cnpj = generateCnpj();
```

## Novas Funções

As seguintes funções são novas na v2.0.0:

### `getHolidays`

Obtém feriados brasileiros para um determinado ano. Suporta feriados nacionais e estaduais.

```javascript
import { getHolidays } from '@brazilian-utils/brazilian-utils';

// Obtém todos os feriados nacionais
const holidays = getHolidays(2024);

// Obtém feriados para um estado específico
const spHolidays = getHolidays({ year: 2024, stateCode: 'SP' });
```

### `getBoletoInfo`

Extrai informações de um boleto (valor, data de vencimento, código do banco).

```javascript
import { getBoletoInfo } from '@brazilian-utils/brazilian-utils';

const info = getBoletoInfo('00190000090114971860168524522114675860000102656');
// { amount: 102656, expirationDate: Date, bankCode: '001' }
```

### `formatPhone`

Formata números de telefone de acordo com padrões brasileiros.

```javascript
import { formatPhone } from '@brazilian-utils/brazilian-utils';

formatPhone('11900000000'); // 90000-0000
formatPhone('11900000000', { mask: 'nanp' }); // (11) 90000-0000
formatPhone('11900000000', { mask: 'auto' }); // Detecta automaticamente a máscara
```

### `isValidRenavam`

Valida RENAVAM (Registro Nacional de Veículos Automotores). Suporta tanto o formato antigo (9 dígitos) quanto o novo formato (11 dígitos).

```javascript
import { isValidRenavam } from '@brazilian-utils/brazilian-utils';

isValidRenavam('639884962'); // true (9 dígitos, formato antigo)
isValidRenavam('00639884962'); // true (11 dígitos, formato novo)
isValidRenavam('12345678901'); // false (checksum inválido)
```

### `describeNumber`

Converte números para texto em português (por extenso). Suporta três estilos: normal (padrão), currency (monetário) e percentage (porcentagem).

```javascript
import { describeNumber } from '@brazilian-utils/brazilian-utils';

// Estilo normal (padrão)
describeNumber(128); // "cento e vinte e oito"
describeNumber(10.5); // "dez vírgula cinco décimos"

// Estilo monetário
describeNumber(128, { style: 'currency' }); // "cento e vinte e oito reais"
describeNumber(10.50, { style: 'currency' }); // "dez reais e cinquenta centavos"

// Estilo porcentagem
describeNumber(128, { style: 'percentage' }); // "cento e vinte e oito por cento"
```

## Mudanças na API

### `getAddressInfoByCep`

A função `getAddressInfoByCep` agora suporta opções adicionais e melhor tratamento de erros.

**Antes (v1):**
```javascript
const address = await getAddressInfoByCep('01310100');
```

**Depois (v2):**
```javascript
// Ainda funciona da mesma forma
const address = await getAddressInfoByCep('01310100');

// Mas agora suporta opções
const address = await getAddressInfoByCep('01310-100', {
  providers: ['viacep', 'brasilapi']
});

// Também aceita números (será preenchido automaticamente com zeros à esquerda)
const address = await getAddressInfoByCep(1310100);
```

A função agora exporta classes de erro para melhor tratamento de erros:

```javascript
import {
  getAddressInfoByCep,
  GetAddressInfoByCepValidationError,
  GetAddressInfoByCepNotFoundError,
  GetAddressInfoByCepServiceError
} from '@brazilian-utils/brazilian-utils';

try {
  const address = await getAddressInfoByCep('01310100');
} catch (error) {
  if (error instanceof GetAddressInfoByCepValidationError) {
    // Tratar erro de validação
  } else if (error instanceof GetAddressInfoByCepNotFoundError) {
    // Tratar erro de não encontrado
  } else if (error instanceof GetAddressInfoByCepServiceError) {
    // Tratar erro de serviço
  }
}
```

### `getCities`

A função `getCities` agora retorna resultados ordenados alfabeticamente.

**Antes (v1):**
```javascript
getCities(); // Retornava array não ordenado
getCities('SP'); // Retornava array não ordenado
```

**Depois (v2):**
```javascript
getCities(); // Retorna ordenado alfabeticamente
getCities('SP'); // Retorna ordenado alfabeticamente
```

## Checklist de Migração

- [ ] Atualizar todas as importações para usar nomes de funções em camelCase
- [ ] Substituir todas as chamadas de funções com nomes em camelCase
- [ ] Atualizar tratamento de erros para `getAddressInfoByCep` se necessário
- [ ] Revisar uso de `getCities` se a ordenação era importante
- [ ] Testar todas as funções de validação e formatação
- [ ] Atualizar importações de tipos TypeScript se aplicável

## Obter Ajuda

Se você encontrar problemas durante a migração, por favor:

1. Verifique a [documentação de utilitários](pt-br/utilities.md) para as assinaturas corretas das funções
2. Revise os exemplos neste guia de migração
3. Abra uma issue no [repositório GitHub](https://github.com/brazilian-utils/brazilian-utils) se encontrar um bug

