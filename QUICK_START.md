# 🚀 EventChain - Quick Start Guide

Get your NFT ticketing platform running in 5 minutes!

## ⚡ Quick Setup

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install UI dependencies
cd ui
npm install
cd ..
```

### 2. Start Local Blockchain

```bash
# Terminal 1 - Start Hardhat node
npx hardhat node
```

Keep this terminal running. You'll see 20 test accounts with 10000 ETH each.

### 3. Deploy Smart Contracts

```bash
# Terminal 2 - Deploy contracts
npx hardhat ignition deploy ignition/modules/EventChain.js --network localhost
```

**📝 Copy the deployed addresses** - you'll need them next!

Example output:
```
✅ EventChainContract deployed at: 0x5FbDB2315678afecb367f032d93F642f64180aa3
✅ EventChainEventManagerContract deployed at: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
```

### 4. Update Contract Addresses

Edit `ui/src/web3Service.js` (around line 7):

```javascript
export const CONTRACT_ADDRESSES = {
  EventChainContract: '0x5FbDB2315678afecb367f032d93F642f64180aa3', // ← Your address
  EventChainEventManagerContract: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512' // ← Your address
};
```

### 5. Start the UI

```bash
# Terminal 3
cd ui
npm start
```

Browser opens at `http://localhost:3000`

### 6. Configure MetaMask

#### Add Hardhat Network:
- Network Name: `Hardhat Local`
- RPC URL: `http://127.0.0.1:8545`
- Chain ID: `31337`
- Currency: `ETH`

#### Import Test Account:
Copy a private key from Terminal 1 (Hardhat node output):
```
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

In MetaMask:
1. Click account icon → Import Account
2. Paste private key
3. Click "Import"

### 7. Connect Wallet

1. Click "🚀 Connect Wallet & Get Started"
2. MetaMask popup → Click "Next" → "Connect"
3. You're in! 🎉

---

## 🎯 Test the Complete Flow

### As Event Organizer:

1. **Create an Event**:
   - Click "🎯 Organizer" tab
   - Fill in event details:
     - Name: "Summer Music Festival"
     - Location: "Central Park, NYC"
     - Date: Select a future date
     - Ticket Price: 0.05 (ETH)
     - Total Tickets: 100
   - (Optional) Upload event image
   - Click "🚀 Create Event"
   - Approve MetaMask transaction
   - Wait for confirmation ✅

2. **View Dashboard**:
   - See your event card with statistics
   - Total: 100, Sold: 0, Available: 100, Redeemed: 0

### As Ticket Buyer:

1. **Switch Account** (simulate different user):
   - Import another test account from Hardhat node
   - Or use Account #1 private key

2. **Buy a Ticket**:
   - Click "🛒 Buy Tickets" tab
   - See "Summer Music Festival" event
   - Click "🎟️ Buy Ticket"
   - Review purchase details
   - Click "✅ Confirm & Buy"
   - Approve MetaMask transaction (0.05 ETH)
   - Success! NFT minted ✅

3. **View Your Ticket**:
   - Click "🎟️ My Tickets" tab
   - See your ticket card
   - Click "📱 View QR" to see QR code
   - Status: "✓ Valid"

### As Gatekeeper:

1. **Scan & Verify**:
   - Click "📱 Scanner" tab
   - Click "📷 Start Scanner"
   - Allow camera access
   - Point camera at QR code (from "My Tickets" tab)
   - System verifies on blockchain
   - Result: "✅ ENTRY APPROVED - Valid Ticket"
   - Click "✅ Grant Entry & Redeem"
   - Approve MetaMask transaction
   - Ticket marked as redeemed ✅

2. **Try Again**:
   - Scan same QR code again
   - Result: "❌ ENTRY DENIED - Ticket Already Used"
   - Perfect! Anti-fraud working 🔒

### Test P2P Transfer:

1. **Transfer Ticket**:
   - Go to "🎟️ My Tickets"
   - Click "🔄 Transfer" on a ticket
   - Enter recipient address (another test account)
   - Click "✅ Confirm Transfer"
   - Approve MetaMask transaction
   - Ownership transferred! ✅

2. **Verify Ownership History**:
   - Click "📱 View QR"
   - Scroll to "🔗 Ownership Chain"
   - See complete ownership history
   - All addresses listed

---

## 🎨 Features to Try

### Organizer Dashboard
✅ Create multiple events  
✅ Upload different images  
✅ Set different prices  
✅ Watch statistics update  
✅ Calculate revenue  

### Marketplace
✅ Browse all events  
✅ Filter by availability  
✅ View event details  
✅ Buy multiple tickets  

### My Tickets
✅ View ticket collection  
✅ Generate QR codes  
✅ Transfer to friends  
✅ Check blockchain links  

### QR Scanner
✅ Camera scanning  
✅ Real-time verification  
✅ Redemption workflow  
✅ History tracking  

---

## 🐛 Troubleshooting

### "Contract not initialized"
→ Check contract addresses in `ui/src/web3Service.js`

### "Transaction failed"
→ Make sure you have enough ETH in MetaMask  
→ Check you're on Hardhat network (Chain ID: 31337)

### "MetaMask not connecting"
→ Refresh page  
→ Unlock MetaMask  
→ Check network is "Hardhat Local"

### "QR Scanner not working"
→ Allow camera permissions  
→ Use HTTPS or localhost  
→ Try different browser

### "Events not loading"
→ Check browser console for errors  
→ Verify contract deployment  
→ Ensure Hardhat node is running

---

## 📊 Contract Interaction

### Manual Testing with Hardhat Console:

```bash
npx hardhat console --network localhost
```

```javascript
const EventManager = await ethers.getContractAt(
  "EventChainEventManagerContract", 
  "YOUR_DEPLOYED_ADDRESS"
);

// Get total events
const total = await EventManager.getTotalEvents();
console.log("Total events:", total.toString());

// Get event details
const event = await EventManager.getEventExtended(0);
console.log("Event:", event);
```

---

## 🎓 Next Steps

1. **Customize UI**: Edit CSS files to match your brand
2. **Add Features**: Implement waitlist, pre-sale, etc.
3. **Deploy to Testnet**: Use Sepolia or Mumbai
4. **Set up IPFS**: Configure Pinata API keys
5. **Add Analytics**: Track user behavior
6. **Mobile App**: Build React Native version

---

## 📚 Documentation

- **Full README**: `NFT_TICKETING_README.md`
- **Smart Contracts**: `contracts/` directory
- **UI Components**: `ui/src/components/`
- **Web3 Integration**: `ui/src/web3Service.js`

---

## 🆘 Need Help?

- Check console logs (F12 in browser)
- Review Hardhat node terminal for contract events
- Inspect MetaMask transactions
- Read error messages carefully

---

**You're all set!** 🎉 Start creating events and selling NFT tickets!

Questions? Open an issue on GitHub or check the full documentation.

Happy building! 🚀
