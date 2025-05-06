// Import ABI as JSON
import * as abiJson from './assets/abi' assert { type: 'json' };
const abi = abiJson.default;

// Import bytecode
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const bytecode = fs.readFileSync(join(__dirname, './assets/bytecode'), 'utf8');

// Rest of your code... 