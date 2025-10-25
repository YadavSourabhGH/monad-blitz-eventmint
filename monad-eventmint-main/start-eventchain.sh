#!/bin/bash

echo "🎫 Starting EventChain NFT Ticketing Platform"
echo "=============================================="

# Check if we're in the right directory
if [ ! -d "ui" ]; then
    echo "❌ Error: ui directory not found. Make sure you're in the project root."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "ui/node_modules" ]; then
    echo "📦 Installing dependencies..."
    cd ui && npm install && cd ..
fi

echo "🚀 Starting React application..."
echo "📍 Application will open at: http://localhost:3000"
echo ""
echo "🔗 Monad Testnet Configuration:"
echo "   Network: Monad Testnet"
echo "   Chain ID: 10143"
echo "   RPC: https://testnet-rpc.monad.xyz"
echo "   Currency: MON"
echo "   Faucet: https://faucet.monad.xyz/"
echo ""
echo "✅ Make sure you have:"
echo "   1. MetaMask installed"
echo "   2. Monad testnet added to MetaMask"
echo "   3. MON tokens from faucet"
echo ""
echo "🎯 Ready to demo EventChain!"
echo "=============================================="

cd ui && npm start