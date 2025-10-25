# 🎓 EventChain: Technologies & Topics Explained

This document provides a comprehensive explanation of all technologies, concepts, and topics used in the EventChain blockchain-based ticketing system.

---

## 📑 Table of Contents

1. [Blockchain Technology](#1-blockchain-technology)
2. [Smart Contracts](#2-smart-contracts)
3. [Ethereum & EVM](#3-ethereum--evm)
4. [Solidity Programming Language](#4-solidity-programming-language)
5. [ERC-721 Token Standard](#5-erc-721-token-standard)
6. [NFTs (Non-Fungible Tokens)](#6-nfts-non-fungible-tokens)
7. [OpenZeppelin Libraries](#7-openzeppelin-libraries)
8. [Hardhat Development Framework](#8-hardhat-development-framework)
9. [Web3.js & Ethers.js](#9-web3js--ethersjs)
10. [MetaMask & Wallet Integration](#10-metamask--wallet-integration)
11. [IPFS (InterPlanetary File System)](#11-ipfs-interplanetary-file-system)
12. [React.js Frontend Framework](#12-reactjs-frontend-framework)
13. [Test Networks](#13-test-networks)
14. [Gas & Transaction Fees](#14-gas--transaction-fees)
15. [Decentralized Applications (DApps)](#15-decentralized-applications-dapps)
16. [QR Code Technology](#16-qr-code-technology)
17. [P2P (Peer-to-Peer) Transfers](#17-p2p-peer-to-peer-transfers)
18. [Event-Driven Architecture](#18-event-driven-architecture)
19. [Ownership & Access Control](#19-ownership--access-control)
20. [Testing & Quality Assurance](#20-testing--quality-assurance)

---

## 1. Blockchain Technology

### What is Blockchain?

Blockchain is a **distributed ledger technology** that records transactions across multiple computers in a way that makes it nearly impossible to alter retroactively.

### Key Concepts in EventChain:

- **Immutability**: Once ticket data is written to the blockchain, it cannot be changed or deleted
- **Transparency**: All ticket transfers and validations are publicly verifiable
- **Decentralization**: No single authority controls the ticketing system
- **Security**: Cryptographic hashing ensures data integrity

### How EventChain Uses Blockchain:

```solidity
// Ticket ownership is permanently recorded on the blockchain
mapping(uint256 => Ticket) private tickets;
```

**Benefits for Ticketing:**
- Prevents counterfeit tickets
- Creates verifiable ownership history
- Eliminates need for centralized ticket authority
- Enables trustless peer-to-peer transfers

---

## 2. Smart Contracts

### What are Smart Contracts?

Smart contracts are **self-executing programs** stored on the blockchain that automatically enforce agreements when predetermined conditions are met.

### Key Features:

- **Autonomous**: Execute automatically without intermediaries
- **Trustless**: Don't require trust between parties
- **Immutable**: Cannot be changed after deployment
- **Deterministic**: Same input always produces same output

### EventChain Smart Contracts:

#### EventChainContract
```solidity
contract EventChainContract is ERC721, ERC721URIStorage, ERC721Burnable, Ownable
```

**Functions:**
- `safeMint()`: Create new ticket NFTs
- `validateTicket()`: Mark tickets as used at entry
- `getTicketStatus()`: Check if ticket is valid
- `transferFrom()`: Transfer ticket ownership

#### EventChainEventManagerContract
```solidity
contract EventChainEventManagerContract is Ownable
```

**Functions:**
- `createEventExtended()`: Create new events
- `mintTicketExtended()`: Issue tickets for events
- `getEventExtended()`: Retrieve event details
- `markTicketRedeemed()`: Track ticket redemptions

---

## 3. Ethereum & EVM

### Ethereum Blockchain

**Ethereum** is a decentralized blockchain platform that enables smart contracts and decentralized applications.

### Key Components:

- **Accounts**: Externally Owned Accounts (EOA) and Contract Accounts
- **Transactions**: State-changing operations on the blockchain
- **Blocks**: Groups of transactions processed together
- **Consensus**: Proof of Stake (PoS) mechanism

### EVM (Ethereum Virtual Machine)

The **EVM** is the runtime environment for smart contracts in Ethereum.

**Characteristics:**
- Stack-based architecture
- Isolated execution environment
- Gas metering for resource management
- Turing-complete (can compute any computable function)

### Networks Used in EventChain:

```javascript
networks: {
  hardhat: {},          // Local development
  localhost: {},        // Local Hardhat network
  ganache: {},          // Local testing network
  sepolia: {},          // Ethereum testnet
  amoy: {},             // Polygon testnet
  monad: {}             // Monad testnet
}
```

---

## 4. Solidity Programming Language

### What is Solidity?

**Solidity** is a statically-typed, contract-oriented programming language designed for writing smart contracts on Ethereum and other EVM-compatible blockchains.

### Version Used:
```solidity
pragma solidity ^0.8.9;
```

### Key Language Features in EventChain:

#### 1. **Data Types**

```solidity
// Value Types
uint256 private _tokenIdCounter;
bool isUsed;
address organizer;

// Reference Types
string eventDetails;
address[] ownershipHistory;
mapping(uint256 => Ticket) private tickets;
```

#### 2. **Structs**

```solidity
struct Ticket {
    string eventDetails;
    uint256 originalPrice;
    uint256 expirationDate;
    address[] ownershipHistory;
    bool isUsed;
}
```

#### 3. **Mappings**

```solidity
mapping(uint256 => Ticket) private tickets;
mapping(uint256 => uint256) public maxResalePrice;
```

#### 4. **Functions**

```solidity
function safeMint(
    address to, 
    string memory uri, 
    string memory eventDetails, 
    uint256 originalPrice, 
    uint256 expirationDate
) public override
```

#### 5. **Modifiers**

```solidity
function updateTicketMetadata(...) public override onlyOwner {
    // Only contract owner can call this
}
```

#### 6. **Events**

```solidity
event TicketMinted(uint256 indexed tokenId, address indexed owner, ...);
emit TicketMinted(tokenId, to, eventDetails, originalPrice, expirationDate);
```

#### 7. **Inheritance**

```solidity
contract EventChainContract is 
    ERC721, 
    ERC721URIStorage, 
    ERC721Burnable, 
    Ownable
```

---

## 5. ERC-721 Token Standard

### What is ERC-721?

**ERC-721** is the Non-Fungible Token (NFT) standard on Ethereum. It defines a minimum interface for smart contracts to manage unique tokens.

### Core Functions:

```solidity
// Required by ERC-721
function balanceOf(address owner) returns (uint256)
function ownerOf(uint256 tokenId) returns (address)
function safeTransferFrom(address from, address to, uint256 tokenId)
function transferFrom(address from, address to, uint256 tokenId)
function approve(address to, uint256 tokenId)
function getApproved(uint256 tokenId) returns (address)
function setApprovalForAll(address operator, bool approved)
function isApprovedForAll(address owner, address operator) returns (bool)
```

### EventChain Implementation:

```solidity
contract EventChainContract is ERC721 {
    constructor(address initialOwner)
        ERC721("EventChainTickets", "ECT")
        Ownable(initialOwner)
    {}
}
```

**Token Details:**
- **Name**: EventChainTickets
- **Symbol**: ECT
- **Each ticket** is a unique ERC-721 token

### Why ERC-721 for Tickets?

✅ Each ticket is unique (non-fungible)  
✅ Provable ownership  
✅ Built-in transfer mechanisms  
✅ Compatible with NFT marketplaces  
✅ Standardized interface  

---

## 6. NFTs (Non-Fungible Tokens)

### What are NFTs?

**NFTs** are unique digital assets that represent ownership of a specific item or piece of content on the blockchain.

### NFT vs Fungible Tokens:

| **Fungible (ERC-20)** | **Non-Fungible (ERC-721)** |
|----------------------|---------------------------|
| Interchangeable | Unique |
| Same value | Different values |
| Example: Currency | Example: Tickets, Art |

### NFT Components:

#### 1. **Token ID**
```solidity
uint256 private _tokenIdCounter;
```
Each ticket has a unique identifier.

#### 2. **Metadata**
```javascript
{
  "name": "Concert Ticket #123",
  "description": "NFT Ticket for Rock Concert",
  "image": "ipfs://...",
  "attributes": [
    {"trait_type": "Event Name", "value": "Rock Concert"},
    {"trait_type": "Venue", "value": "Madison Square Garden"},
    {"trait_type": "Date", "value": "2025-12-31"}
  ]
}
```

#### 3. **URI (Uniform Resource Identifier)**
```solidity
function tokenURI(uint256 tokenId) public view returns (string memory)
```
Links to metadata stored on IPFS.

### EventChain NFT Ticket Features:

- **Unique Identity**: Each ticket has a unique token ID
- **Ownership History**: Tracks all previous owners
- **Expiration**: Tickets expire after event date
- **Validation**: Can be marked as "used" at entry
- **Transferability**: Can be safely transferred P2P
- **Metadata**: Rich metadata stored on IPFS

---

## 7. OpenZeppelin Libraries

### What is OpenZeppelin?

**OpenZeppelin** is a library of secure, community-vetted smart contract components. It's the gold standard for Ethereum development.

### Libraries Used in EventChain:

```solidity
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
```

### 1. **ERC721.sol**
Base implementation of ERC-721 standard.

**Key Functions:**
- `_safeMint()`: Safely create new tokens
- `_transfer()`: Transfer tokens
- `balanceOf()`: Get token balance
- `ownerOf()`: Get token owner

### 2. **ERC721URIStorage.sol**
Extension for storing token metadata URIs.

**Key Functions:**
- `tokenURI()`: Get metadata URI
- `_setTokenURI()`: Set metadata URI

### 3. **ERC721Burnable.sol**
Extension for burning (destroying) tokens.

**Key Functions:**
- `burn()`: Destroy a token

```solidity
function burnExpiredTickets(uint256 tokenId) public override onlyOwner {
    require(!_isTicketValid(tokenId), "Ticket is still valid");
    _burn(tokenId);
}
```

### 4. **Ownable.sol**
Access control pattern for contract ownership.

**Key Functions:**
- `owner()`: Get current owner
- `onlyOwner` modifier: Restrict function access
- `transferOwnership()`: Transfer contract ownership

```solidity
function updateTicketMetadata(...) public override onlyOwner {
    // Only contract owner can update metadata
}
```

### Benefits of OpenZeppelin:

✅ Battle-tested security  
✅ Gas-optimized  
✅ Community audited  
✅ Standardized patterns  
✅ Regular updates  

---

## 8. Hardhat Development Framework

### What is Hardhat?

**Hardhat** is a development environment for Ethereum that helps developers compile, deploy, test, and debug smart contracts.

### Configuration:

```javascript
// hardhat.config.js
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {},
    localhost: { url: "http://127.0.0.1:8545" },
    ganache: { url: "http://127.0.0.1:7545" },
    sepolia: { url: `https://eth-sepolia.g.alchemy.com/v2/${projectId}` },
    monad: { url: "https://testnet-rpc.monad.xyz" }
  }
};
```

### Key Features Used:

#### 1. **Compilation**
```bash
npx hardhat compile
```
Compiles Solidity contracts to bytecode and ABI.

#### 2. **Testing**
```bash
npx hardhat test
```
Runs automated tests using Mocha/Chai.

```javascript
describe("EventChainContract", function () {
  it("Should set the right owner", async function () {
    expect(await instance.owner()).to.equal(owner.address);
  });
});
```

#### 3. **Deployment (Hardhat Ignition)**
```bash
npx hardhat ignition deploy ignition/modules/EventChain.js --network amoy
```

```javascript
module.exports = buildModule("EventChain", (m) => {
  const eventChainContract = m.contract("EventChainContract", [m.getAccount(0)]);
  const eventManager = m.contract("EventChainEventManagerContract", 
    [m.getAccount(0), eventChainContract]);
  return { eventChainContract, eventManager };
});
```

#### 4. **Local Network**
```bash
npx hardhat node
```
Runs a local Ethereum node for development.

#### 5. **Console**
```bash
npx hardhat console --network localhost
```
Interactive JavaScript console for blockchain interaction.

### Hardhat Toolbox:

Includes essential plugins:
- `hardhat-ethers`: Ethers.js integration
- `hardhat-chai-matchers`: Testing assertions
- `hardhat-gas-reporter`: Gas usage analysis
- `solidity-coverage`: Code coverage

---

## 9. Web3.js & Ethers.js

### What are Web3 Libraries?

**Web3.js** and **Ethers.js** are JavaScript libraries that allow interaction with Ethereum blockchain from web applications.

### EventChain Uses Web3.js:

```javascript
import Web3 from 'web3';

let web3;
let eventChainContract;
let eventManagerContract;
```

### Key Functions:

#### 1. **Initialization**

```javascript
export const initWeb3 = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    initializeContracts();
    return web3;
  }
};
```

#### 2. **Account Management**

```javascript
export const getAccount = async () => {
  const accounts = await web3.eth.getAccounts();
  return accounts[0];
};
```

#### 3. **Balance Checking**

```javascript
export const getBalance = async (address) => {
  const balance = await web3.eth.getBalance(address);
  return web3.utils.fromWei(balance.toString(), 'ether');
};
```

#### 4. **Contract Interaction**

```javascript
// Initialize contract instance
eventChainContract = new web3.eth.Contract(
  EventChainContractABI, 
  CONTRACT_ADDRESSES.EventChainContract
);

// Call contract function
const status = await eventChainContract.methods
  .getTicketStatus(tokenId)
  .call();

// Send transaction
await eventChainContract.methods
  .validateTicket(tokenId)
  .send({ from: account, gas: gasLimit });
```

#### 5. **Utility Functions**

```javascript
// Convert Ether to Wei
web3.utils.toWei('1.5', 'ether')  // "1500000000000000000"

// Convert Wei to Ether
web3.utils.fromWei('1500000000000000000', 'ether')  // "1.5"
```

#### 6. **Network Information**

```javascript
export const getNetworkInfo = async () => {
  const chainId = await web3.eth.getChainId();
  const networks = {
    1: 'Ethereum Mainnet',
    11155111: 'Sepolia Testnet',
    10143: 'Monad Testnet'
  };
  return networks[Number(chainId)];
};
```

### Contract ABIs:

```javascript
export const EventChainContractABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "string", "name": "uri", "type": "string" }
    ],
    "name": "safeMint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
```

**ABI (Application Binary Interface)** defines how to interact with smart contracts:
- Function names
- Parameter types
- Return values
- Events

---

## 10. MetaMask & Wallet Integration

### What is MetaMask?

**MetaMask** is a cryptocurrency wallet and gateway to blockchain apps. It allows users to interact with Ethereum blockchain through their browser.

### EventChain MetaMask Integration:

#### 1. **Wallet Connection**

```javascript
const connectWallet = async () => {
  await initWeb3();
  const account = await getAccount();
  const balance = await getBalance(account);
  setAccount(account);
  setBalance(balance);
};
```

#### 2. **Detecting MetaMask**

```javascript
if (window.ethereum) {
  // MetaMask is installed
  web3 = new Web3(window.ethereum);
} else {
  throw new Error('MetaMask is not installed');
}
```

#### 3. **Request Account Access**

```javascript
await window.ethereum.request({ method: 'eth_requestAccounts' });
```

#### 4. **Network Switching**

```javascript
await window.ethereum.request({
  method: 'wallet_switchEthereumChain',
  params: [{ chainId: '0x27a7' }], // Monad Testnet
});
```

#### 5. **Transaction Signing**

When users interact with the contract (buy ticket, transfer, etc.), MetaMask:
1. Shows transaction details
2. Estimates gas fees
3. Asks user to confirm
4. Signs transaction with private key
5. Broadcasts to network

```javascript
// MetaMask will prompt user to sign this transaction
await eventManagerContract.methods
  .mintTicketExtended(eventId, metadataUri, tokenId)
  .send({ 
    from: account, 
    value: priceInWei,
    gas: gasLimit 
  });
```

### Security Features:

✅ Private keys never leave user's device  
✅ Transaction confirmation required  
✅ Phishing detection  
✅ Network warnings  

---

## 11. IPFS (InterPlanetary File System)

### What is IPFS?

**IPFS** is a peer-to-peer distributed file system for storing and sharing data in a decentralized way.

### Why Use IPFS for NFTs?

❌ **Problem**: Storing large files (images, metadata) on blockchain is expensive  
✅ **Solution**: Store files on IPFS, store IPFS hash on blockchain

### IPFS Characteristics:

- **Content-addressed**: Files identified by their hash
- **Immutable**: Content cannot be changed
- **Distributed**: No central server
- **Permanent**: Files persist as long as nodes host them

### EventChain IPFS Integration:

```javascript
// ipfsService.js
const PINATA_GATEWAY = 'https://gateway.pinata.cloud/ipfs/';
```

#### 1. **Upload Metadata to IPFS**

```javascript
export const uploadJSONToIPFS = async (metadata) => {
  const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'pinata_api_key': PINATA_API_KEY,
      'pinata_secret_api_key': PINATA_SECRET_KEY,
    },
    body: JSON.stringify({ pinataContent: metadata })
  });
  
  const data = await response.json();
  return data.IpfsHash; // Returns: QmXx...
};
```

#### 2. **Create Ticket Metadata**

```javascript
export const createTicketMetadata = async (ticketData) => {
  const metadata = {
    name: `${ticketData.eventName} - Ticket #${ticketData.tokenId}`,
    description: `NFT Ticket for ${ticketData.eventName}`,
    image: ticketData.eventImage,
    attributes: [
      { trait_type: 'Event Name', value: ticketData.eventName },
      { trait_type: 'Venue', value: ticketData.venue },
      { trait_type: 'Date', value: ticketData.date }
    ]
  };
  
  const ipfsHash = await uploadJSONToIPFS(metadata);
  return `ipfs://${ipfsHash}`;
};
```

#### 3. **Retrieve Metadata**

```javascript
export const getMetadataFromIPFS = async (uri) => {
  const hash = uri.replace('ipfs://', '');
  const url = `${PINATA_GATEWAY}${hash}`;
  const response = await fetch(url);
  return await response.json();
};
```

#### 4. **IPFS URI Format**

```
ipfs://QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco

Protocol: ipfs://
Hash: QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco
```

### Pinata Service:

**Pinata** is a pinning service that ensures IPFS content remains available:
- Dedicated IPFS nodes
- Guaranteed uptime
- API for uploading
- Gateway for retrieval

### Local Storage Fallback:

```javascript
export const storeMetadataLocally = (metadata) => {
  const hash = 'local_' + Date.now() + Math.random().toString(36);
  localStorage.setItem(hash, JSON.stringify(metadata));
  return `local://${hash}`;
};
```

For development without IPFS access.

---

## 12. React.js Frontend Framework

### What is React?

**React** is a JavaScript library for building user interfaces with reusable components.

### EventChain React Architecture:

```
src/
├── App.js                      # Main application
├── index.js                    # Entry point
├── web3Service.js              # Blockchain interaction
├── ipfsService.js              # IPFS interaction
└── components/
    ├── WalletConnect.js        # Wallet connection UI
    ├── OrganizerDashboard.js   # Event creation
    ├── TicketPurchase.js       # Buy tickets
    ├── MyTickets.js            # User's tickets
    ├── QRScanner.js            # Scan QR codes
    ├── SimpleValidator.js      # Validate tickets
    ├── NetworkStatus.js        # Network info
    └── TransactionViewer.js    # Transaction history
```

### Key React Concepts Used:

#### 1. **Components**

```javascript
function TicketPurchase({ account }) {
  return (
    <div className="ticket-purchase">
      <h2>Available Events</h2>
      {/* Component content */}
    </div>
  );
}
```

#### 2. **State Management (Hooks)**

```javascript
const [account, setAccount] = useState(null);
const [balance, setBalance] = useState(null);
const [web3Connected, setWeb3Connected] = useState(false);
const [activeTab, setActiveTab] = useState('marketplace');
```

#### 3. **Effects**

```javascript
useEffect(() => {
  checkConnection();
}, []); // Runs once on component mount

const checkConnection = async () => {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({ 
      method: 'eth_accounts' 
    });
    if (accounts.length > 0) {
      setAccount(accounts[0]);
    }
  }
};
```

#### 4. **Event Handling**

```javascript
const connectWallet = async () => {
  try {
    await initWeb3();
    const acc = await getAccount();
    setAccount(acc);
  } catch (error) {
    console.error('Failed to connect wallet:', error);
  }
};

<button onClick={connectWallet}>Connect Wallet</button>
```

#### 5. **Conditional Rendering**

```javascript
{web3Connected ? (
  <div className="dashboard">
    {/* Show dashboard */}
  </div>
) : (
  <div className="welcome">
    <button onClick={connectWallet}>Connect Wallet</button>
  </div>
)}
```

#### 6. **Component Props**

```javascript
<WalletConnect
  account={account}
  balance={balance}
  onConnect={connectWallet}
  onDisconnect={disconnectWallet}
  loading={loading}
  networkInfo={networkInfo}
/>
```

### React Dependencies:

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-scripts": "5.0.1",
  "web3": "^4.0.0",
  "ethers": "^6.8.0",
  "qrcode.react": "^4.2.0",
  "html5-qrcode": "^2.3.8"
}
```

---

## 13. Test Networks

### What are Test Networks?

**Test networks (testnets)** are blockchain networks used for development and testing without using real cryptocurrency.

### Networks in EventChain:

#### 1. **Hardhat Network**
```javascript
hardhat: {
  chainId: 31337
}
```
- Local development network
- Instant mining
- Pre-funded accounts
- Reset on restart

#### 2. **Ganache**
```javascript
ganache: {
  url: "http://127.0.0.1:7545",
  chainId: 5777
}
```
- Local Ethereum blockchain
- GUI for viewing transactions
- Customizable
- Perfect for testing

#### 3. **Sepolia Testnet**
```javascript
sepolia: {
  url: `https://eth-sepolia.g.alchemy.com/v2/${projectId}`,
  chainId: 11155111
}
```
- Ethereum public testnet
- Free test ETH from faucets
- Closest to mainnet
- Block explorers available

#### 4. **Polygon Amoy**
```javascript
amoy: {
  url: `https://polygon-amoy.g.alchemy.com/v2/${projectId}`,
  chainId: 80002
}
```
- Polygon (Matic) testnet
- Layer 2 solution
- Faster, cheaper transactions
- Free test MATIC

#### 5. **Monad Testnet**
```javascript
monad: {
  url: "https://testnet-rpc.monad.xyz",
  chainId: 10143
}
```
- High-performance blockchain
- Optimized for speed
- EVM-compatible

### Getting Test Funds:

**Faucets** provide free testnet cryptocurrency:
- Sepolia: https://sepoliafaucet.com
- Polygon Amoy: https://faucet.polygon.technology
- Usually requires social media verification

### Network Switching:

```javascript
const switchNetwork = async (chainId) => {
  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: `0x${chainId.toString(16)}` }]
  });
};
```

---

## 14. Gas & Transaction Fees

### What is Gas?

**Gas** is the unit that measures computational work required to execute operations on Ethereum.

### Gas Concepts:

#### 1. **Gas Limit**
Maximum amount of gas you're willing to use.

```javascript
const gas = await tx.estimateGas({ from: account });
```

#### 2. **Gas Price**
Amount you pay per unit of gas (in Gwei).

```javascript
const gasPrice = await web3.eth.getGasPrice();
```

#### 3. **Transaction Fee**
```
Transaction Fee = Gas Used × Gas Price
```

### Gas in EventChain:

```javascript
export const createEvent = async (name, location, date, ticketPrice) => {
  const account = await getAccount();
  const tx = eventManagerContract.methods.createEvent(
    name, location, date, web3.utils.toWei(ticketPrice, 'ether')
  );
  
  // Estimate gas needed
  const gas = await tx.estimateGas({ from: account });
  
  // Get current gas price
  const gasPrice = await web3.eth.getGasPrice();
  
  // Send transaction with gas parameters
  return tx.send({
    from: account,
    gas: Number(gas),
    gasPrice: gasPrice.toString()
  });
};
```

### Gas Optimization:

EventChain uses OpenZeppelin contracts which are gas-optimized:
- Efficient storage patterns
- Minimal state changes
- Optimized algorithms

### Units:

- 1 Ether = 1,000,000,000 Gwei (10^9)
- 1 Gwei = 1,000,000,000 Wei (10^9)
- 1 Ether = 1,000,000,000,000,000,000 Wei (10^18)

---

## 15. Decentralized Applications (DApps)

### What is a DApp?

A **DApp** is an application that runs on a decentralized network (blockchain) rather than centralized servers.

### DApp Architecture:

```
Traditional App:
User → Frontend → Backend Server → Database

DApp (EventChain):
User → Frontend (React) → Web3 → Smart Contracts (Blockchain)
                        → IPFS (Storage)
```

### DApp Characteristics:

✅ **Open Source**: Code is publicly available  
✅ **Decentralized**: Runs on blockchain  
✅ **Cryptographically Secure**: Uses blockchain security  
✅ **Token-based**: Uses cryptocurrency  

### EventChain as a DApp:

#### Frontend (React)
- User interface
- Web3 integration
- MetaMask connection

#### Smart Contracts (Solidity)
- Business logic
- Data storage
- Access control

#### Storage (IPFS)
- Metadata
- Images
- Off-chain data

### DApp Benefits for Ticketing:

✅ No central authority needed  
✅ Cannot be shut down  
✅ Transparent operations  
✅ User-owned data  
✅ Censorship-resistant  

---

## 16. QR Code Technology

### QR Codes in EventChain

**QR codes** enable quick ticket validation at event entry.

### Implementation:

#### 1. **Generate QR Code**

```javascript
import QRCode from 'qrcode.react';

<QRCode
  value={JSON.stringify({
    tokenId: ticket.tokenId,
    contract: CONTRACT_ADDRESSES.EventChainContract,
    owner: account
  })}
  size={256}
  level="H"
  includeMargin={true}
/>
```

#### 2. **Scan QR Code**

```javascript
import { Html5QrcodeScanner } from 'html5-qrcode';

const scanner = new Html5QrcodeScanner("reader", {
  fps: 10,
  qrbox: { width: 250, height: 250 }
});

scanner.render(onScanSuccess, onScanError);

const onScanSuccess = (decodedText) => {
  const ticketData = JSON.parse(decodedText);
  validateTicket(ticketData.tokenId);
};
```

#### 3. **Validate Ticket**

```javascript
const validateTicket = async (tokenId) => {
  const status = await getTicketStatus(tokenId);
  
  if (status.isUsed) {
    alert('❌ Ticket already used!');
  } else if (!status.isValid) {
    alert('❌ Ticket expired!');
  } else {
    await redeemTicket(tokenId);
    alert('✅ Ticket validated successfully!');
  }
};
```

### QR Code Data Structure:

```json
{
  "tokenId": 1234567890,
  "contract": "0x7D70097F097Ba768Dda48E314206f5A879d2873A",
  "owner": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
  "eventId": 5,
  "timestamp": 1635724800000
}
```

### Security Features:

- ✅ Includes contract address (prevents fake tickets)
- ✅ Blockchain validation
- ✅ Owner verification
- ✅ One-time use enforcement

---

## 17. P2P (Peer-to-Peer) Transfers

### What is P2P Transfer?

**Peer-to-peer transfer** allows direct ticket transfers between users without intermediaries.

### EventChain P2P Implementation:

```javascript
export const transferTicketP2P = async (tokenId, toAddress) => {
  const account = await getAccount();
  
  await eventChainContract.methods
    .safeTransferFrom(account, toAddress, tokenId)
    .send({ from: account });
};
```

### Transfer with History:

```solidity
function transferWithHistoryUpdate(
    address from, 
    address to, 
    uint256 tokenId
) public override onlyOwner {
    tickets[tokenId].ownershipHistory.push(to);
    _transfer(from, to, tokenId);
    emit TicketTransferred(tokenId, from, to);
}
```

### Ownership History:

```solidity
address[] ownershipHistory;

function getTicketHistory(uint256 tokenId) 
    public view returns (address[] memory) 
{
    return tickets[tokenId].ownershipHistory;
}
```

Example:
```
Token #123 History:
1. 0xABCD... (Original buyer)
2. 0x1234... (First transfer)
3. 0x5678... (Second transfer)
4. 0x9ABC... (Current owner)
```

### Benefits:

✅ **Transparency**: Full ownership history  
✅ **Anti-scalping**: Maximum resale price can be set  
✅ **Security**: Smart contract enforced  
✅ **No middleman**: Direct transfers  

### Resale Price Control:

```solidity
mapping(uint256 => uint256) public maxResalePrice;

function setMaxResalePrice(uint256 tokenId, uint256 maxPrice) 
    public override onlyOwner 
{
    maxResalePrice[tokenId] = maxPrice;
}
```

---

## 18. Event-Driven Architecture

### Smart Contract Events

**Events** in Solidity allow smart contracts to communicate with external applications.

### EventChain Events:

```solidity
// Event declarations
event TicketMinted(
    uint256 indexed tokenId, 
    address indexed owner, 
    string eventDetails, 
    uint256 originalPrice, 
    uint256 expirationDate
);

event TicketValidated(uint256 indexed tokenId, address indexed validator);
event TicketTransferred(uint256 indexed tokenId, address indexed from, address indexed to);
event TicketMetadataUpdated(uint256 indexed tokenId, string newEventDetails, string newURI);
```

### Emitting Events:

```solidity
function safeMint(...) public override {
    // Mint logic...
    emit TicketMinted(tokenId, to, eventDetails, originalPrice, expirationDate);
}
```

### Listening to Events (Frontend):

```javascript
// Listen for TicketMinted events
eventChainContract.events.TicketMinted({
  filter: { owner: account },
  fromBlock: 'latest'
})
.on('data', (event) => {
  console.log('New ticket minted!', event.returnValues);
  updateUI();
})
.on('error', console.error);
```

### Event Indexing:

```solidity
event TicketMinted(
    uint256 indexed tokenId,    // Can filter by tokenId
    address indexed owner,      // Can filter by owner
    string eventDetails,        // Not indexed
    uint256 originalPrice,      // Not indexed
    uint256 expirationDate      // Not indexed
);
```

**Indexed parameters** allow efficient filtering.

### Benefits:

✅ **Real-time updates**: Frontend can react to blockchain changes  
✅ **Audit trail**: All events are logged permanently  
✅ **Cheap**: Events cost less gas than storage  
✅ **Queryable**: Can search historical events  

---

## 19. Ownership & Access Control

### Access Control Patterns

EventChain uses multiple access control mechanisms.

### 1. **Ownable Pattern**

```solidity
import "@openzeppelin/contracts/access/Ownable.sol";

contract EventChainContract is Ownable {
    constructor(address initialOwner) Ownable(initialOwner) {}
    
    function updateTicketMetadata(...) public onlyOwner {
        // Only contract owner can call this
    }
}
```

### 2. **Event Organizer Control**

```solidity
mapping(uint256 => address) public eventOrganizers;

modifier onlyOrganizer(uint256 eventId) {
    require(
        eventOrganizers[eventId] == msg.sender, 
        "Not the event organizer"
    );
    _;
}

function transferEvent(uint256 eventId, address to) 
    public onlyOrganizer(eventId) 
{
    eventOrganizers[eventId] = to;
}
```

### 3. **Token Ownership**

```solidity
function validateTicket(uint256 tokenId) public {
    _requireOwned(tokenId);  // Ensures token exists
    // Validation logic
}

function transferTicket(uint256 tokenId, address to) public {
    require(ownerOf(tokenId) == msg.sender, "Not token owner");
    // Transfer logic
}
```

### 4. **Function Visibility**

```solidity
// Public: Anyone can call
function getTicketStatus(uint256 tokenId) public view returns (...) {}

// Private: Only this contract
function _isTicketValid(uint256 tokenId) internal view returns (bool) {}

// External: Only from outside contract
function safeMint(...) external {}
```

### Security Best Practices:

✅ **Principle of Least Privilege**: Minimum necessary permissions  
✅ **Clear Ownership**: Explicit access control  
✅ **Checks-Effects-Interactions**: Prevent reentrancy  
✅ **Input Validation**: Verify all parameters  

```solidity
function transferWithHistoryUpdate(address from, address to, uint256 tokenId) 
    public override onlyOwner 
{
    _requireOwned(tokenId);
    require(from != address(0) && to != address(0), "Invalid address");
    require(from == ownerOf(tokenId), "Not the token owner");
    
    // Safe to proceed
    tickets[tokenId].ownershipHistory.push(to);
    _transfer(from, to, tokenId);
}
```

---

## 20. Testing & Quality Assurance

### Testing Framework

EventChain uses **Hardhat** with **Mocha** and **Chai** for testing.

### Test Structure:

```javascript
const { expect } = require("chai");

describe("EventChainContract", function () {
  
  async function deployContractFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const ContractFactory = await ethers.getContractFactory("EventChainContract");
    const instance = await ContractFactory.deploy(owner.address);
    return { instance, owner, addr1, addr2 };
  }
  
  it("Should mint a ticket", async function () {
    const { instance, addr1 } = await deployContractFixture();
    
    await expect(
      instance.safeMint(addr1.address, "uri", "eventDetails", 100, 1893456000)
    )
    .to.emit(instance, 'TicketMinted')
    .withArgs(0, addr1.address, "eventDetails", 100, 1893456000);
    
    const history = await instance.getTicketHistory(0);
    expect(history).to.deep.equal([addr1.address]);
  });
  
});
```

### Test Categories:

#### 1. **Unit Tests**
Test individual functions:
```javascript
it("Should set the right owner", async function () {
  const { instance, owner } = await deployContractFixture();
  expect(await instance.owner()).to.equal(owner.address);
});
```

#### 2. **Integration Tests**
Test contract interactions:
```javascript
it("Should mint a ticket through event manager", async function () {
  await eventManager.createEvent("Concert", "NYC", "2025-12-31", price);
  await eventManager.mintTicket(0, addr1.address, "uri");
  expect(await eventChain.ownerOf(0)).to.equal(addr1.address);
});
```

#### 3. **Edge Case Tests**
```javascript
it("Should fail to validate an already used ticket", async function () {
  await instance.safeMint(addr1.address, "uri", "event", 100, future);
  await instance.validateTicket(0);
  
  await expect(instance.validateTicket(0))
    .to.be.revertedWith("Ticket already used");
});
```

#### 4. **Access Control Tests**
```javascript
it("Should not allow non-owner to update ticket metadata", async function () {
  await instance.safeMint(addr1.address, "uri", "event", 100, future);
  
  await expect(
    instance.connect(addr1).updateTicketMetadata(0, "new", "newUri")
  ).to.be.reverted;
});
```

### Test Coverage:

```bash
npx hardhat coverage
```

Generates report showing:
- Lines covered
- Branches covered
- Functions covered

### Running Tests:

```bash
# All tests
npx hardhat test

# Specific file
npx hardhat test test/EventChainContract.js

# With gas reporting
REPORT_GAS=true npx hardhat test

# On specific network
npx hardhat --network ganache test
```

### Fixture Pattern:

Reusable test setup:
```javascript
async function deployContractFixture() {
  // Setup code
  return { instance, owner, addr1 };
}

// Use in multiple tests
it("Test 1", async function () {
  const { instance, owner } = await deployContractFixture();
  // Test code
});
```

---

## 🎯 Summary

EventChain demonstrates the integration of multiple cutting-edge technologies:

### **Blockchain Stack:**
- Ethereum/EVM blockchains
- Solidity smart contracts
- ERC-721 NFT standard
- OpenZeppelin libraries

### **Development Tools:**
- Hardhat framework
- Web3.js / Ethers.js
- Hardhat Ignition deployment
- Mocha/Chai testing

### **Frontend:**
- React.js
- MetaMask integration
- QR code generation/scanning
- Responsive UI

### **Storage:**
- IPFS for metadata
- Pinata pinning service
- Blockchain for ownership

### **Networks:**
- Multiple testnets (Sepolia, Amoy, Monad)
- Local development (Hardhat, Ganache)
- Production-ready deployment

This comprehensive technology stack creates a **secure, transparent, and decentralized ticketing platform** that solves real-world problems in the event industry.

---

## 📚 Further Learning Resources

- **Ethereum**: https://ethereum.org/developers
- **Solidity**: https://docs.soliditylang.org
- **OpenZeppelin**: https://docs.openzeppelin.com
- **Hardhat**: https://hardhat.org/docs
- **Web3.js**: https://web3js.readthedocs.io
- **IPFS**: https://docs.ipfs.tech
- **React**: https://react.dev

---

*Created for EventChain Blockchain Ticketing System*
