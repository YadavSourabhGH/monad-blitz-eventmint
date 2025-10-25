# 🚀 EventChain - Monad Testnet Setup

## ✅ Current Deployment Status

**Network**: Monad Testnet (Chain ID: 10143)

**Deployed Contracts**:
- **EventChainContract**: `0x5e8AFCb29A627cE0AbA0E6018BbB999a0b57d0CB`
- **EventChainEventManagerContract**: `0x4ab008d8EC36E01c96a0F4eBe40482b1432366DF`

**Explorer**: https://explorer.testnet.monad.xyz

## 📝 Setup MetaMask for Monad Testnet

### Step 1: Add Monad Testnet to MetaMask

Your MetaMask is already showing "Monad Testnet" - you're connected! ✅

If you need to re-add it:
1. Network Name: `Monad Testnet`
2. RPC URL: `https://testnet-rpc.monad.xyz`
3. Chain ID: `10143`
4. Currency Symbol: `MON`
5. Block Explorer: `https://explorer.testnet.monad.xyz`

### Step 2: Get MON Testnet Tokens

You already have **9.4756 MON** - that's enough to test! ✅

If you need more:
- Visit Monad Testnet Faucet: [Check Discord or official docs]
- Or use the faucet at the Monad developer portal

### Step 3: Verify Your Account

Your current account: `0xdb4d...9741`
Balance: `9.4756 MON` ✅

## 🎯 Using the EventChain App

### 1️⃣ Refresh the App

The contract addresses have been updated. Now:
1. Go to http://localhost:3000
2. **Hard refresh** the page (⌘ + Shift + R on Mac)
3. The app should now connect to Monad Testnet!

### 2️⃣ Create an Event (Organizer)

1. Click **"🎯 Organizer"** tab
2. Fill in event details:
   ```
   Event Name: "Monad Music Festival"
   Location: "Virtual Arena"
   Date: October 30, 2025
   Ticket Price: 0.01 (MON)
   Total Tickets: 100
   ```
3. Click **"✨ Create Event"**
4. **Approve the transaction in MetaMask**
5. Wait for confirmation (~3-5 seconds)

### 3️⃣ Buy Tickets (Marketplace)

1. Click **"🎫 Buy Tickets"** tab
2. Browse available events
3. Click **"🎟️ Buy Ticket"** on an event
4. Review the purchase modal
5. Click **"✅ Confirm & Buy"**
6. **Approve the transaction** (cost: 0.01 MON + gas)
7. Your NFT ticket is minted! 🎉

### 4️⃣ View Your Tickets

1. Click **"🎟️ My Tickets"** tab
2. See all your NFT tickets
3. View ticket details, QR codes, and transfer options

### 5️⃣ Validate Tickets (Validator)

1. Click **"✅ Validator"** tab
2. Enter a ticket Token ID
3. Click **"Validate Ticket"**
4. Approve the transaction
5. Ticket is marked as redeemed ✅

### 6️⃣ Scan QR Codes (Scanner)

1. Click **"📱 Scanner"** tab
2. Allow camera access
3. Scan a ticket QR code
4. See ticket details and validation status

## 💡 Transaction Costs

Typical gas fees on Monad Testnet:
- Create Event: ~0.001-0.002 MON
- Buy Ticket: ~0.001 MON
- Validate Ticket: ~0.0005 MON
- Transfer Ticket: ~0.0005 MON

With **9.47 MON**, you can perform **hundreds of transactions**!

## 🔍 Verify Transactions

After each transaction, you can:
1. Click on the transaction in MetaMask
2. View on Monad Explorer
3. Check the full transaction details

**Explorer Links**:
- EventChainContract: https://explorer.testnet.monad.xyz/address/0x5e8AFCb29A627cE0AbA0E6018BbB999a0b57d0CB
- EventManagerContract: https://explorer.testnet.monad.xyz/address/0x4ab008d8EC36E01c96a0F4eBe40482b1432366DF

## ⚠️ Troubleshooting

### "Error loading events"
✅ **FIXED!** Contract addresses updated to Monad Testnet.
- Make sure you're connected to Monad Testnet in MetaMask
- Hard refresh the page (⌘ + Shift + R)

### "Insufficient funds"
- Check your MON balance (you have 9.4756 MON)
- Make sure gas fees aren't too high

### "Transaction failed"
- Check if you have enough MON for gas
- Try increasing gas limit in MetaMask settings
- Reset account in MetaMask: Settings → Advanced → Clear activity tab data

### "Network mismatch"
- Make sure MetaMask shows "Monad Testnet" at the top
- Refresh the page after switching networks

## 🎉 Ready to Test!

Everything is configured and ready:
- ✅ Contracts deployed on Monad Testnet
- ✅ Contract addresses updated in UI
- ✅ MetaMask connected to Monad Testnet
- ✅ Account funded with 9.4756 MON

**Next step**: Refresh the app and start creating events! 🚀

---

**Network**: Monad Testnet (10143)
**Status**: ✅ READY
**Last Updated**: October 25, 2025
