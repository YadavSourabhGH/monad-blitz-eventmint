# 🎫 EventChain - NFT Ticketing Platform

A comprehensive blockchain-based event ticketing system using NFTs (ERC-721), with features for event organizers, ticket buyers, and gatekeepers.

## 🌟 Features

### For Event Organizers 🎯
- **Create Events**: Set up events with title, date, venue, ticket price, quantity, and images
- **Auto-generate NFTs**: Tickets are automatically minted as NFTs when purchased
- **Track Sales**: Real-time dashboard showing sold, unsold, and redeemed tickets
- **Revenue Analytics**: View total revenue and sales statistics
- **IPFS Storage**: All event metadata stored permanently on IPFS

### For Ticket Buyers 🛒
- **Browse Events**: View all available events with detailed information
- **Buy Tickets**: Purchase tickets with MetaMask (native tokens or testnet ETH)
- **NFT Ownership**: Each ticket is an ERC-721 token in your wallet
- **QR Codes**: Each ticket has a unique QR code for entry
- **View Tickets**: See all owned tickets with metadata
- **Transfer Tickets**: P2P ticket transfers to other wallets

### For Gatekeepers 📱
- **QR Scanner**: Scan ticket QR codes for instant verification
- **Blockchain Verification**: Real-time blockchain status checks
- **Entry Validation**: Mark tickets as redeemed on-chain
- **Ownership History**: View complete ownership chain
- **Fraud Prevention**: No double-entry or counterfeit tickets

## 🔐 Security & Transparency

### On-Chain Features
- ✅ **Immutable Ownership**: Blockchain-verified ticket ownership
- ✅ **Transfer History**: Complete ownership chain visible on-chain
- ✅ **Redemption Tracking**: Tickets can only be redeemed once
- ✅ **Anti-Fraud**: Smart contract validation prevents counterfeits

### IPFS Integration
- 💾 **Permanent Storage**: Event and ticket metadata on IPFS
- 🔗 **Decentralized**: No single point of failure
- 📜 **Immutable Proof**: Cannot be altered after creation

## 🏗️ Architecture

### Smart Contracts

#### EventChainContract.sol
```solidity
- ERC-721 NFT implementation for tickets
- Ticket minting with metadata
- Ownership history tracking
- Expiration date management
- Redemption validation
```

#### EventChainEventManagerContract.sol
```solidity
- Event creation and management
- Ticket sales tracking (sold/unsold/redeemed)
- Payment handling
- Organizer permissions
- Extended event metadata
```

### Frontend Components

#### 1. OrganizerDashboard
- Create events with full details
- Upload event images
- Track ticket sales statistics
- View revenue analytics

#### 2. TicketPurchase (Marketplace)
- Browse available events
- View event details and availability
- Buy tickets with MetaMask
- Automatic NFT minting

#### 3. MyTickets
- View owned NFT tickets
- Generate QR codes
- Transfer tickets P2P
- View blockchain transaction links

#### 4. QRScanner
- Scan QR codes using device camera
- Verify ticket on blockchain
- Mark tickets as redeemed
- View ownership history
- Verification history log

#### 5. TicketValidator
- Manual ticket validation
- Status checking
- Ownership verification

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- MetaMask wallet
- Hardhat (for contract deployment)

### Installation

1. **Install dependencies**:
```bash
# Root directory
npm install

# UI directory
cd ui
npm install
```

2. **Configure environment** (optional):
Create `.env` file in `ui/` directory:
```
REACT_APP_PINATA_API_KEY=your_pinata_key
REACT_APP_PINATA_SECRET_KEY=your_pinata_secret
```

3. **Deploy contracts**:
```bash
# Start local Hardhat node
npx hardhat node

# Deploy contracts (in new terminal)
npx hardhat ignition deploy ignition/modules/EventChain.js --network localhost
```

4. **Update contract addresses**:
Edit `ui/src/web3Service.js`:
```javascript
export const CONTRACT_ADDRESSES = {
  EventChainContract: 'YOUR_DEPLOYED_ADDRESS',
  EventChainEventManagerContract: 'YOUR_DEPLOYED_ADDRESS'
};
```

5. **Start the UI**:
```bash
cd ui
npm start
```

6. **Open browser**:
```
http://localhost:3000
```

## 📱 User Flows

### Event Organizer Flow
1. Connect MetaMask wallet
2. Go to "Organizer" tab
3. Fill in event details (name, location, date, price, quantity, image)
4. Click "Create Event"
5. Transaction confirmed → Event created on blockchain
6. View sales dashboard with real-time statistics

### Ticket Buyer Flow
1. Connect MetaMask wallet
2. Go to "Buy Tickets" tab
3. Browse available events
4. Click "Buy Ticket" on desired event
5. Review purchase details in modal
6. Click "Confirm & Buy"
7. Approve MetaMask transaction
8. NFT ticket minted to your wallet
9. View ticket in "My Tickets" tab

