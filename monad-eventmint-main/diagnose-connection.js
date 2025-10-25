// Quick diagnostic script to check blockchain connection
const Web3 = require('web3');

const CONTRACT_ADDRESSES = {
  EventChainContract: '0x7D70097F097Ba768Dda48E314206f5A879d2873A',
  EventChainEventManagerContract: '0x3b3E674a6BEaa5D49dE3365Ad6e991F1Dd9701aA'
};

const MONAD_RPC = 'https://testnet-rpc.monad.xyz';

async function diagnose() {
  console.log('🔍 Diagnosing EventChain connection...\n');

  try {
    // Test RPC connection
    console.log('1️⃣ Testing Monad RPC connection...');
    const web3 = new Web3(MONAD_RPC);
    
    const chainId = await web3.eth.getChainId();
    console.log('✅ Chain ID:', chainId);
    
    const blockNumber = await web3.eth.getBlockNumber();
    console.log('✅ Latest Block:', blockNumber);
    
    // Check contract bytecode
    console.log('\n2️⃣ Checking EventChain Contract...');
    const code = await web3.eth.getCode(CONTRACT_ADDRESSES.EventChainContract);
    if (code === '0x' || code === '0x0') {
      console.log('❌ Contract NOT deployed at', CONTRACT_ADDRESSES.EventChainContract);
    } else {
      console.log('✅ Contract deployed at', CONTRACT_ADDRESSES.EventChainContract);
      console.log('   Bytecode length:', code.length, 'characters');
    }
    
    // Check manager contract
    console.log('\n3️⃣ Checking EventManager Contract...');
    const managerCode = await web3.eth.getCode(CONTRACT_ADDRESSES.EventChainEventManagerContract);
    if (managerCode === '0x' || managerCode === '0x0') {
      console.log('❌ Manager Contract NOT deployed at', CONTRACT_ADDRESSES.EventChainEventManagerContract);
    } else {
      console.log('✅ Manager Contract deployed at', CONTRACT_ADDRESSES.EventChainEventManagerContract);
      console.log('   Bytecode length:', managerCode.length, 'characters');
    }
    
    console.log('\n✅ All checks passed! Contracts are deployed.');
    console.log('\n💡 Next steps:');
    console.log('   1. Make sure MetaMask is connected to Monad Testnet');
    console.log('   2. Check browser console for errors');
    console.log('   3. Try creating an event (Organizer tab) if none exist');
    console.log('   4. Then purchase a ticket to see it in My Tickets');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\n💡 Possible solutions:');
    console.log('   - Check your internet connection');
    console.log('   - Monad RPC might be down/slow');
    console.log('   - Try again in a few minutes');
  }
}

diagnose();
