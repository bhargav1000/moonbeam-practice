import json, os, sys
from pathlib import Path

from dotenv import load_dotenv
from web3 import Web3
from web3.exceptions import ContractLogicError

###############################################################################
# 1.  Environment & Web3 init
###############################################################################
load_dotenv()                                              # loads .env in cwd
RPC_URL      = "https://rpc.api.moonbase.moonbeam.network"
PRIVATE_KEY  = os.getenv("VITE_PRIVATE_KEY_FROM")
CONTRACT_ADDR = "0x4B30a8083C53ffBEBec8a48AcFF4B2aB7baf818D"

w3 = Web3(Web3.HTTPProvider(RPC_URL))
acct = w3.eth.account.from_key(PRIVATE_KEY)
print("Connected:", w3.is_connected())

###############################################################################
# 2.  Load ABI & build Contract object
###############################################################################
ABI_PATH = Path("./assets/abi.json")             # contains the *ABI only*
if not ABI_PATH.exists():
    sys.exit("❌  ABI not found")

abi = json.loads(ABI_PATH.read_text())
inc = w3.eth.contract(address=Web3.to_checksum_address(CONTRACT_ADDR), abi=abi)

def send_tx(tx):
    """Sign + send, then wait for receipt"""
    tx_dict = tx.build_transaction({
        "from":   acct.address,
        "nonce":  w3.eth.get_transaction_count(acct.address),
    })
    signed = acct.sign_transaction(tx_dict)
    # 👇  Web3.py ≥ v6 uses snake-case
    tx_hash = w3.eth.send_raw_transaction(signed.raw_transaction)
    return w3.eth.wait_for_transaction_receipt(tx_hash)


###############################################################################
# 4.  Demo flow
###############################################################################
try:
    print("🔎  Current number:", inc.functions.number().call())

    # increment by 5
    send_tx(inc.functions.increment(1))
    print("📈  After increment:", inc.functions.number().call())

except ContractLogicError as e:
    print("⚠️  Reverted:", e)

