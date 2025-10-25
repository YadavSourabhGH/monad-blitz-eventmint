require("@nomicfoundation/hardhat-toolbox");
let secret;
try {
  secret = require('./.secret.json');
} catch (e) {
  secret = { projectId: "", accountPrivateKey: "" };
}

const networks = {
  hardhat: {},
  localhost: {
    url: "http://127.0.0.1:8545",
    chainId: 31337
  },
  ganache: {
    url: "http://127.0.0.1:7545",
    allowUnlimitedContractSize: true,
    gas: 2100000,
    gasPrice: 8000000000
  }
};

// Add Sepolia network (requires projectId AND valid private key from .secret.json)
if (secret.projectId && secret.accountPrivateKey && secret.accountPrivateKey.length === 66) {
  networks.sepolia = {
    url: `https://eth-sepolia.g.alchemy.com/v2/${secret.projectId}`,
    accounts: [secret.accountPrivateKey]
  };
}

// Only add amoy network if credentials are provided
if (secret.projectId && secret.accountPrivateKey && secret.accountPrivateKey.length === 66) {
  networks.amoy = {
    url: `https://polygon-amoy.g.alchemy.com/v2/${secret.projectId}`,
    accounts: [secret.accountPrivateKey]
  };
}

// Add Monad network with multiple RPC endpoints for redundancy
if (secret.accountPrivateKey && secret.accountPrivateKey.length === 66) {
  networks.monad = {
    url: "https://testnet-rpc.monad.xyz",
    accounts: [secret.accountPrivateKey],
    chainId: 10143,
    gasPrice: "auto",
    timeout: 60000, // 60 second timeout
    httpHeaders: {
      "Content-Type": "application/json"
    }
  };
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  settings: {
    optimizer: {
      enabled: true,
    },
  },
  networks: networks
};
