import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './MyTickets.css';
import { getUserTickets, transferTicketP2P, CONTRACT_ADDRESSES } from '../web3Service';

function MyTickets({ account }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferAddress, setTransferAddress] = useState('');
  const [message, setMessage] = useState('');
  const [transferring, setTransferring] = useState(false);

  const loadTickets = async (forceRefresh = false) => {
    try {
      setLoading(true);
      setMessage('🔄 Loading your tickets from Monad blockchain...');
      
      console.log('🎫 Loading tickets for account:', account);
      console.log('🔄 Force refresh:', forceRefresh);
      
      // Clear any cached data if force refresh
      if (forceRefresh) {
        setTickets([]);
        console.log('🧹 Cleared cached tickets');
      }
      
      // Add timeout to getUserTickets call
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Loading timeout - Monad RPC is slow. Please try again.')), 30000)
      );
      
      const userTickets = await Promise.race([
        getUserTickets(account),
        timeoutPromise
      ]);
      
      console.log('📋 Loaded tickets:', userTickets);
      setTickets(userTickets);
      
      if (userTickets.length === 0) {
        setMessage('📭 No tickets found. Purchase tickets from the "Buy Tickets" tab first!');
      } else {
        setMessage(`✅ Found ${userTickets.length} ticket${userTickets.length > 1 ? 's' : ''}`);
        // Clear success message after 3 seconds
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('❌ Error loading tickets:', error);
      
      // Better error messages
      if (error.message.includes('timeout') || error.message.includes('slow')) {
        setMessage('⚠️ Monad RPC is slow. Click "Refresh Tickets" to try again or check back later.');
      } else if (error.message.includes('not initialized')) {
        setMessage('❌ Please make sure you\'re connected to Monad Testnet (Chain ID: 10143)');
      } else {
        setMessage(`❌ Error: ${error.message.substring(0, 100)}`);
      }
      
      // Don't clear error messages automatically
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (account) {
      loadTickets();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const handleViewQR = (ticket) => {
    setSelectedTicket(ticket);
    setShowQRModal(true);
  };

  const handleTransferClick = (ticket) => {
    setSelectedTicket(ticket);
    setShowTransferModal(true);
  };

  const handleTransfer = async () => {
    if (!selectedTicket || !transferAddress) return;

    // Basic validation
    if (!transferAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      setMessage('❌ Invalid wallet address format');
      return;
    }

    try {
      setTransferring(true);
      setMessage('🔄 Transferring ticket...');

      console.log('🚀 Starting real P2P transfer...');
      
      // Execute REAL blockchain transfer
      console.log('🚀 Executing REAL P2P transfer...');
      const result = await transferTicketP2P(selectedTicket.tokenId, transferAddress);
      
      if (result.real) {
        // REAL blockchain transfer succeeded!
        console.log('🎉 REAL transfer successful:', result);
        
        const txHash = result.transactionHash;
        const shortHash = txHash.substring(0, 10) + '...' + txHash.substring(58);
        
        setMessage(`🎉 REAL Transfer Successful! TX: ${shortHash} on ${result.network}`);
        
        // Remove ticket from our collection (it's been transferred)
        const updatedTickets = tickets.filter(ticket => ticket.tokenId !== selectedTicket.tokenId);
        setTickets(updatedTickets);
        
        console.log('✅ Ticket removed from collection - successfully transferred to:', transferAddress);
        
      } else {
        // Fallback case
        setMessage('⚠️ Transfer completed but status unclear');
      }

      setShowTransferModal(false);
      setTransferAddress('');
      
      // Show success message for 5 seconds
      setTimeout(() => {
        setMessage('');
      }, 5000);

    } catch (error) {
      console.error('❌ Transfer failed:', error);
      setMessage(`❌ Transfer failed: ${error.message}`);
      
      // Clear error message after 10 seconds
      setTimeout(() => {
        setMessage('');
      }, 10000);
    } finally {
      setTransferring(false);
    }
  };

  const closeModals = () => {
    setShowQRModal(false);
    setShowTransferModal(false);
    setSelectedTicket(null);
  };

  const getQRData = (ticket) => {
    return JSON.stringify({
      tokenId: ticket.tokenId,
      contract: ticket.contract,
      owner: ticket.owner,
      eventName: ticket.eventName,
      timestamp: Date.now()
    });
  };

  const getBlockchainExplorerLink = (tokenId) => {
    // Monad Testnet Explorer - View the contract instead of individual token
    return `https://testnet.monadexplorer.com/address/${CONTRACT_ADDRESSES.EventChainContract}`;
  };

  return (
    <div className="my-tickets">
      <div className="tickets-header">
        <h2>🎫 My NFT Tickets</h2>
        <p>Your digital ticket collection secured on the blockchain</p>
        <div className="header-actions">
          <button 
            className="refresh-button modern-btn"
            onClick={() => loadTickets(true)}
            disabled={loading}
          >
            {loading ? '🔄 Loading...' : '🔄 Refresh Tickets'}
          </button>
          <button 
            className="force-reload-button modern-btn-danger"
            onClick={() => window.location.reload()}
          >
            🔄 Force Reload Page
          </button>
        </div>
      </div>

      {message && (
        <div className={`notification ${message.includes('❌') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading tickets from Monad blockchain...</p>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
            This may take up to 30 seconds due to Monad RPC delays
          </p>
        </div>
      ) : tickets.length === 0 ? (
        <div className="no-tickets">
          <div className="no-tickets-icon">🎟️</div>
          <h3>No Tickets Yet</h3>
          <p>You don't have any tickets in your wallet</p>
          <div style={{ marginTop: '20px', padding: '20px', background: '#f8f9fa', borderRadius: '10px', textAlign: 'left' }}>
            <h4 style={{ marginTop: 0 }}>📝 How to get tickets:</h4>
            <ol style={{ marginLeft: '20px' }}>
              <li><strong>Step 1:</strong> Go to the "🎯 Organizer" tab and create an event</li>
              <li><strong>Step 2:</strong> Go to the "🛒 Buy Tickets" tab</li>
              <li><strong>Step 3:</strong> Purchase a ticket from an available event</li>
              <li><strong>Step 4:</strong> Come back here to see your tickets!</li>
            </ol>
            <p style={{ marginTop: '15px', color: '#666', fontSize: '14px' }}>
              💡 <strong>Note:</strong> Transactions on Monad Testnet may take 30-60 seconds to confirm.
            </p>
          </div>
        </div>
      ) : (
        <div className="tickets-grid">
          {tickets.map((ticket) => (
            <div key={ticket.tokenId} className="ticket-card">
              <div className="ticket-visual">
                <div className="ticket-pattern"></div>
                <div className="ticket-header-content">
                  <h3>{ticket.eventName || 'Event Ticket'}</h3>
                  <span className="ticket-id">ID: #{ticket.tokenId}</span>
                </div>
              </div>

              <div className="ticket-body">
                <div className="ticket-details">
                  <div className="detail-row">
                    <span className="detail-label">📍 Venue:</span>
                    <span className="detail-value">{ticket.venue || 'TBA'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">📅 Date:</span>
                    <span className="detail-value">{ticket.date || 'TBA'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">💰 Price:</span>
                    <span className="detail-value">{ticket.price || '0'} MON</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">👤 Owner:</span>
                    <span className="detail-value">
                      {ticket.owner.substring(0, 6)}...{ticket.owner.substring(38)}
                    </span>
                  </div>
                </div>

                <div className="ticket-status">
                  {ticket.isRedeemed ? (
                    <span className="status-badge redeemed">✓ Redeemed</span>
                  ) : ticket.isValid ? (
                    <span className="status-badge valid">✓ Valid</span>
                  ) : (
                    <span className="status-badge expired">⚠ Expired</span>
                  )}
                  

                </div>

                <div className="ticket-actions">
                  <button 
                    className="action-btn view-qr"
                    onClick={() => handleViewQR(ticket)}
                  >
                    📱 View QR
                  </button>
                  <button 
                    className="action-btn transfer"
                    onClick={() => handleTransferClick(ticket)}
                    disabled={ticket.isRedeemed}
                  >
                    🔄 Transfer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* QR Code Modal */}
      {showQRModal && selectedTicket && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-qr" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModals}>×</button>
            
            <h3>Ticket QR Code</h3>
            
            <div className="qr-container">
              <QRCodeCanvas 
                value={getQRData(selectedTicket)}
                size={280}
                level="H"
                includeMargin={true}
              />
            </div>

            <div className="qr-info">
              <h4>{selectedTicket.eventName || 'Event Ticket'}</h4>
              <p>Token ID: #{selectedTicket.tokenId}</p>
              <p className="qr-instruction">
                📱 Show this QR code at the event entrance for verification
              </p>
            </div>

            <div className="blockchain-link">
              <a 
                href={getBlockchainExplorerLink(selectedTicket.tokenId)}
                target="_blank"
                rel="noopener noreferrer"
                className="explorer-link"
              >
                🔗 View on Blockchain Explorer
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Modal */}
      {showTransferModal && selectedTicket && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-transfer" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModals}>×</button>
            
            <h3>Transfer Ticket</h3>
            
            <div className="transfer-warning">
              <p>⚠️ <strong>Warning:</strong> Transferring this ticket will permanently move ownership to another wallet.</p>
            </div>

            <div className="transfer-details">
              <p><strong>Ticket:</strong> {selectedTicket.eventName || 'Event Ticket'}</p>
              <p><strong>Token ID:</strong> #{selectedTicket.tokenId}</p>
            </div>

            <div className="transfer-input-group">
              <label>Recipient Wallet Address</label>
              <input
                type="text"
                value={transferAddress}
                onChange={(e) => setTransferAddress(e.target.value)}
                placeholder="0x..."
                className="transfer-input"
              />
            </div>

            <div className="transfer-benefits">
              <p>✅ <strong>P2P Transfer Benefits:</strong></p>
              <ul>
                <li>🔐 Secure on-chain transaction</li>
                <li>📜 Full ownership history preserved</li>
                <li>🚫 Anti-fraud protection</li>
                <li>💯 Transparent and verifiable</li>
              </ul>
            </div>

            <div className="modal-action-buttons">
              <button 
                className="btn-transfer-confirm"
                onClick={handleTransfer}
                disabled={transferring || !transferAddress}
              >
                {transferring ? '⏳ Transferring...' : '✅ Confirm Transfer'}
              </button>
              <button 
                className="btn-transfer-cancel"
                onClick={closeModals}
                disabled={transferring}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyTickets;
