import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Wallet, Ticket, Plus, Home, ShoppingCart, User, LogOut, Copy, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { AnimeNavBar } from "./ui/anime-navbar";
import { Logo } from "./ui/logo";
import { useState } from "react";

const navItems = [
  {
    name: "Home",
    url: "/",
    icon: Home,
  },
  {
    name: "My Tickets",
    url: "/my-tickets",
    icon: Ticket,
  },
  {
    name: "Marketplace",
    url: "/marketplace",
    icon: ShoppingCart,
  },
  {
    name: "Create Event",
    url: "/create-event",
    icon: Plus,
  },
];

export const Navbar = () => {
  const { user, wallet, connectWallet, disconnectWallet } = useAuth();
  const [copied, setCopied] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const copyAddress = () => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {/* Anime Navigation Bar */}
      <AnimeNavBar items={navItems} defaultActive="Home" />

      {/* Top Bar with Logo and Wallet */}
      <nav className="fixed top-0 w-full z-[9998] backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo Section with Enhanced Styling */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Logo className="w-12 h-12 transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight">
                  <span className="text-[#7C3AED]">Event</span>
                  <span className="text-[#00D4FF]">Mint</span>
                </span>
                <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">
                  NFT Ticketing
                </span>
              </div>
            </Link>

            {/* Wallet Section with Enhanced Styling */}
            <div className="flex items-center gap-3">
              {wallet.isConnected ? (
                <div className="flex items-center gap-2">
                  {/* Wallet Address Display */}
                  <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 backdrop-blur-sm">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <Wallet className="w-4 h-4 text-primary" />
                    <span className="text-sm font-mono font-semibold text-white">
                      {formatAddress(wallet.address!)}
                    </span>
                    <button
                      onClick={copyAddress}
                      className="ml-1 p-1 hover:bg-white/10 rounded transition-colors"
                      title="Copy address"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-gray-400 hover:text-white" />
                      )}
                    </button>
                  </div>

                  {/* Disconnect Button */}
                  <Button
                    variant="outline"
                    size="default"
                    onClick={disconnectWallet}
                    className="hidden sm:flex items-center gap-2 border-red-500/20 hover:border-red-500/40 hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Disconnect
                  </Button>

                  {/* Mobile: Just wallet icon */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="sm:hidden border-primary/20"
                  >
                    <Wallet className="w-4 h-4 text-primary" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/signup" className="hidden sm:block">
                    <Button 
                      variant="outline" 
                      size="default"
                      className="border-white/10 hover:border-white/20 hover:bg-white/5"
                    >
                      <User className="w-4 h-4" />
                      Sign Up
                    </Button>
                  </Link>
                  <Button 
                    variant="gradient" 
                    size="default" 
                    onClick={connectWallet} 
                    disabled={wallet.isConnecting}
                    className="relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Wallet className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">
                      {wallet.isConnecting ? 'Connecting...' : 'Connect Wallet'}
                    </span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
