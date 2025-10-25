import { useState, useEffect } from 'react';
import './TransactionViewer.css';
import { getNetworkInfo } from '../web3Service';

function TransactionViewer({ account }) {
  const [networkInfo, setNetworkInfo] = useState(null);

  useEffect(() => {
    loadNetworkInfo();
  }, []);

  const loadNetworkInfo = async () => {
    try {
      const info = await getNetworkInfo();
      setNetworkInfo(info);
    } catch (error) {
      console.error('Error loading network info:', error);
    }
  };

  const getExplorerLink = (txHash) => {
    if (!networkInfo || !networkInfo.explorer) return '#';
    return `${networkInfo.explorer}/tx/${txHash}`;
  };

  const getAddressLink = (address) => {
    if (!networkInfo || !networkInfo.explorer) return '#';
    return `${networkInfo.explorer}/address/${address}`;
  };



  // Mock transaction data for demo - in production, fetch from blockchain
  const mockTransactions = [
    {
      hash: '0x1234567890abcdef1234567890abcdef12345678',
      type: 'Event Created',
      timestamp: new Date().toISOString(),
      status: 'Success',
      gasUsed: '0.002',
      from: account,
      to: '0x5e8AFCb29A627cE0AbA0E6018BbB999a0b57d0CB'
    },
    {
      hash: '0xabcdef1234567890abcdef1234567890abcdef12',
      type: 'Ticket Purchased',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      status: 'Success',
      gasUsed: '0.001',
      from: account,
      to: '0x4ab008d8EC36E01c96a0F4eBe40482b1432366DF'
    }
  ];

  return (
    <div className="transaction-viewer">
      <div className="viewer-header">
        <h2>🔗 Transaction History</h2>
        <p>View all your EventChain transactions on the blockchain</p>
      </div>

      {networkInfo && (
        <div className="network-info">
          <h3>📡 Network: {networkInfo.name}</h3>
          <p>Chain ID: {networkInfo.chainId} | Currency: {networkInfo.currency}</p>
        </div>
      )}

      <div className="transactions-list">
        {mockTransactions.map((tx, index) => (
          <div key={index} className="transaction-card">
            <div className="tx-header">
              <span className="tx-type">{tx.type}</span>
              <span className={`tx-status ${tx.status.toLowerCase()}`}>
                {tx.status === 'Success' ? '✅' : '❌'} {tx.status}
              </span>
            </div>

            <div className="tx-details">
              <div className="tx-row">
                <span className="tx-label">Hash:</span>
                <a 
                  href={getExplorerLink(tx.hash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tx-hash"
                >
                  {tx.hash.substring(0, 10)}...{tx.hash.substring(58)}
                </a>
              </div>

              <div className="tx-row">
                <span className="tx-label">From:</span>
                <a 
                  href={getAddressLink(tx.from)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tx-address"
                >
                  {tx.from.substring(0, 6)}...{tx.from.substring(38)}
                </a>
              </div>

              <div className="tx-row">
                <span className="tx-label">To:</span>
                <a 
                  href={getAddressLink(tx.to)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tx-address"
                >
                  {tx.to.substring(0, 6)}...{tx.to.substring(38)}
                </a>
              </div>

              <div className="tx-row">
                <span className="tx-label">Gas Used:</span>
                <span className="tx-gas">{tx.gasUsed} {networkInfo?.currency || 'ETH'}</span>
              </div>

              <div className="tx-row">
                <span className="tx-label">Time:</span>
                <span className="tx-time">{new Date(tx.timestamp).toLocaleString()}</span>
              </div>
            </div>

            <div className="tx-actions">
              <a 
                href={getExplorerLink(tx.hash)}
                target="_blank"
                rel="noopener noreferrer"
                className="view-explorer-btn"
              >
                🔍 View on Explorer
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="blockchain-benefits">
        <h3>🌟 Blockchain Transaction Benefits</h3>
        <div className="benefits-grid">
          <div className="benefit-card">
            <span className="benefit-icon">🔒</span>
            <h4>Immutable</h4>
            <p>Transactions cannot be altered once confirmed</p>
          </div>
          <div className="benefit-card">
            <span className="benefit-icon">👁️</span>
            <h4>Transparent</h4>
            <p>All transactions are publicly verifiable</p>
          </div>
          <div className="benefit-card">
            <span className="benefit-icon">📜</span>
            <h4>Permanent Record</h4>
            <p>Complete history preserved forever</p>
          </div>
          <div className="benefit-card">
            <span className="benefit-icon">🚫</span>
            <h4>Anti-Fraud</h4>
            <p>Cryptographic proof prevents counterfeiting</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionViewer;