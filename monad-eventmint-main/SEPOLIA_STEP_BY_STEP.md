# 🌐 Switch to Sepolia - Step by Step

## Your Current Setup
```
❌ Hardhat (local, ephemeral - resets when you restart)
✅ Sepolia (testnet, persistent - stays forever)
```

## Why Sepolia?
- 🔗 Real blockchain network
- 📊 Data persists forever
- 🔍 View on Etherscan
- 💰 Free testnet ETH
- 🌍 Same as Ethereum mainnet
- ⚡ Fast transactions (30 seconds)

---

## 📋 Checklist Before Starting

- [ ] Have a crypto wallet (MetaMask, etc.)
- [ ] Know how to get your private key
- [ ] Can create a free Alchemy account
- [ ] Have an email address

**Estimated Time: 30 minutes** ⏱️

---

## ✅ STEP 1: Get Alchemy API Key (5 min)

### Go to Alchemy
```
https://www.alchemy.com
```

### Sign Up
- Click "Sign Up"
- Create account with email
- Verify email

### Create an App for Sepolia
1. Dashboard → "Create App"
2. Fill form:
   - **Name**: EventChain
   - **Environment**: Testnet
   - **Chain**: Ethereum
   - **Network**: Sepolia
3. Click "Create App"

### Get Your API Key
1. Click on the app you just created
2. Click "API Key" button
3. Copy the full HTTPS URL

**Example:**
```
https://eth-sepolia.g.alchemy.com/v2/abc123def456ghi789...
```

Extract just the key part after `/v2/`:
```
abc123def456ghi789...
```

✅ **Done! Save this API key**

---

## ✅ STEP 2: Get Your Private Key (3 min)

### Open MetaMask
- Click the extension icon

### Go to Account Details
1. Click account icon (top right)
2. Select "Account Details"
3. Click "Export Private Key"
4. Enter your password
5. **Copy the private key** (starts with `0x`)

**Example:**
```
0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

✅ **Done! Save this private key (NEVER SHARE IT!)**

---

## ✅ STEP 3: Create .secret.json File (2 min)

### Open Terminal
```bash
cd /Users/sourabhyadav/eventchain_blockchain
```

### Create the file with your credentials
```bash
cat > .secret.json << 'EOF'
{
  "projectId": "PUT_YOUR_ALCHEMY_API_KEY_HERE",
  "accountPrivateKey": "0xPUT_YOUR_PRIVATE_KEY_HERE"
}
EOF
```

**Example:**
```bash
cat > .secret.json << 'EOF'
{
  "projectId": "abc123def456ghi789jkl012mno345pqr",
  "accountPrivateKey": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
}
EOF
```

### Verify it was created
```bash
cat .secret.json
```

Should show your credentials (not the example ones!)

✅ **Done! Your credentials are configured**

---

## ✅ STEP 4: Get Free SepoliaETH (5 min)

### Go to Alchemy Faucet
```
https://www.alchemy.com/faucets/ethereum-sepolia
```

### Get Testnet ETH
1. Connect your wallet (click "Connect")
2. MetaMask popup appears
3. Click "Connect"
4. Click "Send Me ETH"
5. Wait 30 seconds
6. You get 1 SepoliaETH!

**Check your balance:**
- Open MetaMask
- Click network dropdown (top left)
- Select **Sepolia**
- Your balance will show

✅ **Done! You now have free testnet ETH**

---

## ✅ STEP 5: Deploy Contracts to Sepolia (5 min)

### Run deployment command
```bash
cd /Users/sourabhyadav/eventchain_blockchain
npx hardhat ignition deploy ignition/modules/EventChain.js --network sepolia
```

### Wait for output
You'll see:
```
[ EventChain ] successfully deployed 🚀

Deployed Addresses

