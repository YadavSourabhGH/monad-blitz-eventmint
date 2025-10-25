import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Image as ImageIcon, MapPin, Ticket, DollarSign, Upload, Link as LinkIcon, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCreateBlockchainEvent } from "@/hooks/use-blockchain-events";
import { useNavigate, Link } from "react-router-dom";
import { useAccount, useChainId } from "wagmi";
import { DottedSurface } from "@/components/ui/dotted-surface";

const CreateEvent = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { createEvent, isPending, isConfirming, isSuccess, hash } = useCreateBlockchainEvent();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const [imageInputType, setImageInputType] = useState<'url' | 'file'>('url');
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Redirect to signup if wallet not connected
  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="glass p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Ticket className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
          <p className="text-muted-foreground mb-8">
            You need to connect MetaMask to create events and mint NFT tickets on Monad Testnet.
          </p>
          <Link to="/signup">
            <Button variant="gradient" size="lg" className="w-full">
              <Ticket className="w-5 h-5 mr-2" />
              Connect MetaMask
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  // Check if on Monad Testnet
  const isMonadTestnet = chainId === 10143;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!isMonadTestnet) {
      toast({
        title: "Wrong Network",
        description: "Please switch to Monad Testnet (Chain ID: 10143) in MetaMask",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData(e.currentTarget);

    const eventData = {
      name: formData.get('title') as string,
      location: formData.get('location') as string,
      date: formData.get('date') as string,
      ticketPrice: formData.get('price') as string,
      imageUrl: imagePreview || 'https://via.placeholder.com/400x300?text=Event+Image',
      totalTickets: parseInt(formData.get('supply') as string),
    };

    try {
      await createEvent(eventData);
      toast({
        title: "Success! 🎉",
        description: "Event created on blockchain. Redirecting to marketplace...",
      });
      setTimeout(() => {
        navigate('/marketplace');
      }, 2000);
    } catch (error: any) {
      console.error('Event creation error:', error);
      // Error toast is already shown in the hook
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImagePreview(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageTypeSwitch = (type: 'url' | 'file') => {
    setImageInputType(type);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-black">
      <Navbar />

      {/* Content with DottedSurface Background */}
      <div className="relative min-h-screen">
        {/* DottedSurface Background */}
        <div className="absolute inset-0 z-0">
          <DottedSurface />
        </div>

        <div className="container mx-auto px-4 pt-24 relative z-10 max-w-3xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
            Create Event
          </h1>
          <p className="text-gray-400 text-lg">
            Mint NFT tickets for your event on the blockchain
          </p>
        </div>

        <Card className="glass p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base">
                Event Name
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Crypto Music Festival 2025"
                required
                className="glass"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-base">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Tell attendees about your event..."
                rows={4}
                className="glass resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-base flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-accent" />
                  Event Date
                </Label>
                <Input id="date" name="date" type="datetime-local" required className="glass" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-base flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  Location
                </Label>
                <Input id="location" name="location" placeholder="Los Angeles, CA" required className="glass" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image" className="text-base flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-accent" />
                Event Image
              </Label>

              {/* Image Input Type Toggle */}
              <div className="flex gap-2 mb-4">
                <Button
                  type="button"
                  variant={imageInputType === 'url' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleImageTypeSwitch('url')}
                  className="flex items-center gap-2"
                >
                  <LinkIcon className="w-4 h-4" />
                  URL
                </Button>
                <Button
                  type="button"
                  variant={imageInputType === 'file' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleImageTypeSwitch('file')}
                  className="flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload
                </Button>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mb-4">
                  <img
                    src={imagePreview}
                    alt="Event preview"
                    className="w-full max-w-md h-48 object-cover rounded-lg border"
                  />
                </div>
              )}

              {/* URL Input */}
              {imageInputType === 'url' && (
                <Input
                  id="image"
                  name="image_url"
                  type="url"
                  placeholder="https://example.com/event-image.jpg"
                  value={imagePreview}
                  onChange={handleImageUrlChange}
                  required
                  className="glass"
                />
              )}

              {/* File Input */}
              {imageInputType === 'file' && (
                <div className="space-y-2">
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    required
                    className="glass"
                  />
                  <p className="text-sm text-muted-foreground">
                    Upload an image from your device (JPG, PNG, GIF up to 5MB)
                  </p>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-base flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-accent" />
                  Ticket Price (MON)
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.001"
                  placeholder="0.05"
                  min="0"
                  required
                  className="glass"
                />
                <p className="text-sm text-muted-foreground">
                  💡 Recommended: 0.01 - 0.1 MON for testing
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supply" className="text-base flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-accent" />
                  Total Tickets
                </Label>
                <Input
                  id="supply"
                  name="supply"
                  type="number"
                  placeholder="100"
                  min="1"
                  required
                  className="glass"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-border/50">
              {/* Network Warning */}
              {!isMonadTestnet && (
                <div className="glass p-4 rounded-lg mb-6 border-2 border-yellow-500/50">
                  <h3 className="font-semibold mb-2 text-yellow-400">⚠️ Wrong Network</h3>
                  <p className="text-sm text-muted-foreground">
                    Please switch to Monad Testnet in MetaMask to create events.
                  </p>
                </div>
              )}

              <div className="glass p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">🔗 Transaction Details</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Gas Fee (estimated):</span>
                    <span>~0.001 MON</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Smart Contract:</span>
                    <span className="font-mono text-xs">EventManager</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Network:</span>
                    <span className={isMonadTestnet ? "text-green-400" : "text-yellow-400"}>
                      {isMonadTestnet ? "✅ Monad Testnet" : "⚠️ Wrong Network"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wallet:</span>
                    <span className="font-mono text-xs">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                  </div>
                  {hash && (
                    <div className="flex justify-between pt-2 border-t border-border/50">
                      <span>Transaction:</span>
                      <a 
                        href={`https://testnet.monadexplorer.com/tx/${hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-accent hover:underline"
                      >
                        {hash.slice(0, 6)}...{hash.slice(-4)}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full glow"
                disabled={isPending || isConfirming || !isMonadTestnet}
              >
                {isPending || isConfirming ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {isPending ? "Confirm in MetaMask..." : "Creating on Blockchain..."}
                  </>
                ) : (
                  "Create Event & Mint NFTs on Monad"
                )}
              </Button>
              
              {isSuccess && (
                <div className="mt-4 p-4 bg-green-500/10 border border-green-500/50 rounded-lg">
                  <p className="text-green-400 text-sm text-center">
                    ✅ Event created successfully! Redirecting...
                  </p>
                </div>
              )}
            </div>
          </form>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
