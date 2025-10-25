/**
 * Browser Console Test Script
 * 
 * Copy and paste this into your browser console (F12 → Console tab)
 * while the EventChain app is open to diagnose the ticket loading issue
 */

console.log('🔍 EventChain Diagnostic Test Starting...\n');

// Test 1: Check if Web3 is available
if (typeof window.ethereum !== 'undefined') {
  console.log('✅ MetaMask detected');
  
  // Test 2: Check connected account
  window.ethereum.request({ method: 'eth_accounts' })
    .then(accounts => {
      if (accounts.length > 0) {
        console.log('✅ Wallet connected:', accounts[0]);
        
        // Test 3: Check network
        return window.ethereum.request({ method: 'eth_chainId' });
      } else {
        console.log('❌ No wallet connected');
        throw new Error('No wallet');
      }
    })
    .then(chainId => {
      const chainIdNum = parseInt(chainId, 16);
      console.log('✅ Chain ID:', chainIdNum);
      
      if (chainIdNum === 10143) {
        console.log('✅ Correct network: Monad Testnet');
      } else {
        console.log('❌ Wrong network! Expected 10143 (Monad), got', chainIdNum);
        console.log('   Please switch to Monad Testnet in MetaMask');
      }
    })
    .catch(err => {
      console.error('❌ Error:', err.message);
    });
} else {
  console.log('❌ MetaMask not detected. Please install MetaMask.');
}

console.log('\n💡 Next Steps:');
console.log('   1. Make sure you see ✅ for all checks above');
console.log('   2. Open Network tab (F12 → Network) to see if RPC calls are slow/failing');
console.log('   3. Try the steps in HOW_TO_USE_THE_APP.md to create events and buy tickets');
console.log('\n📌 Remember: "Loading tickets..." is NORMAL if you haven\'t purchased any tickets yet!');
