import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { EVENT_TICKET_NFT_ABI, getContractAddress, parseMON } from '@/lib/contracts';
import { useToast } from './use-toast';

/**
 * Hook for creating events on Monad blockchain
 */
export function useCreateEventContract() {
  const { chainId } = useAccount();
  const { toast } = useToast();
  const { writeContractAsync, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const createEvent = async (eventData: {
    name: string;
    description: string;
    date: Date;
    location: string;
    ticketPrice: string; // in MON
    totalTickets: number;
    imageUrl: string;
  }) => {
    if (!chainId) {
      toast({
        title: 'Error',
        description: 'Please connect your wallet',
        variant: 'destructive',
      });
      return;
    }

    try {
      const contractAddress = getContractAddress(chainId);
      const dateTimestamp = BigInt(Math.floor(eventData.date.getTime() / 1000));
      const ticketPriceWei = parseMON(eventData.ticketPrice);

      const txHash = await writeContractAsync({
        address: contractAddress as `0x${string}`,
        abi: EVENT_TICKET_NFT_ABI,
        functionName: 'createEvent',
        args: [
          eventData.name,
          eventData.description,
          dateTimestamp,
          eventData.location,
          ticketPriceWei,
          BigInt(eventData.totalTickets),
          eventData.imageUrl,
        ],
      });

      toast({
        title: 'Event Created!',
        description: 'Your event has been created on Monad blockchain',
      });

      return txHash;
    } catch (error: any) {
      console.error('Error creating event:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create event',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return {
    createEvent,
    isPending: isPending || isConfirming,
    isSuccess,
    hash,
  };
}

/**
 * Hook for purchasing tickets (minting NFTs)
 */
export function usePurchaseTicket() {
  const { chainId } = useAccount();
  const { toast } = useToast();
  const { writeContractAsync, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const purchaseTicket = async (eventId: number, ticketPrice: string) => {
    if (!chainId) {
      toast({
        title: 'Error',
        description: 'Please connect your wallet',
        variant: 'destructive',
      });
      return;
    }

    try {
      const contractAddress = getContractAddress(chainId);
      const priceWei = parseMON(ticketPrice);
      
      // Generate token URI (you can customize this)
      const tokenURI = `ipfs://eventmint/ticket/${eventId}/${Date.now()}`;

      const txHash = await writeContractAsync({
        address: contractAddress as `0x${string}`,
        abi: EVENT_TICKET_NFT_ABI,
        functionName: 'purchaseTicket',
        args: [BigInt(eventId), tokenURI],
        value: priceWei,
      });

      toast({
        title: 'Ticket Purchased!',
        description: 'Your NFT ticket has been minted on Monad',
      });

      return txHash;
    } catch (error: any) {
      console.error('Error purchasing ticket:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to purchase ticket',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return {
    purchaseTicket,
    isPending: isPending || isConfirming,
    isSuccess,
    hash,
  };
}

/**
 * Hook for verifying tickets
 */
export function useVerifyTicket(ticketId: number | undefined) {
  const { chainId } = useAccount();

  const { data, isLoading, error } = useReadContract({
    address: chainId ? (getContractAddress(chainId) as `0x${string}`) : undefined,
    abi: EVENT_TICKET_NFT_ABI,
    functionName: 'verifyTicket',
    args: ticketId !== undefined ? [BigInt(ticketId)] : undefined,
    query: {
      enabled: !!chainId && ticketId !== undefined,
    },
  });

  return {
    isValid: data?.[0],
    owner: data?.[1],
    eventId: data?.[2] ? Number(data[2]) : undefined,
    isUsed: data?.[3],
    isLoading,
    error,
  };
}

/**
 * Hook for getting user's tickets
 */
export function useUserTickets(userAddress: string | undefined) {
  const { chainId } = useAccount();

  const { data, isLoading, error, refetch } = useReadContract({
    address: chainId ? (getContractAddress(chainId) as `0x${string}`) : undefined,
    abi: EVENT_TICKET_NFT_ABI,
    functionName: 'getUserTickets',
    args: userAddress ? [userAddress as `0x${string}`] : undefined,
    query: {
      enabled: !!chainId && !!userAddress,
    },
  });

  return {
    ticketIds: data ? data.map((id) => Number(id)) : [],
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook for getting event details from blockchain
 */
export function useEventDetails(eventId: number | undefined) {
  const { chainId } = useAccount();

  const { data, isLoading, error, refetch } = useReadContract({
    address: chainId ? (getContractAddress(chainId) as `0x${string}`) : undefined,
    abi: EVENT_TICKET_NFT_ABI,
    functionName: 'getEvent',
    args: eventId !== undefined ? [BigInt(eventId)] : undefined,
    query: {
      enabled: !!chainId && eventId !== undefined,
    },
  });

  return {
    event: data
      ? {
          name: data[0],
          description: data[1],
          date: new Date(Number(data[2]) * 1000),
          location: data[3],
          ticketPrice: data[4],
          totalTickets: Number(data[5]),
          ticketsSold: Number(data[6]),
          organizer: data[7],
          isActive: data[8],
          imageUrl: data[9],
        }
      : undefined,
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook for using/marking ticket as used
 */
export function useTicketEntry() {
  const { chainId } = useAccount();
  const { toast } = useToast();
  const { writeContractAsync, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const markTicketUsed = async (ticketId: number) => {
    if (!chainId) {
      toast({
        title: 'Error',
        description: 'Please connect your wallet',
        variant: 'destructive',
      });
      return;
    }

    try {
      const contractAddress = getContractAddress(chainId);

      const txHash = await writeContractAsync({
        address: contractAddress as `0x${string}`,
        abi: EVENT_TICKET_NFT_ABI,
        functionName: 'useTicket',
        args: [BigInt(ticketId)],
      });

      toast({
        title: 'Ticket Verified!',
        description: 'Ticket has been marked as used',
      });

      return txHash;
    } catch (error: any) {
      console.error('Error marking ticket as used:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to verify ticket',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return {
    markTicketUsed,
    isPending: isPending || isConfirming,
    isSuccess,
    hash,
  };
}
