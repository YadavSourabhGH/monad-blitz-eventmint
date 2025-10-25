import React, { useState, useEffect } from 'react';
import './TicketValidator.css';
import { validateTicket, getTicketStatus, getTicketHistory, getUserTickets } from '../web3Service';

function TicketValidator({ account }) {
  const [ticketId, setTicketId] = useState('');
  const [ticketStatus, setTicketStatus] = useState(null);
  const [ticketHistory, setTicketHistory] = useState(null);
  const [userTickets, setUserTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showAllTickets, setShowAllTickets] = useState(false);

  // Fetch user tickets on component mount
  useEffect(() => {
    if (account) {
      fetchUserTickets();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const fetchUserTickets = async () => {
    try {
      setLoading(true);
      const tickets = await getUserTickets(account);
      setUserTickets(tickets);
    } catch (error) {
      console.error('Error fetching user tickets:', error);
      setMessage('⚠️ Could not fetch user tickets. Make sure contracts are deployed.');
    } finally {
      setLoading(false);
    }
  };

  const handleValidateTicket = async (e) => {
    e.preventDefault();
    if (!ticketId) {
      setMessage('❌ Please enter a ticket ID');
      return;
    }

    try {
      setLoading(true);
      setMessage('Validating ticket...');

      // Get ticket status
      const status = await getTicketStatus(ticketId);
      setTicketStatus({
        ticketId,
        ...status,
        validatedAt: new Date().toLocaleString()
      });

      // Get ticket history
      const history = await getTicketHistory(ticketId);
      setTicketHistory(history);

      setMessage(status.isValid ? '✅ Ticket is valid!' : '❌ Ticket is invalid or expired');
    } catch (error) {
      console.error('Error validating ticket:', error);
      setMessage(`❌ Error: ${error.message}`);
      setTicketStatus(null);
      setTicketHistory(null);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsUsed = async () => {
    if (!ticketStatus) return;

    try {
      setLoading(true);
      setMessage('Marking ticket as used...');

      await validateTicket(ticketStatus.ticketId);

      setTicketStatus({
        ...ticketStatus,
        isUsed: true
      });
      setMessage('✅ Ticket marked as used!');
    } catch (error) {
      console.error('Error marking ticket as used:', error);
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTicket = async (ticket) => {
    setTicketId(ticket.tokenId);
    try {
      setLoading(true);
      setMessage('Loading ticket details...');

      const status = await getTicketStatus(ticket.tokenId);
      setTicketStatus({
        ticketId: ticket.tokenId,
        ...status,
        validatedAt: new Date().toLocaleString()
      });

      const history = await getTicketHistory(ticket.tokenId);
      setTicketHistory(history);

      setMessage('✅ Ticket loaded successfully!');
    } catch (error) {
      console.error('Error loading ticket details:', error);
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ticket-validator">
      <h2>🎫 Ticket Validation</h2>
      <p className="subtitle">Validate and manage your event tickets</p>

      <form className="validation-form" onSubmit={handleValidateTicket}>
        <div className="form-row">
          <div className="form-group">
            <label>Ticket ID</label>
            <input
              type="number"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              placeholder="Enter ticket ID"
              min="0"
            />
          </div>
          <button type="submit" className="validate-button" disabled={loading}>
            {loading ? '⏳ Validating...' : '🔍 Validate'}
          </button>
        </div>
      </form>

      {message && <div className="message">{message}</div>}

      {/* User Tickets Section */}
      <div className="tickets-section">
        <div className="section-header">
          <h3>📋 Your Tickets</h3>
          <button 
            className="toggle-button" 
            onClick={() => setShowAllTickets(!showAllTickets)}
          >
            {showAllTickets ? '🔽 Hide' : '🔼 Show'} ({userTickets.length})
          </button>
        </div>

        {showAllTickets && (
          <div className="tickets-grid">
            {userTickets.length === 0 ? (
              <p className="empty-state">No tickets found. Mint a ticket to get started!</p>
            ) : (
              userTickets.map(ticket => (
                <div 
                  key={ticket.tokenId} 
                  className="ticket-card"
                  onClick={() => handleSelectTicket(ticket)}
                >
                  <div className="ticket-id">Ticket #{ticket.tokenId}</div>
                  <div className="ticket-info">
                    <p><span>Status:</span> {ticket.isUsed ? '🎫 Used' : '🆕 Unused'}</p>
                    <p><span>Valid:</span> {ticket.isValid ? '✅ Yes' : '❌ No'}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Ticket Status Section */}
      {ticketStatus && (
        <div className="ticket-status-container">
          <div className={`ticket-status ${ticketStatus.isValid ? 'valid' : 'invalid'}`}>
            <div className="status-header">
              <h3>Ticket #{ticketStatus.ticketId}</h3>
              <span className={`badge ${ticketStatus.isValid ? 'success' : 'danger'}`}>
                {ticketStatus.isValid ? '✓ VALID' : '✗ INVALID'}
              </span>
            </div>

            <div className="status-details">
              <div className="detail-row">
                <span className="label">Validation Status:</span>
                <span className={`value ${ticketStatus.isValid ? 'success' : 'danger'}`}>
                  {ticketStatus.isValid ? '✅ Valid' : '❌ Invalid'}
                </span>
              </div>

              <div className="detail-row">
                <span className="label">Usage Status:</span>
                <span className={`value ${ticketStatus.isUsed ? 'used' : 'unused'}`}>
                  {ticketStatus.isUsed ? '🎫 Already Used' : '🆕 Unused'}
                </span>
              </div>

              <div className="detail-row">
                <span className="label">Validated:</span>
                <span className="value">{ticketStatus.validatedAt}</span>
              </div>
            </div>

            {/* Ownership History */}
            {ticketHistory && ticketHistory.length > 0 && (
              <div className="history-section">
                <h4>📜 Ownership History</h4>
                <div className="history-list">
                  {ticketHistory.map((owner, index) => (
                    <div key={index} className="history-item">
                      <span className="index">{index + 1}.</span>
                      <span className="address" title={owner}>
                        {owner.substring(0, 6)}...{owner.substring(38)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!ticketStatus.isUsed && ticketStatus.isValid && (
              <div className="action-buttons">
                <button className="mark-used-button" onClick={handleMarkAsUsed} disabled={loading}>
                  {loading ? '⏳ Processing...' : '✓ Mark as Used (Check-in)'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="info-section">
        <h3>ℹ️ How to Get & Validate Tickets</h3>
        <div className="info-cards">
          <div className="info-card">
            <span className="number">1</span>
            <h4>Get Ticket ID</h4>
            <p>Receive a ticket ID when you mint or receive a ticket. View your tickets in the "Your Tickets" section.</p>
          </div>
          <div className="info-card">
            <span className="number">2</span>
            <h4>Enter ID</h4>
            <p>Enter the ticket ID in the validation form or click on a ticket from your list.</p>
          </div>
          <div className="info-card">
            <span className="number">3</span>
            <h4>Validate</h4>
            <p>Click validate to check ticket authenticity, expiration, and usage status.</p>
          </div>
          <div className="info-card">
            <span className="number">4</span>
            <h4>View History</h4>
            <p>See the complete ownership history and verify the ticket's legitimacy.</p>
          </div>
          <div className="info-card">
            <span className="number">5</span>
            <h4>Check-In</h4>
            <p>Mark the ticket as used during event entry to prevent duplicate usage.</p>
          </div>
          <div className="info-card">
            <span className="number">6</span>
            <h4>Track All</h4>
            <p>All transactions are recorded on the blockchain for complete transparency.</p>
          </div>
        </div>
      </div>

      <div className="contract-info">
        <h3>🔗 Contract Integration Setup</h3>
        <p>To fully enable ticket minting and validation, configure your contract addresses in <code>web3Service.js</code>:</p>
        <pre><code>{`// In src/web3Service.js
export const CONTRACT_ADDRESSES = {
  EventChainContract: '0x...',           // Your deployed contract
  EventChainEventManagerContract: '0x...' // Your deployed manager
};`}</code></pre>
      </div>
    </div>
  );
}

export default TicketValidator;
