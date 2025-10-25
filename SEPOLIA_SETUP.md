# 🌐 EventChain - Sepolia Testnet Setup Guide

## 📋 Prerequisites

You'll need:
1. **Alchemy Account** (FREE - for RPC endpoint)
2. **Private Key** (from MetaMask or another wallet)
3. **SepoliaETH** (free testnet ETH for gas fees)

---

## 🔧 Step 1: Get Alchemy Project ID

### 1.1 Create Alchemy Account
- Go to **https://www.alchemy.com**
- Click "Sign Up" and create a free account
- Verify your email

### 1.2 Create an App
- After login, go to **Dashboard** → **Create App**
- Fill in the form:
  - **Name**: `EventChain` (or any name)
  - **Environment**: `Testnet`
  - **Chain**: `Ethereum`
  - **Network**: `Sepolia`
- Click **Create App**

### 1.3 Get Your API Key
- Click on the newly created app
- Click **API Key** button
- Copy the full HTTPS URL (you'll need this)

**Example format:**
```
https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY_HERE
```

---

## 🔐 Step 2: Get Your Private Key

### From MetaMask:
1. Open **MetaMask** extension
2. Click **Account Menu** (top right)
3. Select **Account Details**
4. Click **Export Private Key**
5. Enter your password
6. Copy your private key (starts with `0x`)

**⚠️ WARNING**: Never share your private key! Keep it safe!

---

## 📝 Step 3: Create .secret.json

### Create the file:
```bash
cd /Users/sourabhyadav/eventchain_blockchain
touch .secret.json
```

### Add your credentials:
```json
{
  "projectId": "YOUR_ALCHEMY_API_KEY_HERE",
  "accountPrivateKey": "0xYOUR_PRIVATE_KEY_HERE"
}
```

### Example (don't use these values):
```json
{
  "projectId": "abc123def456ghi789jkl012mno345pqr",
  "accountPrivateKey": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
}
```

---

## 💰 Step 4: Get SepoliaETH (Free Testnet ETH)

You need ETH to pay gas fees. It's **FREE**!

### Faucet Option 1: Alchemy Faucet (RECOMMENDED)
1. Go to **https://www.alchemy.com/faucets/ethereum-sepolia**
2. Connect your wallet
3. Click **Send Me ETH**
4. Wait ~30 seconds
5. Check your balance (1-2 SepoliaETH added)

### Faucet Option 2: Quicknode Faucet
1. Go to **https://faucet.quicknode.com/ethereum/sepolia**
2. Enter your wallet address
3. Solve captcha
4. Get SepoliaETH

### Faucet Option 3: Ethereum.org Faucet
1. Go to **https://www.ethereum.org/en/developers/docs/networks/#ethereum-testnet-tokens**
2. Follow the links to various faucets
3. Choose one and get testnet ETH

**Verify in MetaMask:**
- Switch to **Sepolia** network
- Check balance (should show SepoliaETH)

---

## 🚀 Step 5: Deploy Contracts to Sepolia

### 5.1 Make sure .secret.json is configured:
```bash
cat /Users/sourabhyadav/eventchain_blockchain/.secret.json
```

Should show:
```json
{
  "projectId": "your_api_key",
  "accountPrivateKey": "0xyour_private_key"
}
```

### 5.2 Deploy contracts:
```bash
cd /Users/sourabhyadav/eventchain_blockchain
npx hardhat ignition deploy ignition/modules/EventChain.js --network sepolia
```

### 5.3 Save the contract addresses:

The output will show:
```
EventChain#EventChainContract - 0x...
EventChain#EventChainEventManagerContract - 0x...
```

**Copy these addresses!** You'll need them next.

---

## 🎯 Step 6: Update UI Configuration

### 6.1 Open the web3 service file:
```bash
nano /Users/sourabhyadav/eventchain_blockchain/ui/src/web3Service.js
```

### 6.2 Update the contract addresses:
Find this section (around line 9-12):
```javascript
export const CONTRACT_ADDRESSES = {
  EventChainContract: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  EventChainEventManagerContract: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
};
```

Replace with your **Sepolia addresses**:
```javascript
export const CONTRACT_ADDRESSES = {
  EventChainContract: '0x...paste_your_address_here...',
  EventChainEventManagerContract: '0x...paste_your_second_address_here...'
};
```

### 6.3 Save the file (Ctrl+O, Enter, Ctrl+X in nano)

---

## 🌍 Step 7: Configure MetaMask for Sepolia

### 7.1 Open MetaMask
- Click the network selector (top left)
- Look for **Sepolia** in the list

If Sepolia is not listed:
1. Click **Add network**
2. Enter these details:
   - **Network Name**: Sepolia
   - **RPC URL**: `https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY`
   - **Chain ID**: `11155111`
   - **Currency Symbol**: ETH
   - **Block Explorer**: `https://sepolia.etherscan.io`

### 7.2 Switch to Sepolia
- Click network selector
- Select **Sepolia**

---

## ▶️ Step 8: Run the UI

```bash
cd /Users/sourabhyadav/eventchain_blockchain/ui
npm start
```

The UI will open at **http://localhost:3000**

---

## 🔌 Step 9: Connect Your Wallet

### In the EventChain UI:
1. Click **🦊 Connect Wallet**
2. MetaMask will pop up
3. Click **Connect** to approve
4. Your wallet address will appear

**Make sure:**
- MetaMask is set to **Sepolia** network
- Your account has **SepoliaETH** balance

---

## ✅ Step 10: Test the System

### Create an Event:
1. Go to **Events** tab
2. Fill in event details:
   - **Event Name**: My Test Event
   - **Location**: New York
   - **Date**: 2025-12-31
   - **Ticket Price**: 0.1 (in ETH)
3. Click **Create Event**
4. Approve the transaction in MetaMask
5. Wait for confirmation (~30 seconds)

### Mint a Ticket:
1. Click **Mint Ticket** on your event
2. Enter:
   - **Recipient Address**: Your wallet address
   - **Metadata URI**: `https://example.com/ticket.json` (or any URL)
3. Click **Mint**
4. Approve in MetaMask
5. Wait for confirmation

### Validate a Ticket:
1. Go to **Validation** tab
2. Enter the **Ticket ID** (given when you minted)
3. Click **Validate**
4. View the ticket details and history

### Check In (Mark as Used):
1. From validation tab
2. Click **Mark as Used**
3. Approve in MetaMask
4. Ticket is now marked as used on Sepolia!

---

## 🔍 Verify on Sepolia Etherscan

### View your transactions:
1. Go to **https://sepolia.etherscan.io**
2. Paste your wallet address
3. See all your EventChain transactions!

### View contract on Etherscan:
1. Go to **https://sepolia.etherscan.io**
2. Paste your contract address
3. Click **Code** tab to see the smart contract source

---

## ❌ Troubleshooting

### "Invalid RPC URL"
- Check your projectId is correct
- Make sure it's from an Alchemy Sepolia app
- Verify .secret.json is in the root directory

### "Contract not initialized"
- Check CONTRACT_ADDRESSES in web3Service.js
- Make sure you deployed to Sepolia first
- Verify addresses are correct (start with 0x)

### "Insufficient balance"
- Get more SepoliaETH from the faucet
- Try a different faucet
- Wait a few minutes and try again

### MetaMask not showing Sepolia
- Add it manually (see Step 7.2)
- Or reset networks: Settings → Advanced → Reset Account

### Transaction failed
- Check gas price (usually fine on Sepolia)
- Make sure you have enough SepoliaETH
- Check contract address is correct

---

## 📊 Summary

| Item | Testnet |
|------|---------|
| **Network** | Sepolia |
| **RPC Endpoint** | Alchemy |
| **Testnet ETH** | Free faucets |
| **Explorer** | Sepolia Etherscan |
| **Cost** | FREE ✅ |
| **Persistence** | Permanent ✅ |

---

## 🎓 What You Can Do

✅ Create real events
✅ Mint NFT tickets
✅ Transfer between wallets
✅ Validate tickets
✅ Check in attendees
✅ View all on Etherscan
✅ Test before production

---

## 🚀 Next Steps

1. **Get Alchemy API Key** → 5 minutes
2. **Get Private Key** → 2 minutes
3. **Create .secret.json** → 1 minute
4. **Get SepoliaETH** → Instant
5. **Deploy to Sepolia** → 2-5 minutes
6. **Update UI** → 1 minute
7. **Test Everything** → 10 minutes

**Total Time: ~30 minutes to have a live Sepolia deployment!**

---

## 📚 Useful Links

- **Alchemy**: https://www.alchemy.com
- **Sepolia Faucet**: https://www.alchemy.com/faucets/ethereum-sepolia
- **Sepolia Etherscan**: https://sepolia.etherscan.io
- **MetaMask**: https://metamask.io

---

**You're all set to deploy to Sepolia! 🚀**
