import React, { useState } from 'react';
import { getWeb3, CONTRACT_ADDRESSES } from '../web3Service';

function TicketDiscovery({ account, onTicketsFound }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [foundTokens, setFoundTokens] = useState([]);

  const discoverTokens = async () => {
    try {
      setLoading(true);
      setMessage('🔍 Discovering your real token IDs...');
      setFoundTokens([]);

      const web3 = getWeb3();
      const contract = new web3.eth.Contract([
        {
          "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
          "name": "ownerOf",
          "outputs": [{"internalType": "address", "name": "", "type": "address"}],
          "stateMutability": "view",
          "type": "function"
        }
      ], CONTRACT_ADDRESSES.EventChainContract);

      console.log('🔍 Starting token discovery for:', account);
      
      const tokens = [];
      let checked = 0;
      const maxCheck = 1000;

      // Method 1: Check recent timestamp-based IDs
      setMessage('🔍 Checking recent timestamp-based token IDs...');
      const now = Date.now();
      for (let i = 0; i < 100 && checked < maxCheck; i++) {
        const tokenId = now - (i * 1000);
        try {
          const owner = await contract.methods.ownerOf(tokenId).call();
          if (owner.toLowerCase() === account.toLowerCase()) {
            tokens.push({
              tokenId,
              owner,
              method: 'timestamp'
            });
            console.log('✅ Found token:', tokenId);
          }
        } catch (error) {
          // Token doesn't exist, continue
        }
        checked++;
      }

      // Method 2: Check sequential numbers
      setMessage('🔍 Checking sequential token IDs...');
      for (let i = 1; i <= 100 && checked < maxCheck; i++) {
        try {
          const owner = await contract.methods.ownerOf(i).call();
          if (owner.toLowerCase() === account.toLowerCase()) {
            tokens.push({
              tokenId: i,
              owner,
              method: 'sequential'
            });
            console.log('✅ Found token:', i);
          }
        } catch (error) {
          // Token doesn't exist, continue
        }
        checked++;
      }

      // Method 3: Check block-based IDs
      setMessage('🔍 Checking block-based token IDs...');
      const currentBlock = await web3.eth.getBlockNumber();
      for (let i = 0; i < 50 && checked < maxCheck; i++) {
        const tokenId = currentBlock - i;
        try {
          const owner = await contract.methods.ownerOf(tokenId).call();
          if (owner.toLowerCase() === account.toLowerCase()) {
            tokens.push({
              tokenId,
              owner,
              method: 'block-based'
            });
            console.log('✅ Found token:', tokenId);
          }
        } catch (error) {
          // Token doesn't exist, continue
        }
        checked++;
      }

      setFoundTokens(tokens);
      
      if (tokens.length > 0) {
        setMessage(`🎉 Found ${tokens.length} real token IDs!`);
        
        // Convert to ticket format
        const realTickets = tokens.map((token, index) => ({
          tokenId: token.tokenId,
          owner: token.owner,
          uri: `ipfs://discovered-ticket-${token.tokenId}`,
          contract: CONTRACT_ADDRESSES.EventChainContract,
          eventName: `Discovered Ticket #${token.tokenId}`,
          venue: 'Monad Blockchain',
          date: new Date().toLocaleDateString(),
          price: '0.05',
          isUsed: false,
          isValid: true,
          real: true,
          discoveryMethod: token.method
        }));
        
        if (onTicketsFound) {
          onTicketsFound(realTickets);
        }
      } else {
        setMessage(`❌ No tokens found after checking ${checked} possibilities`);
      }

    } catch (error) {
      console.error('❌ Discovery failed:', error);
      setMessage(`❌ Discovery failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      padding: '20px',
      background: '#fff8e1',
      border: '2px solid #ffc107',
      borderRadius: '10px',
      margin: '20px 0'
    }}>
      <h3>🔍 Token ID Discovery Tool</h3>
      <p>You have 5 real tickets on the blockchain! Let's find their actual token IDs.</p>

      <button
        onClick={discoverTokens}
        disabled={loading}
        style={{
          padding: '15px 30px',
          background: '#ff9800',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          marginBottom: '15px'
        }}
      >
        {loading ? '🔍 Discovering...' : '🔍 Discover My Token IDs'}
      </button>

      {message && (
        <div style={{
          padding: '10px',
          background: message.includes('❌') ? '#ffebee' : '#e8f5e8',
          border: `1px solid ${message.includes('❌') ? '#f44336' : '#4caf50'}`,
          borderRadius: '5px',
          marginBottom: '15px'
        }}>
          {message}
        </div>
      )}

      {foundTokens.length > 0 && (
        <div>
          <h4>🎫 Found Token IDs:</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            {foundTokens.map((token, index) => (
              <div key={index} style={{
                padding: '10px',
                background: 'white',
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}>
                <strong>Token ID: {token.tokenId}</strong>
                <br />
                <small>Method: {token.method}</small>
                <br />
                <small>Owner: {token.owner.substring(0, 10)}...</small>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
        <h4>How this works:</h4>
        <ul>
          <li>🕐 <strong>Timestamp method:</strong> Checks recent timestamp-based token IDs</li>
          <li>🔢 <strong>Sequential method:</strong> Checks tokens 1, 2, 3, etc.</li>
          <li>🧱 <strong>Block method:</strong> Checks block number-based token IDs</li>
        </ul>
      </div>
    </div>
  );
}

export default TicketDiscovery;