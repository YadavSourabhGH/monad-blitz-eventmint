import React, { useState, useEffect } from 'react';
import './App.css';
import { initWeb3, getAccount, getBalance, getNetworkInfo } from './web3Service';
import RealValidator from './components/RealValidator';
import WalletConnect from './components/WalletConnect';
import OrganizerDashboard from './components/OrganizerDashboard';
import TicketPurchase from './components/TicketPurchase';
import MyTickets from './components/MyTickets';
import QRScanner from './components/QRScanner';
import NetworkStatus from './components/NetworkStatus';
import TransactionViewer from './components/TransactionViewer';

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [web3Connected, setWeb3Connected] = useState(false);
  const [activeTab, setActiveTab] = useState('marketplace');
  const [loading, setLoading] = useState(false);
  const [networkInfo, setNetworkInfo] = useState(null);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          const bal = await getBalance(accounts[0]);
          setBalance(bal);
          const network = await getNetworkInfo();
          setNetworkInfo(network);
          setWeb3Connected(true);
        }
      }
    } catch (error) {
      console.log('Not connected:', error);
    }
  };

  const connectWallet = async () => {
    try {
      setLoading(true);
      await initWeb3();
      const acc = await getAccount();
      const bal = await getBalance(acc);
      const network = await getNetworkInfo();
      setAccount(acc);
      setBalance(bal);
      setNetworkInfo(network);
      setWeb3Connected(true);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet. Make sure MetaMask is installed and unlocked.');
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance(null);
    setWeb3Connected(false);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <h1>🎫 EventChain</h1>
            <p>NFT Ticketing Platform</p>
          </div>
          <WalletConnect
            account={account}
            balance={balance}
            onConnect={connectWallet}
            onDisconnect={disconnectWallet}
            loading={loading}
            networkInfo={networkInfo}
          />
        </div>
      </header>

      <main className="main-content">
        {web3Connected ? (
          <>
            {/* Show Network Status for Monad Testnet */}
            {networkInfo && networkInfo.chainId === 10143 && (
              <NetworkStatus networkInfo={networkInfo} />
            )}
            
            <nav className="tab-navigation">
              <button
                className={`tab-button ${activeTab === 'marketplace' ? 'active' : ''}`}
                onClick={() => setActiveTab('marketplace')}
              >
                � Buy Tickets
              </button>
              <button
                className={`tab-button ${activeTab === 'mytickets' ? 'active' : ''}`}
                onClick={() => setActiveTab('mytickets')}
              >
                �️ My Tickets
              </button>
              <button
                className={`tab-button ${activeTab === 'organizer' ? 'active' : ''}`}
                onClick={() => setActiveTab('organizer')}
              >
                🎯 Organizer
              </button>
              <button
                className={`tab-button ${activeTab === 'scanner' ? 'active' : ''}`}
                onClick={() => setActiveTab('scanner')}
              >
                📱 Scanner
              </button>
              <button
                className={`tab-button ${activeTab === 'validator' ? 'active' : ''}`}
                onClick={() => setActiveTab('validator')}
              >
                ✅ Validator
              </button>
              <button
                className={`tab-button ${activeTab === 'transactions' ? 'active' : ''}`}
                onClick={() => setActiveTab('transactions')}
              >
                🔗 Transactions
              </button>
            </nav>

            <div className="content">
              {activeTab === 'marketplace' && (
                <TicketPurchase account={account} />
              )}
              {activeTab === 'mytickets' && (
                <MyTickets account={account} />
              )}
              {activeTab === 'organizer' && (
                <OrganizerDashboard account={account} />
              )}
              {activeTab === 'scanner' && (
                <QRScanner account={account} />
              )}
              {activeTab === 'validator' && (
                <RealValidator account={account} />
              )}
              {activeTab === 'transactions' && (
                <TransactionViewer account={account} />
              )}
            </div>
          </>
        ) : (
          <div className="welcome-container">
            <div className="welcome-card">
              <h2>Welcome to EventChain</h2>
              <p>The Next Generation of Event Ticketing with NFTs</p>
              <div className="features">
                <div className="feature">
                  <span className="icon">🎨</span>
                  <h3>NFT Tickets</h3>
                  <p>Each ticket is a unique ERC-721 token</p>
                </div>
                <div className="feature">
                  <span className="icon">�</span>
                  <h3>Secure & Transparent</h3>
                  <p>Blockchain-verified ownership</p>
                </div>
                <div className="feature">
                  <span className="icon">�</span>
                  <h3>P2P Transfers</h3>
                  <p>Safe ticket transfers with history</p>
                </div>
                <div className="feature">
                  <span className="icon">💾</span>
                  <p>IPFS metadata storage</p>
                </div>
                <div className="feature">
                  <span className="icon">📱</span>
                  <h3>QR Verification</h3>
                  <p>Instant entry validation</p>
                </div>
                <div className="feature">
                  <span className="icon">📊</span>
                  <h3>Analytics Dashboard</h3>
                  <p>Track sales and redemptions</p>
                </div>
              </div>
              <button
                className="connect-button"
                onClick={connectWallet}
                disabled={loading}
              >
                {loading ? 'Connecting...' : '🚀 Connect Wallet & Get Started'}
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>EventChain © 2025 - Revolutionizing Event Ticketing with Blockchain & NFTs</p>
      </footer>
    </div>
  );
}

export default App;
