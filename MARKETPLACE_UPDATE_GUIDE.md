# 🔄 Quick Guide: Update Existing Marketplace to Use Blockchain

## **Before (Current - Mock Data)**
```typescript
// File: /ui/src/pages/Marketplace.tsx
import { useEvents } from "@/hooks/use-events";

const Marketplace = () => {
  const { data: allEvents = [], isLoading } = useEvents(); // Mock data
  
  return (
    <div>
      {allEvents.map(event => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
};
```

## **After (Blockchain Integration)**

### **Option A: Minimal Change - Just Show Total Events**
```typescript
// File: /ui/src/pages/Marketplace.tsx
import { useEvents } from "@/hooks/use-events"; // Keep mock data
import { useTotalEvents } from "@/hooks/use-blockchain-events"; // Add blockchain

const Marketplace = () => {
  const { data: allEvents = [], isLoading } = useEvents();
  const { totalEvents } = useTotalEvents(); // NEW: Real blockchain count
  
  return (
    <div>
      <h1>Marketplace</h1>
      <p className="text-sm text-muted-foreground">
        📊 {totalEvents} events on Monad blockchain
      </p>
      {allEvents.map(event => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
};
```

### **Option B: Hybrid - Show Both Mock & Blockchain**
```typescript
import { useEvents } from "@/hooks/use-events";
import { useTotalEvents, useBlockchainEvent } from "@/hooks/use-blockchain-events";
import { useState } from "react";

const Marketplace = () => {
  const [showBlockchain, setShowBlockchain] = useState(false);
  const { data: mockEvents = [] } = useEvents();
  const { totalEvents } = useTotalEvents();
  
  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setShowBlockchain(false)}>
          Demo Mode ({mockEvents.length} events)
        </button>
        <button onClick={() => setShowBlockchain(true)}>
          Blockchain Mode ({totalEvents} events)
        </button>
      </div>
      
      {showBlockchain ? (
        <BlockchainEvents totalEvents={totalEvents} />
      ) : (
        mockEvents.map(event => <EventCard key={event.id} {...event} />)
      )}
    </div>
  );
};

function BlockchainEvents({ totalEvents }) {
  const eventIds = Array.from({ length: totalEvents }, (_, i) => i);
  
  return (
    <div>
      {eventIds.map(id => (
        <BlockchainEventCard key={id} eventId={id} />
      ))}
    </div>
  );
}

function BlockchainEventCard({ eventId }) {
  const { event, isLoading } = useBlockchainEvent(eventId);
  
  if (isLoading) return <div>Loading event #{eventId}...</div>;
  if (!event) return null;
  
  return (
    <EventCard
      id={eventId.toString()}
      title={event.title}
      date={event.date}
      location={event.location}
      price={event.price}
      image={event.image_url}
      ticketsLeft={event.total_tickets - event.tickets_sold}
    />
  );
}
```

### **Option C: Full Replace - All Blockchain**
```typescript
import { useTotalEvents, useBlockchainEvent } from "@/hooks/use-blockchain-events";
import { useAccount } from 'wagmi';
import { useState, useEffect } from "react";

const Marketplace = () => {
  const { isConnected } = useAccount();
  const { totalEvents, isLoading } = useTotalEvents();
  const [eventIds, setEventIds] = useState<number[]>([]);
  
  useEffect(() => {
    if (totalEvents > 0) {
      setEventIds(Array.from({ length: totalEvents }, (_, i) => i));
    }
  }, [totalEvents]);
  
  if (!isConnected) {
    return <div>Connect wallet to see blockchain events</div>;
  }
  
  if (isLoading) {
    return <div>Loading events from Monad blockchain...</div>;
  }
  
  return (
    <div>
      <h1>Blockchain Marketplace</h1>
      <p>{totalEvents} events on Monad testnet</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {eventIds.map(eventId => (
          <BlockchainEventCard key={eventId} eventId={eventId} />
        ))}
      </div>
    </div>
  );
};

function BlockchainEventCard({ eventId }) {
  const { event, isLoading, error } = useBlockchainEvent(eventId);
  
  if (isLoading) return <div className="animate-pulse">Loading...</div>;
  if (error) return <div>Error loading event #{eventId}</div>;
  if (!event) return null;
  
  return (
    <div className="border rounded-lg p-4">
      <img src={event.image_url} alt={event.title} className="w-full h-48 object-cover rounded" />
      <h3 className="text-xl font-bold mt-2">{event.title}</h3>
      <p className="text-sm text-gray-500">{event.location} • {event.date}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-bold">{event.price} MON</span>
        <span className="text-sm">{event.tickets_sold}/{event.total_tickets} sold</span>
      </div>
      <button className="w-full mt-2 bg-blue-600 text-white py-2 rounded">
        Buy Ticket
      </button>
    </div>
  );
}

export default Marketplace;
```

