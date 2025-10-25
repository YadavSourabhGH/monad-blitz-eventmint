# 🎫 EventChain on Monad - Quick Reference Card

## 🚀 ONE-COMMAND START

```bash
./start-monad.sh
```

---

## ⚡ ULTRA QUICK START (3 Steps)

### 1️⃣ Start UI
```bash
cd ui && npm start
```

### 2️⃣ Open Browser
Navigate to: **http://localhost:3000**

### 3️⃣ Connect MetaMask
- Network: **Monad Testnet**
- Chain ID: **10143**
- Get MON: **https://testnet.monad.xyz**

---

## 📍 DEPLOYED CONTRACTS (MONAD TESTNET)

```
EventChainContract:
0x5e8AFCb29A627cE0AbA0E6018BbB999a0b57d0CB

EventChainEventManagerContract:
0x4ab008d8EC36E01c96a0F4eBe40482b1432366DF
```

**Explorer:** https://testnet.monadexplorer.com

---

## 🔧 IF YOU SEE "RPC ERROR"

### ✅ This is NORMAL for Monad Testnet!

**The app will auto-retry:**
- 7 attempts with exponential backoff
- 1s → 2s → 4s → 8s → 15s delays
- Jitter to prevent overload

**What to do:**
1. ⏳ **WAIT** - Let auto-retry complete (up to 2 minutes)
2. 🔄 **Click "Retry" button** when it appears
3. ✅ **Be patient** - Monad testnet can be slow

**DON'T:**
- ❌ Refresh page immediately
- ❌ Click multiple times
- ❌ Panic!

---

## 🎯 MONAD NETWORK SETTINGS

```
Network Name: Monad Testnet
RPC URL: https://testnet-rpc.monad.xyz
Chain ID: 10143
Currency Symbol: MON
Block Explorer: https://testnet.monadexplorer.com
```

---

## 🔍 CHECK MONAD RPC STATUS

### Quick Test:
```bash
curl -X POST https://testnet-rpc.monad.xyz \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

### Expected Response:
```json
{"jsonrpc":"2.0","id":1,"result":"0x..."}
```

---

## 📊 WHAT THE APP DOES AUTOMATICALLY

### ✅ Smart Retry Logic
- Exponential backoff (7 attempts)
- Random jitter to prevent overload
- 30-second timeout per request

### ✅ Batch Loading
- Loads events in groups of 3
- 2-second delay between batches
- Progressive UI updates

### ✅ Error Recovery
- Detects timeout, rate limit, internal errors
- Shows specific error messages
- Provides "Retry" button

### ✅ RPC Health Monitoring
- Checks RPC status every 30 seconds
- Shows real-time latency indicator
- Color-coded status (🟢 🟡 🔴)

---

## 🐛 COMMON ERRORS & INSTANT FIXES

| Error | Meaning | Fix |
|-------|---------|-----|
| "Monad RPC internal error" | RPC overloaded | ⏳ Wait 2 min + Retry |
| "Request timeout" | Network slow | ✅ Auto-retry handles it |
| "Rate limit exceeded" | Too many requests | ⏳ Wait 60s + Retry |
| "Contracts not initialized" | Wrong network | 🔄 Switch to Monad in MetaMask |

---

## 📱 BROWSER CONSOLE TIPS

Open DevTools (F12) and watch for:

### ✅ Success Indicators:
```
✅ Connected to Monad Testnet
✅ Total events found: X
✅ Events loaded successfully: X
```

### 🔄 Retry In Progress:
```
⚠️ Attempt 1/7 failed: ...
⏳ Waiting 1.5s before retry 2/7...
⚠️ Attempt 2/7 failed: ...
⏳ Waiting 3.2s before retry 3/7...
```

### 🎉 Final Success:
```
✅ All events loaded successfully: 6
```

---

## 🏆 HACKATHON HIGHLIGHTS

### Why Monad for EventChain?

1. **⚡ 10,000 TPS**
   - Instant ticket purchases
   - No waiting for confirmations
   
2. **💰 Sub-cent Gas Fees**
   - Affordable for all users
   - Mint thousands of tickets cheaply

3. **🔗 100% EVM Compatible**
   - No code changes needed
   - Works with existing tools

4. **🌐 Growing Ecosystem**
   - Active developer community
   - Rich infrastructure support

---

## 🔗 USEFUL LINKS

### Official Monad Resources
- **Testnet Faucet:** https://testnet.monad.xyz
- **Block Explorer:** https://testnet.monadexplorer.com
- **Developer Portal:** https://developers.monad.xyz
- **Documentation:** https://docs.monad.xyz
- **Dev Discord:** https://discord.gg/monaddev

### EventChain Specific
- **Troubleshooting:** `MONAD_TROUBLESHOOTING_COMPLETE.md`
- **Architecture:** `ARCHITECTURE.md`
- **Quick Start:** `QUICK_START.md`

---

## 💡 PRO TIPS

### For Best Results:

1. **🕐 Use during off-peak hours**
   - Early morning or late evening (UTC)
   - Less RPC congestion

2. **🔄 Let auto-retry complete**
   - Don't interrupt the retry cycle
   - Watch console for progress

3. **📊 Monitor RPC status indicator**
   - 🟢 Excellent = Fast response
   - 🟡 Good = Slight delay
   - 🔴 Degraded = Be patient

4. **💾 Cache is your friend**
   - Events cache for better performance
   - Reduces RPC calls

---

## 🆘 NEED HELP?

### Step-by-Step:
1. Check `MONAD_TROUBLESHOOTING_COMPLETE.md`
2. Open browser console (F12) for errors
3. Wait for auto-retry (up to 2 minutes)
4. Check Monad testnet status: https://testnet.monad.xyz
5. Join Dev Discord: https://discord.gg/monaddev

### Emergency Fallback:
If Monad is completely down:
```bash
# Terminal 1: Start local Hardhat node
npx hardhat node

# Terminal 2: Deploy locally
npx hardhat ignition deploy ignition/modules/EventChain.js --network localhost

# Update CONTRACT_ADDRESSES in ui/src/web3Service.js
```

---

## ✅ SUCCESS CHECKLIST

Before you demo:
- [ ] MetaMask connected to Monad Testnet
- [ ] Have test MON tokens
- [ ] UI running at http://localhost:3000
- [ ] Can see RPC status indicator
- [ ] Events load successfully (or retry works)
- [ ] Can buy/transfer tickets
- [ ] Console shows no critical errors

---

## 📈 PERFORMANCE METRICS

### Expected Load Times:
- **Initial connection:** 2-5 seconds
- **Load events (6 events):** 10-30 seconds
- **Buy ticket:** 15-45 seconds
- **Transfer ticket:** 15-45 seconds

### If slower:
- ✅ **Normal** - Monad testnet can be variable
- ✅ **Auto-retry active** - Wait for completion
- ✅ **Progressive loading** - See results as they arrive

---

**🎉 You're ready for the hackathon!**

**Built for:** Monad Sponsored Hackathon  
**Network:** Monad Testnet (Chain ID: 10143)  
**Version:** EventChain 2.0 - Monad Optimized  
**Last Updated:** 2025-10-25
