import React from 'react';

function ErrorHandler({ error, onRetry, onDemoMode }) {
  const getErrorInfo = (error) => {
    const errorMessage = error.message || error.toString();
    
    if (errorMessage.includes('Transaction has been reverted')) {
      return {
        type: 'revert',
        title: '🚫 Transaction Reverted',
        message: 'The blockchain rejected this transaction',
        explanation: 'This usually means the token doesn\'t exist on the blockchain or you don\'t own it.',
        solutions: [
          'The token might be a demo/test token that doesn\'t exist on the real blockchain',
          'Try using demo mode for testing functionality',
          'Check if you actually own this token on the blockchain'
        ]
      };
    }
    
    if (errorMessage.includes('Token does not exist')) {
      return {
        type: 'ownership',
        title: '🎫 Token Not Found',
        message: 'This token doesn\'t exist or you don\'t own it',
        explanation: 'The token ID you\'re trying to use isn\'t found on the blockchain.',
        solutions: [
          'This might be a demo token for testing purposes',
          'Check the token ID is correct',
          'Use demo mode to test the functionality'
        ]
      };
    }
    
    if (errorMessage.includes('insufficient funds') || errorMessage.includes('gas')) {
      return {
        type: 'gas',
        title: '⛽ Insufficient Gas',
        message: 'Not enough MON tokens for transaction fees',
        explanation: 'You need MON tokens to pay for blockchain transaction fees.',
        solutions: [
          'Get MON tokens from https://faucet.monad.xyz/',
          'Wait a few minutes and try again',
          'Use demo mode for testing without gas fees'
        ]
      };
    }
    
    return {
      type: 'unknown',
      title: '❌ Unknown Error',
      message: errorMessage,
      explanation: 'An unexpected error occurred.',
      solutions: [
        'Try refreshing the page',
        'Check your internet connection',
        'Use demo mode for testing'
      ]
    };
  };

  const errorInfo = getErrorInfo(error);

  return (
    <div style={{
      padding: '20px',
      background: '#fff5f5',
      border: '2px solid #fed7d7',
      borderRadius: '8px',
      margin: '20px 0'
    }}>
      <h3 style={{ color: '#c53030', margin: '0 0 10px 0' }}>
        {errorInfo.title}
      </h3>
      
      <p style={{ margin: '10px 0', fontWeight: 'bold' }}>
        {errorInfo.message}
      </p>
      
      <p style={{ margin: '10px 0', color: '#666' }}>
        {errorInfo.explanation}
      </p>
      
      <div style={{ margin: '15px 0' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#2d3748' }}>💡 Solutions:</h4>
        <ul style={{ margin: '0', paddingLeft: '20px' }}>
          {errorInfo.solutions.map((solution, index) => (
            <li key={index} style={{ margin: '5px 0', color: '#4a5568' }}>
              {solution}
            </li>
          ))}
        </ul>
      </div>
      
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {onRetry && (
          <button
            onClick={onRetry}
            style={{
              padding: '10px 20px',
              background: '#3182ce',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            🔄 Try Again
          </button>
        )}
        
        {onDemoMode && (
          <button
            onClick={onDemoMode}
            style={{
              padding: '10px 20px',
              background: '#f6ad55',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            🎭 Use Demo Mode
          </button>
        )}
        
        <a
          href="https://faucet.monad.xyz/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '10px 20px',
            background: '#38a169',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            display: 'inline-block'
          }}
        >
          💰 Get MON Tokens
        </a>
      </div>
    </div>
  );
}

export default ErrorHandler;