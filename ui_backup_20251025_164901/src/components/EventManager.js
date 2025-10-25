import React, { useState } from 'react';
import './EventManager.css';
import { createEvent, mintTicket, transferTicket } from '../web3Service';

function EventManager({ account }) {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    eventName: '',
    location: '',
    date: '',
    ticketPrice: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showMintModal, setShowMintModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [mintData, setMintData] = useState({
    recipientAddress: '',
    metadataUri: ''
  });
  const [transferData, setTransferData] = useState({
    tokenId: '',
    toAddress: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMintInputChange = (e) => {
    const { name, value } = e.target;
    setMintData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTransferInputChange = (e) => {
    const { name, value } = e.target;
    setTransferData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!formData.eventName || !formData.location || !formData.date || !formData.ticketPrice) {
      setMessage('❌ Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setMessage('Creating event...');
      
      // Call smart contract
      await createEvent(
        formData.eventName,
        formData.location,
        formData.date,
        formData.ticketPrice
      );

      const newEvent = {
        id: events.length,
        ...formData,
        organizer: account,
        createdAt: new Date().toLocaleString()
      };
      
      setEvents([...events, newEvent]);
      setFormData({ eventName: '', location: '', date: '', ticketPrice: '' });
      setMessage('✅ Event created successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error creating event:', error);
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleMintTicket = async (e) => {
    e.preventDefault();
    if (!mintData.recipientAddress || !mintData.metadataUri) {
      setMessage('❌ Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setMessage('Minting ticket...');
      
      await mintTicket(
        selectedEvent.id,
        mintData.recipientAddress,
        mintData.metadataUri
      );

      setMessage('✅ Ticket minted successfully!');
      setMintData({ recipientAddress: '', metadataUri: '' });
      setShowMintModal(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error minting ticket:', error);
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTransferTicket = async (e) => {
    e.preventDefault();
    if (!transferData.tokenId || !transferData.toAddress) {
      setMessage('❌ Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setMessage('Transferring ticket...');
      
      await transferTicket(
        transferData.tokenId,
        transferData.toAddress
      );

      setMessage('✅ Ticket transferred successfully!');
      setTransferData({ tokenId: '', toAddress: '' });
      setShowTransferModal(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error transferring ticket:', error);
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const openMintModal = (event) => {
    setSelectedEvent(event);
    setShowMintModal(true);
  };

  const openTransferModal = (event) => {
    setSelectedEvent(event);
    setShowTransferModal(true);
  };

  const closeModals = () => {
    setShowMintModal(false);
    setShowTransferModal(false);
    setSelectedEvent(null);
  };

  return (
    <div className="event-manager">
      <h2>📅 Event Management</h2>

      <form className="event-form" onSubmit={handleCreateEvent}>
        <div className="form-group">
          <label>Event Name</label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleInputChange}
            placeholder="Enter event name"
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Enter event location"
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Ticket Price (ETH)</label>
          <input
            type="number"
            name="ticketPrice"
            value={formData.ticketPrice}
            onChange={handleInputChange}
            placeholder="0.0"
            step="0.01"
            min="0"
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? '⏳ Creating...' : '✨ Create Event'}
        </button>
      </form>

      {message && <div className="message">{message}</div>}

      <div className="events-list">
        <h3>📋 Your Events</h3>
        {events.length === 0 ? (
          <p className="empty-state">No events created yet. Create one to get started!</p>
        ) : (
          <div className="events-grid">
            {events.map(event => (
              <div key={event.id} className="event-card">
                <div className="event-header">
                  <h4>{event.eventName}</h4>
                  <span className="event-id">#{event.id}</span>
                </div>
                <div className="event-details">
                  <p><span className="label">📍</span> {event.location}</p>
                  <p><span className="label">📅</span> {event.date}</p>
                  <p><span className="label">💰</span> {event.ticketPrice} ETH</p>
                  <p><span className="label">👤</span> {event.organizer.substring(0, 6)}...{event.organizer.substring(38)}</p>
                </div>
                <div className="event-actions">
                  <button className="mint-button" onClick={() => openMintModal(event)}>
                    🎫 Mint Tickets
                  </button>
                  <button className="transfer-button" onClick={() => openTransferModal(event)}>
                    🔄 Transfer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mint Ticket Modal */}
      {showMintModal && selectedEvent && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🎫 Mint Ticket for {selectedEvent.eventName}</h3>
              <button className="close-button" onClick={closeModals}>×</button>
            </div>
            <form onSubmit={handleMintTicket}>
              <div className="form-group">
                <label>Recipient Address</label>
                <input
                  type="text"
                  name="recipientAddress"
                  value={mintData.recipientAddress}
                  onChange={handleMintInputChange}
                  placeholder="0x..."
                  required
                />
              </div>
              <div className="form-group">
                <label>Metadata URI</label>
                <input
                  type="text"
                  name="metadataUri"
                  value={mintData.metadataUri}
                  onChange={handleMintInputChange}
                  placeholder="https://..."
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="confirm-button" disabled={loading}>
                  {loading ? '⏳ Minting...' : '✅ Mint Ticket'}
                </button>
                <button type="button" className="cancel-button" onClick={closeModals}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transfer Ticket Modal */}
      {showTransferModal && selectedEvent && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🔄 Transfer Ticket from {selectedEvent.eventName}</h3>
              <button className="close-button" onClick={closeModals}>×</button>
            </div>
            <form onSubmit={handleTransferTicket}>
              <div className="form-group">
                <label>Token ID</label>
                <input
                  type="number"
                  name="tokenId"
                  value={transferData.tokenId}
                  onChange={handleTransferInputChange}
                  placeholder="Ticket ID"
                  min="0"
                  required
                />
              </div>
              <div className="form-group">
                <label>Transfer To Address</label>
                <input
                  type="text"
                  name="toAddress"
                  value={transferData.toAddress}
                  onChange={handleTransferInputChange}
                  placeholder="0x..."
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="confirm-button" disabled={loading}>
                  {loading ? '⏳ Transferring...' : '✅ Transfer Ticket'}
                </button>
                <button type="button" className="cancel-button" onClick={closeModals}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventManager;
