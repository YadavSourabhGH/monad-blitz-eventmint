# EventChain - Complete Setup & Usage Guide

## 🎯 Quick Start

### Part 1: Deploy Smart Contracts

```bash
# From project root
cd /Users/sourabhyadav/eventchain_blockchain

# Run tests to verify contracts
npx hardhat test

# Deploy contracts locally
npx hardhat ignition deploy ignition/modules/EventChain.js --network hardhat
```

You'll see output like:
```
Deployed Addresses

EventChain#EventChainContract - 0x...
EventChain#EventChainEventManagerContract - 0x...
```

**Save these addresses!**

### Part 2: Configure UI

```bash
# Open and edit the web3Service.js file
# Path: ui/src/web3Service.js

# Find this section at the top:
export const CONTRACT_ADDRESSES = {
  EventChainContract: '0x0000000000000000000000000000000000000000',
  EventChainEventManagerContract: '0x0000000000000000000000000000000000000000'
};

# Replace with your deployed addresses from Part 1
```

### Part 3: Run UI

```bash
cd ui
npm start
```

Access at: http://localhost:3000

---

## 📖 Complete Workflow

### Step 1: Connect Wallet ✨

1. Click "🦊 Connect MetaMask" button
2. Approve connection in MetaMask
3. See your account and balance

### Step 2: Create an Event 📅

1. Go to "📅 Events" tab
2. Fill event form:
   - **Event Name**: e.g., "Rock Concert 2025"
   - **Location**: e.g., "Madison Square Garden"
   - **Date**: Pick a date
   - **Ticket Price**: e.g., "0.1" ETH
3. Click "✨ Create Event"
4. Approve MetaMask transaction
5. Event created on blockchain!

### Step 3: Mint Tickets 🎫

1. Find your event card
2. Click "🎫 Mint Tickets" button
3. Modal appears - fill:
   - **Recipient Address**: Who gets the ticket (can be you or someone else)
   - **Metadata URI**: URL to ticket data (can use placeholder like "ipfs://demo")
4. Click "✅ Mint Ticket"
5. Approve MetaMask transaction
6. **Ticket is minted!** 🎉

### Step 4: Get & View Tickets 🎟️

1. Go to "🎫 Validate Tickets" tab
2. Click "🔼 Show" under "Your Tickets"
3. See all tickets you own with their IDs
4. Click on any ticket to see full details:
   - Validity status
   - Usage status
   - Ownership history
   - All previous owners

### Step 5: Validate & Check-in ✓

1. Select or enter a ticket ID
2. Click "🔍 Validate"
3. See:
   - ✅ Valid/❌ Invalid status
   - 🎫 Used/🆕 Unused status
   - 📜 Complete ownership history
4. For entry: Click "✓ Mark as Used (Check-in)"
5. Approve transaction
6. Ticket marked as used on blockchain!

### Step 6: Transfer Ticket 🔄

1. Click "🔄 Transfer" on event
2. Fill:
   - **Token ID**: ID of ticket to transfer
   - **Transfer To Address**: Recipient address (0x...)
3. Click "✅ Transfer Ticket"
4. Approve MetaMask transaction
5. Ticket transferred to new owner!

---

## 🎟️ How to Get Tickets - All Methods

### Method 1: Mint to Yourself
```
Create Event → Mint Tickets → Enter Your Address → Get Ticket
```

### Method 2: Receive from Someone
```
Other person mints ticket to your address → You own it
```

### Method 3: Transfer from Other Owner
```
Owner transfers ticket to you → You become new owner
```

### Method 4: View All Your Tickets
```
Go to Validate Tab → Click "Show" → See all your tickets
```

---

## 🔍 Understanding Ticket Details

When you validate a ticket, you see:

### **Validation Status**
- ✅ Valid: Ticket hasn't expired
- ❌ Invalid: Ticket expired or doesn't exist

### **Usage Status**
- 🆕 Unused: Ticket hasn't been checked-in
- 🎫 Already Used: Ticket was used (checked-in)

### **Ownership History**
Shows complete chain:
1. Original minter (first owner)
2. All subsequent owners
3. Current owner is last in list

