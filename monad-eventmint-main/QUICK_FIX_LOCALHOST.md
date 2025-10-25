# 🚀 QUICK FIX - Switch to Localhost

## ✅ What I Just Did:

**Switched your app from Monad Testnet → Localhost** because Monad RPC is having internal errors.

### Updated Contract Addresses:
- EventChainContract: `0x5FbDB2315678afecb367f032d93F642f64180aa3` (Localhost)
- EventChainEventManagerContract: `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512` (Localhost)

### Status Check:
- ✅ Hardhat node is running on port 8545
- ✅ Contracts are deployed locally
- ✅ App configuration updated

---

## 🎯 ACTION REQUIRED - Follow These 3 Steps:

### Step 1: Add Localhost Network to MetaMask

1. Open MetaMask
2. Click network dropdown (currently shows "Monad Testnet")
3. Click "Add Network" or "Add a network manually"
4. Enter these details:
   ```
   Network Name: Localhost 8545
   RPC URL: http://127.0.0.1:8545
   Chain ID: 31337
   Currency Symbol: ETH
   ```
5. Click "Save"

### Step 2: Import Test Account (with 10,000 ETH)

1. Click MetaMask account icon → "Import Account"
2. Paste this private key:
   ```
   0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```
3. Click "Import"
4. **You'll see 10,000 ETH** - perfect for testing! 🎉

### Step 3: Switch Network & Refresh

1. Switch MetaMask to "Localhost 8545"
2. **Refresh your browser** (⌘ + R or Ctrl + R)
3. Connect your wallet
4. **The error should be GONE!** ✅

---

## 🎉 After Setup - Test Your App:

### Create an Event:
1. Click "🎯 Organizer" tab
2. Fill in:
   - Event Name: "Test Concert"
   - Location: "Virtual Venue"
   - Date: October 30, 2025
   - Price: 0.01 ETH
   - Total Tickets: 100
3. Click "Create Event"
4. Approve transaction

### Buy a Ticket:
1. Click "🎫 Buy Tickets" tab
2. See your event
3. Click "Buy Ticket"
4. Approve transaction
5. Your NFT is minted! 🎟️

---

## 🔄 Switch Back to Monad Later:

When Monad RPC is working again:

```bash
./switch-network.sh
# Choose option 1 (Monad Testnet)
```

Then:
1. Switch MetaMask to "Monad Testnet"
2. Refresh browser
3. Use your Monad account (0xdb4d...9741)

---

## 📊 Current Setup:

**Network**: Localhost (Chain ID: 31337)
**Contracts**: Deployed ✅
**Hardhat Node**: Running ✅
**Test Accounts**: 20 accounts with 10,000 ETH each
**Gas**: FREE (localhost testing)

---

## ⚡ Quick Reference:

**Switch Network:**
```bash
./switch-network.sh
```

**Restart Hardhat Node:**
```bash
npx hardhat node
```

**Redeploy Contracts:**
```bash
npx hardhat ignition deploy ignition/modules/EventChain.js --network localhost
```

**Check Node Status:**
```bash
curl http://127.0.0.1:8545
```

---

## 🎯 NEXT STEP:

**Follow Steps 1-3 above to switch MetaMask to localhost!**

After that, refresh your browser and the app will work perfectly. 🚀

---

**Why localhost?**
- ✅ No RPC errors
- ✅ Instant transactions
- ✅ Free gas
- ✅ Complete control
- ✅ Perfect for development

**Current Issue with Monad:**
- ❌ "Internal JSON-RPC error"
- ❌ Circuit breaker triggered
- ❌ Testnet instability

You can switch back to Monad anytime when it's stable!
