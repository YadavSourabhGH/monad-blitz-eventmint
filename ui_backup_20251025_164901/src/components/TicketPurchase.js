import React, { useState, useEffect } from 'react';
import './TicketPurchase.css';
import { getTotalEvents, getEventExtended, buyTicket } from '../web3Service';

function TicketPurchase({ account }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setMessage(''); // Clear previous errors
      
      // Log for debugging
      console.log('🔄 Loading events from Monad Testnet...');
      setMessage('⏳ Loading events from Monad Testnet... Using optimized retry logic.');
      
      const totalEvents = await getTotalEvents();
      console.log('✅ Total events found:', totalEvents);
      
      if (totalEvents === 0) {
        setEvents([]);
        setMessage('');
        setLoading(false);
        return;
      }
      
      const eventList = [];
      const BATCH_SIZE = 3; // Load 3 events at a time to avoid overwhelming RPC
      const BATCH_DELAY = 2000; // 2 second delay between batches

      // Load events in batches to reduce RPC load
      for (let batch = 0; batch < Math.ceil(totalEvents / BATCH_SIZE); batch++) {
        const batchStart = batch * BATCH_SIZE;
        const batchEnd = Math.min(batchStart + BATCH_SIZE, totalEvents);
        
        console.log(`� Loading batch ${batch + 1} (events ${batchStart} to ${batchEnd - 1})...`);
        setMessage(`⏳ Loading events ${batchStart + 1}-${batchEnd} of ${totalEvents}...`);
        
        // Load events in current batch in parallel (but batch sequentially)
        const batchPromises = [];
        for (let i = batchStart; i < batchEnd; i++) {
          batchPromises.push(
            getEventExtended(i)
              .then(event => {
                // Only include events with available tickets
                if (Number(event.soldTickets) < Number(event.totalTickets)) {
                  return { id: i, ...event };
                }
                return null;
              })
              .catch(err => {
                console.log(`⚠️ Event ${i} failed:`, err.message);
                return null; // Continue even if one event fails
              })
          );
        }
        
        const batchResults = await Promise.all(batchPromises);
        eventList.push(...batchResults.filter(e => e !== null));
        
        // Update UI with current progress
        setEvents([...eventList]);
        
        // Delay before next batch (except for last batch)
        if (batchEnd < totalEvents) {
          console.log(`⏳ Waiting ${BATCH_DELAY/1000}s before next batch...`);
          await new Promise(resolve => setTimeout(resolve, BATCH_DELAY));
        }
      }

      setEvents(eventList);
      setMessage(''); // Clear loading message
      console.log('✅ All events loaded successfully:', eventList.length);
      
    } catch (error) {
      console.error('❌ Error loading events:', error);
      
      // Better error handling with actionable messages
      if (error.message.includes('timeout')) {
        setMessage('⚠️ Monad RPC timeout. The network is slow. Click Retry or wait a moment.');
      } else if (error.message.includes('Internal JSON-RPC') || error.message.includes('internal error')) {
        setMessage('⚠️ Monad RPC internal error. The testnet is having issues. Try again in a few minutes or switch to localhost.');
      } else if (error.message.includes('rate limit')) {
        setMessage('⚠️ Rate limit exceeded. Please wait 1 minute and click Retry.');
      } else if (error.message.includes('not initialized')) {
        setMessage('❌ Contracts not initialized. Ensure MetaMask is on Monad Testnet (Chain ID: 10143).');
      } else if (error.message.includes('network')) {
        setMessage('❌ Network error. Check your internet connection and MetaMask network.');
      } else {
        setMessage(`❌ Error: ${error.message.substring(0, 120)}... Click Retry.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBuyClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handlePurchase = async () => {
    if (!selectedEvent) return;

    try {
      setPurchasing(true);
      setMessage('🔄 Processing purchase...');

      await buyTicket(selectedEvent.id, selectedEvent.ticketPrice);

      setMessage('✅ Ticket purchased successfully! NFT minted to your wallet.');
      setShowModal(false);
      
      // Reload events to update availability
      setTimeout(() => {
        loadEvents();
        setMessage('');
      }, 3000);

    } catch (error) {
      console.error('Error purchasing ticket:', error);
      setMessage(`❌ Purchase failed: ${error.message}`);
    } finally {
      setPurchasing(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const getAvailableTickets = (event) => {
    return Number(event.totalTickets) - Number(event.soldTickets);
  };

  const getSoldPercentage = (event) => {
    return ((Number(event.soldTickets) / Number(event.totalTickets)) * 100).toFixed(1);
  };

  return (
    <div className="ticket-purchase">
      <div className="purchase-header">
        <h2>🎫 Browse Events & Buy Tickets</h2>
        <p>All tickets are NFTs stored permanently on the blockchain</p>
      </div>

      {message && (
        <div className={`alert ${message.includes('❌') || message.includes('⚠️') ? 'alert-error' : 'alert-success'}`}>
          {message}
          {(message.includes('⚠️') || message.includes('❌')) && (
            <button 
              onClick={loadEvents} 
              style={{
                marginLeft: '15px',
                padding: '8px 15px',
                background: '#fff',
                color: '#333',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              🔄 Retry
            </button>
          )}
        </div>
      )}

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading events...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="empty-events">
          <div className="empty-icon">🎭</div>
          <h3>No Events Available</h3>
          <p>Check back later for upcoming events!</p>
        </div>
      ) : (
        <div className="events-marketplace">
          {events.map((event) => (
            <div key={event.id} className="event-marketplace-card">
              <div className="event-visual">
                <img 
                  src={event.imageUrl || 'https://via.placeholder.com/400x300?text=Event'} 
                  alt={event.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=Event';
                  }}
                />
                <div className="event-overlay">
                  <span className="availability-badge">
                    {getAvailableTickets(event)} / {event.totalTickets} Available
                  </span>
                </div>
              </div>

              <div className="event-details-card">
                <h3>{event.name}</h3>
                
                <div className="event-meta">
                  <div className="meta-item">
                    <span className="meta-icon">📍</span>
                    <span>{event.location}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">📅</span>
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">👤</span>
                    <span>{event.organizer.substring(0, 6)}...{event.organizer.substring(38)}</span>
                  </div>
                </div>

                <div className="ticket-info">
                  <div className="price-tag">
                    <span className="price-label">Price</span>
                    <span className="price-value">{event.ticketPrice} ETH</span>
                  </div>

                  <div className="ticket-stats">
                    <div className="stat">
                      <span className="stat-number">{event.soldTickets}</span>
                      <span className="stat-text">Sold</span>
                    </div>
                    <div className="stat">
                      <span className="stat-number">{getAvailableTickets(event)}</span>
                      <span className="stat-text">Available</span>
                    </div>
                  </div>
                </div>

                <div className="availability-bar">
                  <div 
                    className="availability-fill"
                    style={{ width: `${getSoldPercentage(event)}%` }}
                  ></div>
                </div>
                <p className="availability-text">{getSoldPercentage(event)}% Sold</p>

                <button 
                  className="buy-ticket-btn"
                  onClick={() => handleBuyClick(event)}
                  disabled={getAvailableTickets(event) === 0}
                >
                  {getAvailableTickets(event) === 0 ? '🔒 Sold Out' : '🎟️ Buy Ticket'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Purchase Confirmation Modal */}
      {showModal && selectedEvent && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-purchase" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            <h3>Confirm Purchase</h3>
            
            <div className="modal-event-info">
              <img 
                src={selectedEvent.imageUrl || 'https://via.placeholder.com/400x300?text=Event'} 
                alt={selectedEvent.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=Event';
                }}
              />
              <h4>{selectedEvent.name}</h4>
              <p>📍 {selectedEvent.location}</p>
              <p>📅 {new Date(selectedEvent.date).toLocaleString()}</p>
            </div>

            <div className="purchase-summary">
              <div className="summary-row">
                <span>Ticket Price:</span>
                <strong>{selectedEvent.ticketPrice} ETH</strong>
              </div>
              <div className="summary-row">
                <span>Gas Fee:</span>
                <span className="estimate">~0.001 ETH (estimate)</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <strong>~{(parseFloat(selectedEvent.ticketPrice) + 0.001).toFixed(4)} ETH</strong>
              </div>
            </div>

            <div className="nft-info">
              <p>✨ <strong>NFT Ticket Benefits:</strong></p>
              <ul>
                <li>🔐 Immutable proof of ownership</li>
                <li>🎨 Unique token ID</li>
                <li>🔄 Transferable to other wallets</li>
                <li>📊 Full ownership history on-chain</li>
                <li>💾 Metadata stored on IPFS</li>
              </ul>
            </div>

            <div className="modal-actions">
              <button 
                className="btn-confirm"
                onClick={handlePurchase}
                disabled={purchasing}
              >
                {purchasing ? '⏳ Processing...' : '✅ Confirm & Buy'}
              </button>
              <button 
                className="btn-cancel"
                onClick={closeModal}
                disabled={purchasing}
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

export default TicketPurchase;