EventChain#EventChainContract - 0x5FbDB2315678afecb367f032d93F642f64180aa3
EventChain#EventChainEventManagerContract - 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
```

### ⚠️ IMPORTANT: Copy these addresses!
```
Address 1: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Address 2: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
```

✅ **Done! Contracts deployed to Sepolia**

---

## ✅ STEP 6: Update UI Configuration (2 min)

### Edit web3Service.js
```bash
nano /Users/sourabhyadav/eventchain_blockchain/ui/src/web3Service.js
```

### Find line with CONTRACT_ADDRESSES (around line 9)
```javascript
export const CONTRACT_ADDRESSES = {
  EventChainContract: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  EventChainEventManagerContract: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
};
```

### Replace with YOUR Sepolia addresses
```javascript
export const CONTRACT_ADDRESSES = {
  EventChainContract: '0xYOUR_FIRST_ADDRESS_FROM_STEP_5',
  EventChainEventManagerContract: '0xYOUR_SECOND_ADDRESS_FROM_STEP_5'
};
```

### Save the file
- Press `Ctrl + O` (save)
- Press `Enter`
- Press `Ctrl + X` (exit)

✅ **Done! UI configured**

---

## ✅ STEP 7: Configure MetaMask for Sepolia (2 min)

### Open MetaMask
- Click extension icon

### Switch Network or Add It
1. Click network dropdown (top left)
2. Look for **Sepolia**
3. If found, click it and skip to "Done!"

### If Sepolia not in list, add it manually:
1. Click "Add network"
2. Fill in these details:

   **Network Name**: Sepolia
   
   **RPC URL**: 
   ```
   https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY
   ```
   (Replace YOUR_ALCHEMY_API_KEY with your key from Step 1)
   
   **Chain ID**: 11155111
   
   **Currency Symbol**: ETH
   
   **Block Explorer**: https://sepolia.etherscan.io

3. Click "Save"
4. You should now be on Sepolia

✅ **Done! MetaMask configured**

---

## ✅ STEP 8: Start the UI (1 min)

### Terminal 1: Keep Sepolia deployment running (optional, but helpful)
```bash
# The contracts are already deployed, so you don't need this
# But if you want to see logs, you can run:
npx hardhat node --network sepolia
```

### Terminal 2: Start the React UI
```bash
cd /Users/sourabhyadav/eventchain_blockchain/ui
npm start
```

### Wait for it to compile
```
Compiled successfully!

Local:  http://localhost:3000
```

✅ **Done! UI is running**

---

## ✅ STEP 9: Open Browser & Connect Wallet (1 min)

### Open browser
```
http://localhost:3000
```

### Connect your wallet
1. Click **🦊 Connect Wallet** button
2. MetaMask popup appears
3. Click **Connect**
4. Your wallet address appears on screen

**Verify:**
- MetaMask shows **Sepolia** network
- You have **SepoliaETH** balance
- Your address is displayed in UI

✅ **Done! Wallet connected**

---

## ✅ STEP 10: Test It! (5 min)

### Create an Event
1. Go to **Events** tab
2. Fill in:
   - Event Name: "My Test Event"
   - Location: "New York"
   - Date: "2025-12-31"
   - Ticket Price: "0.1"
3. Click **Create Event**
4. Approve in MetaMask
5. Wait ~30 seconds
6. Event appears!

### Mint a Ticket
1. Click **Mint Ticket**
2. Enter:
   - Recipient: Your wallet address (copy from top of page)
   - Metadata URI: `https://example.com/ticket.json`
3. Click **Mint**
4. Approve in MetaMask
5. Wait ~30 seconds
6. Ticket minted!

### Validate Ticket
1. Go to **Validation** tab
2. You'll see your tickets listed
3. Click a ticket to see details
4. View the ownership history
5. Click **Mark as Used** to check in

### View on Etherscan (Cool!)
1. Go to https://sepolia.etherscan.io
2. Paste your wallet address
3. See ALL your transactions! 🎉

✅ **Done! Everything works on Sepolia!**

---

## 🎉 Success!

You now have EventChain running on **Sepolia testnet**!

### What you accomplished:
✅ Set up Alchemy account
✅ Created .secret.json with credentials
✅ Got free SepoliaETH
✅ Deployed contracts to Sepolia
✅ Configured UI
✅ Connected MetaMask
✅ Created events and tickets
✅ Viewed everything on Etherscan

### What happens next:
- Your data stays on Sepolia **forever**
- You can share your Etherscan address with others
- Transactions are visible to everyone
- You can deploy to mainnet with same code!

---

## 🔗 Useful Links

| Resource | Link |
|----------|------|
| **Alchemy** | https://www.alchemy.com |
| **Sepolia Faucet** | https://www.alchemy.com/faucets/ethereum-sepolia |
| **Sepolia Etherscan** | https://sepolia.etherscan.io |
| **MetaMask** | https://metamask.io |

---

## ❓ Need Help?

**Problem**: "Invalid RPC URL"
**Solution**: Check your .secret.json has correct projectId

**Problem**: "Contract not initialized"
**Solution**: Check CONTRACT_ADDRESSES in ui/src/web3Service.js

**Problem**: "Insufficient balance"
**Solution**: Get more SepoliaETH from faucet

**Problem**: "Transaction failed"
**Solution**: Make sure you're on Sepolia network in MetaMask

---

**You're ready to go! Happy deploying! 🚀**
