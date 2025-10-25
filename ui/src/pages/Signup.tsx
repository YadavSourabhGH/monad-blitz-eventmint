import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Wallet, User, Mail, Image as ImageIcon, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { wallet, connectWallet, signup, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
    profileImage: '',
  });

  const [step, setStep] = useState<'connect' | 'details' | 'complete'>('connect');

  useEffect(() => {
    if (wallet.isConnected && !wallet.isConnecting) {
      setStep('details');
    }
  }, [wallet.isConnected, wallet.isConnecting]);

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      toast({
        title: 'Connection Failed',
        description: 'Failed to connect wallet. Please make sure MetaMask is installed and try again.',
        variant: 'destructive',
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!wallet.isConnected || !wallet.address) {
      toast({
        title: 'Wallet Required',
        description: 'Please connect your wallet first.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await signup(formData);
      setStep('complete');

      toast({
        title: 'Welcome to EventMint!',
        description: 'Your account has been created successfully.',
      });

      // Redirect to home after a short delay
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      toast({
        title: 'Signup Failed',
        description: 'There was an error creating your account. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (step === 'connect') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="glass p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Wallet className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-3xl font-bold mb-4">Join EventMint</h1>
          <p className="text-muted-foreground mb-8">
            Connect your wallet to get started with NFT event tickets
          </p>

          <div className="space-y-4">
            <Button
              onClick={handleConnectWallet}
              disabled={isLoading}
              className="w-full"
              size="lg"
              variant="gradient"
            >
              {isLoading ? (
                'Connecting...'
              ) : (
                <>
                  <Wallet className="w-5 h-5 mr-2" />
                  Connect MetaMask
                </>
              )}
            </Button>

            <div className="text-sm text-muted-foreground">
              <p>By connecting, you agree to our Terms of Service and Privacy Policy.</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/" className="text-primary hover:underline">
                Go to Home
              </Link>
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (step === 'complete') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="glass p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-3xl font-bold mb-4">Welcome to EventMint!</h1>
          <p className="text-muted-foreground mb-6">
            Your account has been created successfully. Redirecting you to the home page...
          </p>

          <div className="space-y-4">
            <div className="glass p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Wallet Address</span>
                <span className="text-xs text-muted-foreground font-mono">
                  {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
                </span>
              </div>
              {formData.username && (
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Username</span>
                  <span className="text-sm text-muted-foreground">@{formData.username}</span>
                </div>
              )}
              {formData.email && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Email</span>
                  <span className="text-sm text-muted-foreground">{formData.email}</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="glass p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground">
            Connected: {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleInputChange}
              className="glass"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className="glass"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio (Optional)</Label>
            <Textarea
              id="bio"
              name="bio"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={handleInputChange}
              className="glass resize-none"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profileImage">Profile Image URL (Optional)</Label>
            <Input
              id="profileImage"
              name="profileImage"
              type="url"
              placeholder="https://example.com/profile.jpg"
              value={formData.profileImage}
              onChange={handleInputChange}
              className="glass"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
            size="lg"
            variant="gradient"
          >
            {isLoading ? (
              'Creating Account...'
            ) : (
              <>
                Complete Signup
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-border/50 text-center">
          <Button
            variant="ghost"
            onClick={handleConnectWallet}
            className="text-muted-foreground hover:text-foreground"
          >
            <Wallet className="w-4 h-4 mr-2" />
            Change Wallet
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
