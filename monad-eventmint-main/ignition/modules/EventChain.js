const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("EventChain", (m) => {
  // Use the first account as the deployer/owner (comes from hardhat)
  // This will be handled automatically by Hardhat Ignition
  
  // Deploy EventChainContract - owner will be set automatically
  const eventChainContract = m.contract("EventChainContract", [m.getAccount(0)]);
  
  // Deploy EventChainEventManagerContract with EventChainContract reference
  const eventChainEventManagerContract = m.contract("EventChainEventManagerContract", [m.getAccount(0), eventChainContract]);
  
  return { eventChainContract, eventChainEventManagerContract };
});