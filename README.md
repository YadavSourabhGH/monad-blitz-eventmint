# 🎫 EventMint - NFT Ticketing Platform on Monad

> Revolutionizing event ticketing with blockchain technology - Built for Monad Testnet

<p align="center">
  <img src="https://img.shields.io/badge/Monad-10143-purple?style=for-the-badge&logo=ethereum&logoColor=white" />
  <img src="https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Hardhat-FFF100?style=for-the-badge&logo=hardhat&logoColor=black" />
  <img src="https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

## 🌟 What is EventMint?

EventMint is a decentralized NFT ticketing platform built on **Monad blockchain** that transforms traditional event tickets into secure, tradeable NFTs. Say goodbye to ticket fraud, scalping, and lack of transparency!

### ✨ Key Features

- �️ **NFT-Based Tickets** - Every ticket is a unique ERC-721 token
- 🔐 **Fraud Prevention** - Blockchain-verified ownership eliminates counterfeits
- 💱 **Secure Transfers** - Transparent ticket resale and transfers
- 📱 **QR Verification** - Instant ticket validation at events
- ⚡ **Lightning Fast** - Powered by Monad's high-performance blockchain
- 🎨 **Beautiful UI** - Modern glassmorphism design with smooth animations

## 🚀 Live Demo

**Deployed Contracts on Monad Testnet:**
- EventChainContract: `0x7D70097F097Ba768Dda48E314206f5A879d2873A`
- EventChainEventManagerContract: `0x3b3E674a6BEaa5D49dE3365Ad6e991F1Dd9701aA`

