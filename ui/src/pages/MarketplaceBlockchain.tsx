import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Ticket, Calendar, MapPin, Users, ExternalLink } from "lucide-react";
import { useTotalEvents, useBlockchainEvent, usePurchaseTicket } from "@/hooks/use-blockchain-events";
import { useAccount, useChainId } from 'wagmi';
import { DottedSurface } from "@/components/ui/dotted-surface";
import { useState, useEffect } from "react";
import { CONTRACT_ADDRESSES } from '@/lib/contracts';
import { useToast } from "@/hooks/use-toast";

/**
 * EXAMPLE: Marketplace showing REAL blockchain events
 * This demonstrates how to integrate real blockchain data
 */
const MarketplaceBlockchain = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { totalEvents, isLoading: isLoadingTotal } = useTotalEvents();
  const [eventIds, setEventIds] = useState<number[]>([]);
  const isMonadTestnet = chainId === 10143;

  // Generate array of event IDs once we know the total
  useEffect(() => {
    if (totalEvents > 0) {
      setEventIds(Array.from({ length: totalEvents }, (_, i) => i));
    }
  }, [totalEvents]);

  if (!isConnected) {
    return (
      <div className="min-h-screen pb-20 bg-black">
        <Navbar />
        <div className="container mx-auto px-4 pt-24">
          <Card className="glass p-8 max-w-md mx-auto text-center">
            <Ticket className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
            <p className="text-muted-foreground">
              Connect your wallet to view events from Monad blockchain
            </p>
          </Card>
        </div>
      </div>
    );
  }

  if (isLoadingTotal) {
    return (
      <div className="min-h-screen pb-20 bg-black">
        <Navbar />
        <div className="container mx-auto px-4 pt-24">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin mr-2" />
            <span>Loading events from blockchain...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-black">
      <Navbar />

      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <DottedSurface />
        </div>

        <div className="container mx-auto px-4 pt-24 relative z-10">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
              Blockchain Marketplace
            </h1>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Live from Monad Testnet
              </span>
              <span className="text-gray-400">
                {totalEvents} events found on blockchain
              </span>
              {!isMonadTestnet && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm">
                  ⚠️ Wrong Network - Switch to Monad Testnet
                </span>
              )}
            </div>
          </div>

          {totalEvents === 0 ? (
            <Card className="glass p-12 text-center">
              <Ticket className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-bold mb-2">No Events Yet</h3>
              <p className="text-muted-foreground mb-6">
                Be the first to create an event on the blockchain!
              </p>
              <Button variant="gradient" asChild>
                <a href="/create-event">Create First Event</a>
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventIds.map(eventId => (
                <BlockchainEventCard key={eventId} eventId={eventId} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Component to display a single blockchain event
 */
function BlockchainEventCard({ eventId }: { eventId: number }) {
  const { event, isLoading, error } = useBlockchainEvent(eventId);
  const { purchaseTicket, isPending, isConfirming } = usePurchaseTicket();
  const { toast } = useToast();
  const chainId = useChainId();
  const isMonadTestnet = chainId === 10143;

  const handleBuyTicket = async () => {
    if (!isMonadTestnet) {
      toast({
        title: "Wrong Network",
        description: "Please switch to Monad Testnet (Chain ID: 10143) in MetaMask",
        variant: "destructive",
      });
      return;
    }

    if (!event) return;

    try {
      await purchaseTicket({
        eventId: event.id,
        ticketPrice: event.price,
      });
    } catch (error: any) {
      console.error('Purchase failed:', error);
      // Error toast is already shown in the hook
    }
  };

  if (isLoading) {
    return (
      <Card className="glass p-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      </Card>
    );
  }

  if (error || !event) {
    return (
      <Card className="glass p-6">
        <p className="text-red-400">Failed to load event #{eventId}</p>
      </Card>
    );
  }

  const ticketsLeft = event.total_tickets - event.tickets_sold;
  const percentageSold = (event.tickets_sold / event.total_tickets) * 100;

  return (
    <Card className="glass overflow-hidden hover:border-primary/50 transition-all">
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        {event.image_url ? (
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Ticket className="w-16 h-16 text-muted-foreground" />
          </div>
        )}
        
        {/* Blockchain Badge */}
        <div className="absolute top-2 right-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-500/90 text-white text-xs font-medium">
            <span className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse"></span>
            On-Chain
          </span>
        </div>
      </div>

      {/* Event Details */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold line-clamp-1">{event.title}</h3>
          <span className="text-sm text-muted-foreground">#{eventId}</span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>
              {event.tickets_sold} / {event.total_tickets} sold
              {event.redeemed_tickets > 0 && ` (${event.redeemed_tickets} redeemed)`}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all"
              style={{ width: `${percentageSold}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {ticketsLeft} tickets left
          </p>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary">{event.price} MON</p>
            {event.creator_address && (
              <p className="text-xs text-muted-foreground">
                Created by {event.creator_address.slice(0, 6)}...{event.creator_address.slice(-4)}
              </p>
            )}
          </div>
          <Button
            variant="gradient"
            size="sm"
            disabled={ticketsLeft === 0 || isPending || isConfirming || !isMonadTestnet}
            onClick={handleBuyTicket}
          >
            {isPending || isConfirming ? (
              <>
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                {isPending ? "Confirm..." : "Buying..."}
              </>
            ) : ticketsLeft === 0 ? (
              "Sold Out"
            ) : !isMonadTestnet ? (
              "Wrong Network"
            ) : (
              "Buy Ticket"
            )}
          </Button>
        </div>

        {/* Blockchain Link */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <a
            href={`https://testnet.monadexplorer.com/address/${CONTRACT_ADDRESSES.EventChainEventManagerContract}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            <ExternalLink className="w-3 h-3" />
            View on Monad Explorer
          </a>
        </div>
      </div>
    </Card>
  );
}

export default MarketplaceBlockchain;
