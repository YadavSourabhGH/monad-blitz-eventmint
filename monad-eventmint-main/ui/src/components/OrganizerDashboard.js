import React, { useState, useEffect } from 'react';
import './OrganizerDashboard.css';
import { createEventExtended, getEventExtended, getTotalEvents } from '../web3Service';
import { uploadMetadata, uploadFileToIPFS } from '../ipfsService';

function OrganizerDashboard({ account }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
    ticketPrice: '',
    totalTickets: '',
    imageFile: null,
    imagePreview: null,
  });

  const loadEvents = async () => {
    try {
      setLoading(true);
      const totalEvents = await getTotalEvents();
      const eventList = [];

      for (let i = 0; i < totalEvents; i++) {
        try {
          const event = await getEventExtended(i);
          if (event.organizer.toLowerCase() === account.toLowerCase()) {
            eventList.push({ id: i, ...event });
          }
        } catch (err) {
          console.log(`Event ${i} not found or error:`, err);
        }
      }

      setEvents(eventList);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imageFile: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.location || !formData.date || !formData.ticketPrice || !formData.totalTickets) {
      setMessage('❌ Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setMessage('📤 Uploading to IPFS...');

      let imageUrl = 'https://via.placeholder.com/400x300?text=Event+Image';
      
      // Upload image to IPFS if provided
      if (formData.imageFile) {
        try {
          const imageHash = await uploadFileToIPFS(formData.imageFile);
          imageUrl = `https://gateway.pinata.cloud/ipfs/${imageHash}`;
        } catch (err) {
          console.warn('Image upload failed, using placeholder:', err);
        }
      }

      // Create metadata
      const metadata = {
        name: formData.name,
        description: formData.description,
        location: formData.location,
        date: formData.date,
        imageUrl: imageUrl,
        ticketPrice: formData.ticketPrice,
        totalTickets: formData.totalTickets,
      };

      // Upload metadata to IPFS (with local fallback) for backup
      await uploadMetadata(metadata, true);

      setMessage('⛓️ Creating event on blockchain...');

      // Create event on blockchain
      await createEventExtended(
        formData.name,
        formData.location,
        formData.date,
        formData.ticketPrice,
        imageUrl,
        formData.totalTickets
      );

      setMessage('✅ Event created successfully!');
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        location: '',
        date: '',
        ticketPrice: '',
        totalTickets: '',
        imageFile: null,
        imagePreview: null,
      });

      // Reload events
      setTimeout(() => {
        loadEvents();
        setMessage('');
      }, 2000);

    } catch (error) {
      console.error('Error creating event:', error);
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const calculateUnsold = (event) => {
    return Number(event.totalTickets) - Number(event.soldTickets);
  };

  const calculateRevenue = (event) => {
    return (Number(event.soldTickets) * Number(event.ticketPrice)).toFixed(4);
  };

  return (
    <div className="organizer-dashboard">
      <div className="dashboard-header">
        <h2>🎯 Event Organizer Dashboard</h2>
        <p>Create and manage your events, track sales and redemptions</p>
      </div>

      {/* Create Event Form */}
      <div className="create-event-section">
        <h3>✨ Create New Event</h3>
        <form onSubmit={handleCreateEvent} className="event-form-modern">
          <div className="form-row">
            <div className="form-group">
              <label>Event Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Amazing Concert 2025"
                required
              />
            </div>

            <div className="form-group">
              <label>Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Madison Square Garden, NYC"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date *</label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Ticket Price (MON) *</label>
              <input
                type="number"
                name="ticketPrice"
                value={formData.ticketPrice}
                onChange={handleInputChange}
                placeholder="0.05"
                step="0.001"
                min="0"
                required
              />
              <small className="form-hint">💡 Recommended: 0.01 - 0.1 MON for testing</small>
            </div>

            <div className="form-group">
              <label>Total Tickets *</label>
              <input
                type="number"
                name="totalTickets"
                value={formData.totalTickets}
                onChange={handleInputChange}
                placeholder="100"
                min="1"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your event..."
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Event Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            {formData.imagePreview && (
              <div className="image-preview">
                <img src={formData.imagePreview} alt="Event preview" />
              </div>
            )}
          </div>

          <button type="submit" className="create-btn" disabled={loading}>
            {loading ? '⏳ Creating Event...' : '🚀 Create Event'}
          </button>
        </form>

        {message && (
          <div className={`message ${message.includes('❌') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}
      </div>

      {/* Events List */}
      <div className="events-section">
        <h3>📋 Your Events</h3>
        {loading && events.length === 0 ? (
          <p className="loading">Loading events...</p>
        ) : events.length === 0 ? (
          <div className="empty-state">
            <p>🎫 No events created yet</p>
            <p>Create your first event above to get started!</p>
          </div>
        ) : (
          <div className="events-grid-modern">
            {events.map((event) => (
              <div key={event.id} className="event-card-modern">
                <div className="event-image">
                  <img 
                    src={event.imageUrl || 'https://via.placeholder.com/400x300?text=Event'} 
                    alt={event.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Event';
                    }}
                  />
                  <div className="event-badge">Event #{event.id}</div>
                </div>

                <div className="event-content">
                  <h4>{event.name}</h4>
                  <div className="event-info">
                    <p><span className="icon">📍</span> {event.location}</p>
                    <p><span className="icon">📅</span> {event.date}</p>
                    <p><span className="icon">💰</span> {event.ticketPrice} MON</p>
                  </div>

                  <div className="stats-grid">
                    <div className="stat-card total">
                      <span className="stat-value">{event.totalTickets}</span>
                      <span className="stat-label">Total Tickets</span>
                    </div>
                    <div className="stat-card sold">
                      <span className="stat-value">{event.soldTickets}</span>
                      <span className="stat-label">Sold</span>
                    </div>
                    <div className="stat-card unsold">
                      <span className="stat-value">{calculateUnsold(event)}</span>
                      <span className="stat-label">Available</span>
                    </div>
                    <div className="stat-card redeemed">
                      <span className="stat-value">{event.redeemedTickets}</span>
                      <span className="stat-label">Redeemed</span>
                    </div>
                  </div>

                  <div className="revenue-info">
                    <p>
                      <strong>Revenue:</strong> {calculateRevenue(event)} MON
                    </p>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ 
                          width: `${(event.soldTickets / event.totalTickets) * 100}%` 
                        }}
                      />
                    </div>
                    <p className="progress-text">
                      {((event.soldTickets / event.totalTickets) * 100).toFixed(1)}% Sold
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrganizerDashboard;
