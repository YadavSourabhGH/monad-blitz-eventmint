import React from 'react';
import './WalletConnect.css';

function WalletConnect({ account, balance, onConnect, onDisconnect, loading, networkInfo }) {
  return (
    <div className="wallet-connect">
      {account ? (
        <div className="wallet-info">
          {networkInfo && (
            <div className="network-display">
              <span className="network-label">🌐</span>
              <span className="network-value">{networkInfo.name}</span>
            </div>
          )}
          <div className="balance-display">
            <span className="balance-label">Balance:</span>
            <span className="balance-value">
              {parseFloat(balance).toFixed(4)} {networkInfo?.currency || 'ETH'}
            </span>
          </div>
          <div className="account-display">
            <span className="account-label">Account:</span>
            <span className="account-value">{account.substring(0, 6)}...{account.substring(38)}</span>
          </div>
          <button className="disconnect-button" onClick={onDisconnect}>
            Disconnect
          </button>
        </div>
      ) : (
        <button
          className="connect-button-header"
          onClick={onConnect}
          disabled={loading}
        >
          {loading ? '⏳ Connecting...' : '🦊 Connect MetaMask'}
        </button>
      )}
    </div>
  );
}

export default WalletConnect;
