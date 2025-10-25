import React, { useState, useEffect } from 'react';
import './NetworkStatus.css';

function NetworkStatus({ networkInfo }) {
  const [rpcStatus, setRpcStatus] = useState('checking');
  const [lastCheck, setLastCheck] = useState(null);

  useEffect(() => {
    if (networkInfo && networkInfo.chainId === 10143) {
      checkMonadRpc();
      // Check RPC status every 30 seconds
      const interval = setInterval(checkMonadRpc, 30000);
      return () => clearInterval(interval);
    }
  }, [networkInfo]);

  const checkMonadRpc = async () => {
    try {
      const startTime = Date.now();
      const response = await fetch('https://testnet-rpc.monad.xyz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_blockNumber',
          params: [],
          id: 1
        }),
        signal: AbortSignal.timeout(5000) // 5s timeout for health check
      });

      const latency = Date.now() - startTime;
      
      if (response.ok) {
        const data = await response.json();
        if (data.result) {
          // Categorize by latency
          if (latency < 1000) {
            setRpcStatus('excellent');
          } else if (latency < 3000) {
            setRpcStatus('good');
          } else {
            setRpcStatus('slow');
          }
        } else {
          setRpcStatus('degraded');
        }
      } else {
        setRpcStatus('error');
      }
      
      setLastCheck(new Date());
    } catch (error) {
      console.warn('RPC health check failed:', error.message);
      setRpcStatus('error');
      setLastCheck(new Date());
    }
  };

  if (!networkInfo || networkInfo.chainId !== 10143) {
    return null; // Only show for Monad
  }

  const getStatusConfig = () => {
    switch (rpcStatus) {
      case 'excellent':
        return {
          icon: '🟢',
          text: 'RPC: Excellent',
          color: '#10b981',
          description: 'Monad RPC responding quickly'
        };
      case 'good':
        return {
          icon: '🟡',
          text: 'RPC: Good',
          color: '#f59e0b',
          description: 'Monad RPC responding (slight delay)'
        };
      case 'slow':
        return {
          icon: '🟠',
          text: 'RPC: Slow',
          color: '#ef4444',
          description: 'Monad RPC slow - retries may be needed'
        };
      case 'degraded':
        return {
          icon: '🔴',
          text: 'RPC: Degraded',
          color: '#dc2626',
          description: 'Monad RPC having issues'
        };
      case 'error':
        return {
          icon: '⚠️',
          text: 'RPC: Error',
          color: '#991b1b',
          description: 'Cannot reach Monad RPC - check connection'
        };
      default:
        return {
          icon: '⏳',
          text: 'Checking RPC...',
          color: '#6b7280',
          description: 'Testing connection to Monad'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="network-status" style={{ borderColor: config.color }}>
      <div className="status-indicator">
        <span className="status-icon">{config.icon}</span>
        <div className="status-text">
          <span className="status-label" style={{ color: config.color }}>
            {config.text}
          </span>
          <span className="status-description">{config.description}</span>
          {lastCheck && (
            <span className="status-time">
              Last check: {lastCheck.toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>
      
      {rpcStatus === 'error' || rpcStatus === 'degraded' ? (
        <div className="status-actions">
          <button onClick={checkMonadRpc} className="status-refresh-btn">
            🔄 Recheck
          </button>
          <a 
            href="https://testnet.monad.xyz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="status-link-btn"
          >
            Check Status Page
          </a>
        </div>
      ) : null}
      
      <div className="status-tips">
        <p>💡 <strong>Tip:</strong> Monad uses aggressive retry logic. Wait for auto-retries to complete.</p>
      </div>
    </div>
  );
}

export default NetworkStatus;
