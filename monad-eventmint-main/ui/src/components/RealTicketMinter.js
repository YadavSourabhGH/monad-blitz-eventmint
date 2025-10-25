import React, { useState } from 'react';
import { mintTicket, createEvent, getAccount, CONTRACT_ADDRESSES } from '../web3Service';

function RealTicketMinter({ account, onTicketMinted }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [eventData, setEventData] = useState({
    name: 'Monad Hackathon 2025',
    location: 'San Francisco, CA',
    date: '2025-10-26',
    ticketPrice: '0.05'
  });

  const mintRealTicket = async () => {
    try {
      setLoading(true);
      setMessage('🔄 Minting REAL ticket on Monad blockchain...');

      console.log('🎫 Starting REAL ticket minting process...');
      console.log('👤 Account:', account);
      console.log('🔗 Contract:', CONTRACT_ADDRESSES.EventChainContract);

      // Step 1: Create event first (if needed)
      console.log('1️⃣ Creating event on blockchain...');
      const eventTx = await createEvent(
        eventData.name,
        eventData.location,
        eventData.date,
        eventData.ticketPrice
      );
      
      console.log('✅ Event created:', eventTx.transactionHash);
      setMessage('✅ Event created! Now minting ticket...');

      // Step 2: Mint ticket for the event
      console.log('2️⃣ Minting ticket...');
      const tokenId = Date.now(); // Use timestamp as unique token ID
      const metadataUri = `ipfs://real-ticket-${tokenId}`;
      
      const mintTx = await mintTicket(0, account, metadataUri); // Event ID 0 (latest)
      
      console.log('🎉 REAL TICKET MINTED!');
      console.log('📄 Transaction:', mintTx.transactionHash);
      console.log('🎫 Token ID:', tokenId);

      setMessage(`🎉 REAL Ticket Minted! Token ID: ${tokenId}, TX: ${mintTx.transactionHash.substring(0, 10)}...`);
      
      if (onTicketMinted) {
        onTicketMinted({
          tokenId,
          transactionHash: mintTx.transactionHash,
          eventName: eventData.name,
          venue: eventData.location,
          date: eventData.date,
          price: eventData.ticketPrice
        });
      }

    } catch (error) {
      console.error('❌ Minting failed:', error);
      setMessage(`❌ Minting failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const quickMintTicket = async () => {
    try {
      setLoading(true);
      setMessage('🚀 Quick minting REAL ticket...');

      console.log('⚡ Quick mint process starting...');
      
      // Use a simple approach - mint directly to user
      const tokenId = Date.now();
      const metadataUri = `ipfs://quick-ticket-${tokenId}`;
      
      // Try to mint directly (assuming event 0 exists or contract allows direct minting)
      const mintTx = await mintTicket(0, account, metadataUri);
      
      console.log('🎉 QUICK TICKET MINTED!');
      console.log('📄 Transaction:', mintTx.transactionHash);

      setMessage(`🎉 Quick Ticket Minted! TX: ${mintTx.transactionHash.substring(0, 10)}...`);
      
      if (onTicketMinted) {
        onTicketMinted({
          tokenId,
          transactionHash: mintTx.transactionHash,
          eventName: 'Quick Minted Ticket',
          venue: 'Monad Testnet',
          date: new Date().toLocaleDateString(),
          price: '0.01'
        });
      }

    } catch (error) {
      console.error('❌ Quick minting failed:', error);
      setMessage(`❌ Quick minting failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      background: '#f0f8ff', 
      borderRadius: '10px', 
      margin: '20px 0',
      border: '2px solid #3498db'
    }}>
      <h2>🎫 REAL Ticket Minter</h2>
      <p>Mint actual NFT tickets on Monad blockchain</p>

      <div style={{ marginBottom: '20px' }}>
        <h3>Event Details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <input
            type="text"
            placeholder="Event Name"
            value={eventData.name}
            onChange={(e) => setEventData({...eventData, name: e.target.value})}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
          <input
            type="text"
            placeholder="Location"
            value={eventData.location}
            onChange={(e) => setEventData({...eventData, location: e.target.value})}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
          <input
            type="date"
            value={eventData.date}
            onChange={(e) => setEventData({...eventData, date: e.target.value})}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price (ETH)"
            value={eventData.ticketPrice}
            onChange={(e) => setEventData({...eventData, ticketPrice: e.target.value})}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={mintRealTicket}
          disabled={loading}
          style={{
            padding: '15px 30px',
            background: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          {loading ? '⏳ Minting...' : '🎫 Mint REAL Ticket'}
        </button>

        <button
          onClick={quickMintTicket}
          disabled={loading}
          style={{
            padding: '15px 30px',
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          {loading ? '⏳ Minting...' : '⚡ Quick Mint'}
        </button>
      </div>

      {message && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          background: message.includes('❌') ? '#ffebee' : '#e8f5e8',
          border: `1px solid ${message.includes('❌') ? '#f44336' : '#4caf50'}`,
          borderRadius: '5px'
        }}>
          {message}
        </div>
      )}

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <h4>📋 Instructions:</h4>
        <ul>
          <li>🎫 <strong>Mint REAL Ticket:</strong> Creates event + mints ticket</li>
          <li>⚡ <strong>Quick Mint:</strong> Mints ticket directly (faster)</li>
          <li>💰 <strong>Requires MON tokens</strong> for gas fees</li>
          <li>🔗 <strong>Creates actual blockchain transactions</strong></li>
        </ul>
      </div>
    </div>
  );
}

export default RealTicketMinter;