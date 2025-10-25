#!/bin/bash

echo "🔄 EventChain Network Switcher"
echo "=============================="
echo ""
echo "Choose your network:"
echo "1) Monad Testnet (currently configured)"
echo "2) Localhost (Hardhat)"
echo ""
read -p "Enter choice (1 or 2): " choice

if [ "$choice" = "2" ]; then
    echo ""
    echo "⚙️  Switching to Localhost..."
    
    # Update contract addresses to localhost
    sed -i '' 's/EventChainContract: .0x[a-fA-F0-9]*./EventChainContract: '\''0x5FbDB2315678afecb367f032d93F642f64180aa3'\''/' ui/src/web3Service.js
    sed -i '' 's/EventChainEventManagerContract: .0x[a-fA-F0-9]*./EventChainEventManagerContract: '\''0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'\''/' ui/src/web3Service.js
    sed -i '' 's/\/\/ Contract addresses - .*/\/\/ Contract addresses - LOCALHOST (Chain ID: 31337)/' ui/src/web3Service.js
    
    echo "✅ Contract addresses updated to Localhost"
    echo ""
    echo "📝 Next steps:"
    echo "1. Switch MetaMask to 'Localhost 8545' network"
    echo "2. Make sure Hardhat node is running (npx hardhat node)"
    echo "3. Refresh your browser"
    echo ""
    
elif [ "$choice" = "1" ]; then
    echo ""
    echo "⚙️  Switching to Monad Testnet..."
    
    # Update contract addresses to Monad
    sed -i '' 's/EventChainContract: .0x[a-fA-F0-9]*./EventChainContract: '\''0x5e8AFCb29A627cE0AbA0E6018BbB999a0b57d0CB'\''/' ui/src/web3Service.js
    sed -i '' 's/EventChainEventManagerContract: .0x[a-fA-F0-9]*./EventChainEventManagerContract: '\''0x4ab008d8EC36E01c96a0F4eBe40482b1432366DF'\''/' ui/src/web3Service.js
    sed -i '' 's/\/\/ Contract addresses - .*/\/\/ Contract addresses - MONAD TESTNET (Chain ID: 10143)/' ui/src/web3Service.js
    
    echo "✅ Contract addresses updated to Monad Testnet"
    echo ""
    echo "📝 Next steps:"
    echo "1. Switch MetaMask to 'Monad Testnet' network"
    echo "2. Refresh your browser"
    echo ""
else
    echo "Invalid choice. Exiting."
    exit 1
fi

echo "🎯 Network switch complete!"
