# 🎫 EventChain - Complete Implementation Guide

## Overview

This document explains **how to get tickets, mint tickets, transfer tickets, and validate tickets** with the EventChain system.

---

## 🎯 Part 1: Getting Started

### Prerequisites
- ✅ Smart contracts deployed (see SETUP_GUIDE.md)
- ✅ Contract addresses configured in `ui/src/web3Service.js`
- ✅ UI running at http://localhost:3000
- ✅ MetaMask connected
- ✅ Testnet ETH for gas fees

### Configuration Checklist

```javascript
// ui/src/web3Service.js - Update these addresses!

export const CONTRACT_ADDRESSES = {
  EventChainContract: '0xd4bC2d72a3f04ad194130ADcC35E9592a2a1761B',           // From deployment
  EventChainEventManagerContract: '0xbaCAfEeEA7F14dE0cD8A1462C0136E429b323345' // From deployment
};
```

---

## 🎟️ Part 2: How to GET Tickets

### **Method 1: Mint Tickets to Yourself** (Event Organizer)

**Step-by-step:**

1. **Connect Wallet** 
   - Click "🦊 Connect MetaMask"
   - Approve connection

2. **Create Event**
   - Go to "📅 Events" tab
   - Fill the form:
     ```
     Event Name:    "Concert 2025"
     Location:      "Madison Square Garden"
     Date:          "2025-12-20"
     Ticket Price:  "0.1" ETH
     ```
   - Click "✨ Create Event"
   - Approve MetaMask transaction
   - **Note the Event ID** (0, 1, 2, etc.) from the card

3. **Mint Ticket to Yourself**
   - Click "🎫 Mint Tickets" button
   - Enter in modal:
     ```
     Recipient Address:  Your MetaMask address (0x...)
     Metadata URI:       ipfs://demo (or any valid URL)
     ```
   - Click "✅ Mint Ticket"
   - Approve MetaMask transaction
   - **You now own a ticket!**

4. **See Your Ticket ID**
   - Go to "🎫 Validate Tickets" tab
   - Click "🔼 Show" under "Your Tickets"
   - See all your tickets with IDs (0, 1, 2, etc.)

---

### **Method 2: Receive Ticket from Someone Else**

**Step-by-step:**

1. **Share Your Address**
   - Copy your MetaMask address (top right)
   - Send to event organizer

2. **Organizer Mints to You**
   - They follow Method 1 steps
   - But enter YOUR address in "Recipient Address"
   - Transaction goes to blockchain
   - Ticket sent to you!

3. **You Receive Ticket**
   - Check MetaMask: New NFT appears
   - Go to "🎫 Validate Tickets" tab
   - Click "🔼 Show" to see it
   - It appears in your "Your Tickets" section

---

### **Method 3: Receive Transfer from Another Owner**

**For the Sender:**
1. Click "🔄 Transfer" on event
2. Enter:
   ```
   Token ID:            1 (the ticket to transfer)
   Transfer To Address: Recipient address (0x...)
   ```
3. Click "✅ Transfer Ticket"
4. Approve transaction

**For the Receiver:**
1. You receive the NFT in your wallet
2. Go to "🎫 Validate Tickets" tab
3. Click "🔼 Show"
4. Ticket appears in your list

---

## 💳 Part 3: How to MINT Tickets

### **Complete Minting Workflow**

```
Step 1: Create Event (as organizer)
   ↓
Step 2: Click "🎫 Mint Tickets"
   ↓
Step 3: Enter recipient address & metadata URI
   ↓
Step 4: Approve MetaMask transaction
   ↓
Step 5: NFT minted to recipient
   ↓
Step 6: Recipient sees ticket in their wallet
```

### **Minting Process - Detailed**

#### Prerequisites for Minting:
```
✓ You created the event
✓ You own the event (you're the organizer)
✓ Recipient address is valid (0x format)
✓ You have enough ETH for gas fees
```

#### Step-by-Step Minting:

**1. Open Event Manager Tab**
```
Navigate to → "📅 Events" tab
```

**2. Find Your Event**
```
Look for event card with your event name
Shows: Name, Location, Date, Price, ID
```

**3. Click Mint Tickets**
```
Button label: "🎫 Mint Tickets"
Modal appears with form
```

**4. Fill Recipient Address**
```
Field: "Recipient Address"
Enter: 0x followed by 40 hex characters

Example: 0x742d35Cc6634C0532925a3b844Bc9e7595f9741
         └─ Your MetaMask address
         └─ Or any valid Ethereum address
         └─ Use 0xdB4d... format
```

**5. Fill Metadata URI**
```
Field: "Metadata URI"
Enter: URL to ticket metadata

Valid examples:
  - ipfs://QmXxxx...
  - https://example.com/metadata.json
  - ipfs://demo (for testing)
```

**6. Metadata Structure (Optional)**
```json
{
  "name": "Concert Ticket",
  "description": "VIP ticket for concert",
  "image": "ipfs://...",
  "attributes": [
    {"trait_type": "Seat", "value": "A1"},
    {"trait_type": "Row", "value": "5"}
  ]
}
```

