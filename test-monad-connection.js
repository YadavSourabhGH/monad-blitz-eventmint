// Quick test script to verify Monad Testnet connection
const { ethers } = require('hardhat');

async function main() {
  console.log('\n🔍 Testing Monad Testnet Connection...\n');

  // Contract addresses on Monad Testnet
  const EVENT_CHAIN_ADDRESS = '0x5e8AFCb29A627cE0AbA0E6018BbB999a0b57d0CB';
  const EVENT_MANAGER_ADDRESS = '0x4ab008d8EC36E01c96a0F4eBe40482b1432366DF';

  // Get network info
  const network = await ethers.provider.getNetwork();
  console.log('✅ Network:', network.name);
  console.log('✅ Chain ID:', network.chainId.toString());

  // Get block number
  const blockNumber = await ethers.provider.getBlockNumber();
  console.log('✅ Current Block:', blockNumber);

  // Check EventChainContract
  const eventChainCode = await ethers.provider.getCode(EVENT_CHAIN_ADDRESS);
  if (eventChainCode !== '0x') {
    console.log('✅ EventChainContract deployed at:', EVENT_CHAIN_ADDRESS);
  } else {
    console.log('❌ EventChainContract NOT found at:', EVENT_CHAIN_ADDRESS);
  }

  // Check EventManagerContract
  const eventManagerCode = await ethers.provider.getCode(EVENT_MANAGER_ADDRESS);
  if (eventManagerCode !== '0x') {
    console.log('✅ EventManagerContract deployed at:', EVENT_MANAGER_ADDRESS);
  } else {
    console.log('❌ EventManagerContract NOT found at:', EVENT_MANAGER_ADDRESS);
  }

  // Try to get total events
  try {
    const EventManagerFactory = await ethers.getContractFactory('EventChainEventManagerContract');
    const eventManager = EventManagerFactory.attach(EVENT_MANAGER_ADDRESS);
    const totalEvents = await eventManager.getTotalEvents();
    console.log('✅ Total Events:', totalEvents.toString());
  } catch (error) {
    console.log('⚠️  Could not fetch total events:', error.message);
  }

  console.log('\n✅ Monad Testnet connection test complete!\n');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
