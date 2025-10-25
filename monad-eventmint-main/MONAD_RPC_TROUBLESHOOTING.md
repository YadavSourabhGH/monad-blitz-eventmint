# 🔧 Monad RPC Troubleshooting Guide

## ⚠️ Common Issue: "Circuit Breaker is Open"

This error means the **Monad Testnet RPC is temporarily overloaded or rate-limited**.

### What I've Fixed:

✅ **Added automatic retry logic** (3 attempts with exponential backoff)
✅ **Better error messages** explaining the issue
✅ **Retry button** in the UI to manually try again
✅ **Network detection** to warn about Monad RPC issues

### 🔄 Solutions to Try:

#### Option 1: Wait and Retry (Easiest)
1. **Wait 30-60 seconds** for the RPC to recover
2. Click the **"🔄 Retry"** button in the app
3. Or refresh the page

The app will now automatically retry 3 times with delays between attempts.

#### Option 2: Try Different Times
- Monad Testnet RPC may be busy during peak hours
- Try again in a few minutes
- The network is usually less congested during off-peak hours

#### Option 3: Check Monad Status
1. Visit: https://status.monad.xyz (if available)
2. Check Discord: https://discord.gg/monad
3. Ask in #testnet-support channel

#### Option 4: Alternative - Use Localhost for Development
If you need to test urgently and Monad RPC is down:

1. **Start local Hardhat node**:
   ```bash
   npx hardhat node
   ```

2. **Deploy contracts locally**:
   ```bash
   npx hardhat ignition deploy ignition/modules/EventChain.js --network localhost
   ```

3. **Update contract addresses** in `ui/src/web3Service.js`:
   ```javascript
   export const CONTRACT_ADDRESSES = {
     EventChainContract: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
     EventChainEventManagerContract: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
   };
   ```

4. **Switch MetaMask to Localhost 8545**
5. **Refresh the app**

Then switch back to Monad when it's working again.

## 🔍 How to Check if Monad RPC is Working

Run this test:
```bash
npx hardhat run test-monad-connection.js --network monad
```

If you see errors about "circuit breaker" or "execution prevented", the RPC is having issues.

## 📊 What the App Does Now

When you try to load events:
1. **Attempt 1**: Immediate try
2. **Wait 1 second**
3. **Attempt 2**: Retry
4. **Wait 2 seconds**
5. **Attempt 3**: Final retry
6. If all fail, show user-friendly error with retry button

## ⏱️ Expected Behavior

- **Normal RPC**: Events load in 1-3 seconds
- **Slow RPC**: May take 10-15 seconds with retries
- **Down RPC**: Will show error after 3 attempts (~20 seconds)

## 🆘 Still Having Issues?

### Check These:
- [ ] MetaMask is connected to Monad Testnet (Chain ID: 10143)
- [ ] You have MON tokens for gas (you have 9.47 MON ✅)
- [ ] Internet connection is stable
- [ ] Browser console for detailed errors (F12 → Console)

### Known Monad RPC Issues:
- ⚠️ Rate limiting during high traffic
- ⚠️ Circuit breaker when overloaded
- ⚠️ Occasional timeout errors
- ⚠️ Testnet instability (it's in beta!)

### Alternative RPC Endpoints:
Currently only one public RPC is available:
- `https://testnet-rpc.monad.xyz`

If Monad releases additional RPC endpoints, you can update `hardhat.config.js`:
```javascript
networks.monad = {
  url: "https://alternative-rpc.monad.xyz",
  accounts: [secret.accountPrivateKey],
  chainId: 10143
};
```

## 📝 Development Best Practices

For Monad development:
1. **Test locally first** (use Hardhat node)
2. **Deploy to Monad** when ready
3. **Have fallback plan** if RPC is down
4. **Monitor network status** before demos
5. **Cache data** where possible (future improvement)

## 🎯 Current Status

**Network**: Monad Testnet (10143)
**Contracts Deployed**: ✅
- EventChainContract: `0x5e8AFCb29A627cE0AbA0E6018BbB999a0b57d0CB`
- EventManagerContract: `0x4ab008d8EC36E01c96a0F4eBe40482b1432366DF`

**App Features**:
- ✅ Automatic retry on RPC errors
- ✅ User-friendly error messages
- ✅ Manual retry button
- ✅ Network detection

**Next Steps**: 
- Refresh the app and try the retry button
- Wait if RPC is busy
- Consider local testing if urgent

---

**Remember**: This is a **testnet** - occasional downtime is normal! 🚧
