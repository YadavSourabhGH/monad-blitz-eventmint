import React, { useState, useEffect } from 'react';
import { getWeb3, getNetworkInfo, CONTRACT_ADDRESSES } from '../web3Service';

function SystemStatus({ account }) {
  const [status, setStatus] = useState({
    web3Connected: false,
    networkInfo: null,
    contractsDeployed: false,
    userBalance: '0',
    loading: true
  });

  useEffect(() => {
    checkSystemStatus();
  }, [account]);

  const checkSystemStatus = async () => {
    try {
      setStatus(prev => ({ ...prev, loading: true }));
      
      // Check Web3 connection
      const web3 = getWeb3();
      const web3Connected = !!web3;
      
      // Get network info
      const networkInfo = await getNetworkInfo();
      
      // Check contract deployment
      let contractsDeployed = false;
      try {
        const eventChainCode = await web3.eth.getCode(CONTRACT_ADDRESSES.EventChainContract);
        const managerCode = await web3.eth.getCode(CONTRACT_ADDRESSES.EventChainEventManagerContract);
        contractsDeployed = eventChainCode !== '0x' && managerCode !== '0x';
      } catch (error) {
        console.log('Contract check failed:', error);
      }
      
      // Get user balance
      let userBalance = '0';
      if (account) {
        try {
          const balance = await web3.eth.getBalance(account);
          userBalance = web3.utils.fromWei(balance, 'ether');
        } catch (error) {
          console.log('Balance check failed:', error);
        }
      }
      
      setStatus({
        web3Connected,
        networkInfo,
        contractsDeployed,
        userBalance,
        loading: false
      });
      
    } catch (error) {
      console.error('System status check failed:', error);
      setStatus(prev => ({ ...prev, loading: false }));
    }
  };

  if (status.loading) {
    return (
      <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px', margin: '20px 0' }}>
        <h3>🔍 Checking System Status...</h3>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px', margin: '20px 0' }}>
      <h3>🔧 System Status</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginTop: '15px' }}>
        
        <div style={{ padding: '15px', background: 'white', borderRadius: '5px', border: '1px solid #ddd' }}>
          <h4>{status.web3Connected ? '✅' : '❌'} Web3 Connection</h4>
          <p>{status.web3Connected ? 'Connected' : 'Not Connected'}</p>
        </div>
        
        <div style={{ padding: '15px', background: 'white', borderRadius: '5px', border: '1px solid #ddd' }}>
          <h4>{status.networkInfo ? '✅' : '❌'} Network</h4>
          <p>{status.networkInfo ? `${status.networkInfo.name} (${status.networkInfo.chainId})` : 'Unknown'}</p>
        </div>
        
        <div style={{ padding: '15px', background: 'white', borderRadius: '5px', border: '1px solid #ddd' }}>
          <h4>{status.contractsDeployed ? '✅' : '❌'} Contracts</h4>
          <p>{status.contractsDeployed ? 'Deployed' : 'Not Found'}</p>
        </div>
        
        <div style={{ padding: '15px', background: 'white', borderRadius: '5px', border: '1px solid #ddd' }}>
          <h4>💰 Balance</h4>
          <p>{parseFloat(status.userBalance).toFixed(4)} {status.networkInfo?.currency || 'ETH'}</p>
        </div>
        
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px', background: 'white', borderRadius: '5px', border: '1px solid #ddd' }}>
        <h4>📍 Contract Addresses</h4>
        <p><strong>EventChain:</strong> {CONTRACT_ADDRESSES.EventChainContract}</p>
        <p><strong>Manager:</strong> {CONTRACT_ADDRESSES.EventChainEventManagerContract}</p>
      </div>
      
      {!status.contractsDeployed && (
        <div style={{ marginTop: '15px', padding: '15px', background: '#fff3cd', borderRadius: '5px', border: '1px solid #ffeaa7' }}>
          <h4>⚠️ Issue Detected</h4>
          <p>Contracts not found at the specified addresses. This is why tickets may not load properly.</p>
          <p><strong>Solution:</strong> The app will use demo mode for testing purposes.</p>
        </div>
      )}
      
      <button 
        onClick={checkSystemStatus}
        style={{
          marginTop: '15px',
          padding: '10px 20px',
          background: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        🔄 Refresh Status
      </button>
    </div>
  );
}

export default SystemStatus;