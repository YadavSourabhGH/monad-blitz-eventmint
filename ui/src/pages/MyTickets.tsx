import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { Ticket, Calendar, MapPin, Download, Share2, Loader2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUserTickets } from "@/hooks/use-tickets";
import { useUserBlockchainTickets } from "@/hooks/use-blockchain-events";
import { useEventSubscription } from "@/hooks/use-events";
import { useAuth } from "@/contexts/AuthContext";
import { useAccount, useChainId } from 'wagmi';
import { Link } from "react-router-dom";
import { DottedSurface } from "@/components/ui/dotted-surface";

const MyTickets = () => {
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const { wallet } = useAuth();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const isMonadTestnet = chainId === 10143;

  // Only use blockchain tickets when connected to Monad Testnet
  const { tickets: blockchainTickets, ticketCount, isLoading: isLoadingBlockchain } = useUserBlockchainTickets(address);

  // Subscribe to real-time updates
  useEventSubscription();

  // Show blockchain tickets ONLY when connected to Monad
  const myTickets = isConnected && isMonadTestnet ? blockchainTickets : [];
  const isLoading = isConnected && isMonadTestnet ? isLoadingBlockchain : false;

  const handleDownloadTicket = (ticket: any) => {
    // Generate and download ticket as PDF or image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // Implementation would go here for PDF generation
    console.log('Downloading ticket:', ticket.id);
  };

  const handleShareTicket = (ticket: any) => {
    if (navigator.share) {
      navigator.share({
        title: `NFT Ticket for ${ticket.event?.title}`,
        text: `Check out my NFT ticket!`,
        url: `${window.location.origin}/event/${ticket.event_id}`,
      });
    }
  };

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
            You need to connect your wallet to view your NFT tickets.
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
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-white">
              Loading blockchain tickets from Monad Testnet...
            </span>
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
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
            My Tickets
          </h1>
          <p className="text-gray-400 text-lg">
            Your NFT event tickets collection
            {isConnected && isMonadTestnet && ticketCount > 0 && (
              <span className="ml-2 text-green-400">
                • {ticketCount} blockchain ticket{ticketCount !== 1 ? 's' : ''} on Monad
              </span>
            )}
            {isConnected && !isMonadTestnet && (
              <span className="ml-2 text-yellow-400">
                • Switch to Monad Testnet to view your tickets
              </span>
            )}
            {!isConnected && (
              <span className="ml-2 text-blue-400">
                • Connect wallet to get started
              </span>
            )}
          </p>
        </div>

        {myTickets.length === 0 ? (
          <Card className="glass p-12 text-center">
            <Ticket className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No Tickets Yet</h3>
            <p className="text-muted-foreground mb-6">
              {!isConnected 
                ? 'Connect your wallet to view and purchase NFT tickets'
                : !isMonadTestnet
                ? 'Switch to Monad Testnet to see your blockchain tickets'
                : 'Purchase your first NFT ticket from the marketplace to get started!'}
            </p>
            <div className="flex gap-4 justify-center">
              {isConnected && isMonadTestnet ? (
                <Link to="/marketplace">
                  <Button variant="gradient">
                    Browse Events
                  </Button>
                </Link>
              ) : (
                <>
                  {!isConnected && (
                    <Link to="/signup">
                      <Button variant="gradient">Connect Wallet</Button>
                    </Link>
                  )}
                  {isConnected && !isMonadTestnet && (
                    <Button 
                      variant="gradient"
                      onClick={async () => {
                        try {
                          await window.ethereum?.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: '0x279F' }], // 10143 in hex
                          });
                        } catch (error: any) {
                          if (error.code === 4902) {
                            // Network not added, add it
                            await window.ethereum?.request({
                              method: 'wallet_addEthereumChain',
                              params: [{
                                chainId: '0x279F',
                                chainName: 'Monad Testnet',
                                nativeCurrency: { name: 'MON', symbol: 'MON', decimals: 18 },
                                rpcUrls: ['https://testnet-rpc.monad.xyz'],
                                blockExplorerUrls: ['https://testnet.monadexplorer.com'],
                              }],
                            });
                          }
                        }
                      }}
                    >
                      Switch to Monad Testnet
                    </Button>
                  )}
                </>
              )}
            </div>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="group relative w-full h-[380px] transition-all duration-500"
              >
                {/* Skewed gradient panels - Subtle dark gradient */}
                <span
                  className="absolute top-0 left-[40px] w-1/2 h-full rounded-lg transform skew-x-[12deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[15px] group-hover:w-[calc(100%-70px)]"
                  style={{
                    background: 'linear-gradient(315deg, #1e293b, #334155)',
                  }}
                />
                <span
                  className="absolute top-0 left-[40px] w-1/2 h-full rounded-lg transform skew-x-[12deg] blur-[20px] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[15px] group-hover:w-[calc(100%-70px)]"
                  style={{
                    background: 'linear-gradient(315deg, #1e293b, #334155)',
                  }}
                />

                {/* Animated blurs */}
                <span className="pointer-events-none absolute inset-0 z-10">
                  <span className="absolute top-0 left-0 w-0 h-0 rounded-lg opacity-0 bg-white/10 backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-100 group-hover:top-[-50px] group-hover:left-[50px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100" />
                  <span className="absolute bottom-0 right-0 w-0 h-0 rounded-lg opacity-0 bg-white/10 backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-500 group-hover:bottom-[-50px] group-hover:right-[50px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100" />
                </span>

                {/* Content Card */}
                <div className="relative z-20 left-0 h-full bg-slate-900/80 backdrop-blur-[10px] shadow-lg rounded-lg text-white transition-all duration-500 group-hover:left-[-20px] overflow-hidden border border-slate-700/50">
                  {/* Image Section */}
                  <div className="relative h-40">
                    <img
                      src={ticket.event?.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'}
                      alt={ticket.event?.title || 'Event Ticket'}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800/90 backdrop-blur-md border border-slate-600/50">
                      NFT #{ticket.token_id}
                    </div>
                    {isConnected && isMonadTestnet && (
                      <div className="absolute top-2 left-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-500/90 text-white text-xs font-medium">
                          <span className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse"></span>
                          On-Chain
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-4 space-y-3">
                    <h3 className="text-lg font-bold text-white line-clamp-1">
                      {ticket.event?.title || 'Event Ticket'}
                    </h3>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {ticket.event?.date ? new Date(ticket.event.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        }) : 'Date TBD'}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span className="line-clamp-1">{ticket.event?.location || 'Location TBD'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <Ticket className="w-3.5 h-3.5 text-slate-400" />
                        Token ID: {ticket.token_id}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-slate-700/50">
                      <Button
                        variant="gradient"
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        View QR Code
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-slate-600/50 hover:bg-slate-800/50"
                        onClick={() => handleShareTicket(ticket)}
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-slate-600/50 hover:bg-slate-800/50"
                        onClick={() => handleDownloadTicket(ticket)}
                      >
                        <Download className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* QR Code Dialog */}
      <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
        <DialogContent className="glass border-border/50">
          <DialogHeader>
            <DialogTitle className="text-2xl">Ticket QR Code</DialogTitle>
            <DialogDescription>
              Show this QR code at the event entrance for verification
            </DialogDescription>
          </DialogHeader>

          {selectedTicket && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg mx-auto w-fit">
                <QRCodeSVG
                  value={`eventmint://verify/${selectedTicket.qr_code}`}
                  size={256}
                  level="H"
                  includeMargin
                />
              </div>

              <div className="glass p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Event:</span>
                  <span className="font-semibold">{selectedTicket.event?.title || 'Event Ticket'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-semibold">
                    {selectedTicket.event?.date ? new Date(selectedTicket.event.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }) : 'Date TBD'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-semibold">{selectedTicket.event?.location || 'Location TBD'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Token ID:</span>
                  <span className="font-mono text-sm">{selectedTicket.token_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">QR Code:</span>
                  <span className="font-mono text-sm truncate max-w-[200px]">{selectedTicket.qr_code}</span>
                </div>
              </div>

              <Button variant="gradient" className="w-full" onClick={() => handleDownloadTicket(selectedTicket)}>
                <Download className="w-4 h-4 mr-2" />
                Download QR Code
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyTickets;
