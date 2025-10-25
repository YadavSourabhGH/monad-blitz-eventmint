# 🌩️ EventChain - Monad Testnet Setup Guide

## 📋 What is Monad?

**Monad** is a high-performance EVM-compatible blockchain designed for speed and efficiency.

| Feature | Details |
|---------|---------|
| **Chain ID** | 10143 |
| **Network** | Monad Testnet |
| **Compatibility** | EVM-compatible (Solidity works!) |
| **Speed** | Ultra-fast transactions |
| **Cost** | Free testnet tokens |
| **Website** | https://monad.xyz |

---

## 🚀 Quick Start (15 Minutes)

### Step 1: Get Monad Testnet Faucet Tokens (2 min)

1. Go to **Monad Faucet**: https://faucet.monad.xyz/
2. Connect your wallet (MetaMask)
3. Click **"Claim"** to get free testnet tokens
4. You'll receive **1-5 MON** tokens (free!)

### Step 2: Update .secret.json (1 min)

Make sure your `.secret.json` has a valid private key:

```json
{
  "projectId": "optional_alchemy_key",
  "accountPrivateKey": "0xYOUR_PRIVATE_KEY_HERE"
}
```

### Step 3: Deploy to Monad (5 min)

```bash
cd /Users/sourabhyadav/eventchain_blockchain
npx hardhat ignition deploy ignition/modules/EventChain.js --network monad
```

### Step 4: Update UI Configuration (1 min)

Edit `/ui/src/web3Service.js` and update the contract addresses from Step 3 output.

### Step 5: Run UI (1 min)

```bash
cd ui
npm start
```

### Step 6: Configure MetaMask (5 min)

Add Monad network to MetaMask:
- **Network Name**: Monad Testnet
- **RPC URL**: https://testnet-rpc.monad.xyz
- **Chain ID**: 10143
- **Currency Symbol**: MON
- **Block Explorer**: https://testnet-explorer.monad.xyz/

---

## 📊 Deployment Options Summary

| Network | Status | Speed | Cost | Data | Setup |
|---------|--------|-------|------|------|-------|
| **Hardhat** | Running ✅ | Instant | FREE | Lost | Done |
| **Sepolia** | Ready | ~30s | FREE | Permanent | 20 min |
| **Monad** | **NEW!** | **Fast** | **FREE** | **Permanent** | **15 min** |
| **Mainnet** | Future | 12s | $$ | Permanent | Ready |

---

## 🎯 Why Use Monad?

✅ **Ultra-Fast** - Transactions complete in seconds
✅ **EVM Compatible** - Same Solidity code works
✅ **Free Testnet** - No payment needed
✅ **Modern Blockchain** - Latest technology
✅ **Growing Ecosystem** - Active development
✅ **Easy Setup** - 15 minutes total
✅ **Real Testing** - Not local (like Hardhat)

---

## 🔧 Detailed Setup Guide

### 1. Get Monad Testnet Tokens

#### Option A: Official Faucet (Recommended)
```
1. Go to: https://faucet.monad.xyz/
2. Connect MetaMask
3. Click "Claim"
4. Wait for tokens (instant)
5. Check balance
```

#### Option B: Community Faucet
```
Check Monad Discord for additional faucets
https://discord.gg/monad
```

### 2. Prepare .secret.json

```bash
cat > /Users/sourabhyadav/eventchain_blockchain/.secret.json << 'EOF'
{
  "projectId": "optional",
  "accountPrivateKey": "0xYOUR_PRIVATE_KEY_66_CHARS"
}
EOF
```

**Important**: Your private key must be exactly 66 characters (0x + 64 hex characters)

### 3. Deploy Smart Contracts

```bash
cd /Users/sourabhyadav/eventchain_blockchain

# Deploy to Monad
npx hardhat ignition deploy ignition/modules/EventChain.js --network monad
```

**Expected Output:**
```
[ EventChain ] successfully deployed 🚀

Deployed Addresses

EventChain#EventChainContract - 0x...
EventChain#EventChainEventManagerContract - 0x...
```

**Save these addresses!** You'll need them next.

### 4. Update Web3 Service

Edit `/ui/src/web3Service.js` (around line 9-12):

```javascript
export const CONTRACT_ADDRESSES = {
  EventChainContract: '0x...paste_first_address...',
  EventChainEventManagerContract: '0x...paste_second_address...'
};
```

### 5. Configure MetaMask

#### Add Monad Network:
1. Open MetaMask
2. Click Network Dropdown → Add Network
3. Fill in:
   - **Network Name**: Monad Testnet
   - **RPC URL**: https://testnet-rpc.monad.xyz
   - **Chain ID**: 10143
   - **Currency Symbol**: MON
   - **Block Explorer URL**: https://testnet-explorer.monad.xyz/
4. Click "Save"

#### Switch to Monad:
1. Click Network Dropdown
2. Select "Monad Testnet"

### 6. Start EventChain UI

```bash
cd /Users/sourabhyadav/eventchain_blockchain/ui
npm start
```

Opens at: http://localhost:3000

### 7. Connect Your Wallet

1. Click **🦊 Connect Wallet**
2. MetaMask popup appears
3. Click **Connect**
4. Your wallet is connected to Monad! ✅

---

## 🎮 Test EventChain on Monad

### Create an Event:
```
1. Go to "Events" tab
2. Fill in:
   - Name: "My Monad Event"
   - Location: "Monad Network"
   - Date: 2025-12-31
   - Price: 0.1 MON
3. Click "Create Event"
4. Approve in MetaMask
5. Wait 2-5 seconds
6. Event created! ✅
```

