export interface User {
  walletAddress: string;
  username?: string;
  email?: string;
  profileImage?: string;
  createdAt: Date;
  isVerified: boolean;
}

export interface WalletState {
  address: string | undefined;
  isConnected: boolean;
  isConnecting: boolean;
  chainId: number | undefined;
}

export interface AuthContextType {
  user: User | null;
  wallet: WalletState;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  signup: (userData: Partial<User>) => Promise<void>;
  isLoading: boolean;
}
