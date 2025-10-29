# juris_shacl

**juris_shacl** is a standalone client-side TypeScript component for managing JSON-LD data with SHACL-based state management. It provides a simple API for storing, retrieving, updating, and managing JSON-LD data structures in web applications.

## Overview

The **JurisShaclData** object provides methods to work with JSON-LD data, including:

- **Initialization**: Set up the state store
- **Storage**: Store JSON-LD data at specific prefixes
- **Retrieval**: Get data from specific paths within the JSON-LD structure
- **Updates**: Modify specific parts of the stored JSON-LD data
- **Path-based Access**: Navigate JSON-LD structures using dot-notation paths

## Installation

```bash
npm install juris_shacl
```

## Usage

### Basic Example

```typescript
import { JurisShaclData } from 'juris_shacl';

// Create and initialize the state manager
const shaclData = new JurisShaclData();
shaclData.init();

// Store JSON-LD data
const data = {
  '@context': {
    'name': 'http://schema.org/name',
    'email': 'http://schema.org/email'
  },
  'name': 'John Doe',
  'email': 'john@example.com'
};

await shaclData.setData('user', data);

// Retrieve data
const name = shaclData.get('user', '0.http://schema.org/name.0.@value');
console.log(name); // 'John Doe'

// Update data
await shaclData.update('user', '0.http://schema.org/name.0.@value', 'Jane Doe');

// Set new data
shaclData.set('user', 'preferences.theme', 'dark');
```

## API Reference

### `JurisShaclData`

#### Constructor

```typescript
constructor()
```

Creates a new instance of JurisShaclData.

#### Methods

##### `init(): void`

Initializes the state store, clearing any existing data.

##### `setData(shacl_prefix: string, json_ld_data: any): Promise<void>`

Stores JSON-LD data at the specified prefix. The data is automatically expanded using the JSON-LD expansion algorithm.

**Parameters:**
- `shacl_prefix`: The prefix in the state store where the JSON-LD data is stored
- `json_ld_data`: The JSON-LD data to store

##### `update(shacl_prefix: string, shacl_path: string, data: any): Promise<void>`

Updates a specific part of the stored JSON-LD data.

**Parameters:**
- `shacl_prefix`: The prefix in the state store
- `shacl_path`: The path within the JSON-LD data (dot-notation)
- `data`: The new data value

##### `get(shacl_prefix: string, shacl_path: string): any`

Retrieves data from a specific path within the stored JSON-LD structure.

**Parameters:**
- `shacl_prefix`: The prefix in the state store
- `shacl_path`: The path within the JSON-LD data (dot-notation)

**Returns:** The data at the specified path, or `undefined` if not found

##### `set(shacl_prefix: string, shacl_path: string, data: any): void`

Sets data at a specific path, creating intermediate objects as needed.

**Parameters:**
- `shacl_prefix`: The prefix in the state store
- `shacl_path`: The path within the JSON-LD data (dot-notation)
- `data`: The data to set

## Architecture

**juris_shacl** uses the [jsonld.js](https://github.com/digitalbazaar/jsonld.js) library to handle JSON-LD expansion, compaction, and framing. This ensures that data is stored in a normalized, expanded format that can be easily queried and manipulated.

### State Management

The component maintains an internal store organized by prefixes. Each prefix contains expanded JSON-LD data that can be accessed using path-based queries.

### Path Navigation

Paths use dot-notation to navigate through the JSON-LD structure:
- `0.http://schema.org/name.0.@value` - Accesses the first element, then the name property, then the first value, then the @value field

## Dependencies

- [jsonld](https://www.npmjs.com/package/jsonld) - JSON-LD processor

## Development

### Building

```bash
npm install
npm run build
```

### Testing

```bash
npm test
```

## License

MIT

## Author

Manus AI
