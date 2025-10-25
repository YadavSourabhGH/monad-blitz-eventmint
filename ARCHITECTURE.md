# 🎨 EventChain - Component Architecture

## 📊 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        🎫 EventChain                             │
│                   NFT Ticketing Platform                         │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (React)                          │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────┐                    │
│  │   App.js         │  │ WalletConnect.js │                    │
│  │  (Main Layout)   │  │ (MetaMask)       │                    │
│  └────────┬─────────┘  └──────────────────┘                    │
│           │                                                      │
│  ┌────────▼──────────────────────────────────────────────┐     │
│  │             Tab Navigation                             │     │
│  │  🛒 Buy  │ 🎟️ My Tickets │ 🎯 Organizer │ 📱 Scanner │     │
│  └────┬──────┬──────────────┬──────────────┬─────────────┘     │
│       │      │              │              │                    │
│  ┌────▼─┐ ┌─▼────┐  ┌──────▼─────┐  ┌────▼─────┐             │
│  │Ticket│ │My    │  │Organizer   │  │QR        │             │
│  │Purch.│ │Ticket│  │Dashboard   │  │Scanner   │             │
│  └──────┘ └──────┘  └────────────┘  └──────────┘             │
└──────────────────────────┬───────────────────────────────────┘
                           │
┌──────────────────────────▼────────────────────────────────────┐
│                      Services Layer                            │
├───────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐         ┌──────────────────┐           │
│  │  web3Service.js  │         │  ipfsService.js  │           │
│  │                  │         │                  │           │
│  │ • initWeb3()     │         │ • uploadJSON()   │           │
│  │ • getAccount()   │         │ • uploadFile()   │           │
│  │ • createEvent()  │         │ • getMetadata()  │           │
│  │ • buyTicket()    │         │ • storeLocal()   │           │
│  │ • transfer()     │         │                  │           │
│  │ • redeem()       │         │                  │           │
│  └────────┬─────────┘         └──────────────────┘           │
│           │                                                    │
└───────────┼────────────────────────────────────────────────────┘
            │
┌───────────▼────────────────────────────────────────────────────┐
│                    Blockchain Layer                             │
├────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐     │
│  │          EventChainEventManagerContract              │     │
│  │                                                       │     │
│  │  • createEventExtended()                             │     │
│  │  • getEventExtended()                                │     │
│  │  • getTotalEvents()                                  │     │
│  │  • mintTicketExtended()                              │     │
│  │  • markTicketRedeemed()                              │     │
│  │                                                       │     │
│  │  [Tracks: Total/Sold/Unsold/Redeemed]               │     │
│  └───────────────────┬──────────────────────────────────┘     │
│                      │ Calls                                   │
│  ┌───────────────────▼──────────────────────────────────┐     │
│  │            EventChainContract (ERC-721)              │     │
│  │                                                       │     │
│  │  • safeMint()                                        │     │
│  │  • validateTicket()                                  │     │
│  │  • getTicketStatus()                                 │     │
│  │  • getTicketHistory()                                │     │
│  │  • safeTransferFrom()                                │     │
│  │                                                       │     │
│  │  [NFT Tickets with Ownership History]               │     │
│  └──────────────────────────────────────────────────────┘     │
└────────────────────────────────────────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────────────┐
│                      Storage Layer                              │
├────────────────────────────────────────────────────────────────┤
│  ┌────────────────┐              ┌────────────────┐           │
│  │  IPFS (Pinata) │              │   Blockchain   │           │
│  │                │              │                │           │
│  │ • Event Meta   │              │ • Ownership    │           │
│  │ • Ticket Meta  │              │ • Transfers    │           │
│  │ • Images       │              │ • Redemptions  │           │
│  │ • Immutable    │              │ • Validation   │           │
│  └────────────────┘              └────────────────┘           │
└────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Diagrams

### Event Creation Flow

```
Organizer Dashboard
      │
      ▼
Fill Form (name, date, venue, price, qty, image)
      │
      ▼
Upload Image to IPFS
      │
      ▼
Create Metadata JSON
      │
      ▼
Upload Metadata to IPFS
      │
      ▼
Call createEventExtended(...)
      │
      ▼
MetaMask Signs Transaction
      │
      ▼
Smart Contract Creates Event
      │
      ▼
Event Stored On-Chain
      │
      ▼
Dashboard Updates with Stats
```

### Ticket Purchase Flow

