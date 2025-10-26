import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wallet, LogIn, CheckCircle2, AlertCircle } from "lucide-react";
import { DottedSurface } from "@/components/ui/dotted-surface";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { address, isConnected } = useAccount();
  const { connect, isPending: isConnecting } = useConnect();
  const [isCheckingUser, setIsCheckingUser] = useState(false);

  // Check if user is already connected
  useEffect(() => {
    if (isConnected && address) {
      checkUserExists();
    }
  }, [isConnected, address]);

  // Check if user exists in localStorage
  const checkUserExists = () => {
    setIsCheckingUser(true);
    
    try {
      const userData = localStorage.getItem('eventmint_user');
      
      if (userData) {
        const user = JSON.parse(userData);
        
        // Check if the connected wallet matches the stored user
        if (user.walletAddress?.toLowerCase() === address?.toLowerCase()) {
          toast({
            title: "Welcome Back! 👋",
            description: `Hi ${user.fullName || 'there'}! Redirecting you...`,
          });
          
          setTimeout(() => {
            navigate('/');
          }, 1500);
        } else {
          toast({
            title: "Account Not Found",
            description: "No account found for this wallet. Please sign up first.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Account Not Found",
          description: "No account found for this wallet. Please sign up first.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check user account.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingUser(false);
    }
  };

  // Handle MetaMask Connection
  const handleConnectWallet = async () => {
    try {
      connect({ connector: injected() });
    } catch (error: any) {
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      {/* DottedSurface Background */}
      <div className="fixed inset-0 z-0">
        <DottedSurface />
      </div>

      <Card className="glass p-8 max-w-md w-full relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-white">Welcome Back</h1>
          <p className="text-gray-400">
            Login with your MetaMask wallet
          </p>
        </div>

        {/* Not Connected State */}
        {!isConnected && (
          <div className="space-y-6">
            {/* Info Box */}
            <div className="glass p-6 rounded-lg border border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Wallet className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Quick & Secure Login</h3>
                  <p className="text-sm text-gray-400">
                    Simply connect your MetaMask wallet to access your account. No passwords required!
                  </p>
                </div>
              </div>
            </div>

            {/* Connect Button */}
            <Button
              variant="gradient"
              size="lg"
              className="w-full"
              onClick={handleConnectWallet}
              disabled={isConnecting}
            >
              {isConnecting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="w-5 h-5 mr-2" />
                  Login with MetaMask
                </>
              )}
            </Button>

            {/* Features List */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-300">Secure blockchain authentication</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-300">No password needed</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-300">Access your NFT tickets instantly</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center pt-4 border-t border-border/50">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline font-semibold">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* Connected - Checking User */}
        {isConnected && isCheckingUser && (
          <div className="space-y-6">
            <div className="glass p-6 rounded-lg border border-green-500/50">
              <div className="flex items-center gap-3 text-green-400 mb-4">
                <Wallet className="w-5 h-5" />
                <span className="font-semibold">Wallet Connected</span>
              </div>
              <p className="text-sm text-gray-400 font-mono break-all mb-4">
                {address}
              </p>
              <div className="flex items-center justify-center gap-2 text-primary">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Verifying account...</span>
              </div>
            </div>
          </div>
        )}

        {/* Connected - User Not Found */}
        {isConnected && !isCheckingUser && (
          <div className="space-y-6">
            <div className="glass p-6 rounded-lg border border-yellow-500/50">
              <div className="flex items-center gap-3 text-yellow-400 mb-4">
                <AlertCircle className="w-5 h-5" />
                <span className="font-semibold">Account Not Found</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                No account is associated with this wallet address. Would you like to create a new account?
              </p>
              <div className="flex flex-col gap-3">
                <Link to="/signup" className="w-full">
                  <Button variant="gradient" size="lg" className="w-full">
                    Create New Account
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.reload()}
                >
                  Try Different Wallet
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-6 pt-6 border-t border-border/50">
          <p className="text-xs text-center text-gray-500">
            Make sure you're connected to <span className="text-primary font-semibold">Monad Testnet</span> for the best experience
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
