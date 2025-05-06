import { useState, useEffect } from 'react'
import './App.css'
import { 
  addressFrom,
  addressTo,
  incrementer,
  contractAddress,
  getBalances,
  sendTransaction
} from './main'

// Types
interface BalanceData {
  balanceFrom: number
  balanceTo: number
}

function App() {
  // State
  const [balanceData, setBalanceData] = useState<BalanceData | null>(null)
  const [sendTransactionHash, setSendTransactionHash] = useState<string | null>(null)
  const [incrementTransactionHash, setIncrementTransactionHash] = useState<string | null>(null)
  const [contractNumber, setContractNumber] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Fetch contract number
  const fetchContractNumber = async () => {
    try {
      const number = await incrementer.number()
      setContractNumber(Number(number))
    } catch (error) {
      console.error('Error fetching contract number:', error)
    }
  }

  // Fetch all data
  const fetchData = async () => {
    try {
      setIsLoading(true)
      const data = await getBalances()
      setBalanceData({
        balanceFrom: Number(data.balanceFrom),
        balanceTo: Number(data.balanceTo)
      })
      await fetchContractNumber()
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Effects
  useEffect(() => {
    fetchData()
  }, [incrementTransactionHash])

  // Handlers
  const handleSend = async () => {
    try {
      setIsLoading(true)
      const hash = await sendTransaction()
      setSendTransactionHash(hash)
      await fetchData()
    } catch (error) {
      console.error('Error sending transaction:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleIncrement = async () => {
    try {
      setIsLoading(true)
      console.log(`Incrementing contract at address: ${contractAddress}`)
      const receipt = await incrementer.increment(1)
      await receipt.wait()
      console.log(`Transaction successful with hash: ${receipt.hash}`)
      setIncrementTransactionHash(receipt.hash)
      await fetchData()
    } catch (error) {
      console.error('Error incrementing:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Render
  return (
    <div className="App">
      <div className="balances">
        <h2>Balance of {addressFrom}: {balanceData?.balanceFrom.toFixed(5) || 'Loading...'} DEV</h2>
        <h2>Balance of {addressTo}: {balanceData?.balanceTo.toFixed(5) || 'Loading...'} DEV</h2>
        <h2>Contract Number: {contractNumber !== null ? contractNumber : 'Loading...'}</h2>
      </div>

      <div className="actions">
        <div className="card">
          <button onClick={handleSend} disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send DEV'}
          </button>
          {sendTransactionHash && (
            <p>Transaction Hash: {sendTransactionHash}</p>
          )}
        </div>

        <div className="card">
          <button onClick={handleIncrement} disabled={isLoading}>
            {isLoading ? 'Incrementing...' : 'Increment'}
          </button>
          {incrementTransactionHash && (
            <p>Transaction Hash: {incrementTransactionHash}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
