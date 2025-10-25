const hre = require("hardhat");

async function main() {
  console.log("Deploying EventTicketNFT contract to Monad...");

  // Get the contract factory
  const EventTicketNFT = await hre.ethers.getContractFactory("EventTicketNFT");
  
  // Deploy the contract
  const eventTicketNFT = await EventTicketNFT.deploy();
  
  await eventTicketNFT.waitForDeployment();
  
  const address = await eventTicketNFT.getAddress();
  
  console.log("✅ EventTicketNFT deployed to:", address);
  console.log("\n📝 Update the contract address in src/lib/contracts.ts:");
  console.log(`   EventTicketNFT: '${address}'`);
  
  // Wait for a few block confirmations
  console.log("\n⏳ Waiting for block confirmations...");
  await eventTicketNFT.deploymentTransaction().wait(5);
  
  console.log("✅ Contract deployed and confirmed!");
  
  // Verify contract on explorer (if API key is available)
  if (process.env.MONAD_API_KEY) {
    console.log("\n🔍 Verifying contract on Monad Explorer...");
    try {
      await hre.run("verify:verify", {
        address: address,
        constructorArguments: [],
      });
      console.log("✅ Contract verified!");
    } catch (error) {
      console.log("⚠️  Verification failed:", error.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
