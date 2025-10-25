#!/bin/bash

# EventChain Frontend Launcher
# Quick start script for the integrated frontend

echo "🎫 EventChain - Starting Frontend..."
echo ""
echo "📍 Location: /Users/sourabhyadav/eventchain_blockchain/ui"
echo "🌐 URL: http://localhost:5173"
echo "⛓️  Network: Monad Testnet (Chain ID: 10143)"
echo ""
echo "📝 Make sure you have:"
echo "   ✅ MetaMask installed"
echo "   ✅ Monad Testnet added to MetaMask"
echo "   ✅ MON tokens (get from https://faucet.monad.xyz/)"
echo ""
echo "🚀 Starting Vite dev server..."
echo ""

cd "$(dirname "$0")/ui" && npx vite
