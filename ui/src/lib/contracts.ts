import { monadTestnet } from './wagmi';

// Contract addresses - MONAD TESTNET (Chain ID: 10143) - DEPLOYED!
export const CONTRACT_ADDRESSES = {
  EventChainContract: '0x7D70097F097Ba768Dda48E314206f5A879d2873A',
  EventChainEventManagerContract: '0x3b3E674a6BEaa5D49dE3365Ad6e991F1Dd9701aA',
  [monadTestnet.id]: {
    EventChainContract: '0x7D70097F097Ba768Dda48E314206f5A879d2873A',
    EventChainEventManagerContract: '0x3b3E674a6BEaa5D49dE3365Ad6e991F1Dd9701aA',
  },
} as const;

// EventChainContract ABI (ERC721 Ticket NFT) - COMPLETE ABI
export const EventChainContractABI = [
  // Minting function
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'string', name: 'uri', type: 'string' },
      { internalType: 'string', name: 'eventDetails', type: 'string' },
      { internalType: 'uint256', name: 'originalPrice', type: 'uint256' },
      { internalType: 'uint256', name: 'expirationDate', type: 'uint256' }
    ],
    name: 'safeMint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // Ticket validation
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'validateTicket',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // Get ticket status
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'getTicketStatus',
    outputs: [
      { internalType: 'bool', name: 'isUsed', type: 'bool' },
      { internalType: 'bool', name: 'isValid', type: 'bool' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  // Get ownership history
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'getTicketHistory',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function'
  },
  // Transfer functions
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // ERC721 standard functions
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  // ERC721 Enumerable functions
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'uint256', name: 'index', type: 'uint256' }
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  // Admin functions
  {
    inputs: [
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'string', name: 'newEventDetails', type: 'string' },
      { internalType: 'string', name: 'newURI', type: 'string' }
    ],
    name: 'updateTicketMetadata',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'uint256', name: 'maxPrice', type: 'uint256' }
    ],
    name: 'setMaxResalePrice',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      { indexed: false, internalType: 'string', name: 'eventDetails', type: 'string' },
      { indexed: false, internalType: 'uint256', name: 'originalPrice', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'expirationDate', type: 'uint256' }
    ],
    name: 'TicketMinted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'validator', type: 'address' }
    ],
    name: 'TicketValidated',
    type: 'event'
  }
] as const;

// EventChainEventManagerContract ABI - COMPLETE ABI
export const EventChainEventManagerABI = [
  // Basic event creation
  {
    inputs: [
      { internalType: 'string', name: 'name', type: 'string' },
      { internalType: 'string', name: 'location', type: 'string' },
      { internalType: 'string', name: 'date', type: 'string' },
      { internalType: 'uint256', name: 'ticketPrice', type: 'uint256' }
    ],
    name: 'createEvent',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // Extended event creation with image and total tickets
  {
    inputs: [
      { internalType: 'string', name: 'name', type: 'string' },
      { internalType: 'string', name: 'location', type: 'string' },
      { internalType: 'string', name: 'date', type: 'string' },
      { internalType: 'uint256', name: 'ticketPrice', type: 'uint256' },
      { internalType: 'string', name: 'imageUrl', type: 'string' },
      { internalType: 'uint256', name: 'totalTickets', type: 'uint256' }
    ],
    name: 'createEventExtended',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // Get basic event details
  {
    inputs: [{ internalType: 'uint256', name: 'eventId', type: 'uint256' }],
    name: 'getEventDetails',
    outputs: [
      {
        components: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'location', type: 'string' },
          { internalType: 'string', name: 'date', type: 'string' },
          { internalType: 'uint256', name: 'ticketPrice', type: 'uint256' },
          { internalType: 'address', name: 'organizer', type: 'address' }
        ],
        internalType: 'struct IEventChainEventManagerContract.Event',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  // Get extended event details with sales data
  {
    inputs: [{ internalType: 'uint256', name: 'eventId', type: 'uint256' }],
    name: 'getEventExtended',
    outputs: [
      {
        components: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'location', type: 'string' },
          { internalType: 'string', name: 'date', type: 'string' },
          { internalType: 'uint256', name: 'ticketPrice', type: 'uint256' },
          { internalType: 'address', name: 'organizer', type: 'address' },
          { internalType: 'string', name: 'imageUrl', type: 'string' },
          { internalType: 'uint256', name: 'totalTickets', type: 'uint256' },
          { internalType: 'uint256', name: 'soldTickets', type: 'uint256' },
          { internalType: 'uint256', name: 'redeemedTickets', type: 'uint256' }
        ],
        internalType: 'struct EventChainEventManagerContract.EventExtended',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  // Get all ticket IDs for an event
  {
    inputs: [{ internalType: 'uint256', name: 'eventId', type: 'uint256' }],
    name: 'getEventTickets',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function'
  },
  // Get total number of events
  {
    inputs: [],
    name: 'getTotalEvents',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  // Mint ticket (organizer only)
  {
    inputs: [
      { internalType: 'uint256', name: 'eventId', type: 'uint256' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'string', name: 'uri', type: 'string' }
    ],
    name: 'mintTicket',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // Mint ticket extended (with payment)
  {
    inputs: [
      { internalType: 'uint256', name: 'eventId', type: 'uint256' },
      { internalType: 'string', name: 'uri', type: 'string' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
    ],
    name: 'mintTicketExtended',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  // Mark ticket as redeemed
  {
    inputs: [{ internalType: 'uint256', name: 'eventId', type: 'uint256' }],
    name: 'markTicketRedeemed',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // Transfer event ownership
  {
    inputs: [
      { internalType: 'uint256', name: 'eventId', type: 'uint256' },
      { internalType: 'address', name: 'to', type: 'address' }
    ],
    name: 'transferEvent',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // Set EventChain contract address
  {
    inputs: [{ internalType: 'address', name: 'eventChainContractAddress', type: 'address' }],
    name: 'setEventChainAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'eventId', type: 'uint256' },
      { indexed: false, internalType: 'string', name: 'name', type: 'string' },
      { indexed: false, internalType: 'string', name: 'location', type: 'string' },
      { indexed: false, internalType: 'string', name: 'date', type: 'string' },
      { indexed: false, internalType: 'uint256', name: 'ticketPrice', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'organizer', type: 'address' }
    ],
    name: 'EventCreated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'eventId', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' }
    ],
    name: 'EventTransferred',
    type: 'event'
  }
] as const;

// Helper function to get contract addresses for current chain
export function getContractAddresses(chainId: number) {
  if (chainId === monadTestnet.id) {
    return CONTRACT_ADDRESSES[chainId];
  }
  return {
    EventChainContract: CONTRACT_ADDRESSES.EventChainContract,
    EventChainEventManagerContract: CONTRACT_ADDRESSES.EventChainEventManagerContract,
  };
}

// Helper to format MON/ETH amounts
export function formatMON(wei: bigint): string {
  return (Number(wei) / 1e18).toFixed(4);
}

// Helper to parse MON/ETH to wei
export function parseMON(mon: string): bigint {
  return BigInt(Math.floor(parseFloat(mon) * 1e18));
}

// Network info
export const NETWORK_INFO = {
  chainId: 10143,
  name: 'Monad Testnet',
  currency: 'MON',
  explorer: 'https://testnet.monadexplorer.com',
  rpcUrl: 'https://testnet-rpc.monad.xyz',
};