```
Ticket Purchase (Marketplace)
      │
      ▼
Browse Available Events
      │
      ▼
Click "Buy Ticket"
      │
      ▼
Review Purchase Modal
      │
      ▼
Confirm Purchase
      │
      ▼
Call mintTicketExtended(eventId, uri, tokenId)
      │
      ▼
Send ETH Payment
      │
      ▼
Smart Contract:
  • Mints NFT to buyer
  • Transfers ETH to organizer
  • Increments soldTickets
  • Adds to eventTickets array
      │
      ▼
NFT Appears in "My Tickets"
```

### Entry Verification Flow

```
QR Scanner
      │
      ▼
Start Camera
      │
      ▼
Scan QR Code
      │
      ▼
Extract Token ID & Contract
      │
      ▼
Call getTicketStatus(tokenId)
      │
      ▼
Check Blockchain:
  • Is ticket valid? (not expired)
  • Is ticket redeemed? (isUsed)
  • Who owns it? (ownerOf)
      │
      ├─── Valid & Not Redeemed ───┐
      │                             ▼
      │                   Show "✅ Entry Approved"
      │                             │
      │                             ▼
      │                   Click "Grant Entry & Redeem"
      │                             │
      │                             ▼
      │                   Call validateTicket(tokenId)
      │                             │
      │                             ▼
      │                   Mark as Redeemed On-Chain
      │
      └─── Invalid/Redeemed ───┐
                                ▼
                      Show "❌ Entry Denied"
```

### P2P Transfer Flow

```
My Tickets
      │
      ▼
Select Ticket to Transfer
      │
      ▼
Click "Transfer" Button
      │
      ▼
Enter Recipient Address
      │
      ▼
Review Transfer Details
      │
      ▼
Confirm Transfer
      │
      ▼
Call safeTransferFrom(from, to, tokenId)
      │
      ▼
Smart Contract:
  • Verifies ownership
  • Updates ownershipHistory
  • Transfers NFT
  • Emits Transfer event
      │
      ▼
Ownership Updated On-Chain
      │
      ▼
New Owner Sees Ticket in Their Collection
```

---

## 🎯 Component Responsibilities

### Frontend Components

#### **App.js**
- Main application shell
- Tab navigation
- Wallet connection state
- Route rendering

#### **WalletConnect.js**
- MetaMask integration
- Connect/disconnect wallet
- Display address & balance
- Network detection

#### **OrganizerDashboard.js**
- Event creation form
- Image upload
- Event statistics display
- Revenue calculation
- Sold/unsold/redeemed tracking

#### **TicketPurchase.js**
- Event marketplace
- Browse available events
- Purchase modal
- Payment handling
- Auto-refresh after buy

#### **MyTickets.js**
- Display owned NFTs
- QR code generation
- Transfer functionality
- Status badges
- Blockchain links

#### **QRScanner.js**
- Camera access
- QR code scanning
- Blockchain verification
- Entry approval/denial
- Redemption processing
- History logging

#### **TicketValidator.js**
- Manual validation
- Status checking
- Legacy support

---

### Service Layer

#### **web3Service.js**
- Web3 initialization
- Contract instances
- Transaction handling
- Event listening
- Gas estimation
- Error handling

**Key Functions:**
```javascript
// Wallet
initWeb3()
getAccount()
getBalance()

// Events
createEventExtended(...)
getEventExtended(id)
getTotalEvents()

// Tickets
buyTicket(eventId, price)
getUserTickets(address)
transferTicketP2P(tokenId, to)
redeemTicket(tokenId)
getTicketStatus(tokenId)
getTicketHistory(tokenId)
```

#### **ipfsService.js**
- IPFS uploads (JSON & files)
- Metadata creation
- Retrieval from IPFS
- Local fallback
- Pinata integration

**Key Functions:**
```javascript
uploadJSONToIPFS(metadata)
uploadFileToIPFS(file)
createEventMetadata(eventData)
createTicketMetadata(ticketData)
getMetadataFromIPFS(uri)
storeMetadataLocally(metadata)
```

---

### Smart Contracts

#### **EventChainContract.sol**
**Type**: ERC-721 NFT  
**Purpose**: Individual ticket tokens

**State:**
```solidity
struct Ticket {
  string eventDetails;
  uint256 originalPrice;
  uint256 expirationDate;
  address[] ownershipHistory;
  bool isUsed;
}

mapping(uint256 => Ticket) tickets;
```

**Key Functions:**
```solidity
safeMint()        // Mint new ticket NFT
validateTicket()  // Mark as redeemed
getTicketStatus() // Check valid/used
getTicketHistory() // Get ownership chain
```

