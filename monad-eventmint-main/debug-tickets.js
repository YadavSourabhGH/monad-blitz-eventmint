const hre = require("hardhat");

async function debugTickets() {
  console.log('🔍 Debugging Ticket Purchase Issue');
  console.log('==================================');
  
  try {
    // Get network info
    const network = await hre.ethers.provider.getNetwork();
    console.log(`📡 Network: ${network.name} (Chain ID: ${network.chainId})`);
    
    // Contract addresses
    const addresses = {
      EventChainContract: '0x7D70097F097Ba768Dda48E314206f5A879d2873A',
      EventChainEventManagerContract: '0x3b3E674a6BEaa5D49dE3365Ad6e991F1Dd9701aA'
    };
    
    console.log('\n🔗 Contract Addresses:');
    console.log(`   EventChain: ${addresses.EventChainContract}`);
    console.log(`   Manager: ${addresses.EventChainEventManagerContract}`);
    
    // Check if contracts exist
    const eventChainCode = await hre.ethers.provider.getCode(addresses.EventChainContract);
    const managerCode = await hre.ethers.provider.getCode(addresses.EventChainEventManagerContract);
    
    console.log('\n📋 Contract Status:');
    console.log(`   EventChain deployed: ${eventChainCode !== '0x' ? '✅' : '❌'}`);
    console.log(`   Manager deployed: ${managerCode !== '0x' ? '✅' : '❌'}`);
    
    if (eventChainCode !== '0x') {
      // Get contract instance
      const EventChain = await hre.ethers.getContractAt("EventChainContract", addresses.EventChainContract);
      
      // Check total supply
      try {
        const totalSupply = await EventChain.totalSupply();
        console.log(`\n🎫 Total Tickets Minted: ${totalSupply}`);
        
        if (Number(totalSupply) > 0) {
          console.log('\n🎟️ Recent Tickets:');
          for (let i = 0; i < Math.min(Number(totalSupply), 5); i++) {
            try {
              const tokenId = await EventChain.tokenByIndex(i);
              const owner = await EventChain.ownerOf(tokenId);
              console.log(`   Token ${tokenId}: ${owner}`);
            } catch (error) {
              console.log(`   Token ${i}: Error getting details`);
            }
          }
        }
      } catch (error) {
        console.log('\n⚠️ Could not get total supply - contract might not have enumeration');
        console.log('   This is why tickets might not show up in "My Tickets"');
      }
    }
    
    console.log('\n💡 Troubleshooting Tips:');
    console.log('   1. Check browser console for errors');
    console.log('   2. Verify wallet is connected to Monad testnet');
    console.log('   3. Confirm transaction was successful');
    console.log('   4. Try refreshing the "My Tickets" page');
    console.log('   5. Check if contract has enumeration functions');
    
    console.log('\n🔧 Quick Fix Applied:');
    console.log('   - Updated getUserTickets() with multiple fallback methods');
    console.log('   - Added proper error handling and logging');
    console.log('   - Included demo fallback for testing');
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  }
}

debugTickets().catch(console.error);