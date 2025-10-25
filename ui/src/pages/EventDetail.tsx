import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Ticket, Users, Share2, Heart, Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useEvent } from "@/hooks/use-events";
import { usePurchaseTicket } from "@/hooks/use-events";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { DottedSurface } from "@/components/ui/dotted-surface";

const EventDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const purchaseTicketMutation = usePurchaseTicket();
  const { wallet } = useAuth();

  // Use real event data
  const { data: event, isLoading, error } = useEvent(id!);

  // Redirect to signup if wallet not connected
  if (!wallet.isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-black">
        {/* DottedSurface Background */}
        <div className="fixed inset-0 z-0">
          <DottedSurface />
        </div>

        <Card className="glass p-8 max-w-md w-full text-center relative z-10">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Ticket className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-white">Connect Your Wallet</h1>
          <p className="text-gray-400 mb-8">
            You need to connect your wallet to purchase NFT tickets.
          </p>
          <Link to="/signup">
            <Button variant="gradient" size="lg" className="w-full">
              <Ticket className="w-5 h-5 mr-2" />
              Go to Signup
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const handleMintTicket = async () => {
    if (!event || !wallet.address) return;

    try {
      await purchaseTicketMutation.mutateAsync({
        eventId: event.id,
      });
    } catch (error) {
      // Error is handled in the mutation
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pb-20 bg-black">
        <Navbar />
        
        {/* DottedSurface Background */}
        <div className="fixed inset-0 z-0">
          <DottedSurface />
        </div>

        <div className="container mx-auto px-4 pt-24 relative z-10">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
            <span className="ml-2 text-white">Loading event...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen pb-20 bg-black">
        <Navbar />
        
        {/* DottedSurface Background */}
        <div className="fixed inset-0 z-0">
          <DottedSurface />
        </div>

        <div className="container mx-auto px-4 pt-24 relative z-10">
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">Event not found</p>
            <Button onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-black">
      <Navbar />

      {/* DottedSurface Background */}
      <div className="fixed inset-0 z-0">
        <DottedSurface />
      </div>

      <div className="container mx-auto px-4 pt-24 relative z-10">
        {/* Hero Image */}
        <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
          <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute top-4 right-4 flex gap-2">
            <Button variant="glass" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="glass" size="icon">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{event.title}</h1>
              <p className="text-lg text-gray-400">Organized by Event Creator</p>
            </div>

            <Card className="glass p-6">
              <h2 className="text-2xl font-bold mb-4">About This Event</h2>
              <p className="text-muted-foreground leading-relaxed">{event.description}</p>
            </Card>

            <Card className="glass p-6">
              <h2 className="text-2xl font-bold mb-4">Ticket Benefits</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Ticket className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">Unique NFT ticket with blockchain verification</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Ticket className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">Access to exclusive event content and future drops</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Ticket className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">Resell your ticket on the marketplace</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="glass p-6 space-y-6">
              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-primary">{event.price}</span>
                  <span className="text-muted-foreground">MON</span>
                </div>
                <p className="text-sm text-muted-foreground">per ticket</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span className="text-sm">Date</span>
                  </div>
                  <span className="text-sm font-semibold">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="text-sm">Location</span>
                  </div>
                  <span className="text-sm font-semibold">{event.location}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-accent" />
                    <span className="text-sm">Tickets Left</span>
                  </div>
                  <span className="text-sm font-semibold">
                    {event.total_tickets - event.tickets_sold} / {event.total_tickets}
                  </span>
                </div>
              </div>

              <Button
                variant="gradient"
                size="lg"
                className="w-full glow"
                onClick={handleMintTicket}
                disabled={purchaseTicketMutation.isPending || (event.total_tickets - event.tickets_sold) === 0}
              >
                {purchaseTicketMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Purchasing...
                  </>
                ) : (event.total_tickets - event.tickets_sold) === 0 ? (
                  'Sold Out'
                ) : (
                  'Purchase NFT Ticket'
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                This will mint an NFT ticket to your wallet
              </p>
            </Card>

            <Card className="glass p-6">
              <h3 className="font-semibold mb-3">Smart Contract</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network:</span>
                  <span className="font-mono">Polygon</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Standard:</span>
                  <span className="font-mono">ERC-721</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contract:</span>
                  <span className="font-mono text-xs">0x1a2b...</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
