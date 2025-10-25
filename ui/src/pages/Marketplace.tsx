import { Navbar } from "@/components/Navbar";
import { EventCard } from "@/components/EventCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, SlidersHorizontal, Loader2, Ticket, Calendar, MapPin, Users, ExternalLink } from "lucide-react";
import { useEvents } from "@/hooks/use-events";
import { useEventSubscription } from "@/hooks/use-events";
import { useTotalEvents, useBlockchainEvent, usePurchaseTicket } from "@/hooks/use-blockchain-events";
import { useAccount, useChainId } from 'wagmi';
import { DottedSurface } from "@/components/ui/dotted-surface";
import { useState, useEffect } from "react";
import { CONTRACT_ADDRESSES } from '@/lib/contracts';
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Marketplace = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { toast } = useToast();
  const { totalEvents, isLoading: isLoadingTotal } = useTotalEvents();
  const [eventIds, setEventIds] = useState<number[]>([]);
  const isMonadTestnet = chainId === 10143;
  
  // Use real events data with real-time updates (mock data)
  const { data: mockEvents = [], isLoading: isLoadingMock } = useEvents();

  // Subscribe to real-time updates
  useEventSubscription();

  // Generate array of event IDs for blockchain events
  useEffect(() => {
    if (totalEvents > 0) {
      setEventIds(Array.from({ length: totalEvents }, (_, i) => i));
    }
  }, [totalEvents]);

  const isLoading = isLoadingTotal || isLoadingMock;

  if (isLoading) {
    return (
      <div className="min-h-screen pb-20 bg-black">
        <Navbar />
        <div className="container mx-auto px-4 pt-24">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2">Loading events...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-black">
      <Navbar />

      {/* Content with DottedSurface Background */}
      <div className="relative min-h-screen">
        {/* DottedSurface Background */}
        <div className="absolute inset-0 z-0">
          <DottedSurface />
        </div>

        <div className="container mx-auto px-4 pt-24 relative z-10">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
            Marketplace
          </h1>
          <p className="text-gray-400 text-lg">
            Browse and discover upcoming events with NFT tickets
          </p>
        </div>

        {/* Search and Filters */}
        <div className="glass p-6 rounded-xl mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                className="pl-10 glass border-border/50"
              />
            </div>
            <Button variant="glass" className="md:w-auto">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {isConnected && isMonadTestnet ? 'Blockchain Events' : 'All Events'}
          </h2>
          {isConnected && !isMonadTestnet && (
            <div className="text-sm text-yellow-400">
              ⚠️ Connect to Monad Testnet to see blockchain events
            </div>
          )}
        </div>

        {/* Blockchain Events (when connected to Monad) */}
        {isConnected && isMonadTestnet && eventIds.length > 0 ? (
          <>
            <div className="text-sm text-muted-foreground mb-4">
              Loading {eventIds.length} blockchain event{eventIds.length !== 1 ? 's' : ''}...
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventIds.map((eventId) => (
                <BlockchainEventCard key={eventId} eventId={eventId} />
              ))}
            </div>
          </>
        ) : isConnected && isMonadTestnet && totalEvents === 0 ? (
          <div className="text-center py-20 glass rounded-xl">
            <p className="text-muted-foreground text-lg mb-4">No blockchain events found</p>
            <p className="text-muted-foreground mb-6">Create your first event to get started!</p>
            <Link to="/create-event">
              <Button variant="gradient">
                <Ticket className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </Link>
          </div>
        ) : mockEvents.length === 0 ? (
          <div className="text-center py-20 glass rounded-xl">
            <p className="text-muted-foreground text-lg mb-4">No events found</p>
            <p className="text-muted-foreground mb-6">Connect MetaMask and switch to Monad Testnet to see blockchain events!</p>
            {!isConnected && (
              <Link to="/signup">
                <Button variant="gradient">Connect Wallet</Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                date={new Date(event.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                location={event.location}
                price={event.price.toString()}
                image={event.image_url}
                ticketsLeft={event.total_tickets - event.tickets_sold}
                totalTickets={event.total_tickets}
              />
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

// Blockchain Event Card Component
function BlockchainEventCard({ eventId }: { eventId: number }) {
  const { event, isLoading, error } = useBlockchainEvent(eventId);
  const { purchaseTicket, isPending, isConfirming } = usePurchaseTicket();
  const { toast } = useToast();
  const chainId = useChainId();
  const isMonadTestnet = chainId === 10143;

  const handleBuyTicket = async () => {
    if (!event || !isMonadTestnet) return;

    try {
      await purchaseTicket({
        eventId: event.id,
        ticketPrice: event.price,
      });
    } catch (error: any) {
      console.error('Purchase failed:', error);
    }
  };

  if (isLoading) {
    return null; // Don't show loading for individual cards
  }

  if (error || !event || !event.title || event.title === 'Untitled Event') {
    return null; // Don't show failed or empty events
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

export default Marketplace;
