import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ethers } from 'ethers'
import App from './App'
import './index.css'
import provider from './chain.ts'
import abi from './assets/abi.json'

// Constants
const CONTRACT_ADDRESS = '0x4B30a8083C53ffBEBec8a48AcFF4B2aB7baf818D'

// Environment variables with type safety
const addressFrom = import.meta.env.VITE_ADDRESS_FROM;
const privateKeyFrom = import.meta.env.VITE_PRIVATE_KEY_FROM;
const addressTo = import.meta.env.VITE_ADDRESS_TO as string;

// Initialize wallet
const wallet = new ethers.Wallet(privateKeyFrom, provider)

// Initialize contract
const incrementer = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet)

// Types
interface BalanceData {
  balanceFrom: string
  balanceTo: string
}

// Functions
export const getBalances = async (): Promise<BalanceData> => {
  try {
    const balanceFrom = ethers.formatEther(await provider.getBalance(addressFrom))
    const balanceTo = ethers.formatEther(await provider.getBalance(addressTo))

    console.log(`Balance of ${addressFrom}: ${balanceFrom} DEV`)
    console.log(`Balance of ${addressTo}: ${balanceTo} DEV`)

    return { balanceFrom, balanceTo }
  } catch (error) {
    console.error('Error fetching balances:', error)
    throw error
  }
}

export const sendTransaction = async (amount: string = '0.00001'): Promise<string> => {
  try {
    console.log(`Sending ${amount} DEV from ${wallet.address} to ${addressTo}`)

    const tx = {
      to: addressTo,
      value: ethers.parseEther(amount),
    }

    const receipt = await wallet.sendTransaction(tx)
    await receipt.wait()
    console.log(`Transaction successful with hash: ${receipt.hash}`)

    return receipt.hash
  } catch (error) {
    console.error('Error sending transaction:', error)
    throw error
  }
}

// Exports
export {
  addressFrom,
  addressTo,
  wallet,
  incrementer,
  CONTRACT_ADDRESS as contractAddress
}

// Render app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
