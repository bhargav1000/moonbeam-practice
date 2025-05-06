import * as abiJson from './assets/abi' assert { type: 'json' };
const abi = abiJson.default;

// Import bytecode
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const bytecode = fs.readFileSync(join(__dirname, './assets/bytecode'), 'utf8');

// 3. Contract address variable
const contractAddress = '0x4B30a8083C53ffBEBec8a48AcFF4B2aB7baf818D';

// 4. Create contract instance
const incrementer = new ethers.Contract(contractAddress, abi, provider);

// 5. Create get function
const get = async () => {
  console.log(`Making a call to contract at address: ${contractAddress}`);

  // 6. Call contract 
  const data = await incrementer.number();

  console.log(`The current number stored is: ${data}`);
};

// 7. Call get function
get();