### Entry Verification Flow
1. Gatekeeper opens "Scanner" tab
2. Click "Start Scanner"
3. Attendee shows QR code from "My Tickets"
4. Scanner reads QR code
5. System checks blockchain:
   - Is ticket valid? (not expired)
   - Is ticket owned by correct wallet?
   - Is ticket already redeemed?
6. If all checks pass → "Entry Approved"
7. Click "Grant Entry & Redeem"
8. Ticket marked as redeemed on blockchain
9. Cannot be used again

### P2P Transfer Flow
1. Go to "My Tickets" tab
2. Click "Transfer" on ticket
3. Enter recipient wallet address
4. Review transfer details
5. Confirm transaction
6. Ownership transferred on-chain
7. Complete history preserved

## 🛠️ Technology Stack

### Blockchain
- **Solidity**: Smart contract development
- **OpenZeppelin**: ERC-721 implementation
- **Hardhat**: Development environment
- **Ethers.js / Web3.js**: Blockchain interaction

### Frontend
- **React**: UI framework
- **Web3.js**: Ethereum integration
- **qrcode.react**: QR code generation
- **html5-qrcode**: QR scanner
- **Axios**: HTTP requests

### Storage
- **IPFS (Pinata)**: Decentralized metadata storage
- **LocalStorage**: Development fallback

## 📊 Contract Functions

### EventChainContract (NFT)
```javascript
safeMint(to, uri, eventDetails, price, expiration)
validateTicket(tokenId)  // Mark as redeemed
getTicketStatus(tokenId)  // Check if valid/used
getTicketHistory(tokenId)  // Get ownership chain
transferFrom(from, to, tokenId)  // P2P transfer
```

### EventChainEventManagerContract
```javascript
createEventExtended(name, location, date, price, imageUrl, totalTickets)
getEventExtended(eventId)  // Get event details
getTotalEvents()  // Get total event count
mintTicketExtended(eventId, uri, tokenId)  // Buy ticket
markTicketRedeemed(eventId)  // Update redeemed count
```

## 🔍 Key Features Explained

### NFT Tickets (ERC-721)
Each ticket is a unique blockchain token containing:
- **Token ID**: Unique identifier
- **Metadata**: Event name, date, venue, seat info
- **QR Code**: For entry verification
- **Ownership**: Current owner's wallet address
- **History**: All previous owners
- **Status**: Valid, redeemed, or expired

### IPFS Storage
All metadata is stored on IPFS for:
- **Permanence**: Data cannot be deleted
- **Transparency**: Publicly verifiable
- **Decentralization**: No central server
- **Immutability**: Cannot be altered

### QR Code Verification
QR codes contain:
```json
{
  "tokenId": "12345",
  "contract": "0x...",
  "owner": "0x...",
  "eventName": "Concert 2025",
  "timestamp": 1234567890
}
```

Scanner verifies:
1. ✅ Token exists on blockchain
2. ✅ Token is owned by presenter
3. ✅ Token is not expired
4. ✅ Token not already redeemed

### On-Chain Redemption
When ticket is scanned:
1. `validateTicket(tokenId)` called
2. Smart contract checks validity
3. Marks ticket as "used"
4. Emits redemption event
5. Updates event statistics
6. Cannot be used again

### P2P Transfer Benefits
- 🔐 Secure blockchain transaction
- 📜 Complete ownership history
- 🚫 Anti-fraud protection
- 💯 Transparent and verifiable
- 🎫 Enable ticket resale market

## 🎨 UI Components

### OrganizerDashboard
- Modern card-based event display
- Real-time statistics (sold/unsold/redeemed)
- Progress bars and charts
- Revenue calculation
- Image upload support

### TicketPurchase
- Marketplace-style event grid
- Availability badges
- Event filtering
- Purchase confirmation modal
- Payment summary

### MyTickets
- Ticket collection view
- QR code generation
- Transfer functionality
- Status badges (valid/redeemed/expired)
- Blockchain explorer links

### QRScanner
- Camera-based scanning
- Real-time verification
- Ownership chain display
- Verification history
- Redemption workflow

## 🔮 Future Enhancements

- [ ] Multi-chain support (Polygon, BSC, etc.)
- [ ] Ticket resale marketplace with royalties
- [ ] Dynamic pricing based on demand
- [ ] Seat selection for venues
- [ ] Event recommendations
- [ ] Social features (friends, sharing)
- [ ] Email/SMS notifications
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard for organizers
- [ ] Waitlist and pre-sale features

## 📄 License

MIT License - See LICENSE file for details

## 👥 Contributors

Built with ❤️ by the EventChain team

## 📞 Support

For issues or questions:
- GitHub Issues: [Create an issue]
- Email: support@eventchain.io
- Discord: [Join our community]

---

**EventChain** - Revolutionizing Event Ticketing with Blockchain & NFTs 🚀
