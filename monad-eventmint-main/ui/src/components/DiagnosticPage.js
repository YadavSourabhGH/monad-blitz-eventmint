import React, { useState } from 'react';
import SystemStatus from './SystemStatus';
import { getUserTickets, getTicketStatus, CONTRACT_ADDRESSES } from '../web3Service';

function DiagnosticPage({ account }) {
  const [diagnosticResults, setDiagnosticResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const runDiagnostics = async () => {
    setLoading(true);
    const results = {
      timestamp: new Date().toLocaleString(),
      tests: []
    };

    // Test 1: Check getUserTickets
    try {
      console.log('🧪 Testing getUserTickets...');
      const tickets = await getUserTickets(account);
      results.tests.push({
        name: 'Get User Tickets',
        status: 'success',
        result: `Found ${tickets.length} tickets`,
        details: tickets
      });
    } catch (error) {
      results.tests.push({
        name: 'Get User Tickets',
        status: 'error',
        result: error.message,
        details: null
      });
    }

    // Test 2: Check ticket validation with a test token
    try {
      console.log('🧪 Testing ticket validation...');
      const testTokenId = Date.now();
      const status = await getTicketStatus(testTokenId);
      results.tests.push({
        name: 'Ticket Validation',
        status: 'success',
        result: `Token ${testTokenId} - Valid: ${status.isValid}, Used: ${status.isUsed}`,
        details: status
      });
    } catch (error) {
      results.tests.push({
        name: 'Ticket Validation',
        status: 'error',
        result: error.message,
        details: null
      });
    }

    // Test 3: Contract addresses
    results.tests.push({
      name: 'Contract Addresses',
      status: 'info',
      result: 'Contract addresses configured',
      details: CONTRACT_ADDRESSES
    });

    setDiagnosticResults(results);
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>🔧 EventChain Diagnostics</h1>
      <p>Comprehensive system diagnostics to identify and fix issues</p>

      <SystemStatus account={account} />

      <div style={{ marginTop: '30px' }}>
        <h2>🧪 Run Diagnostics</h2>
        <button 
          onClick={runDiagnostics}
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
          {loading ? '🔄 Running Tests...' : '🚀 Run Full Diagnostics'}
        </button>
      </div>

      {diagnosticResults && (
        <div style={{ marginTop: '30px' }}>
          <h2>📊 Diagnostic Results</h2>
          <p><strong>Run at:</strong> {diagnosticResults.timestamp}</p>
          
          <div style={{ marginTop: '20px' }}>
            {diagnosticResults.tests.map((test, index) => (
              <div 
                key={index}
                style={{
                  padding: '15px',
                  margin: '10px 0',
                  background: 'white',
                  borderRadius: '5px',
                  border: `2px solid ${
                    test.status === 'success' ? '#27ae60' : 
                    test.status === 'error' ? '#e74c3c' : '#3498db'
                  }`
                }}
              >
                <h3>
                  {test.status === 'success' ? '✅' : 
                   test.status === 'error' ? '❌' : 'ℹ️'} {test.name}
                </h3>
                <p><strong>Result:</strong> {test.result}</p>
                {test.details && (
                  <details style={{ marginTop: '10px' }}>
                    <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                      View Details
                    </summary>
                    <pre style={{ 
                      background: '#f8f9fa', 
                      padding: '10px', 
                      borderRadius: '3px',
                      overflow: 'auto',
                      fontSize: '12px'
                    }}>
                      {JSON.stringify(test.details, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: '40px', padding: '20px', background: '#e8f4fd', borderRadius: '8px' }}>
        <h2>💡 Common Issues & Solutions</h2>
        
        <div style={{ marginTop: '15px' }}>
          <h3>🎫 "No tickets found" or "Transfer failed"</h3>
          <ul>
            <li><strong>Cause:</strong> Contract not deployed or incorrect address</li>
            <li><strong>Solution:</strong> App automatically uses demo mode for testing</li>
            <li><strong>Action:</strong> Check System Status above for contract deployment</li>
          </ul>
        </div>

        <div style={{ marginTop: '15px' }}>
          <h3>🔄 "Data not updating"</h3>
          <ul>
            <li><strong>Cause:</strong> RPC connection issues or caching</li>
            <li><strong>Solution:</strong> Use the refresh buttons or reload the page</li>
            <li><strong>Action:</strong> Try the "Force Reload Page" button</li>
          </ul>
        </div>

        <div style={{ marginTop: '15px' }}>
          <h3>⚡ "Validator not working"</h3>
          <ul>
            <li><strong>Cause:</strong> Network connectivity or contract issues</li>
            <li><strong>Solution:</strong> Validator has demo fallback mode</li>
            <li><strong>Action:</strong> Try validating any numeric token ID</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DiagnosticPage;