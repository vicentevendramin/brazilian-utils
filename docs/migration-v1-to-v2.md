# Migration Guide: v1 to v2

This guide will help you migrate from Brazilian Utils v1.x to v2.0.0.

## Improvements in v2.0.0

Version 2.0.0 brings significant improvements in architecture, tooling, and developer experience:

### 🎯 Better Tree Shaking

The library now uses modern ES module exports with proper `exports` field in `package.json`, enabling better tree shaking in modern bundlers. You can import only what you need:

```javascript
// Only the functions you import will be included in your bundle
import { isValidCpf, formatCpf } from '@brazilian-utils/brazilian-utils';
```

### 📁 Simpler Structure

The codebase has been reorganized for better maintainability:
- **v1**: Complex structure with separate `utilities/` and `helpers/` directories
- **v2**: Flat structure with internal utilities in `_internals/` directory
- Each utility is self-contained in its own directory
- Cleaner import paths and better code organization

### 🔧 Modern Tooling

Updated to modern, faster tooling:
- **Build**: Migrated from `tsdx` to **Bun** for faster builds and scripts
- **Testing**: Migrated from `jest` to **Vitest** (faster, Jest-compatible, ESM-native)
- **Linting/Formatting**: Migrated from `prettier` + `eslint` to **Biome** (faster, all-in-one)
- **TypeScript**: Modern configuration optimized for bundlers

### 🌐 Browser Testing

Now includes cross-browser testing support:
- Tests run in real browsers (Chrome, Firefox, Safari, Edge)
- Ensures compatibility across different browser environments
- Better confidence in cross-platform functionality

Run browser tests with:
```bash
npm run test:chrome-browser
npm run test:firefox-browser
npm run test:safari-browser
npm run test:edge-browser
```

### 📦 Fewer Dependencies

Reduced development dependencies while maintaining zero runtime dependencies:
- **v1**: Multiple tools (tsdx, jest, prettier, eslint, husky, lint-staged, commitlint, etc.)
- **v2**: Minimal dependencies (biome, vitest, webdriverio, bun types)
- Simpler maintenance and faster CI/CD pipelines
- Zero runtime dependencies (maintained)

### ✨ New Functions

Added new useful utilities:
- `getHolidays` - Get Brazilian holidays (national and state-specific)
- `getBoletoInfo` - Extract information from boleto (amount, expiration, bank code)
- `formatPhone` - Format phone numbers with Brazilian patterns
- `formatBoleto` - Format boleto numbers
- `generateBoleto` - Generate valid random boleto numbers
- `formatPis` - Format PIS numbers
- `isValidRenavam` - Validate RENAVAM (vehicle registration number)
- `describeNumber` - Convert numbers to Portuguese text (por extenso) with support for normal, currency, and percentage styles

### 📈 Better TypeScript Support

- Modern TypeScript configuration optimized for bundlers
- Better type inference and exports
- Improved developer experience with better autocomplete

## Breaking Changes

### Function Names Changed (PascalCase → camelCase)

All function names have been changed from PascalCase to camelCase to follow JavaScript naming conventions. You'll need to update all your imports and function calls.

#### Validation Functions

| v1 | v2 |
|---|---|
| `isValidCPF` | `isValidCpf` |
| `isValidCNPJ` | `isValidCnpj` |
| `isValidCEP` | `isValidCep` |
| `isValidPIS` | `isValidPis` |
| `isValidIE` | `isValidIe` |
| `isValidProcessoJuridico` | `isValidProcessoJuridico` (unchanged) |
| `isValidBoleto` | `isValidBoleto` (unchanged) |
| `isValidEmail` | `isValidEmail` (unchanged) |
| `isValidPhone` | `isValidPhone` (unchanged) |
| `isValidMobilePhone` | `isValidMobilePhone` (unchanged) |
| `isValidLandlinePhone` | `isValidLandlinePhone` (unchanged) |
| `isValidLicensePlate` | `isValidLicensePlate` (unchanged) |
| `isValidRenavam` | `isValidRenavam` (new) |

#### Format Functions

| v1 | v2 |
|---|---|
| `formatCPF` | `formatCpf` |
| `formatCNPJ` | `formatCnpj` |
| `formatCEP` | `formatCep` |
| `formatPIS` | `formatPis` |
| `formatProcessoJuridico` | `formatProcessoJuridico` (unchanged) |
| `formatBoleto` | `formatBoleto` (unchanged) |
| `formatCurrency` | `formatCurrency` (unchanged) |
| `formatPhone` | `formatPhone` (new) |

#### Generation Functions

| v1 | v2 |
|---|---|
| `generateCPF` | `generateCpf` |
| `generateCNPJ` | `generateCnpj` |
| `generateBoleto` | `generateBoleto` (unchanged) |

#### Other Functions

