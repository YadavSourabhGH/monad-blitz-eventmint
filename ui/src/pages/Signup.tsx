import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wallet, UserCheck, Mail, Phone, User, Shield } from "lucide-react";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { Checkbox } from "@/components/ui/checkbox";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { address, isConnected } = useAccount();
  const { connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();

  const [step, setStep] = useState<'connect' | 'kyc'>('connect');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // KYC Form Data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle MetaMask Connection
  const handleConnectWallet = async () => {
    try {
      connect({ connector: injected() });
      toast({
        title: "Wallet Connected! 🎉",
        description: "Please complete KYC verification to continue.",
      });
      setStep('kyc');
    } catch (error: any) {
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      });
    }
  };

  // Validate Form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number format";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle KYC Submission
  const handleKYCSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call to save user data
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Store user data in localStorage (in production, this would be saved to backend)
      const userData = {
        ...formData,
        walletAddress: address,
        kycCompleted: true,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem('eventmint_user', JSON.stringify(userData));

      toast({
        title: "Registration Complete! 🎉",
        description: "Your account has been created successfully.",
      });

      // Navigate to homepage or dashboard
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
            <UserCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-white">Create Account</h1>
          <p className="text-gray-400">
            {step === 'connect' 
              ? 'Connect your wallet to get started'
              : 'Complete KYC verification'}
          </p>
        </div>

        {/* Step 1: Connect Wallet */}
        {step === 'connect' && (
          <div className="space-y-6">
            {!isConnected ? (
              <>
                <div className="glass p-6 rounded-lg border border-border/50">
                  <div className="flex items-start gap-4 mb-4">
                    <Shield className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Secure & Decentralized</h3>
                      <p className="text-sm text-gray-400">
                        Connect your MetaMask wallet to create a secure, blockchain-verified account.
                      </p>
                    </div>
                  </div>
                </div>

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
                      Connect MetaMask Wallet
                    </>
                  )}
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <div className="glass p-4 rounded-lg border border-green-500/50">
                  <div className="flex items-center gap-2 text-green-400 mb-2">
                    <Wallet className="w-5 h-5" />
                    <span className="font-semibold">Wallet Connected</span>
                  </div>
                  <p className="text-sm text-gray-400 font-mono break-all">
                    {address}
                  </p>
                </div>

                <Button
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  onClick={() => setStep('kyc')}
                >
                  Continue to KYC
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => disconnect()}
                >
                  Disconnect & Use Different Wallet
                </Button>
              </div>
            )}

            <div className="text-center pt-4 border-t border-border/50">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* Step 2: KYC Form */}
        {step === 'kyc' && isConnected && (
          <form onSubmit={handleKYCSubmit} className="space-y-6">
            {/* Connected Wallet Info */}
            <div className="glass p-4 rounded-lg border border-green-500/50">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <Wallet className="w-4 h-4" />
                <span className="text-sm font-semibold">Connected Wallet</span>
              </div>
              <p className="text-xs text-gray-400 font-mono break-all">
                {address}
              </p>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name *
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  if (errors.fullName) setErrors({ ...errors, fullName: "" });
                }}
                className={`glass border-border/50 ${errors.fullName ? 'border-red-500' : ''}`}
              />
              {errors.fullName && (
                <p className="text-xs text-red-500">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                className={`glass border-border/50 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: "" });
                }}
                className={`glass border-border/50 ${errors.phone ? 'border-red-500' : ''}`}
              />
              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* Country */}
            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                type="text"
                placeholder="United States"
                value={formData.country}
                onChange={(e) => {
                  setFormData({ ...formData, country: e.target.value });
                  if (errors.country) setErrors({ ...errors, country: "" });
                }}
                className={`glass border-border/50 ${errors.country ? 'border-red-500' : ''}`}
              />
              {errors.country && (
                <p className="text-xs text-red-500">{errors.country}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => {
                  setFormData({ ...formData, agreeToTerms: checked as boolean });
                  if (errors.agreeToTerms) setErrors({ ...errors, agreeToTerms: "" });
                }}
                className={errors.agreeToTerms ? 'border-red-500' : ''}
              />
              <Label htmlFor="terms" className="text-sm cursor-pointer">
                I agree to the{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </Label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-xs text-red-500 -mt-4">{errors.agreeToTerms}</p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserCheck className="w-5 h-5 mr-2" />
                  Complete Registration
                </>
              )}
            </Button>

            {/* Back Button */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => {
                disconnect();
                setStep('connect');
              }}
            >
              Back
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
};

export default Signup;