**Network Details:**
- Chain ID: `10143`
- RPC: `https://testnet-rpc.monad.xyz`
- Explorer: [testnet.monadexplorer.com](https://testnet.monadexplorer.com)
- Faucet: [faucet.monad.xyz](https://faucet.monad.xyz/)

## 📸 Screenshots

### My Tickets Page
View and manage your NFT ticket collection with real-time blockchain data.

### Marketplace
Browse and purchase tickets for upcoming events.

### Create Event
Event organizers can easily create events and mint NFT tickets.

## 🛠️ Installation

### Prerequisites
- Node.js 18+ and npm
- MetaMask browser extension
- MON testnet tokens from [Monad Faucet](https://faucet.monad.xyz/)

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/YadavSourabhGH/monad-blitz-eventmint.git
cd monad-blitz-eventmint
```

2. **Install dependencies**
```bash
# Root dependencies (Hardhat & contracts)
npm install

# Frontend dependencies
cd ui
npm install
cd ..
```

3. **Start the frontend**
```bash
cd ui
npm run dev
```

Visit `http://localhost:8080` 🚀

### Setup MetaMask for Monad Testnet

Add Monad Testnet to MetaMask:
- **Network Name**: Monad Testnet
- **RPC URL**: `https://testnet-rpc.monad.xyz`
- **Chain ID**: `10143`
- **Currency Symbol**: `MON`
- **Block Explorer**: `https://testnet.monadexplorer.com`

Get testnet MON tokens: [faucet.monad.xyz](https://faucet.monad.xyz/)

## 📦 Tech Stack

### Blockchain Layer
- **Network**: Monad Testnet (Chain ID: 10143)
- **Smart Contracts**: Solidity ^0.8.0
- **Token Standard**: ERC-721 (NFTs)
- **Development Framework**: Hardhat
- **Testing**: Hardhat + Ethers.js

### Frontend Application
- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **UI Library**: shadcn/ui + Radix UI
- **State Management**: TanStack Query (React Query)
- **Web3 Integration**: wagmi + viem
- **QR Code Generation**: qrcode.react
- **Build Tool**: Vite
- **Icons**: Lucide React

### Smart Contracts

**EventChainContract.sol** - ERC-721 NFT Ticket Contract
- Mints unique NFT tickets
- Validates and redeems tickets
- Tracks ownership history
- Manages transfer restrictions

**EventChainEventManagerContract.sol** - Event Management
- Creates and manages events
- Handles ticket sales with MON payments
- Tracks sales and redemptions
- Event ownership transfers

## 💡 How It Works

### For Event Organizers

1. **Create Event**
   - Navigate to "Create Event" page
   - Fill in event details (name, date, location, price, image)
   - Set total tickets available
   - Confirm transaction in MetaMask
   - Event created on Monad blockchain ✅

2. **Manage Sales**
   - View real-time ticket sales
   - Track redemptions
   - Monitor revenue in MON

### For Attendees

1. **Purchase Tickets**
   - Browse events in Marketplace
   - Click "Buy Ticket"
   - Confirm payment in MetaMask (MON tokens)
   - NFT minted to your wallet 🎫

2. **Use Your Tickets**
   - View tickets in "My Tickets"
   - Generate QR code for entry
   - Show QR at event entrance
   - Ticket verified on blockchain ✅

3. **Transfer/Resell**
   - Transfer tickets to friends
   - Resell on secondary markets
   - All transfers recorded on-chain

## 📁 Project Structure

```
eventchain_blockchain/
├── contracts/                  # Solidity smart contracts
│   ├── EventChainContract.sol
│   ├── EventChainEventManagerContract.sol
│   └── interfaces/
├── ui/                         # React frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Contract ABIs & configs
│   │   ├── contexts/          # React contexts
│   │   └── assets/
│   └── public/
├── scripts/                    # Deployment scripts
├── test/                       # Contract tests
├── ignition/                   # Hardhat Ignition modules
├── hardhat.config.js           # Hardhat configuration
└── package.json
```

## 🎨 Features Walkthrough

### Beautiful UI/UX
- **Glassmorphism Design** - Modern frosted glass effects
- **Animated Backgrounds** - Dynamic dotted particle system
- **Gradient Accents** - Eye-catching color transitions
- **Responsive Layout** - Perfect on all devices
- **Dark Theme** - Easy on the eyes
- **Smooth Animations** - Delightful user experience

### Blockchain Integration
- **Real-time Updates** - Live blockchain data sync
- **MetaMask Integration** - Seamless wallet connection
- **Transaction Tracking** - Monitor all blockchain operations
- **Gas Optimization** - Efficient smart contract calls
- **Error Handling** - User-friendly error messages

### Security Features
- ✅ Blockchain-verified ownership
- ✅ Anti-counterfeit protection
- ✅ Transparent transfer history
- ✅ Smart contract access control
- ✅ Secure payment processing
- ✅ On-chain validation

## 🧪 Testing

Run smart contract tests:
```bash
npx hardhat test
```

Run with gas reporting:
```bash
REPORT_GAS=true npx hardhat test
```

## � Deployment

### Deploy Contracts to Monad Testnet

1. **Configure environment**
```bash
# Create .env file
MONAD_TESTNET_RPC_URL=https://testnet-rpc.monad.xyz
PRIVATE_KEY=your_wallet_private_key
```

2. **Compile contracts**
```bash
npx hardhat compile
```

3. **Deploy**
```bash
npx hardhat run scripts/deploy.js --network monadTestnet
```

### Currently Deployed
- **EventChainContract**: `0x7D70097F097Ba768Dda48E314206f5A879d2873A`
- **EventChainEventManagerContract**: `0x3b3E674a6BEaa5D49dE3365Ad6e991F1Dd9701aA`

## 🐛 Troubleshooting

### Common Issues

**"Network Not Found"**
- Add Monad Testnet to MetaMask
- Verify RPC URL: `https://testnet-rpc.monad.xyz`
- Check Chain ID: `10143`

**"Insufficient Funds"**
- Get MON from [faucet.monad.xyz](https://faucet.monad.xyz/)
- Ensure enough MON for gas + ticket price

**"Transaction Failed"**
- Verify connected to Monad Testnet
- Check wallet has sufficient balance
- Try refreshing and reconnecting wallet

**"Tickets Not Showing"**
- Confirm connected to Monad Testnet (Chain ID: 10143)
- Check wallet owns tickets on blockchain
- Refresh page to re-sync blockchain data

## 📚 Documentation

- [Monad Documentation](https://docs.monad.xyz)
- [Hardhat Documentation](https://hardhat.org/docs)
- [wagmi Documentation](https://wagmi.sh)
- [shadcn/ui](https://ui.shadcn.com)

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## � Acknowledgments

- **Monad** - For the blazing-fast blockchain infrastructure
- **OpenZeppelin** - For secure smart contract libraries
- **shadcn** - For beautiful UI components
- **wagmi** - For excellent Web3 React hooks
- **Hardhat** - For smart contract development tools

## 📧 Contact

**Developer**: Sourabh Yadav  
**GitHub**: [@YadavSourabhGH](https://github.com/YadavSourabhGH)  
**Repository**: [monad-blitz-eventmint](https://github.com/YadavSourabhGH/monad-blitz-eventmint)

## �️ Roadmap

- [x] Basic NFT ticketing system
- [x] Event creation and management
- [x] Ticket purchase with MON
- [x] QR code generation
- [x] Beautiful UI with glassmorphism
- [ ] IPFS integration for metadata
- [ ] Email notifications
- [ ] Event analytics dashboard
- [ ] Multi-chain support
- [ ] Mobile app (React Native)
- [ ] Secondary marketplace
- [ ] Batch minting
- [ ] Dynamic pricing
- [ ] DAO governance

---

<p align="center">
  <strong>Built with ❤️ for the Monad ecosystem</strong>
</p>

<p align="center">
  ⭐ Star this repo if you find it helpful!
</p>


