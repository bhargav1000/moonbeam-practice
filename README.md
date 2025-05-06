# Moonbeam Practice
A repo for learning about Moonbeam and implementing the [example](https://docs.moonbeam.network/builders/get-started/quick-start/) from the website over Vite + React. 

## Background
The idea behind this dApp was to write my smart contract in Solidity, deploy the same over the Moonbase Alpha testnet and interact with this Smart Contract via TypeScript. This dApp is currently capable of sending DEV tokens from a Sender Address to a Receiver Address and interact with a Smart Contract and increment a number. 

## Getting Started
**Prerequisites:**
- Node.js (v14+ recommended)
- npm

## Installation
### Clone the repository:
```bash
git clone https://github.com/bhargav1000/moonbeam-practice.git
cd moonbeam-practice/src
```

### Install dependencies from npm:
```bash
npm install
```

### Run the development server:
```bash
npm run dev
```
This should start the dApp (mostly accessible at http://localhost:5173).

If you'd like to try this demo out, please create a `.env` in the `src` directory and add the following variables:
```
VITE_ADDRESS_FROM=<FROM ADDRESS>
VITE_PRIVATE_KEY_FROM=<PRIVATE KEY>
VITE_ADDRESS_TO=<TO ADDRESS>
```

# Using the dApp
### Send Test Tokens (DEV) from Sender Address (ADDRESS_FROM) to Receiving Address(ADDRESS_TO):
Click on the `Send DEV` button to send DEV tokens across accounts. The dApp is currently configured to send 0.00001 DEV tokens. (Feel to change the amount in `main.tsx`).

### Increment a simple counter:
This was practice to connect to the `Incrementer.sol` Smart Contract (deployed via Remix) and call the `increment()` function. The incremented number is also displayed in the app.
