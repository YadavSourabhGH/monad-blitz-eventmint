# EventChain UI - Complete Guide

## 🎯 Overview

This is a React-based UI for interacting with the EventChain blockchain ticketing system. It provides a complete interface for:
- Creating events
- Minting tickets (NFTs)
- Validating tickets
- Transferring tickets
- Viewing ticket history
- Managing ticket check-ins

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MetaMask browser extension
- Connected to a blockchain network (Hardhat, Ganache, or Polygon Amoy testnet)

### Installation

```bash
cd ui
npm install
npm start
```

The application will open at `http://localhost:3000`

## 📋 Features

### 1. **Wallet Connection** 🦊
- Connect MetaMask wallet
- View account address and ETH balance
- Disconnect and switch accounts

### 2. **Event Management** 📅

#### Create Events
1. Fill in event details:
   - Event Name
   - Location
   - Date
   - Ticket Price (in ETH)
2. Click "✨ Create Event"
3. Approve transaction in MetaMask
4. Event is recorded on blockchain

#### Mint Tickets
1. Click "🎫 Mint Tickets" on an event
2. Enter:
   - **Recipient Address**: Who receives the ticket (0x...)
   - **Metadata URI**: URL to ticket metadata (IPFS, Arweave, or HTTP)
3. Click "✅ Mint Ticket"
4. Approve transaction in MetaMask
5. Ticket NFT is created and sent to recipient

#### Transfer Events
1. Click "🔄 Transfer" on an event
2. Enter:
   - **Token ID**: Ticket ID to transfer
   - **Transfer To Address**: Recipient address
3. Click "✅ Transfer Ticket"
4. Approve transaction in MetaMask

### 3. **Ticket Validation** 🎫

#### View Your Tickets
1. Click "Show" button in "Your Tickets" section
2. See all tickets you own
3. Click on a ticket to view details

#### Validate a Ticket
1. Enter a Ticket ID manually or click on a ticket from your list
2. Click "🔍 Validate"
3. View:
   - Validity status (valid/invalid)
   - Usage status (used/unused)
   - Ownership history
   - Expiration date

#### Mark Ticket as Used (Check-in)
1. After validating an unused ticket
2. Click "✓ Mark as Used (Check-in)"
3. Approve transaction
4. Ticket is marked as used on blockchain

#### View Ownership History
- See complete chain of ownership
- Verify ticket legitimacy
- Track all previous owners

## 🔗 Smart Contract Integration

### Setup Contract Addresses

To enable full functionality, configure your contract addresses:

1. Open `/ui/src/web3Service.js`
2. Update `CONTRACT_ADDRESSES`:

```javascript
export const CONTRACT_ADDRESSES = {
  EventChainContract: '0x...', // Your deployed EventChainContract
  EventChainEventManagerContract: '0x...' // Your deployed EventChainEventManagerContract
};
```

### Deploy Contracts

If you haven't deployed the contracts yet:

```bash
# From the project root
npx hardhat ignition deploy ignition/modules/EventChain.js --network hardhat
```

This will output your contract addresses to use above.

## 📖 How to Get Tickets

### Method 1: Create Event & Mint
1. Create an event
2. Mint tickets to any address
3. Tickets are received by the recipient

### Method 2: Receive from Organizer
1. Event organizer creates event
2. Organizer mints ticket to your address
3. You receive the NFT in your wallet

### Method 3: Transfer from Another User
1. Another user with a ticket transfers it to you
2. Use the "Transfer" feature with your address
3. You receive the ticket

### View Your Tickets
1. Go to "🎫 Validate Tickets" tab
2. Click "Show" button under "Your Tickets"
3. All your tickets are displayed with IDs

## 🔐 Security Features

- ✅ MetaMask integration for secure signing
- ✅ Contract validation for all transactions
- ✅ Ownership verification
- ✅ Tamper-proof ticket records
- ✅ Complete immutable history
- ✅ Prevention of duplicate usage
- ✅ Automatic expiration handling

## 📝 Metadata URI Format

