# 🚀 Local Development Setup Guide

## ✅ Current Status
- ✅ Hardhat node running on http://127.0.0.1:8545
- ✅ Contracts deployed successfully:
  - **EventChainContract**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
  - **EventChainEventManagerContract**: `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`

## 📝 Steps to Connect MetaMask

### Step 1: Add Localhost Network to MetaMask

1. Open MetaMask
2. Click on the network dropdown (currently showing "Monad Testnet")
3. Click "Add Network" or "Add a network manually"
4. Enter the following details:
   - **Network Name**: `Localhost 8545`
   - **RPC URL**: `http://127.0.0.1:8545`
   - **Chain ID**: `31337`
   - **Currency Symbol**: `ETH`
5. Click "Save"

### Step 2: Import a Test Account

Import one of these pre-funded test accounts (each has 10,000 ETH):

**Account #0** (Recommended):
- Address: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- Private Key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

**Account #1**:
- Address: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`
- Private Key: `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d`

To import:
1. Click MetaMask account icon
2. Select "Import Account"
3. Paste the private key
4. Click "Import"

### Step 3: Switch to Localhost Network

1. Open MetaMask
2. Click network dropdown
3. Select "Localhost 8545"
4. Verify you see ~10,000 ETH balance

### Step 4: Refresh the App

1. Go back to your EventChain app (http://localhost:3000)
2. Refresh the page (⌘ + R)
3. The app should now connect successfully!

## 🎯 Testing the App

### Create an Event
1. Click on "🎯 Organizer" tab
2. Fill in event details:
   - Event Name: "Test Concert"
   - Location: "Virtual Stage"
   - Date: Select future date
   - Ticket Price: 0.01 (ETH)
   - Total Tickets: 100
3. Click "✨ Create Event"
4. Approve the MetaMask transaction

### Buy a Ticket
1. Click on "🎫 Buy Tickets" tab
2. You should see your created event
3. Click "Buy Ticket"
4. Approve the transaction
5. Your NFT ticket will be minted!

### View Your Tickets
1. Click on "🎟️ My Tickets" tab
2. You'll see all your NFT tickets

### Validate Tickets
1. Click on "✅ Validator" tab
2. Enter a ticket token ID
3. Click "Validate Ticket"
4. The ticket will be marked as used

## ⚠️ Important Notes

1. **The Hardhat node must be running** - If you close it, restart with:
   ```bash
   npx hardhat node
   ```

2. **Redeploy after restarting node**:
   ```bash
   npx hardhat ignition deploy ignition/modules/EventChain.js --network localhost
   ```

3. **Reset MetaMask account** if transactions fail:
   - Settings → Advanced → Clear activity tab data

## 🔧 Troubleshooting

### "Error loading events"
- Make sure Hardhat node is running
- Make sure you're connected to Localhost 8545 in MetaMask
- Refresh the page

### "Nonce too high" error
- Reset MetaMask: Settings → Advanced → Clear activity tab data

### "Insufficient funds"
- Make sure you imported the test account with 10,000 ETH
- Switch to the correct account in MetaMask

## 📚 For Production/Testnet Deployment

To use on Monad Testnet or other networks:
1. Update contract addresses in `ui/src/web3Service.js`
2. Deploy contracts to that network first
3. Make sure MetaMask is connected to the same network

---

**Current Network**: Localhost (Chain ID: 31337)
**Status**: ✅ Ready for testing
