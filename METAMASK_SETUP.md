# 🦊 MetaMask Setup Guide for EventChain

## Quick Setup (5 minutes)

### Step 1: Add Hardhat Local Network to MetaMask

1. **Open MetaMask** in your browser
2. Click the **Network dropdown** (top center)
3. Click **"Add Network"** or **"Add Network Manually"**
4. Enter these details:

```
Network Name: Hardhat Local
RPC URL: http://127.0.0.1:8545
Chain ID: 31337
Currency Symbol: ETH
```

5. Click **"Save"**

### Step 2: Import a Test Account

You need to import one of the Hardhat test accounts to interact with the contracts.

1. **Open MetaMask**
2. Click the **account icon** (top right)
3. Click **"Import Account"**
4. Select **"Private Key"**
5. **Paste this private key** (Account #0 from Hardhat):

```
0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

6. Click **"Import"**

✅ **You now have 10,000 ETH for testing!**

### Step 3: Connect to EventChain

1. Go to **http://localhost:3000**
2. Click **"🦊 Connect MetaMask"**
3. Approve the connection in MetaMask
4. You should see your wallet connected with **10,000 ETH balance**
5. Network should show **"Hardhat Local"** with **ETH** currency

---

## 🎯 Test Accounts Available

All these accounts have **10,000 ETH** each:

| Account | Address | Private Key |
|---------|---------|-------------|
| #0 | `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266` | `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` |
| #1 | `0x70997970C51812dc3A010C7d01b50e0d17dc79C8` | `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d` |
| #2 | `0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC` | `0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a` |

⚠️ **WARNING**: These are public test accounts. Never use them on real networks!

---

## 🌐 Other Networks Supported

### Sepolia Testnet (Ethereum)
```
Network Name: Sepolia Testnet
RPC URL: https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
Chain ID: 11155111
Currency Symbol: SepoliaETH
```

### Monad Testnet
```
Network Name: Monad Testnet
RPC URL: https://testnet-rpc.monad.xyz
Chain ID: 10143
Currency Symbol: MON
```

### Polygon Amoy Testnet
```
Network Name: Polygon Amoy
RPC URL: https://polygon-amoy.g.alchemy.com/v2/YOUR_API_KEY
Chain ID: 80002
Currency Symbol: MATIC
```

---

## 🔧 Troubleshooting

### "Internal JSON-RPC error"
**Problem**: Hardhat node not running
**Solution**: 
```bash
cd /Users/sourabhyadav/eventchain_blockchain
npx hardhat node
```

### "Nonce too high"
**Problem**: MetaMask cache issue after restarting Hardhat
**Solution**:
1. MetaMask → Settings → Advanced
2. Click "Clear activity tab data"
3. Refresh the page

### "Wrong network"
**Problem**: MetaMask connected to different network
**Solution**: Switch MetaMask to "Hardhat Local" network

### Balance shows 0 ETH
**Problem**: Using wrong account or network
**Solution**: Make sure you imported test account and selected "Hardhat Local" network

---

## 🎉 Ready to Use!

Once connected, you can:
- ✅ Create events (Organizer Dashboard)
- ✅ Buy tickets (Buy Tickets tab)
- ✅ View your NFT tickets (My Tickets tab)
- ✅ Transfer tickets P2P
- ✅ Scan QR codes for entry verification (QR Scanner tab)

Enjoy your decentralized ticketing platform! 🎫
