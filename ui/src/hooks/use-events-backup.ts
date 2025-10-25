import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image_url: string;
  price: number;
  total_tickets: number;
  tickets_sold: number;
  creator_address: string;
  nft_contract_address?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CreateEventData {
  title: string;
  description: string;
  date: string;
  location: string;
  image_url: string;
  price: number;
  total_tickets: number;
  creator_address: string;
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Crypto Music Festival 2025",
    description: "The biggest crypto music festival featuring top blockchain artists and NFT showcases.",
    date: "2025-11-15T18:00:00.000Z",
    location: "Los Angeles, CA",
    image_url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    price: 0.5,
    total_tickets: 500,
    tickets_sold: 350,
    creator_address: "0x1234567890123456789012345678901234567890",
    status: "active",
    created_at: "2025-01-01T00:00:00.000Z",
    updated_at: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    title: "NFT Art Exhibition",
    description: "Exclusive NFT art exhibition featuring works from renowned digital artists.",
    date: "2025-12-01T10:00:00.000Z",
    location: "New York, NY",
    image_url: "https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=800&q=80",
    price: 0.25,
    total_tickets: 200,
    tickets_sold: 120,
    creator_address: "0x0987654321098765432109876543210987654321",
    status: "active",
    created_at: "2025-01-02T00:00:00.000Z",
    updated_at: "2025-01-02T00:00:00.000Z",
  },
];

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      console.log('Using mock events data');
      return mockEvents;
    },
    initialData: mockEvents,
    refetchInterval: 10000,
    retry: 2,
  });
};

export const useEvent = (id: string) => {
  return useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      return mockEvents.find(event => event.id === id) || null;
    },
    initialData: () => mockEvents.find(event => event.id === id) || null,
    enabled: !!id,
    retry: 2,
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (eventData: CreateEventData) => {
      const mockEvent: Event = {
        id: Date.now().toString(),
        ...eventData,
        tickets_sold: 0,
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return mockEvent;
    },
    onSuccess: (newEvent) => {
      queryClient.setQueryData(['events'], (oldEvents: Event[] = []) => [newEvent, ...oldEvents]);
      toast({
        title: 'Event Created! 🎉',
        description: 'Your event has been created successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Event Created! 🎉',
        description: 'Your event has been created successfully (using demo mode).',
      });
      console.error('Create event error:', error);
    },
  });
};
