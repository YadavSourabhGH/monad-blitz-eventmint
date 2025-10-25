import { Navbar } from "@/components/Navbar";
import { EventCard } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Loader2 } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import { Link } from "react-router-dom";
import { useEvents } from "@/hooks/use-events";
import { useEventSubscription } from "@/hooks/use-events";
import Galaxy from "@/components/ui/Galaxy";
import { DottedSurface } from "@/components/ui/dotted-surface";

const Home = () => {
  // Use real events data with real-time updates
  const { data: allEvents = [], isLoading } = useEvents();

  // Subscribe to real-time updates
  useEventSubscription();

  // Get featured events (first 4 events)
  const featuredEvents = allEvents.slice(0, 4);

  // Debug logging
  console.log('Home - isLoading:', isLoading, 'allEvents:', allEvents, 'featuredEvents:', featuredEvents);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="ml-2">Loading events...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Galaxy Background */}
        <div className="absolute inset-0 z-0">
          <Galaxy
            mouseRepulsion={true}
            mouseInteraction={true}
            density={1.5}
            glowIntensity={0.8}
            saturation={1.0}
            hueShift={280}
            twinkleIntensity={0.5}
            rotationSpeed={0.03}
            speed={0.6}
            transparent={true}
          />
        </div>

        {/* Dark Gradient Overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-[1]" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm">Powered by Blockchain Technology</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Own Your Experience
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Buy, sell, and verify event tickets as NFTs. Secure, transparent, and truly yours.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/marketplace">
              <Button variant="gradient" size="xl" className="glow">
                Explore Events
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/create-event">
              <Button variant="glass" size="xl">
                Create Event
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sections with DottedSurface Background */}
      <div className="relative bg-black">
        {/* DottedSurface for all sections below hero */}
        <div className="absolute inset-0 z-0">
          <DottedSurface />
        </div>

        {/* Mixed Gradient Overlays for depth and visual interest */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          {/* Top gradient - Purple glow */}
          <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-radial from-primary/20 via-primary/5 to-transparent opacity-60" />
          
          {/* Middle gradient - Cyan accent */}
          <div className="absolute top-[400px] right-0 w-[800px] h-[800px] bg-gradient-radial from-accent/15 via-accent/5 to-transparent opacity-50 blur-3xl" />
          
          {/* Bottom gradient - Purple glow */}
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-primary/15 via-primary/5 to-transparent opacity-50 blur-3xl" />
          
          {/* Subtle diagonal gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-30" />
        </div>

        {/* Featured Events Section */}
        <section className="relative container mx-auto px-4 py-20 z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">Trending Events</h2>
            <p className="text-gray-400 text-lg">
              Discover the hottest events minting on the blockchain
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEvents.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-400">No events available yet</p>
                <Link to="/create-event">
                  <Button className="mt-4" variant="outline">
                    Create Your First Event
                  </Button>
                </Link>
              </div>
            ) : (
              featuredEvents.map((event) => (
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
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Link to="/marketplace">
              <Button variant="outline" size="lg">
                View All Events
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative container mx-auto px-4 py-20 z-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-2xl text-center hover:glow transition-all">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">NFT Tickets</h3>
              <p className="text-gray-400">
                Each ticket is a unique NFT stored securely on the blockchain
              </p>
            </div>

            <div className="glass p-8 rounded-2xl text-center hover:glow transition-all">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <ArrowRight className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Secure Trading</h3>
              <p className="text-gray-400">
                Buy and resell tickets safely with blockchain verification
              </p>
            </div>

            <div className="glass p-8 rounded-2xl text-center hover:glow transition-all">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">No Counterfeits</h3>
              <p className="text-gray-400">
                Every ticket is verifiable and impossible to counterfeit
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
