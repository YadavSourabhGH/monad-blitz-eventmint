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
      setMessage('🔄 Loading your tickets...');
      
      console.log('🎫 Loading tickets for account:', account);
      console.log('🔄 Force refresh:', forceRefresh);
      
      // Clear any cached data if force refresh
      if (forceRefresh) {
        setTickets([]);
        console.log('🧹 Cleared cached tickets');
      }
      
      const userTickets = await getUserTickets(account);
      
      console.log('📋 Loaded tickets:', userTickets);
      setTickets(userTickets);
      
      if (userTickets.length === 0) {
        setMessage('📭 No tickets found. If you just purchased a ticket, try refreshing.');
      } else {
        setMessage(`✅ Found ${userTickets.length} ticket${userTickets.length > 1 ? 's' : ''}`);
        // Clear success message after 3 seconds
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('❌ Error loading tickets:', error);
      setMessage(`❌ Error loading tickets: ${error.message}`);
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
            className="refresh-button"
            onClick={() => loadTickets(true)}
            disabled={loading}
            style={{
              background: '#3498db',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '10px',
              marginRight: '10px'
            }}
          >
            {loading ? '🔄 Loading...' : '🔄 Refresh Tickets'}
          </button>
          <button 
            className="force-reload-button"
            onClick={() => window.location.reload()}
            style={{
              background: '#e74c3c',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
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
          <p>Loading your tickets...</p>
        </div>
      ) : tickets.length === 0 ? (
        <div className="no-tickets">
          <div className="no-tickets-icon">🎟️</div>
          <h3>No Tickets Yet</h3>
          <p>Purchase tickets from available events to see them here</p>
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
                    <span className="detail-value">{ticket.price || '0'} ETH</span>
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