**7. Click Mint Button**
```
Button: "✅ Mint Ticket"
Modal closes
MetaMask popup appears
```

**8. Approve MetaMask Transaction**
```
Review in MetaMask:
  - To: EventChainEventManagerContract
  - Function: mintTicket
  - Gas estimate: ~150,000
  - Gas Price: Auto
  
Click: "Confirm" button
Wait: Transaction processing...
```

**9. Success!**
```
✅ Message appears: "Ticket minted successfully!"
🎫 Ticket created and sent to recipient
📱 Recipient receives NFT in wallet
```

---

## 🔄 Part 4: How to TRANSFER Tickets

### **Complete Transfer Workflow**

```
You own ticket ID 5
         ↓
Click "🔄 Transfer"
         ↓
Enter token ID: 5
Enter recipient: 0xABC...
         ↓
Approve MetaMask
         ↓
Ownership transferred
         ↓
Recipient now owns ticket
```

### **Transfer Process - Detailed**

#### Who Can Transfer?
```
✓ Current owner of ticket
✓ Any valid Ethereum address
✓ Any wallet with MetaMask
```

#### Step-by-Step Transfer:

**1. Open Event Manager Tab**
```
Navigate to → "📅 Events" tab
```

**2. Click Transfer Button**
```
Find event card
Click: "🔄 Transfer" button
Modal appears
```

**3. Enter Token ID**
```
Field: "Token ID"
What is this?: The ID of the ticket to transfer
Where to find?: 
  - Go to "🎫 Validate Tickets" tab
  - Click "🔼 Show" under "Your Tickets"
  - See ticket IDs (0, 1, 2, etc.)
  
Example: 5
```

**4. Enter Recipient Address**
```
Field: "Transfer To Address"
Format: 0x... (42 characters total)
Must be: Valid Ethereum address

Example: 0x742d35Cc6634C0532925a3b844Bc9e7595f9741
```

**5. Click Transfer Button**
```
Button: "✅ Transfer Ticket"
MetaMask popup appears
```

**6. Approve MetaMask**
```
Review transaction:
  - From: Your address
  - To: Recipient address
  - Token: Ticket NFT
  - Function: transferFrom
  
Click: "Confirm"
Wait: Processing...
```

**7. Success!**
```
✅ "Ticket transferred successfully!"
🎫 Ownership transferred to recipient
📍 Ownership history updated on blockchain
```

### **Verification After Transfer**

**For Original Owner:**
```
Go to "🎫 Validate Tickets"
Click "🔼 Show"
Ticket no longer appears in "Your Tickets"
(It was transferred away)
```

**For New Owner:**
```
Go to "🎫 Validate Tickets"
Click "🔼 Show"
Ticket now appears in "Your Tickets"
(You own it now!)
```

**View Complete History:**
```
Click on the ticket in your list
See all previous owners:
  1. Original minter
  2. First transfer recipient
  3. Second transfer recipient
  (current owner is last)
```

---

## ✓ Part 5: How to VALIDATE Tickets

### **Complete Validation Workflow**

```
Enter Ticket ID
         ↓
Click Validate
         ↓
System checks:
  - Is it valid? (not expired)
  - Has it been used? (check-in status)
         ↓
See results:
  - Status badge (valid/invalid)
  - Usage status (used/unused)
  - Complete ownership history
```

### **Validation Process - Detailed**

#### Step-by-Step:

**1. Open Validate Tickets Tab**
```
Navigation → "🎫 Validate Tickets" tab
```

**2. Option A: View Your Tickets**
```
Click: "🔼 Show" button under "Your Tickets"
Grid appears with all your tickets
Shows: Ticket #X, Status, Valid status
Click: On any ticket to see full details
```

**2. Option B: Enter Ticket ID Manually**
```
Field: "Ticket ID"
Enter: Any valid ticket ID (0, 1, 2, etc.)
```

**3. Click Validate**
```
Button: "🔍 Validate"
System checks blockchain
Results appear below
```

**4. View Validation Results**

**Status Badge:**
```
✓ VALID  (green)  - Ticket is legitimate, not expired
✗ INVALID (red)   - Ticket is invalid or expired
```

**Validation Status:**
```
✅ Valid   - Ticket hasn't expired
❌ Invalid - Ticket expired or doesn't exist
```

**Usage Status:**
```
🆕 Unused        - Ticket hasn't been used yet
🎫 Already Used   - Ticket was checked-in
```

**5. View Ownership History**

```
📜 Ownership History section shows:

1. 0xdB4d...9741 ← Original minter
2. 0xAb12...3456 ← First recipient
3. 0xCd78...9999 ← Current owner

This proves legitimacy and tracks all transfers!
```

**6. Optional: Mark as Used**

For event entry:
```
If ticket is:
  ✓ Valid (not expired)
  ✓ Unused (not checked-in yet)

Then button appears:
  "✓ Mark as Used (Check-in)"
  
Click to:
  - Record check-in on blockchain
  - Prevent duplicate usage
  - Update ticket status to "used"
```

**7. Success!**
```
After check-in:
✅ "Ticket marked as used!"
Ticket now shows: "🎫 Already Used"
Prevents reuse - ticket is consumed
```

