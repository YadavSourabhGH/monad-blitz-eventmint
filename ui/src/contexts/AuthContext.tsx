import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect, useChainId } from 'wagmi';
import { injected } from '@wagmi/connectors';
import { User } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  wallet: {
    address: string | undefined;
    isConnected: boolean;
    isConnecting: boolean;
    chainId: number | undefined;
  };
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  signup: (userData: Partial<User>) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { address, isConnected, isConnecting } = useAccount();
  const { connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();

  const wallet = {
    address,
    isConnected,
    isConnecting: isConnecting || isPending,
    chainId,
  };

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('eventmint_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('eventmint_user');
      }
    }
  }, []);

  // Save user data to localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('eventmint_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('eventmint_user');
    }
  }, [user]);

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      await connect({ connector: injected() });
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    disconnect();
    setUser(null);
  };

  const signup = async (userData: Partial<User>): Promise<void> => {
    if (!address) {
      throw new Error('Wallet not connected');
    }

    try {
      setIsLoading(true);

      const newUser: User = {
        walletAddress: address,
        username: userData.username || `User_${address.slice(-6)}`,
        email: userData.email,
        profileImage: userData.profileImage,
        createdAt: new Date(),
        isVerified: true,
      };

      setUser(newUser);
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    wallet,
    connectWallet,
    disconnectWallet,
    signup,
    isLoading: isLoading || wallet.isConnecting,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
