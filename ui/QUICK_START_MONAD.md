# 🚀 Quick Start - Monad Blockchain Integration

## ✅ Your App is Ready!

Everything is configured to work with **real blockchain contracts** on **Monad Testnet**!

---

## 🎯 Quick Setup (5 Minutes)

### 1️⃣ Add Monad Testnet to MetaMask

Open MetaMask → Networks → Add Network → Manual:

```
Network Name:     Monad Testnet
RPC URL:          https://testnet-rpc.monad.xyz
Chain ID:         10143  
Currency:         MON
Explorer:         https://testnet.monadexplorer.com
```

### 2️⃣ Get Test MON Tokens

Visit Monad Faucet or Discord:
- https://faucet.monad.xyz
- OR ask in Monad Discord server

### 3️⃣ Start the App

```bash
cd /Users/sourabhyadav/eventchain_blockchain/ui
npm run dev
```

Open: http://localhost:8080

### 4️⃣ Connect Wallet

1. Click "Connect Wallet" button
2. Select MetaMask
3. Approve connection
4. ✅ You're connected!

---

## 🎫 Test the Full Flow

### Create an Event

1. Click **"Create Event"**
2. Fill in:
   - Event Name: "Crypto Music Festival"
   - Location: "San Francisco"
   - Date: Pick a future date
   - Ticket Price: 0.01 MON
   - Total Tickets: 100
   - Upload an image

3. Click **"Create Event"**
4. **MetaMask opens** → Confirm transaction
5. Wait 2-5 seconds
6. ✅ Event created on blockchain!

### Buy a Ticket

1. Go to **Marketplace**
2. Click on an event
3. Click **"Buy Ticket"**
4. **MetaMask opens** with price (0.01 MON) + gas
5. Confirm transaction
6. Wait 2-5 seconds
7. ✅ NFT ticket minted to your wallet!

### View Your Tickets

1. Go to **"My Tickets"**
2. See all your NFT tickets
3. Each ticket shows:
   - Event details
   - Token ID
   - QR code for verification
   - Transfer option

---

## 📊 What's Happening Behind the Scenes

### When You Create an Event:
```typescript
// Smart contract call
await eventManagerContract.createEventExtended(
  "Crypto Music Festival",
  "San Francisco", 
  "2025-12-01",
  parseMonad("0.01"),  // 0.01 MON in wei
  "ipfs://...",        // Image URL
  100                  // Total tickets
)
```

**Result:** Event stored on Monad blockchain forever!

### When You Buy a Ticket:
```typescript
// Smart contract call (payable)
await eventManagerContract.mintTicketExtended(
  eventId,
  "ipfs://metadata",
  tokenId,
  { value: ticketPrice }  // Sending MON payment
)
```

**Result:** 
- NFT minted to your wallet
- Payment sent to event organizer
- Ticket count updated on-chain

---

## 🔍 Verify on Blockchain

### Check Contracts on Monad Explorer:

**Event Manager Contract:**
https://testnet.monadexplorer.com/address/0x3b3E674a6BEaa5D49dE3365Ad6e991F1Dd9701aA

**NFT Ticket Contract:**
https://testnet.monadexplorer.com/address/0x7D70097F097Ba768Dda48E314206f5A879d2873A

### Check Your Transactions:
- Open MetaMask
- Click on transaction
- Click "View on block explorer"
- See your transaction on Monad Explorer!

---

## 🎨 Features Working

✅ **Connect MetaMask**
✅ **Create Events on Monad**  
✅ **Buy Tickets (NFTs)**
✅ **View My Tickets**
✅ **Transfer Tickets**
✅ **Real Blockchain Storage**
✅ **MetaMask Transaction Signing**
✅ **Gas Fee Estimation**
✅ **Event Organizer Payments**

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't connect wallet | Make sure MetaMask is installed and unlocked |
| Wrong network | Switch MetaMask to "Monad Testnet" |
| Transaction fails | Check you have enough MON for gas + ticket price |
| "Nonce too high" | MetaMask Settings → Advanced → Clear activity tab data |
| Events not loading | Refresh page, check network connection |

---

## 💻 Developer Tools

### Open Browser Console (F12) to see:
```
🚀 EventChain Loading...
🔗 Wagmi config: {...}
✅ App rendered successfully!
📱 App component rendering...
🎫 Fetching events from blockchain...
```

### Check MetaMask Network:
- Chain ID should be: **10143**
- Network name: **Monad Testnet**
- Currency: **MON**

---

## 🎯 Next Steps

1. **Test event creation** - Create a few events
2. **Buy tickets** - Purchase tickets from different accounts
3. **Transfer tickets** - Send NFT to another address
4. **Check blockchain** - Verify everything on Monad Explorer

---

## 📝 Contract Addresses (Save These!)

```typescript
EventChainContract: '0x7D70097F097Ba768Dda48E314206f5A879d2873A'
EventChainEventManagerContract: '0x3b3E674a6BEaa5D49dE3365Ad6e991F1Dd9701aA'
```

---

## 🌟 You're All Set!

Your app is now a **fully functional blockchain-powered NFT ticketing platform** running on Monad Testnet! 

Every action is:
- ✅ Stored permanently on blockchain
- ✅ Verified by smart contracts  
- ✅ Secured by MetaMask
- ✅ Transparent and auditable

**Happy Building! 🚀**
