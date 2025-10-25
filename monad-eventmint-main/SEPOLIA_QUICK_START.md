# ⚡ Sepolia Quick Start (5 Minutes)

## 🎯 TL;DR

```bash
# 1. Create .secret.json with your Alchemy API key and private key
cat > .secret.json << 'EOF'
{
  "projectId": "YOUR_ALCHEMY_API_KEY",
  "accountPrivateKey": "0xYOUR_PRIVATE_KEY"
}
EOF

# 2. Deploy to Sepolia
npx hardhat ignition deploy ignition/modules/EventChain.js --network sepolia

# 3. Copy the contract addresses from deployment output

# 4. Update web3Service.js with your contract addresses
# Edit: ui/src/web3Service.js - Replace CONTRACT_ADDRESSES

# 5. Start the UI
cd ui && npm start

# 6. Open http://localhost:3000 in your browser
```

---

## 🔑 Getting Credentials (2 minutes)

### Alchemy API Key:
1. Go to https://www.alchemy.com
2. Sign up (free)
3. Create app → Select Sepolia
4. Copy HTTPS URL, extract the API key part after `/v2/`

### Private Key (from MetaMask):
1. Open MetaMask
2. Click account menu → Account Details → Export Private Key
3. Enter password and copy (starts with 0x)

**⚠️ Never share these values!**

---

## 💰 Get Free SepoliaETH (2 minutes)

Choose one:
- **Alchemy Faucet**: https://www.alchemy.com/faucets/ethereum-sepolia
- **Quicknode Faucet**: https://faucet.quicknode.com/ethereum/sepolia
- **Ethereum.org**: https://www.ethereum.org/en/developers/docs/networks/#ethereum-testnet-tokens

Get 1-2 SepoliaETH per account (free!)

---

## 🚀 Deploy & Run (5 minutes)

```bash
# From project root
cd /Users/sourabhyadav/eventchain_blockchain

# Deploy contracts
npx hardhat ignition deploy ignition/modules/EventChain.js --network sepolia

# You'll see something like:
# EventChain#EventChainContract - 0xABC123...
# EventChain#EventChainEventManagerContract - 0xDEF456...
```

**Save those addresses!**

---

## 📝 Update UI (1 minute)

Edit `/ui/src/web3Service.js`:

```javascript
export const CONTRACT_ADDRESSES = {
  EventChainContract: '0xYOUR_FIRST_ADDRESS',
  EventChainEventManagerContract: '0xYOUR_SECOND_ADDRESS'
};
```

---

## ▶️ Start UI (1 minute)

```bash
cd ui
npm start
# Opens at http://localhost:3000
```

---

## 🎮 Use It

1. **Connect wallet** → Click 🦊 icon
2. **Create event** → Events tab
3. **Mint ticket** → Click mint button
4. **View on Etherscan** → https://sepolia.etherscan.io

---

## 📖 Full Guide

See **SEPOLIA_SETUP.md** for detailed instructions!
