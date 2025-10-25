# 🎫 EventChain - Quick Start Guide

## ✅ Your App is Running!

The EventChain UI is now live at: **http://localhost:3000**

---

## 🚀 How to Use EventChain

### 📋 Prerequisites
1. ✅ **MetaMask** installed in your browser
2. ✅ Connected to **Monad Testnet** (Chain ID: 10143)
3. ✅ Have some **MON** test tokens in your wallet

---

## 🎯 Step-by-Step Walkthrough

### 1️⃣ **Connect Your Wallet**
- Click **"Connect Wallet"** on the homepage
- Approve the MetaMask connection
- You should see your wallet address and MON balance

### 2️⃣ **Create an Event** (As an Organizer)
- Click the **"🎯 Organizer"** tab
- Fill out the event details:
  - Event Name (e.g., "Monad Hackathon 2025")
  - Venue (e.g., "San Francisco Convention Center")
  - Date (e.g., "2025-11-15")
  - Total Tickets (e.g., 100)
  - Ticket Price in ETH (e.g., 0.05)
- Click **"Create Event"**
- Wait for the transaction to confirm (~30-60 seconds on Monad)

### 3️⃣ **Buy Tickets**
- Click the **"🛒 Buy Tickets"** tab
- You'll see all available events
- Click **"Buy Ticket"** on an event
- Confirm the transaction in MetaMask
- Wait for confirmation (~30-60 seconds)

### 4️⃣ **View Your Tickets**
- Click the **"🎫 My Tickets"** tab
- Wait for tickets to load (may take 30 seconds due to Monad RPC)
- You'll see all your NFT tickets!

### 5️⃣ **Use Your Ticket**
- **View QR Code**: Click "📱 View QR" to see the QR code for entry
- **Transfer Ticket**: Click "🔄 Transfer" to send the ticket to another wallet (P2P transfer)
- **Verify on Blockchain**: Click the explorer link to see your ticket on Monad Explorer

---

## 🔧 Troubleshooting

### ⚠️ "Loading your tickets..." stuck forever

**Reasons:**
1. You haven't purchased any tickets yet
2. Monad RPC is slow (normal - can take 30-60 seconds)
3. No events have been created yet

**Solutions:**
- Click **"🔄 Refresh Tickets"** to retry
- Make sure you've purchased tickets first (see steps above)
- Check browser console (F12) for error messages
- If timeout, wait a minute and try again

### ⚠️ "No tickets found"

This means you haven't purchased any tickets yet. Follow steps 2-3 above to:
1. Create an event (Organizer tab)
2. Buy a ticket (Buy Tickets tab)
3. Return to My Tickets tab

### ⚠️ Transactions taking forever

Monad Testnet can be slow. Typical wait times:
- **Event Creation**: 30-60 seconds
- **Ticket Purchase**: 30-60 seconds  
- **Ticket Transfer**: 30-60 seconds

Be patient and don't refresh the page during transactions!

### ⚠️ "RPC timeout" or "RPC slow"

The Monad Testnet RPC can be slow or overloaded. Solutions:
1. Click the **Refresh** button to retry
2. Wait 1-2 minutes and try again
3. Check Monad testnet status online

---

## 📱 Features Overview

### 🛒 Buy Tickets Tab
- Browse available events
- Purchase tickets using MON/ETH
- Real blockchain transactions

### 🎫 My Tickets Tab  
- View all your NFT tickets
- Generate QR codes for entry
- Transfer tickets to other wallets (P2P)
- View tickets on blockchain explorer

### 🎯 Organizer Tab
- Create new events
- Set ticket prices and quantities
- View your created events
- Track ticket sales

### 📱 Scanner Tab
- Scan QR codes at event entrance
- Verify ticket authenticity
- Check-in attendees

### ✅ Validator Tab
- Advanced ticket validation
- Check ticket history
- Verify ownership

### 🔗 Transactions Tab
- View all your transaction history
- Check pending transactions
- See confirmed purchases and transfers

---

## 🌐 Blockchain Details

### Deployed Contracts (Monad Testnet)
- **EventChain Contract**: `0x7D70097F097Ba768Dda48E314206f5A879d2873A`
- **EventManager Contract**: `0x3b3E674a6BEaa5D49dE3365Ad6e991F1Dd9701aA`

### Explorer Links
- **Monad Explorer**: https://testnet.monadexplorer.com
- **View Contract**: https://testnet.monadexplorer.com/address/0x7D70097F097Ba768Dda48E314206f5A879d2873A

---

## 💡 Tips & Best Practices

1. **Be Patient**: Monad RPC can be slow. Wait for confirmations.
2. **Check Console**: Open browser console (F12) for detailed logs
3. **Refresh When Needed**: Use the Refresh buttons if things don't load
4. **Test Amounts**: Use small amounts of MON for testing
5. **Save Transaction Hashes**: Keep track of your transaction hashes for reference

---

## 🎉 You're Ready!

Everything is set up and working. The "Loading..." message you see is normal - it means the app is trying to fetch your tickets from the blockchain.

**Next Steps:**
1. Go to **"🎯 Organizer"** tab → Create an event
2. Go to **"🛒 Buy Tickets"** tab → Buy a ticket  
3. Return to **"🎫 My Tickets"** tab → See your ticket!

---

## 📞 Need Help?

- Check browser console (F12 → Console tab) for error messages
- Make sure MetaMask is on Monad Testnet (Chain ID: 10143)
- Ensure you have MON test tokens in your wallet
- Wait 30-60 seconds for blockchain confirmations

**Happy Ticketing! 🎫✨**
