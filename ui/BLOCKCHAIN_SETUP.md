# 🚀 EventMint - Real Blockchain Integration Guide

## ✅ What's Already Set Up

Your UI is now configured to work with **real blockchain contracts** deployed on **Monad Testnet**!

### Contract Addresses (Monad Testnet - Chain ID: 10143)
- **EventChainContract**: `0x7D70097F097Ba768Dda48E314206f5A879d2873A`
- **EventChainEventManagerContract**: `0x3b3E674a6BEaa5D49dE3365Ad6e991F1Dd9701aA`

### Blockchain Explorer Links
- Event Manager: https://testnet.monadexplorer.com/address/0x3b3E674a6BEaa5D49dE3365Ad6e991F1Dd9701aA
- NFT Contract: https://testnet.monadexplorer.com/address/0x7D70097F097Ba768Dda48E314206f5A879d2873A

---

## 📱 How to Connect MetaMask to Monad Testnet

### Step 1: Add Monad Testnet Network to MetaMask

1. Open **MetaMask** extension
2. Click the **network dropdown** (top of MetaMask)
3. Click **"Add Network"** → **"Add a network manually"**
4. Enter the following details:

```
Network Name:       Monad Testnet
New RPC URL:        https://testnet-rpc.monad.xyz
Chain ID:           10143
Currency Symbol:    MON
Block Explorer:     https://testnet.monadexplorer.com
```

5. Click **"Save"**
6. Switch to **Monad Testnet** network

### Step 2: Get Test MON Tokens

You need MON tokens to:
- Create events (gas fees)
- Purchase tickets (ticket price + gas fees)
- Transfer NFTs (gas fees)

**Get Test MON from Monad Faucet:**
- Visit: https://faucet.monad.xyz (or check Monad Discord)
- Enter your wallet address
- Request test MON

---

## 🎯 How to Use the App

### 1. **Connect Wallet**
- Click **"Connect Wallet"** button in the app
- Approve the connection in MetaMask
- Make sure you're on **Monad Testnet** network

### 2. **Create an Event** (For Organizers)
```typescript
// The app will call this contract function:
createEventExtended(
  name: string,         // "Crypto Concert 2025"
  location: string,     // "San Francisco"
  date: string,         // "2025-12-01"
  ticketPrice: bigint,  // Price in MON (e.g., 0.1 MON)
  imageUrl: string,     // Event image URL
  totalTickets: bigint  // Number of tickets (e.g., 100)
)
```

**What happens:**
1. MetaMask opens asking you to confirm transaction
2. You pay gas fee in MON
3. Event is created on-chain
4. Event appears in marketplace instantly

### 3. **Buy a Ticket**
```typescript
// The app will call this contract function:
mintTicketExtended(
  eventId: bigint,    // Event ID (0, 1, 2, ...)
  uri: string,        // Metadata URI for the NFT
  tokenId: bigint     // Unique token ID
) payable
```

**What happens:**
1. MetaMask opens with ticket price + gas fee
2. You confirm the transaction
3. MON is sent to event organizer
4. NFT ticket is minted to your wallet
5. Ticket appears in "My Tickets"

### 4. **View Your Tickets**
- NFT tickets are stored in your wallet
- App reads from blockchain using `balanceOf()` and `tokenOfOwnerByIndex()`
- Each ticket has unique metadata and can be transferred

### 5. **Transfer a Ticket**
- Transfer your NFT ticket to another address
- Uses standard ERC721 `transferFrom()` function
- Ownership is updated on-chain

---

## 🔧 Technical Details

### How the App Integrates with Blockchain

#### 1. **Wagmi + Viem Setup** (`lib/wagmi.ts`)
```typescript
export const monadTestnet = defineChain({
  id: 10143,
  name: 'Monad Testnet',
  nativeCurrency: { name: 'Monad', symbol: 'MON', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.monad.xyz'] }
  },
  blockExplorers: {
    default: { name: 'Monad Explorer', url: 'https://testnet.monadexplorer.com' }
  }
})
```

#### 2. **Reading from Blockchain** (`useReadContract`)
```typescript
const { data } = useReadContract({
  address: CONTRACT_ADDRESSES.EventChainEventManagerContract,
  abi: EventChainEventManagerABI,
  functionName: 'getEventExtended',
  args: [BigInt(eventId)]
})
```

#### 3. **Writing to Blockchain** (`useWriteContract`)
```typescript
const { writeContractAsync } = useWriteContract()

await writeContractAsync({
  address: CONTRACT_ADDRESSES.EventChainEventManagerContract,
  abi: EventChainEventManagerABI,
  functionName: 'mintTicketExtended',
  args: [eventId, tokenURI, tokenId],
  value: ticketPriceInWei,  // Sending MON with the transaction
  chain: monadTestnet,
  account: userAddress
})
```

---

## 🎫 Contract Functions Used

### EventChainEventManagerContract Functions

| Function | Purpose | Gas Required |
|----------|---------|--------------|
| `getTotalEvents()` | Get count of all events | View (Free) |
| `getEventExtended(eventId)` | Get event details | View (Free) |
| `createEventExtended(...)` | Create new event | ~200k-300k gas |
| `mintTicketExtended(...)` | Buy ticket (mint NFT) | ~150k-250k gas |
| `getEventTickets(eventId)` | Get all ticket IDs for event | View (Free) |

### EventChainContract (NFT) Functions

| Function | Purpose | Gas Required |
|----------|---------|--------------|
| `balanceOf(address)` | Get NFT count for address | View (Free) |
| `tokenOfOwnerByIndex(address, index)` | Get token ID by index | View (Free) |
| `ownerOf(tokenId)` | Get owner of NFT | View (Free) |
| `tokenURI(tokenId)` | Get metadata URI | View (Free) |
| `transferFrom(from, to, tokenId)` | Transfer NFT | ~50k-100k gas |
| `getTicketStatus(tokenId)` | Check if ticket is valid/used | View (Free) |

---

## 💡 Development Tips

### 1. **Testing Without Real MON**
Use Hardhat local network (Chain ID: 31337):
```bash
cd /Users/sourabhyadav/eventchain_blockchain
npx hardhat node
```

Then update MetaMask to use `http://127.0.0.1:8545`

### 2. **Viewing Transactions**
- All transactions appear on Monad Explorer
- Format: `https://testnet.monadexplorer.com/tx/YOUR_TX_HASH`
- Check contract interactions in the "Internal Txns" tab

### 3. **Debugging**
- Open browser console (F12)
- Watch for wagmi connection logs
- Check MetaMask for pending transactions
- Verify you're on correct network (Chain ID: 10143)

### 4. **Common Issues**

| Issue | Solution |
|-------|----------|
| "Wrong network" | Switch MetaMask to Monad Testnet |
| "Insufficient funds" | Get MON from faucet |
| "Transaction failed" | Check gas settings, try again |
| "Nonce too high" | Reset MetaMask account (Settings → Advanced → Clear activity) |

---

## 🎉 Ready to Go!

1. **Open app**: http://localhost:8080
2. **Connect MetaMask** to Monad Testnet
3. **Get test MON** from faucet
4. **Create events** and **buy tickets**!

All transactions are **real** and stored **permanently** on the Monad blockchain! 🚀

---

## 📚 Additional Resources

- **Monad Docs**: https://docs.monad.xyz
- **Wagmi Docs**: https://wagmi.sh
- **Viem Docs**: https://viem.sh
- **MetaMask Guide**: https://metamask.io/faqs

---

**Built with ❤️ using Monad, Wagmi, Viem, React, and TypeScript**
