import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import TicketService from '../services/TicketService';
import ImageCache from '../services/ImageCache';
import { transferTicketP2P, CONTRACT_ADDRESSES } from '../web3Service';
import './MyTickets.css';

function CachedMyTickets({ account }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferAddress, setTransferAddress] = useState('');
  const [message, setMessage] = useState('');
  const [transferring, setTransferring] = useState(false);
  const [cacheStatus, setCacheStatus] = useState(null);

  const loadTickets = async (forceRefresh = false) => {
    try {
      setLoading(true);
      setMessage(forceRefresh ? '🔄 Force refreshing from blockchain...' : '🔄 Loading your tickets...');
      
      console.log('🎫 Loading tickets with caching for account:', account);
      
      // Get cache status
      const status = TicketService.getCacheStatus(account);
      setCacheStatus(status);
      
      if (status.exists && !forceRefresh) {
        setMessage(`⚡ Using cached data (${status.ageMinutes}min old, ${status.ticketCount} tickets)`);
      }
      
      const userTickets = await TicketService.getUserTickets(account, forceRefresh);
      
      // Generate images for tickets
      const ticketsWithImages = userTickets.map(ticket => ({
        ...ticket,
        imageData: ImageCache.getTicketImage(ticket)
      }));
      
      console.log('📋 Loaded tickets with images:', ticketsWithImages.length);
      setTickets(ticketsWithImages);
      
      if (ticketsWithImages.length === 0) {
        setMessage('📭 No tickets found. If you just purchased a ticket, try force refresh.');
      } else {
        const cacheInfo = status.exists ? ' (cached)' : ' (fresh)';
        setMessage(`✅ Found ${ticketsWithImages.length} ticket${ticketsWithImages.length > 1 ? 's' : ''}${cacheInfo}`);
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

    if (!transferAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      setMessage('❌ Invalid wallet address format');
      return;
    }

    try {
      setTransferring(true);
      setMessage('🔄 Transferring ticket...');

      console.log('🚀 Starting real P2P transfer...');
      const result = await transferTicketP2P(selectedTicket.tokenId, transferAddress);
      
      if (result.real) {
        const txHash = result.transactionHash;
        const shortHash = txHash.substring(0, 10) + '...' + txHash.substring(58);
        
        setMessage(`🎉 REAL Transfer Successful! TX: ${shortHash} on ${result.network}`);
        
        // Remove ticket from our collection and clear cache
        const updatedTickets = tickets.filter(ticket => ticket.tokenId !== selectedTicket.tokenId);
        setTickets(updatedTickets);
        
        // Clear cache to force refresh on next load
        TicketService.clearCache();
        
        console.log('✅ Ticket transferred and cache cleared');
      } else {
        setMessage('⚠️ Transfer completed but status unclear');
      }

      setShowTransferModal(false);
      setTransferAddress('');
      
      setTimeout(() => setMessage(''), 5000);

    } catch (error) {
      console.error('❌ Transfer failed:', error);
      setMessage(`❌ Transfer failed: ${error.message}`);
      setTimeout(() => setMessage(''), 10000);
    } finally {
      setTransferring(false);
    }
  };

  const clearCache = () => {
    TicketService.clearCache();
    ImageCache.clearCache();
    setMessage('🧹 Cache cleared! Refreshing...');
    setTimeout(() => loadTickets(true), 1000);
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
    return `https://testnet.monadexplorer.com/address/${CONTRACT_ADDRESSES.EventChainContract}`;
  };

  return (
    <div className="my-tickets">
      <div className="tickets-header">
        <h2>🎫 My NFT Tickets (Cached)</h2>
        <p>Your digital ticket collection with local caching for fast loading</p>
        
        {/* Cache Status */}
        {cacheStatus && (
          <div style={{
            padding: '10px',
            background: cacheStatus.exists ? '#e8f5e8' : '#fff3cd',
            border: `1px solid ${cacheStatus.exists ? '#4caf50' : '#ffc107'}`,
            borderRadius: '5px',
            margin: '10px 0',
            fontSize: '14px'
          }}>
            {cacheStatus.exists ? (
              <>
                ⚡ Cache: {cacheStatus.ticketCount} tickets, {cacheStatus.ageMinutes}min old
                {cacheStatus.isExpired && ' (expired)'}
              </>
            ) : (
              '🔄 No cache - will fetch from blockchain'
            )}
          </div>
        )}
        
        <div className="header-actions">
          <button 
            className="refresh-button"
            onClick={() => loadTickets(false)}
            disabled={loading}
            style={{
              background: '#3498db',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginRight: '10px'
            }}
          >
            {loading ? '🔄 Loading...' : '⚡ Quick Load (Cache)'}
          </button>
          
          <button 
            className="force-refresh-button"
            onClick={() => loadTickets(true)}
            disabled={loading}
            style={{
              background: '#e74c3c',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginRight: '10px'
            }}
          >
            {loading ? '⏳ Refreshing...' : '🔄 Force Refresh'}
          </button>
          
          <button 
            className="clear-cache-button"
            onClick={clearCache}
            disabled={loading}
            style={{
              background: '#f39c12',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            🧹 Clear Cache
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
              {/* Ticket Image */}
              {ticket.imageData && (
                <div className="ticket-image" style={{ marginBottom: '10px' }}>
                  <img 
                    src={ticket.imageData} 
                    alt={ticket.eventName}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '5px'
                    }}
                  />
                </div>
              )}
              
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
                  
                  {/* Cache indicators */}
                  {ticket.metadataCached && (
                    <span className="status-badge" style={{
                      background: '#3498db',
                      color: 'white',
                      fontSize: '10px',
                      marginLeft: '5px'
                    }}>
                      💾 CACHED
                    </span>
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
            
            {selectedTicket.imageData && (
              <div style={{ marginBottom: '15px' }}>
                <img 
                  src={selectedTicket.imageData} 
                  alt="Ticket"
                  style={{ width: '100%', maxWidth: '280px', borderRadius: '5px' }}
                />
              </div>
            )}
            
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

export default CachedMyTickets;