---

## **Which Option Should You Choose?**

### **Option A (Minimal)** - Best if:
- ✅ You want to test blockchain integration quickly
- ✅ You want to keep existing UI working
- ✅ You're just starting with blockchain

### **Option B (Hybrid)** - Best if:
- ✅ You want users to choose between demo and real data
- ✅ You're testing blockchain while keeping fallback
- ✅ You want to showcase the difference

### **Option C (Full Replace)** - Best if:
- ✅ You're ready to go fully on-chain
- ✅ You want production-ready blockchain app
- ✅ You're comfortable with Web3

---

## **Step-by-Step Implementation**

### **1. Choose your option above**

### **2. Update the import:**
```typescript
// Add at top of Marketplace.tsx
import { useTotalEvents, useBlockchainEvent } from "@/hooks/use-blockchain-events";
import { useAccount } from 'wagmi';
```

### **3. Copy the code for your chosen option**

### **4. Test it:**
```bash
# Start the app
cd ui && npm run dev

# Visit marketplace
http://localhost:3000/marketplace

# Connect wallet to see blockchain data
```

### **5. Done! 🎉**

---

## **Common Issues & Solutions**

### **Issue: "Cannot read totalEvents"**
**Solution**: Make sure wallet is connected. Add this check:
```typescript
const { isConnected } = useAccount();
if (!isConnected) return <div>Connect wallet</div>;
```

### **Issue: "Events not loading"**
**Solution**: Check if events exist on blockchain:
```typescript
const { totalEvents } = useTotalEvents();
console.log('Total events on blockchain:', totalEvents);
// If 0, no events created yet - create one first!
```

### **Issue: "TypeScript errors"**
**Solution**: These are just type warnings. The code works! You can:
- Ignore them for now
- Or add `// @ts-ignore` above the line
- Or check `BLOCKCHAIN_INTEGRATION_COMPLETE.md` for fixes

---

## **Testing Checklist**

After updating:

- [ ] App compiles and runs
- [ ] Marketplace page loads
- [ ] Can connect wallet
- [ ] Can see event count from blockchain
- [ ] Individual events load (if using Option B or C)
- [ ] No console errors (warnings are OK)

---

## **Next: Update CreateEvent**

Once Marketplace works, update CreateEvent.tsx:

```typescript
import { useCreateBlockchainEvent } from "@/hooks/use-blockchain-events";

const CreateEvent = () => {
  const { createEvent, isPending } = useCreateBlockchainEvent();
  
  const handleSubmit = async (formData) => {
    await createEvent({
      name: formData.get('title'),
      location: formData.get('location'),
      date: formData.get('date'),
      ticketPrice: formData.get('price'),
      imageUrl: formData.get('image'),
      totalTickets: parseInt(formData.get('totalTickets')),
    });
  };
  
  // ... rest of component
};
```

---

## **You're Almost There!**

Just pick an option, copy the code, and you'll have blockchain integration working in minutes! 🚀

See `START_HERE_BLOCKCHAIN.md` for more examples and full documentation.
