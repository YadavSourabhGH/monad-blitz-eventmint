import { createConfig, http } from 'wagmi'
import { injected, walletConnect, coinbaseWallet, metaMask } from '@wagmi/connectors'
import { defineChain } from 'viem'
import type { CreateConnectorFn } from 'wagmi'

// Get project ID from environment variable
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID

// Define Monad Testnet chain
export const monadTestnet = defineChain({
  id: 10143,
  name: 'Monad Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Monad',
    symbol: 'MON',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet-rpc.monad.xyz'],
    },
    public: {
      http: ['https://testnet-rpc.monad.xyz'],
    },
  },
  blockExplorers: {
    default: { name: 'Monad Explorer', url: 'https://testnet.monadexplorer.com' },
  },
  testnet: true,
})

// Define Monad Mainnet chain (for future use)
export const monadMainnet = defineChain({
  id: 41455,
  name: 'Monad',
  nativeCurrency: {
    decimals: 18,
    name: 'Monad',
    symbol: 'MON',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.monad.xyz'],
    },
    public: {
      http: ['https://rpc.monad.xyz'],
    },
  },
  blockExplorers: {
    default: { name: 'Monad Explorer', url: 'https://explorer.monad.xyz' },
  },
})

// Only include WalletConnect if a valid project ID is provided
const connectors: CreateConnectorFn[] = [
  injected(),
  metaMask(),
  coinbaseWallet({ appName: 'EventMint' }),
]

// Add WalletConnect only if we have a real project ID (not demo)
if (projectId && projectId !== 'demo-project-id') {
  connectors.push(walletConnect({ projectId }) as any)
}

export const config = createConfig({
  chains: [monadTestnet, monadMainnet],
  connectors,
  transports: {
    [monadTestnet.id]: http(),
    [monadMainnet.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