Example:
```
1. 0xdB4d...9741 (Original)
2. 0xAb12...3456 (Transferred to)
3. 0xCd78...9999 (Current owner)
```

---

## 💡 Key Concepts

### **Event ID**
- Auto-assigned when event is created
- Used to mint tickets for that event
- Starts from 0, increments

### **Ticket ID (Token ID)**
- Auto-assigned when ticket is minted
- Unique identifier for each NFT
- Used for validation and transfers
- Starts from 0, increments

### **Metadata URI**
- URL pointing to ticket information
- Can be IPFS, Arweave, or HTTP
- Format: JSON with ticket details
- Optional but recommended

### **Ownership History**
- Immutable record on blockchain
- Shows every owner of ticket
- Proves legitimacy
- Cannot be forged

---

## 🧪 Testing Workflow

### Test Scenario 1: Full Event Lifecycle
```
1. Create Event "Test Concert"
2. Mint 3 tickets
3. Validate each ticket
4. Transfer one ticket
5. Check-in tickets at entry
```

### Test Scenario 2: Ticket Transfer
```
1. Mint ticket to Address A
2. Transfer from A to B
3. Transfer from B to C
4. View history (A → B → C)
```

### Test Scenario 3: Validation Security
```
1. Mint ticket
2. Validate it (mark as used)
3. Try to use again (should fail)
✓ Prevents duplicate usage!
```

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Contract not initialized" | Check CONTRACT_ADDRESSES in web3Service.js |
| "User denied account" | Approve MetaMask request |
| "Insufficient balance" | Get testnet ETH from faucet |
| "Invalid address format" | Use 0x... format, 42 chars total |
| "Ticket not found" | Verify ticket ID exists |
| "Already used" | Ticket was checked-in already |

---

## 📊 UI Components

### **EventManager** 📅
- Create events
- Mint tickets
- Transfer tickets
- Manage event info

### **TicketValidator** 🎫
- View all your tickets
- Validate ticket details
- Check ownership history
- Mark tickets as used
- See expiration status

### **WalletConnect** 🦊
- Connect/disconnect MetaMask
- Show account address
- Display ETH balance

---

## 🔐 Security Features

✅ **MetaMask Signing** - All transactions require user approval
✅ **Tamper-Proof** - NFT tickets can't be forged
✅ **Ownership Verified** - Only owner can transfer
✅ **History Immutable** - Complete record on blockchain
✅ **Expiration Checked** - Validates ticket expiration
✅ **Usage Prevention** - Can't use ticket twice
✅ **Access Control** - Only organizer can create events

---

## 📱 Supported Networks

| Network | Chain ID | Status |
|---------|----------|--------|
| Hardhat (Local) | 31337 | ✅ Supported |
| Ganache | 5777 | ✅ Supported |
| Ethereum Sepolia | 11155111 | ✅ Supported |
| Polygon Amoy | 80002 | ✅ Supported |
| Mainnet | 1 | ✅ Supported |

---

## 🚀 Performance Tips

1. **Use IPFS for metadata** - Faster than HTTP
2. **Batch mint tickets** - Multiple at once if possible
3. **Cache contract calls** - Reduce RPC requests
4. **Optimize gas** - Use reasonable gas prices
5. **Test on testnet** - Before mainnet deployment

---

## 📚 File Locations

```
eventchain_blockchain/
├── contracts/
│   ├── EventChainContract.sol
│   ├── EventChainEventManagerContract.sol
│   ├── IEventChainContract.sol
│   └── IEventChainEventManagerContract.sol
├── ui/
│   ├── src/
│   │   ├── components/
│   │   ├── web3Service.js         ← Configure here
│   │   └── App.js
│   └── README.md                  ← Full guide
├── hardhat.config.js
└── test/
    ├── EventChainContract.js
    └── EventChainEventManagerContract.js
```

---

## ✨ Next Steps

1. ✅ Deploy contracts
2. ✅ Configure UI with contract addresses
3. ✅ Start UI (`npm start`)
4. ✅ Connect wallet
5. ✅ Create test event
6. ✅ Mint test tickets
7. ✅ Validate tickets
8. ✅ Test transfers
9. ✅ Test check-ins

---

**Ready to revolutionize ticketing? Let's go! 🎫✨**