| v1 | v2 |
|---|---|
| `parseCurrency` | `parseCurrency` (unchanged) |
| `capitalize` | `capitalize` (unchanged) |
| `getStates` | `getStates` (unchanged) |
| `getCities` | `getCities` (unchanged) |
| `getAddressInfoByCep` | `getAddressInfoByCep` (API changed, see below) |

### Migration Example

**Before (v1):**
```javascript
import { isValidCPF, formatCPF, generateCNPJ } from '@brazilian-utils/brazilian-utils';

const isValid = isValidCPF('12345678909');
const formatted = formatCPF('12345678909');
const cnpj = generateCNPJ();
```

**After (v2):**
```javascript
import { isValidCpf, formatCpf, generateCnpj } from '@brazilian-utils/brazilian-utils';

const isValid = isValidCpf('12345678909');
const formatted = formatCpf('12345678909');
const cnpj = generateCnpj();
```

## New Functions

The following functions are new in v2.0.0:

### `getHolidays`

Get Brazilian holidays for a given year. Supports national and state-specific holidays.

```javascript
import { getHolidays } from '@brazilian-utils/brazilian-utils';

// Get all national holidays
const holidays = getHolidays(2024);

// Get holidays for a specific state
const spHolidays = getHolidays({ year: 2024, stateCode: 'SP' });
```

### `getBoletoInfo`

Extract information from a boleto (amount, expiration date, bank code).

```javascript
import { getBoletoInfo } from '@brazilian-utils/brazilian-utils';

const info = getBoletoInfo('00190000090114971860168524522114675860000102656');
// { amount: 102656, expirationDate: Date, bankCode: '001' }
```

### `formatPhone`

Format phone numbers according to Brazilian patterns.

```javascript
import { formatPhone } from '@brazilian-utils/brazilian-utils';

formatPhone('11900000000'); // 90000-0000
formatPhone('11900000000', { mask: 'nanp' }); // (11) 90000-0000
formatPhone('11900000000', { mask: 'auto' }); // Auto-detects mask
```

### `isValidRenavam`

Validate RENAVAM (Registro Nacional de Veículos Automotores). Supports both old format (9 digits) and new format (11 digits).

```javascript
import { isValidRenavam } from '@brazilian-utils/brazilian-utils';

isValidRenavam('639884962'); // true (9 digits, old format)
isValidRenavam('00639884962'); // true (11 digits, new format)
isValidRenavam('12345678901'); // false (invalid checksum)
```

### `describeNumber`

Convert numbers to Portuguese text (por extenso). Supports three styles: normal (default), currency (monetary), and percentage.

```javascript
import { describeNumber } from '@brazilian-utils/brazilian-utils';

// Normal style (default)
describeNumber(128); // "cento e vinte e oito"
describeNumber(10.5); // "dez vírgula cinco décimos"

// Currency style
describeNumber(128, { style: 'currency' }); // "cento e vinte e oito reais"
describeNumber(10.50, { style: 'currency' }); // "dez reais e cinquenta centavos"

// Percentage style
describeNumber(128, { style: 'percentage' }); // "cento e vinte e oito por cento"
```

## API Changes

### `getAddressInfoByCep`

The `getAddressInfoByCep` function now supports additional options and improved error handling.

**Before (v1):**
```javascript
const address = await getAddressInfoByCep('01310100');
```

**After (v2):**
```javascript
// Still works the same way
const address = await getAddressInfoByCep('01310100');

// But now supports options
const address = await getAddressInfoByCep('01310-100', {
  providers: ['viacep', 'brasilapi']
});

// Also accepts numbers (will be padded automatically)
const address = await getAddressInfoByCep(1310100);
```

The function now exports error classes for better error handling:

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
    // Handle validation error
  } else if (error instanceof GetAddressInfoByCepNotFoundError) {
    // Handle not found error
  } else if (error instanceof GetAddressInfoByCepServiceError) {
    // Handle service error
  }
}
```

### `getCities`

The `getCities` function now returns sorted results alphabetically.

**Before (v1):**
```javascript
getCities(); // Returned unsorted array
getCities('SP'); // Returned unsorted array
```

**After (v2):**
```javascript
getCities(); // Returns sorted alphabetically
getCities('SP'); // Returns sorted alphabetically
```

## Migration Checklist

- [ ] Update all imports to use camelCase function names
- [ ] Replace all function calls with camelCase names
- [ ] Update error handling for `getAddressInfoByCep` if needed
- [ ] Review usage of `getCities` if sorting was important
- [ ] Test all validation and formatting functions
- [ ] Update any TypeScript type imports if applicable

## Getting Help

If you encounter any issues during migration, please:

1. Check the [utilities documentation](utilities.md) for the correct function signatures
2. Review the examples in this migration guide
3. Open an issue on the [GitHub repository](https://github.com/brazilian-utils/brazilian-utils) if you find a bug

