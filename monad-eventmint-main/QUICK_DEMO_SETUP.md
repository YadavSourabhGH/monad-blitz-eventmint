# 🚀 EventChain - 2-Minute Demo Setup

## ⚡ Super Quick Start (For Hackathon Demo)

### 1. Get Monad Testnet Tokens (30 seconds)
```bash
# Go to: https://faucet.monad.xyz/
# Connect MetaMask → Click "Claim" → Get free MON tokens
```

### 2. Add Monad Network to MetaMask (30 seconds)
```
Network Name: Monad Testnet
RPC URL: https://testnet-rpc.monad.xyz
Chain ID: 10143
Currency Symbol: MON
Block Explorer: https://explorer.testnet.monad.xyz
```

### 3. Start the App (30 seconds)
```bash
cd ui
npm start
# Opens at http://localhost:3000
```

### 4. Connect Wallet (15 seconds)
- Click "🚀 Connect Wallet & Get Started"
- Approve MetaMask connection
- Switch to Monad Testnet if prompted

### 5. You're Ready! (15 seconds)
✅ **Event Organizer Dashboard** - Create events  
✅ **Buy Tickets** - Purchase NFT tickets  
✅ **My Tickets** - View owned NFTs with QR codes  
✅ **Scanner** - Verify tickets for entry  
✅ **Validator** - Check ticket status  
✅ **Transactions** - View blockchain history  

---

## 🎯 Demo Flow Checklist

- [ ] **Create Event** (Organizer tab)
- [ ] **Buy Ticket** (Buy Tickets tab) 
- [ ] **View NFT** (My Tickets tab)
- [ ] **Show QR Code** (Click "View QR")
- [ ] **Scan Ticket** (Scanner tab)
- [ ] **Verify Entry** (Grant entry & redeem)
- [ ] **Check Transactions** (Transactions tab)

---

## 🔧 If Something Breaks

### Network Issues:
```bash
# Switch to localhost for demo
# In hardhat.config.js, network is already configured
npx hardhat node
# Then switch MetaMask to "Localhost 8545"
```

### Contract Issues:
```bash
# Redeploy contracts
npx hardhat ignition deploy ignition/modules/EventChain.js --network monad --reset
# Copy new addresses to ui/src/web3Service.js
```

### UI Issues:
```bash
# Restart React
cd ui
npm start
```

---

## 🎤 30-Second Elevator Pitch

*"EventChain is an NFT ticketing platform built on Monad that eliminates fraud, reduces fees, and enables instant P2P transfers. Every ticket is a blockchain-verified NFT with QR codes for entry. Organizers create events, buyers get NFTs, and gatekeepers scan QR codes - all with cryptographic proof and zero middleman fees."*

---

## 📱 Demo Screenshots Checklist

- [ ] Event creation form
- [ ] Ticket marketplace
- [ ] NFT ticket with QR code
- [ ] QR scanner verification
- [ ] Transaction history
- [ ] Monad Explorer link

---

## 🎯 Key Demo Points

1. **Speed**: "Look how fast this transaction is on Monad!"
2. **Security**: "Each ticket is cryptographically unique"
3. **Transparency**: "Everything is verifiable on-chain"
4. **No Fees**: "Organizers keep 100% of revenue"
5. **Anti-Fraud**: "Impossible to counterfeit NFTs"

---

## 🚀 Ready to Impress!

**Total Setup Time**: 2 minutes  
**Demo Time**: 5 minutes  
**Impact**: Maximum  

**Go build the future of ticketing! 🎫⚡**