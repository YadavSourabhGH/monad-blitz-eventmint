import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './QRScanner.css';
import { getTicketStatus, redeemTicket, getTicketHistory, CONTRACT_ADDRESSES } from '../web3Service';

function QRScanner({ account }) {
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanner, setScanner] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [scanner]);

  const startScanning = () => {
    setScanning(true);
    setScannedData(null);
    setVerificationResult(null);

    // Wait for DOM to update before initializing scanner
    setTimeout(() => {
      const html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      html5QrcodeScanner.render(onScanSuccess, onScanError);
      setScanner(html5QrcodeScanner);
    }, 100);
  };

  const stopScanning = () => {
    if (scanner) {
      scanner.clear();
      setScanner(null);
    }
    setScanning(false);
  };

  const onScanSuccess = async (decodedText) => {
    try {
      const data = JSON.parse(decodedText);
      setScannedData(data);
      stopScanning();
      await verifyTicket(data);
    } catch (error) {
      console.error('Invalid QR code format:', error);
      setVerificationResult({
        valid: false,
        message: '❌ Invalid QR code format',
        error: true
      });
    }
  };

  const onScanError = (error) => {
    // Ignore scanning errors (they occur frequently)
    console.log('Scanning...', error);
  };

  const verifyTicket = async (ticketData) => {
    try {
      setLoading(true);

      // Get ticket status from blockchain
      const status = await getTicketStatus(ticketData.tokenId);
      
      // Get ownership history
      const ownershipHistory = await getTicketHistory(ticketData.tokenId);

      const result = {
        tokenId: ticketData.tokenId,
        eventName: ticketData.eventName,
        owner: ticketData.owner,
        isValid: status.isValid,
        isRedeemed: status.isRedeemed,
        ownershipHistory: ownershipHistory,
        timestamp: new Date().toISOString()
      };

      if (!status.isValid) {
        result.message = '❌ ENTRY DENIED - Ticket Expired or Invalid';
        result.valid = false;
        result.error = true;
      } else if (status.isRedeemed) {
        result.message = '❌ ENTRY DENIED - Ticket Already Used';
        result.valid = false;
        result.error = true;
      } else {
        result.message = '✅ ENTRY APPROVED - Valid Ticket';
        result.valid = true;
        result.error = false;
      }

      setVerificationResult(result);

    } catch (error) {
      console.error('Verification error:', error);
      setVerificationResult({
        valid: false,
        message: `❌ Verification Failed: ${error.message}`,
        error: true
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRedeemTicket = async () => {
    if (!scannedData || !verificationResult) return;

    try {
      setLoading(true);
      await redeemTicket(scannedData.tokenId);

      setVerificationResult({
        ...verificationResult,
        isRedeemed: true,
        message: '✅ Ticket Redeemed Successfully - Entry Granted',
        redeemTimestamp: new Date().toISOString()
      });

      // Add to history
      setHistory([verificationResult, ...history]);

    } catch (error) {
      console.error('Redemption error:', error);
      alert(`Failed to redeem ticket: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const resetScanner = () => {
    setScannedData(null);
    setVerificationResult(null);
  };

  const getBlockchainLink = (tokenId) => {
    return `https://testnet.monadexplorer.com/address/${CONTRACT_ADDRESSES.EventChainContract}`;
  };

  return (
    <div className="qr-scanner">
      <div className="scanner-header">
        <h2>🔍 Entry Verification Scanner</h2>
        <p>Scan ticket QR codes to verify and grant entry</p>
      </div>

      <div className="scanner-container">
        {!scanning && !scannedData && (
          <div className="scanner-start">
            <div className="scanner-icon">📱</div>
            <h3>Ready to Scan</h3>
            <p>Click the button below to start scanning QR codes</p>
            <button className="start-scan-btn" onClick={startScanning}>
              📷 Start Scanner
            </button>
          </div>
        )}

        {scanning && (
          <div className="scanning-area">
            <div id="qr-reader"></div>
            <button className="stop-scan-btn" onClick={stopScanning}>
              ⏹️ Stop Scanner
            </button>
          </div>
        )}

        {loading && (
          <div className="verification-loading">
            <div className="verify-spinner"></div>
            <p>Verifying on blockchain...</p>
          </div>
        )}

        {verificationResult && !loading && (
          <div className={`verification-result ${verificationResult.error ? 'denied' : 'approved'}`}>
            <div className="result-icon">
              {verificationResult.error ? '❌' : '✅'}
            </div>
            
            <h3 className="result-message">{verificationResult.message}</h3>

            <div className="ticket-verification-info">
              <div className="info-row">
                <span className="info-label">Event:</span>
                <span className="info-value">{verificationResult.eventName || 'N/A'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Token ID:</span>
                <span className="info-value">#{verificationResult.tokenId}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Owner:</span>
                <span className="info-value">
                  {verificationResult.owner?.substring(0, 10)}...
                  {verificationResult.owner?.substring(38)}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Status:</span>
                <span className={`status-indicator ${verificationResult.valid ? 'valid' : 'invalid'}`}>
                  {verificationResult.isRedeemed ? 'Redeemed' : verificationResult.isValid ? 'Valid' : 'Invalid'}
                </span>
              </div>
            </div>

            {verificationResult.ownershipHistory && verificationResult.ownershipHistory.length > 0 && (
              <div className="ownership-section">
                <h4>🔗 Ownership Chain</h4>
                <div className="ownership-history">
                  {verificationResult.ownershipHistory.map((addr, idx) => (
                    <div key={idx} className="ownership-entry">
                      <span className="entry-number">{idx + 1}.</span>
                      <span className="entry-address">
                        {addr.substring(0, 10)}...{addr.substring(38)}
                      </span>
                      {idx === verificationResult.ownershipHistory.length - 1 && (
                        <span className="current-badge">Current</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="result-actions">
              {verificationResult.valid && !verificationResult.isRedeemed && (
                <button 
                  className="redeem-btn"
                  onClick={handleRedeemTicket}
                  disabled={loading}
                >
                  {loading ? '⏳ Redeeming...' : '✅ Grant Entry & Redeem'}
                </button>
              )}
              
              <button className="scan-again-btn" onClick={resetScanner}>
                🔄 Scan Another Ticket
              </button>

              <a 
                href={getBlockchainLink(verificationResult.tokenId)}
                target="_blank"
                rel="noopener noreferrer"
                className="blockchain-verify-link"
              >
                🔗 Verify on Blockchain
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Verification History */}
      <div className="verification-history-section">
        <div className="history-header" onClick={() => setShowHistory(!showHistory)}>
          <h3>📜 Verification History ({history.length})</h3>
          <span className="toggle-icon">{showHistory ? '▼' : '▶'}</span>
        </div>
        
        {showHistory && (
          <div className="history-list">
            {history.length === 0 ? (
              <p className="no-history">No verifications yet</p>
            ) : (
              history.map((entry, idx) => (
                <div key={idx} className="history-entry">
                  <div className="history-entry-header">
                    <span className={`history-status ${entry.valid ? 'success' : 'failed'}`}>
                      {entry.valid ? '✅' : '❌'}
                    </span>
                    <span className="history-event">{entry.eventName}</span>
                    <span className="history-time">
                      {new Date(entry.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="history-details">
                    <span>Token #{entry.tokenId}</span>
                    <span>{entry.owner?.substring(0, 8)}...</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default QRScanner;
