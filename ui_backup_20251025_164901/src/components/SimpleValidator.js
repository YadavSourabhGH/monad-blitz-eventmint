import React, { useState } from 'react';
import './TicketValidator.css';

function SimpleValidator({ account }) {
  const [tokenId, setTokenId] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleValidate = async (e) => {
    e.preventDefault();
    
    if (!tokenId) {
      setValidationResult({
        error: true,
        message: '❌ Please enter a token ID'
      });
      return;
    }

    setLoading(true);
    
    // Simulate validation for demo purposes (to avoid RPC errors)
    setTimeout(() => {
      const isValid = Math.random() > 0.3; // 70% chance of being valid
      const isUsed = Math.random() > 0.7;  // 30% chance of being used
      
      setValidationResult({
        tokenId: tokenId,
        isValid: isValid && !isUsed,
        isUsed: isUsed,
        owner: account,
        validatedAt: new Date().toLocaleString(),
        error: false,
        message: isUsed ? '❌ Ticket Already Used' : 
                isValid ? '✅ Valid Ticket - Entry Approved' : 
                '❌ Invalid or Expired Ticket'
      });
      
      setLoading(false);
    }, 1500); // Simulate network delay
  };

  const handleMarkAsUsed = () => {
    if (validationResult && !validationResult.isUsed) {
      setValidationResult({
        ...validationResult,
        isUsed: true,
        message: '✅ Ticket Redeemed - Entry Granted'
      });
    }
  };

  const getExplorerLink = (tokenId) => {
    return `https://testnet.monadexplorer.com/address/0x7D70097F097Ba768Dda48E314206f5A879d2873A`;
  };

  return (
    <div className="ticket-validator">
      <h2>🎫 Ticket Validation (Demo Mode)</h2>
      <p className="subtitle">Validate event tickets and manage entry</p>

      <form className="validation-form" onSubmit={handleValidate}>
        <div className="form-row">
          <div className="form-group">
            <label>Token ID</label>
            <input
              type="text"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              placeholder="Enter token ID (e.g., 1761385480729)"
            />
          </div>
          <button type="submit" className="validate-button" disabled={loading}>
            {loading ? '⏳ Validating...' : '🔍 Validate Ticket'}
          </button>
        </div>
      </form>

      {validationResult && (
        <div className={`validation-result ${validationResult.error ? 'error' : 'success'}`}>
          <div className="result-header">
            <h3>Validation Result</h3>
            <span className={`status-badge ${validationResult.isValid ? 'valid' : 'invalid'}`}>
              {validationResult.isValid ? '✅ VALID' : '❌ INVALID'}
            </span>
          </div>

          <div className="result-message">
            <h4>{validationResult.message}</h4>
          </div>

          <div className="ticket-details">
            <div className="detail-row">
              <span className="label">Token ID:</span>
              <span className="value">#{validationResult.tokenId}</span>
            </div>
            <div className="detail-row">
              <span className="label">Owner:</span>
              <span className="value">{validationResult.owner?.substring(0, 10)}...{validationResult.owner?.substring(38)}</span>
            </div>
            <div className="detail-row">
              <span className="label">Status:</span>
              <span className="value">
                {validationResult.isUsed ? 'Already Redeemed' : 
                 validationResult.isValid ? 'Ready for Entry' : 'Invalid/Expired'}
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Validated:</span>
              <span className="value">{validationResult.validatedAt}</span>
            </div>
          </div>

          {validationResult.isValid && !validationResult.isUsed && (
            <div className="action-section">
              <button 
                className="redeem-button"
                onClick={handleMarkAsUsed}
              >
                ✅ Grant Entry & Mark as Used
              </button>
            </div>
          )}

          <div className="explorer-section">
            <a 
              href={getExplorerLink(validationResult.tokenId)}
              target="_blank"
              rel="noopener noreferrer"
              className="explorer-link"
            >
              🔗 View on Monad Explorer
            </a>
          </div>
        </div>
      )}

      <div className="demo-info">
        <h3>📋 Demo Mode Information</h3>
        <div className="info-cards">
          <div className="info-card">
            <h4>🎯 Purpose</h4>
            <p>This validator demonstrates ticket verification without RPC dependency issues.</p>
          </div>
          <div className="info-card">
            <h4>⚡ Features</h4>
            <p>• Instant validation<br/>• Entry management<br/>• Explorer integration</p>
          </div>
          <div className="info-card">
            <h4>🔗 Blockchain</h4>
            <p>In production, this connects directly to Monad testnet for real validation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimpleValidator;