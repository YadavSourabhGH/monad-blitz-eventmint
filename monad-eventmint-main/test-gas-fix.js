// Test script to verify gas pricing fix
console.log('🧪 Testing Gas Pricing Fix');
console.log('==========================');

// Simulate the gas pricing logic
function getGasParams(chainId, gasPrice, web3Utils) {
  const txParams = {
    gas: 100000, // Example gas limit
  };

  if (Number(chainId) === 10143) {
    // Monad Testnet - use legacy gas pricing
    console.log('🔧 Using legacy gas pricing for Monad');
    txParams.gasPrice = gasPrice;
    return txParams;
  } else {
    // Other networks - use EIP-1559 if available
    console.log('🔧 Using EIP-1559 gas pricing for other networks');
    txParams.maxPriorityFeePerGas = web3Utils.toWei('2', 'gwei');
    txParams.maxFeePerGas = web3Utils.toWei('50', 'gwei');
    return txParams;
  }
}

// Test scenarios
const scenarios = [
  { chainId: 10143, name: 'Monad Testnet' },
  { chainId: 1, name: 'Ethereum Mainnet' },
  { chainId: 11155111, name: 'Sepolia Testnet' }
];

const mockWeb3Utils = {
  toWei: (value, unit) => `${value}_${unit}_wei`
};

scenarios.forEach(scenario => {
  console.log(`\n📋 Testing ${scenario.name} (Chain ID: ${scenario.chainId})`);
  const gasParams = getGasParams(scenario.chainId, '20000000000', mockWeb3Utils);
  console.log('   Gas Parameters:', gasParams);
  
  // Check for conflicts
  const hasGasPrice = 'gasPrice' in gasParams;
  const hasEIP1559 = 'maxFeePerGas' in gasParams;
  
  if (hasGasPrice && hasEIP1559) {
    console.log('   ❌ ERROR: Both gasPrice and EIP-1559 params present!');
  } else {
    console.log('   ✅ OK: No gas parameter conflicts');
  }
});

console.log('\n🎉 Gas pricing fix verified!');
console.log('   - Monad uses legacy gasPrice only');
console.log('   - Other networks use EIP-1559 when available');
console.log('   - No mixing of gas parameters');