---

## 🔐 Part 6: Security & Verification

### **What Makes Tickets Secure?**

#### ✅ Tamper-Proof
```
NFT on blockchain cannot be modified
Any tampering would change hash
Invalid tickets are rejected
```

#### ✅ Ownership Verified
```
Only owner can transfer
Only owner can mark as used
MetaMask signature required
```

#### ✅ Complete History
```
All transfers recorded
All ownership changes tracked
Immutable on blockchain
Prevents counterfeiting
```

#### ✅ Expiration Protection
```
Tickets have expiration date
System checks before allowing use
Expired tickets are invalid
```

#### ✅ Usage Prevention
```
Once marked as used
Cannot be used again
Prevents duplicate entry
Blockchain enforces rule
```

### **Verification Checklist**

Before accepting a ticket:
```
☐ Validate ticket ID
☐ Check: Status = Valid ✓
☐ Check: Status = Unused 🆕
☐ Check: Not expired
☐ View: Ownership history
☐ Verify: You recognize previous owners
☐ Check-in: Mark as used when guest enters
```

---

## 🚀 Part 7: Common Scenarios

### **Scenario 1: Event Organizer Creates & Sells Tickets**

```
Step 1: Create Event
  Entry: "Summer Music Festival"
  Location: "Central Park"
  Date: "2025-07-20"
  Price: "0.05" ETH
  
Step 2: Mint 100 Tickets
  Recipient: Different customer for each
  Metadata: Link to ticket info
  
Step 3: Customers Get Tickets
  They receive NFTs in wallets
  
Step 4: At Event
  Validate each ticket
  Check-in by marking "used"
  Prevents duplicate entry
```

### **Scenario 2: Customer Buys from Reseller**

```
Step 1: Original buyer purchases ticket
  Event organizer mints to buyer
  
Step 2: Original buyer transfers ticket
  Clicks "🔄 Transfer"
  Enters reseller address
  Transaction approved
  
Step 3: Reseller transfers to customer
  Clicks "🔄 Transfer"
  Enters customer address
  Transaction approved
  
Step 4: Customer validates
  Ownership history shows:
  1. Event organizer (minted)
  2. Original buyer (first owner)
  3. Reseller (transferred)
  4. Customer (current - YOU)
  
  ✓ Complete transparency!
```

### **Scenario 3: Duplicate Ticket Prevention**

```
Scenario: Someone tries to use same ticket twice

Step 1: Guest enters event
  Ticket validated: ✓ Valid, 🆕 Unused
  Checked-in: ✓ Mark as Used
  
Step 2: Same person tries to re-enter
  Validates same ticket ID
  System shows: 🎫 Already Used
  ❌ Entry denied!
  ✓ Duplicate prevented!
```

---

## 📊 Part 8: Data Flow

### **Creating Event Flow**
```
UI Form
  ↓
web3Service.createEvent()
  ↓
EventChainEventManagerContract
  ↓
Emits: EventCreated event
  ↓
Blockchain records
  ↓
Event ID assigned (0, 1, 2...)
  ↓
UI displays new event card
```

### **Minting Ticket Flow**
```
UI Modal
  ↓
web3Service.mintTicket(eventId, recipient, uri)
  ↓
EventChainEventManagerContract.mintTicket()
  ↓
Calls: EventChainContract.safeMint()
  ↓
Creates: New NFT with token ID
  ↓
Sets: Metadata and expiration
  ↓
Transfers: To recipient address
  ↓
Emits: TicketMinted event
  ↓
Recipient receives ticket
```

### **Validation Flow**
```
Ticket ID entered
  ↓
web3Service.getTicketStatus()
  ↓
EventChainContract reads from blockchain
  ↓
Returns: {isUsed, isValid}
  ↓
web3Service.getTicketHistory()
  ↓
EventChainContract reads history
  ↓
Returns: Array of all owners
  ↓
UI displays all information
```

---

## 🎓 Part 9: Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| "Ticket not found" | Invalid ID | Verify ID in "Your Tickets" list |
| "Already used" | Checked-in already | Try different ticket or transfer |
| "Invalid address" | Wrong format | Must start with 0x and be 42 chars |
| "Insufficient balance" | No ETH for gas | Get testnet ETH from faucet |
| "Contract error" | Addresses wrong | Check CONTRACT_ADDRESSES in web3Service.js |
| "Transaction failed" | Gas too low | Increase gas limit in MetaMask |

---

## ✨ Summary

You now know how to:

✅ **GET Tickets**
- Mint to yourself
- Receive from organizer
- Get from another owner

✅ **MINT Tickets**
- Create event
- Mint to any address
- Set metadata

✅ **TRANSFER Tickets**
- Move ticket to new owner
- Track all transfers
- Complete history preserved

✅ **VALIDATE Tickets**
- Check validity
- View usage status
- See ownership history
- Prevent duplicates

🎉 **You're ready to revolutionize ticketing!**

---

**EventChain - Blockchain Ticketing System**
🎫 Secure • Transparent • Tamper-Proof ✨