When minting tickets, provide a URI to ticket metadata. Examples:

### IPFS (Recommended)
```
ipfs://QmXxxx...
```

### HTTP
```
https://example.com/metadata/ticket-1.json
```

### Metadata JSON Structure
```json
{
  "name": "Concert Ticket",
  "description": "VIP ticket for Rock Festival 2025",
  "image": "ipfs://QmXxxx...",
  "attributes": [
    {
      "trait_type": "Seat",
      "value": "A1"
    },
    {
      "trait_type": "Section",
      "value": "Front"
    }
  ]
}
```

## 🛠️ Available Functions

### Web3 Service (`web3Service.js`)

#### Connection
- `initWeb3()` - Initialize Web3 and connect MetaMask
- `getAccount()` - Get current account address
- `getBalance(address)` - Get ETH balance

#### Events
- `createEvent(name, location, date, ticketPrice)` - Create new event
- `getEventDetails(eventId)` - Get event info

#### Tickets
- `mintTicket(eventId, recipientAddress, metadataUri)` - Mint NFT ticket
- `transferTicket(tokenId, toAddress)` - Transfer ticket to another address
- `validateTicket(tokenId)` - Mark ticket as used
- `getTicketStatus(tokenId)` - Get ticket status
- `getTicketHistory(tokenId)` - Get ownership history
- `getUserTickets(userAddress)` - Get all tickets owned by user

## 🐛 Troubleshooting

### "Contract not initialized"
- Check that `CONTRACT_ADDRESSES` are set in `web3Service.js`
- Ensure contracts are deployed to the correct network
- Verify network is connected in MetaMask

### "User denied account access"
- Accept the MetaMask connection request
- Make sure MetaMask is unlocked
- Try disconnecting and reconnecting

### "Insufficient balance"
- Check your ETH balance (transaction costs gas)
- Get testnet ETH from faucet if needed

### "Invalid contract address"
- Verify address format (0x followed by 40 hex characters)
- Check address matches deployed contract on current network

## 📱 Network Support

- ✅ Hardhat Local Network
- ✅ Ganache
- ✅ Ethereum Sepolia Testnet
- ✅ Polygon Amoy Testnet
- ✅ Any EVM-compatible network

## 📚 File Structure

```
ui/
├── src/
│   ├── components/
│   │   ├── EventManager.js       # Event creation & minting
│   │   ├── EventManager.css
│   │   ├── TicketValidator.js    # Ticket validation
│   │   ├── TicketValidator.css
│   │   ├── WalletConnect.js      # Wallet connection
│   │   └── WalletConnect.css
│   ├── web3Service.js            # Web3 & contract interactions
│   ├── App.js                    # Main app component
│   ├── App.css
│   ├── index.js
│   └── index.css
├── public/
│   └── index.html
└── package.json
```

## 🔄 Transaction Flow

### Creating an Event
1. User fills form → `createEvent()` → SmartContract → Transaction signed → Event recorded

### Minting a Ticket
1. User fills form → `mintTicket()` → EventManager → EventChain Contract → NFT minted → Sent to recipient

### Validating a Ticket
1. User enters ID → `getTicketStatus()` → Read blockchain → Display status

### Transferring a Ticket
1. User fills form → `transferTicket()` → ERC721 transfer → Transaction signed → New owner recorded

## 💡 Tips & Best Practices

1. **Always use valid addresses** - Verify recipient addresses before transferring
2. **Keep metadata URIs available** - Ensure metadata endpoints don't go offline
3. **Test on testnet first** - Use Sepolia or Amoy before mainnet
4. **Save transaction hashes** - Keep records of important transactions
5. **Verify contract addresses** - Double-check before interacting
6. **Use IPFS for metadata** - More reliable than HTTP endpoints

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review smart contract tests: `/test/`
3. Check contract documentation: `/contracts/`
4. Open an issue on GitHub

## 📄 License

MIT - See LICENSE file for details

---

**EventChain** - Revolutionizing Event Ticketing with Blockchain Technology 🎫✨
