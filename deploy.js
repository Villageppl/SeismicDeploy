const { ethers } = require("ethers");
const fs = require("fs");

// Load private key
const privateKey = fs.readFileSync("privateKey.txt", "utf8").trim();

// Seismic Testnet RPC
const provider = new ethers.providers.JsonRpcProvider("https://node-2.seismicdev.net/rpc");
const wallet = new ethers.Wallet(privateKey, provider);

// Smart contract bytecode and ABI (Replace with actual contract details)
const contractABI = [];
const contractBytecode = "0x";

// Time settings
const startTime = Date.now();
const runDuration = 24 * 60 * 60 * 1000; // 24 hours
const maxDeployments = 100; // Increased to 100 deployments per day
let deploymentCount = 0;
let transferCount = 0;

async function deployContract() {
    try {
        console.log("Deploying contract...");
        const factory = new ethers.ContractFactory(contractABI, contractBytecode, wallet);
        const contract = await factory.deploy();
        await contract.deployed();
        console.log(`✅ Contract deployed at: ${contract.address}`);
        console.log(`🔗 Explorer: https://explorer-2.seismicdev.net/address/${contract.address}`);
        deploymentCount++;
    } catch (error) {
        console.error("❌ Error deploying contract:", error);
    }
}

async function sendRandomTransfer() {
    try {
        const randomAddress = ethers.Wallet.createRandom().address;
        const amount = ethers.utils.parseUnits("1", "wei"); // Lowest possible amount
        console.log(`Sending ${amount.toString()} wei to ${randomAddress}...`);
        const tx = await wallet.sendTransaction({
            to: randomAddress,
            value: amount
        });
        await tx.wait();
        console.log(`✅ Transfer successful: ${tx.hash}`);
        console.log(`🔗 Explorer: https://explorer-2.seismicdev.net/tx/${tx.hash}`);
        transferCount++;
    } catch (error) {
        console.error("❌ Error sending transaction:", error);
    }
}

async function showBalance() {
    try {
        const balance = await provider.getBalance(wallet.address);
        console.log(`💰 Wallet balance: ${ethers.utils.formatEther(balance)} ETH`);
    } catch (error) {
        console.error("❌ Error fetching balance:", error);
    }
}

async function mainLoop() {
    while (Date.now() - startTime < runDuration && deploymentCount < maxDeployments) {
        await deployContract();

        if (deploymentCount % 7 === 0) { // Every 7 deployments, send 1 transaction
            await sendRandomTransfer();
        }

        await showBalance();

        console.log(`🚀 Deployments: ${deploymentCount}/${maxDeployments} | 📤 Transfers: ${transferCount}`);

        // Wait 2 to 15 minutes before next interaction
        const delay = Math.floor(Math.random() * (15 - 2 + 1) + 2) * 60 * 1000;
        console.log(`⏳ Waiting ${delay / (60 * 1000)} minutes before next action...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
    }

    console.log("✅ 24-hour run completed or max deployments reached.");
}

mainLoop();