#### **EventChainEventManagerContract.sol**
**Type**: Event Management  
**Purpose**: Create events, track sales

**State:**
```solidity
struct EventExtended {
  string name;
  string location;
  string date;
  uint256 ticketPrice;
  address organizer;
  string imageUrl;
  uint256 totalTickets;
  uint256 soldTickets;
  uint256 redeemedTickets;
}

mapping(uint256 => EventExtended) eventsExtended;
```

**Key Functions:**
```solidity
createEventExtended() // Create event
getEventExtended()    // Get event details
mintTicketExtended()  // Buy ticket (payable)
markTicketRedeemed()  // Update redeemed count
getTotalEvents()      // Get event count
```

---

## 🔐 Security Flow

```
┌──────────────────┐
│  User Action     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  MetaMask Popup  │  ← Signature Required
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Transaction     │  ← Gas Fee Paid
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Smart Contract   │  ← Validation
│ • require()      │
│ • onlyOwner()    │
│ • checks         │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Blockchain      │  ← Immutable Record
│  State Update    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Event Emission  │  ← Transparency
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  UI Update       │  ← User Feedback
└──────────────────┘
```

---

## 📦 File Dependencies

```
App.js
  ├── imports WalletConnect.js
  ├── imports EventManager.js
  ├── imports TicketValidator.js
  ├── imports OrganizerDashboard.js
  ├── imports TicketPurchase.js
  ├── imports MyTickets.js
  ├── imports QRScanner.js
  ├── uses web3Service.js
  └── uses App.css

OrganizerDashboard.js
  ├── uses web3Service.js (createEventExtended, getEventExtended)
  ├── uses ipfsService.js (uploadMetadata, uploadFile)
  └── uses OrganizerDashboard.css

TicketPurchase.js
  ├── uses web3Service.js (getTotalEvents, getEventExtended, buyTicket)
  └── uses TicketPurchase.css

MyTickets.js
  ├── uses qrcode.react (QR generation)
  ├── uses web3Service.js (getUserTickets, transferTicketP2P)
  └── uses MyTickets.css

QRScanner.js
  ├── uses html5-qrcode (Scanner)
  ├── uses web3Service.js (getTicketStatus, redeemTicket, getTicketHistory)
  └── uses QRScanner.css

web3Service.js
  ├── uses Web3
  ├── uses ethers
  └── includes contract ABIs

ipfsService.js
  ├── uses axios
  └── uses localStorage (fallback)
```

---

## 🎨 UI Component Tree

```
<App>
  │
  ├── <Header>
  │     ├── <Logo>
  │     └── <WalletConnect>
  │           ├── Connect Button
  │           └── Account Info
  │
  ├── <TabNavigation>
  │     ├── Buy Tickets Tab
  │     ├── My Tickets Tab
  │     ├── Organizer Tab
  │     ├── Scanner Tab
  │     └── Validator Tab
  │
  └── <Content>
        │
        ├── <TicketPurchase>
        │     ├── Event Cards
        │     ├── Purchase Modal
        │     └── Payment Summary
        │
        ├── <MyTickets>
        │     ├── Ticket Cards
        │     ├── QR Modal
        │     └── Transfer Modal
        │
        ├── <OrganizerDashboard>
        │     ├── Create Form
        │     ├── Image Upload
        │     └── Event Stats
        │
        ├── <QRScanner>
        │     ├── Camera View
        │     ├── Verification Result
        │     └── History Log
        │
        └── <TicketValidator>
              └── Manual Validation
```

---

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────┐
│         Frontend (React App)            │
│                                         │
│  • Static files (HTML, CSS, JS)        │
│  • Hosted on: Vercel/Netlify/IPFS      │
│                                         │
└───────────────┬─────────────────────────┘
                │ RPC Calls
                ▼
┌─────────────────────────────────────────┐
│      Blockchain Network                 │
│                                         │
│  • Hardhat (Local Development)          │
│  • Sepolia (Testnet)                   │
│  • Ethereum Mainnet (Production)        │
│                                         │
│  Smart Contracts Deployed:              │
│  • EventChainContract                   │
│  • EventChainEventManagerContract       │
│                                         │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│          IPFS Network                   │
│                                         │
│  • Pinata Gateway                       │
│  • Metadata Storage                     │
│  • Image Storage                        │
│  • Decentralized                        │
│                                         │
└─────────────────────────────────────────┘
```

---

**EventChain - Component Architecture Complete! 🎯**

All components work together to create a seamless NFT ticketing experience.
