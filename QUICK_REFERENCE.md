# 🚀 EventChain Blockchain Integration - Quick Reference

## ⚡ **INSTANT START**

### **See It Working Right Now:**
```bash
# 1. Add to App.tsx:
import MarketplaceBlockchain from "./pages/MarketplaceBlockchain";
<Route path="/blockchain" element={<MarketplaceBlockchain />} />

# 2. Visit:
http://localhost:3000/blockchain

# 3. Connect wallet and see REAL blockchain events!
```

---

## 📚 **DOCUMENTATION FILES**

| File | Purpose | When to Use |
|------|---------|-------------|
| `START_HERE_BLOCKCHAIN.md` | Quick start & examples | First time setup |
| `BLOCKCHAIN_INTEGRATION_COMPLETE.md` | Full integration guide | Detailed implementation |
| `MARKETPLACE_UPDATE_GUIDE.md` | Update existing pages | Migrating from mock data |
| `INTEGRATION_SUMMARY.md` | Overview & summary | Quick reference |

---

## 🔌 **IMPORT THESE**

### **For Reading Blockchain Data:**
```typescript
import { useTotalEvents, useBlockchainEvent } from '@/hooks/use-blockchain-events';
import { useAccount } from 'wagmi';
```

### **For Writing to Blockchain:**
```typescript
import { useCreateBlockchainEvent, usePurchaseTicket } from '@/hooks/use-blockchain-events';
```

### **For Contract Details:**
```typescript
import { 
  CONTRACT_ADDRESSES, 
  EventChainContractABI, 
  EventChainEventManagerABI,
  formatMON,
  parseMON 
} from '@/lib/contracts';
```

---

## 📊 **COMMON PATTERNS**

### **Pattern 1: Show Event Count**
```typescript
const { totalEvents } = useTotalEvents();
return <div>{totalEvents} events on blockchain</div>;
```

### **Pattern 2: Show Single Event**
```typescript
const { event, isLoading } = useBlockchainEvent(eventId);
if (isLoading) return <div>Loading...</div>;
return <div>{event.title} - {event.price} MON</div>;
```

### **Pattern 3: Create Event**
```typescript
const { createEvent, isPending } = useCreateBlockchainEvent();

const handleCreate = async () => {
  await createEvent({
    name: "My Event",
    location: "NYC",
    date: "2025-12-31",
    ticketPrice: "0.05",
    imageUrl: "https://...",
    totalTickets: 100,
  });
};
```

### **Pattern 4: Buy Ticket**
```typescript
const { purchaseTicket, isPending } = usePurchaseTicket();

const handleBuy = async () => {
  const { tokenId } = await purchaseTicket({
    eventId: 0,
    ticketPrice: "0.05",
  });
  alert(`Your NFT: ${tokenId}`);
};
```

---

## 🎯 **CONTRACT ADDRESSES (Monad Testnet)**

```
EventChain NFT Contract:
0x7D70097F097Ba768Dda48E314206f5A879d2873A

Event Manager Contract:
0x3b3E674a6BEaa5D49dE3365Ad6e991F1Dd9701aA

Network: Monad Testnet
Chain ID: 10143
RPC: https://testnet-rpc.monad.xyz
Explorer: https://testnet.monadexplorer.com
Faucet: https://faucet.monad.xyz/
```

---

## 🛠️ **KEY FILES**

```
✅ /ui/src/lib/contracts.ts                 # ABIs & Addresses
✅ /ui/src/lib/blockchain-service.ts        # Service Layer
✅ /ui/src/hooks/use-blockchain-events.ts   # React Hooks
✅ /ui/src/pages/MarketplaceBlockchain.tsx  # Working Example
✅ /ui/src/lib/wagmi.ts                     # Monad Config
```

---

## ✨ **AVAILABLE HOOKS**

| Hook | Returns | Use For |
|------|---------|---------|
| `useTotalEvents()` | `{ totalEvents, isLoading }` | Get event count |
| `useBlockchainEvent(id)` | `{ event, isLoading, error }` | Get single event |
| `useAllBlockchainEvents()` | `{ events, totalEvents }` | Get all events |
| `useCreateBlockchainEvent()` | `{ createEvent, isPending }` | Create event |
| `usePurchaseTicket()` | `{ purchaseTicket, isPending }` | Buy ticket |

---

## 🔥 **QUICK WINS**

### **1. Add Event Count (30 seconds)**
```typescript
import { useTotalEvents } from '@/hooks/use-blockchain-events';

function Header() {
  const { totalEvents } = useTotalEvents();
  return <span>{totalEvents} events on Monad</span>;
}
```

### **2. Create Real Event (2 minutes)**
```typescript
const { createEvent } = useCreateBlockchainEvent();

await createEvent({
  name: "Test Event",
  location: "Test Location",
  date: "2025-12-31",
  ticketPrice: "0.01",
  imageUrl: "https://via.placeholder.com/400",
  totalTickets: 50,
});
```

### **3. Show Blockchain Badge (1 minute)**
```typescript
<div className="badge">
  <span className="dot animate-pulse"></span>
  Live on Monad
</div>
```

---

## 🐛 **TROUBLESHOOTING**

| Problem | Solution |
|---------|----------|
| Wallet not connecting | Add Monad testnet to MetaMask (Chain ID: 10143) |
| No events showing | Create an event first, or check `totalEvents` |
| Transaction failing | Get MON tokens from faucet |
| TypeScript errors | Check `BLOCKCHAIN_INTEGRATION_COMPLETE.md` for fixes |
| Hooks not working | Ensure wallet is connected with `useAccount()` |

---

## 📖 **LEARN MORE**

### **For Examples:**
→ See `MarketplaceBlockchain.tsx`

### **For Step-by-Step:**
→ Read `MARKETPLACE_UPDATE_GUIDE.md`

### **For Full Guide:**
→ Read `BLOCKCHAIN_INTEGRATION_COMPLETE.md`

### **For Quick Start:**
→ Read `START_HERE_BLOCKCHAIN.md`

---

## ✅ **CHECKLIST: Getting Started**

- [ ] Read `START_HERE_BLOCKCHAIN.md`
- [ ] Add `MarketplaceBlockchain` route
- [ ] Visit `/blockchain` page
- [ ] Connect wallet to Monad testnet
- [ ] Get MON tokens from faucet
- [ ] See real blockchain data
- [ ] Create a test event
- [ ] See it appear in marketplace!

---

## 🎉 **YOU'RE READY!**

Everything is set up. Just import the hooks and start building!

```typescript
import { useTotalEvents } from '@/hooks/use-blockchain-events';
const { totalEvents } = useTotalEvents();
console.log('Events on blockchain:', totalEvents);
```

**That's it! You're now using real blockchain data! 🚀**