### Mint a Ticket:
```
1. Click "Mint Ticket"
2. Enter:
   - Recipient: Your wallet address
   - Metadata URI: https://example.com/ticket.json
3. Click "Mint"
4. Approve in MetaMask
5. Wait 2-5 seconds
6. Ticket minted! ✅
```

### Validate Ticket:
```
1. Go to "Validation" tab
2. Enter Ticket ID
3. Click "Validate"
4. See details and history! ✅
```

### View on Monad Explorer:
```
https://testnet-explorer.monad.xyz/
```

Search for your address to see all transactions!

---

## 💡 Troubleshooting

### "Network not found"
**Solution**: Add Monad manually in MetaMask (see Step 5)

### "Private key too short"
**Solution**: Ensure .secret.json has 66-char private key (0x + 64 hex)

### "Insufficient balance"
**Solution**: Get more tokens from faucet: https://faucet.monad.xyz/

### "Contract not initialized"
**Solution**: Update CONTRACT_ADDRESSES in web3Service.js with Monad addresses

### "Transaction fails"
**Solution**: 
- Check you have enough MON tokens
- Verify chain ID is 10143
- Check RPC URL is correct

### "Cannot connect wallet"
**Solution**:
- MetaMask must be on Monad network
- Approve connection in MetaMask popup
- Try refreshing page

---

## 🔍 Verify Your Deployment

### Check Transaction on Explorer:
```
1. Go to: https://testnet-explorer.monad.xyz/
2. Paste your wallet address
3. See all your EventChain transactions!
```

### Check Deployed Contracts:
```
1. Go to: https://testnet-explorer.monad.xyz/
2. Search for contract address
3. View contract code and interactions
```

---

## 📈 Monad vs Other Networks

| Aspect | Hardhat | Sepolia | Monad | Mainnet |
|--------|---------|---------|-------|---------|
| **Speed** | Instant | ~30s | 2-5s ⚡ | ~12s |
| **Cost** | FREE | FREE | FREE | $$ |
| **Setup** | Done | 20 min | 15 min | 15 min |
| **Testnet** | Local | ✅ Testnet | ✅ Testnet | Live |
| **Data** | Ephemeral | Permanent | Permanent | Permanent |
| **Explorer** | None | ✅ Etherscan | ✅ Monad | ✅ Etherscan |
| **Best For** | Dev | Testing | Demo | Production |

---

## 🎓 What You'll Learn

✅ How to deploy to Monad testnet
✅ How to interact with EVM-compatible blockchains
✅ How to use blockchain explorers
✅ How to manage testnet tokens
✅ How to test production-like conditions

---

## 🔗 Important Links

| Resource | Link |
|----------|------|
| Monad Website | https://monad.xyz |
| Monad Testnet Faucet | https://faucet.monad.xyz/ |
| Monad Explorer | https://testnet-explorer.monad.xyz/ |
| Monad RPC | https://testnet-rpc.monad.xyz |
| Monad Discord | https://discord.gg/monad |
| Monad Docs | https://docs.monad.xyz |

---

## 📝 Monad Network Details

```
Network Name:        Monad Testnet
Chain ID:            10143
Currency:            MON
RPC Endpoint:        https://testnet-rpc.monad.xyz
Block Explorer:      https://testnet-explorer.monad.xyz/
Network Type:        EVM-compatible
Solidity Support:    ✅ 0.8.24
Test Tokens:         Free from faucet
Transaction Speed:   2-5 seconds
```

---

## 🎯 Your Deployment Path

```
                    Today
                      ↓
        ┌─────────────────────────────┐
        │    Choose Your Network      │
        └──────────┬──────────────────┘
                   ↓
        ┌──────────────────────────────────┐
        │                                  │
    Hardhat          Sepolia           Monad
    (Local)          (Testnet)          (NEW!)
    Instant          30 sec              2-5 sec
    Done ✅           20 min setup       15 min setup ⭐
                                        
                   All work!
        Deploy same code to all networks
```

---

## ✅ Monad Setup Checklist

- [ ] Get Monad testnet tokens from faucet
- [ ] Create/verify .secret.json with private key
- [ ] Deploy contracts: `npx hardhat ignition deploy ignition/modules/EventChain.js --network monad`
- [ ] Copy contract addresses from deployment output
- [ ] Update web3Service.js with addresses
- [ ] Add Monad network to MetaMask
- [ ] Start React UI: `npm start`
- [ ] Connect wallet to Monad
- [ ] Create test event
- [ ] Mint test ticket
- [ ] Verify on Monad Explorer
- [ ] Share your achievement! 🎉

---

## 🚀 Ready to Deploy to Monad?

```bash
# 1. Get tokens from faucet (2 min)
# https://faucet.monad.xyz/

# 2. Update .secret.json (1 min)
# Make sure private key is 66 characters

# 3. Deploy contracts (5 min)
cd /Users/sourabhyadav/eventchain_blockchain
npx hardhat ignition deploy ignition/modules/EventChain.js --network monad

# 4. Update UI (1 min)
# Edit ui/src/web3Service.js with contract addresses

# 5. Start UI (1 min)
cd ui && npm start

# 6. Open browser (1 min)
# http://localhost:3000

# 7. Connect wallet to Monad (1 min)
# Click "Connect Wallet", approve MetaMask

# 8. Test! (3 min)
# Create event, mint ticket, validate

Total: 15 minutes! 🎉
```

---

**Welcome to Monad!** ⚡✨

EventChain is now ready to deploy to one of the fastest EVM-compatible blockchains!

**Start deploying:** https://faucet.monad.xyz/ → Get tokens → Deploy!
