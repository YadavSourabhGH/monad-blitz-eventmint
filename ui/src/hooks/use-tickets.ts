import { useQuery } from '@tanstack/react-query';

export interface UserTicket {
  id: string;
  event_id: string;
  token_id: number;
  owner_address: string;
  price_paid: number;
  qr_code: string;
  status: string;
  created_at: string;
  updated_at: string;
  event?: {
    title: string;
    description: string;
    date: string;
    location: string;
    image_url: string;
  };
}

// Mock tickets for demo when database is not available
const mockTickets: UserTicket[] = [
  {
    id: "ticket-1",
    event_id: "1",
    token_id: 123,
    owner_address: "0x1234567890123456789012345678901234567890",
    price_paid: 0.5,
    qr_code: "abc123def456",
    status: "valid",
    created_at: "2025-01-15T10:30:00.000Z",
    updated_at: "2025-01-15T10:30:00.000Z",
    event: {
      title: "Crypto Music Festival 2025",
      description: "The biggest crypto music festival featuring top blockchain artists and NFT showcases.",
      date: "2025-11-15T18:00:00.000Z",
      location: "Los Angeles, CA",
      image_url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    },
  },
  {
    id: "ticket-2",
    event_id: "3",
    token_id: 456,
    owner_address: "0x1234567890123456789012345678901234567890",
    price_paid: 0.3,
    qr_code: "xyz789uvw012",
    status: "valid",
    created_at: "2025-01-20T14:15:00.000Z",
    updated_at: "2025-01-20T14:15:00.000Z",
    event: {
      title: "Web3 Developer Conference",
      description: "Annual conference for Web3 developers, featuring talks on blockchain, DeFi, and NFTs.",
      date: "2026-01-10T09:00:00.000Z",
      location: "San Francisco, CA",
      image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    },
  },
  {
    id: "ticket-3",
    event_id: "2",
    token_id: 789,
    owner_address: "0x1234567890123456789012345678901234567890",
    price_paid: 0.8,
    qr_code: "nft456event789",
    status: "valid",
    created_at: "2025-01-25T16:45:00.000Z",
    updated_at: "2025-01-25T16:45:00.000Z",
    event: {
      title: "NFT Art Exhibition",
      description: "Exclusive exhibition featuring the world's most valuable NFT artworks and digital collectibles.",
      date: "2025-12-01T10:00:00.000Z",
      location: "New York, NY",
      image_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    },
  },
];

// Hook to fetch user's tickets with fallback to mock data
export const useUserTickets = (walletAddress?: string) => {
  return useQuery({
    queryKey: ['user-tickets', walletAddress],
    queryFn: async () => {
      if (!walletAddress) return [];

      // For demo purposes, show tickets for connected wallet (any wallet will see tickets)
      return mockTickets.filter(ticket =>
        ticket.owner_address === walletAddress ||
        ticket.owner_address === '0x1234567890123456789012345678901234567890' // Fallback for demo
      );
    },
    initialData: () => {
      if (!walletAddress) return [];
      return mockTickets.filter(ticket =>
        ticket.owner_address === walletAddress ||
        ticket.owner_address === '0x1234567890123456789012345678901234567890' // Fallback for demo
      );
    }, // Show data immediately
    enabled: !!walletAddress,
    retry: 2,
  });
};

// Hook to fetch ticket purchase history with fallback
export const useTicketHistory = (ticketId?: string) => {
  return useQuery({
    queryKey: ['ticket-history', ticketId],
    queryFn: async () => {
      if (!ticketId) return [];

      // For demo purposes, return empty array since database is not set up
      return []; // Return empty array for mock data
    },
    enabled: !!ticketId,
    retry: 2,
  });
};
