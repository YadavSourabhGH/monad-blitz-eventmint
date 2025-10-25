#!/bin/bash

# 🚀 EventChain on Monad - Complete Startup Script
# This script helps you get your EventChain DApp running on Monad Testnet

echo "======================================"
echo "🎫 EventChain - Monad Testnet Startup"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Check prerequisites
echo -e "${BLUE}Step 1: Checking prerequisites...${NC}"
echo ""

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✅ Node.js installed: $NODE_VERSION${NC}"
else
    echo -e "${RED}❌ Node.js not found. Please install Node.js first.${NC}"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✅ npm installed: $NPM_VERSION${NC}"
else
    echo -e "${RED}❌ npm not found. Please install npm first.${NC}"
    exit 1
fi

echo ""

# Step 2: Check .secret.json
echo -e "${BLUE}Step 2: Checking configuration...${NC}"
echo ""

if [ -f ".secret.json" ]; then
    echo -e "${GREEN}✅ .secret.json found${NC}"
    
    # Check if private key is set
    if grep -q '"accountPrivateKey": "0x[0-9a-fA-F]\{64\}"' .secret.json; then
        echo -e "${GREEN}✅ Private key configured${NC}"
    else
        echo -e "${YELLOW}⚠️  Private key not set in .secret.json${NC}"
        echo "Please add your MetaMask private key to .secret.json"
        echo "Format: {\"projectId\": \"\", \"accountPrivateKey\": \"0x...\"}"
    fi
else
    echo -e "${YELLOW}⚠️  .secret.json not found. Creating template...${NC}"
    echo '{"projectId": "", "accountPrivateKey": ""}' > .secret.json
    echo "Please add your private key to .secret.json"
fi

echo ""

# Step 3: Install dependencies
echo -e "${BLUE}Step 3: Installing dependencies...${NC}"
echo ""

# Root dependencies
if [ -f "package.json" ]; then
    echo "Installing root dependencies..."
    npm install
    echo -e "${GREEN}✅ Root dependencies installed${NC}"
fi

# UI dependencies
if [ -d "ui" ]; then
    echo "Installing UI dependencies..."
    cd ui
    npm install
    cd ..
    echo -e "${GREEN}✅ UI dependencies installed${NC}"
fi

echo ""

# Step 4: Check Monad network configuration
echo -e "${BLUE}Step 4: Verifying Monad network configuration...${NC}"
echo ""

if grep -q "monad" hardhat.config.js; then
    echo -e "${GREEN}✅ Monad network configured in hardhat.config.js${NC}"
    echo "   Chain ID: 10143"
    echo "   RPC: https://testnet-rpc.monad.xyz"
else
    echo -e "${RED}❌ Monad network not found in hardhat.config.js${NC}"
    exit 1
fi

echo ""

# Step 5: Show contract addresses
echo -e "${BLUE}Step 5: Contract Addresses (Monad Testnet)${NC}"
echo ""
echo "EventChainContract: 0x5e8AFCb29A627cE0AbA0E6018BbB999a0b57d0CB"
echo "EventChainEventManagerContract: 0x4ab008d8EC36E01c96a0F4eBe40482b1432366DF"
echo ""
echo "Verify at: https://testnet.monadexplorer.com"
echo ""

# Step 6: Test Monad RPC connection
echo -e "${BLUE}Step 6: Testing Monad RPC connection...${NC}"
echo ""

RPC_RESPONSE=$(curl -s -X POST https://testnet-rpc.monad.xyz \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \
  --max-time 10)

if echo "$RPC_RESPONSE" | grep -q "result"; then
    echo -e "${GREEN}✅ Monad RPC is responding${NC}"
    BLOCK_HEX=$(echo "$RPC_RESPONSE" | grep -o '"result":"0x[^"]*"' | cut -d'"' -f4)
    if [ ! -z "$BLOCK_HEX" ]; then
        BLOCK_NUM=$((16#${BLOCK_HEX:2}))
        echo "   Current block: $BLOCK_NUM"
    fi
else
    echo -e "${RED}❌ Monad RPC not responding or slow${NC}"
    echo "   This is normal - Monad testnet can be intermittent"
    echo "   The app has built-in retry logic to handle this"
fi

echo ""

# Step 7: MetaMask setup reminder
echo -e "${BLUE}Step 7: MetaMask Setup Reminder${NC}"
echo ""
echo "Make sure MetaMask is configured with:"
echo "  • Network Name: Monad Testnet"
echo "  • RPC URL: https://testnet-rpc.monad.xyz"
echo "  • Chain ID: 10143"
echo "  • Currency: MON"
echo "  • Explorer: https://testnet.monadexplorer.com"
echo ""
echo "Get test MON tokens from: https://testnet.monad.xyz"
echo ""

# Step 8: Start the application
echo -e "${BLUE}Step 8: Starting the application...${NC}"
echo ""

read -p "Do you want to start the UI now? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo -e "${GREEN}🚀 Starting EventChain UI...${NC}"
    echo ""
    echo "The application will open at: http://localhost:3000"
    echo ""
    echo -e "${YELLOW}IMPORTANT:${NC}"
    echo "1. Connect your MetaMask wallet"
    echo "2. Make sure you're on Monad Testnet (Chain ID: 10143)"
    echo "3. If you see RPC errors, wait 1-2 minutes and click Retry"
    echo "4. The app uses aggressive retry logic (7 attempts with backoff)"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    sleep 3
    
    cd ui
    npm start
else
    echo ""
    echo -e "${YELLOW}To start manually, run:${NC}"
    echo "  cd ui && npm start"
    echo ""
fi

# Troubleshooting tips
echo ""
echo -e "${BLUE}======================================"
echo "📚 Troubleshooting Resources"
echo "======================================${NC}"
echo ""
echo "If you encounter issues:"
echo "  1. Read MONAD_TROUBLESHOOTING_COMPLETE.md"
echo "  2. Check console logs (F12 in browser)"
echo "  3. Wait for auto-retry (up to 7 attempts)"
echo "  4. Join Monad Dev Discord: https://discord.gg/monaddev"
echo ""
echo "Common fixes:"
echo "  • RPC errors → Wait 2-3 minutes, click Retry"
echo "  • Timeout → Auto-retry will handle it"
echo "  • Rate limit → System batches requests automatically"
echo "  • Wrong network → Switch MetaMask to Monad Testnet"
echo ""
echo -e "${GREEN}✅ Setup complete! Good luck with the hackathon! 🎉${NC}"
echo ""
