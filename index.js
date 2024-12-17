const fs = require('fs');
const path = require('path');

const { checkOdosAirdrop } = require(`./protocols/odos.js`);
const { checkPenguAirdrop } = require(`./protocols/pengu.js`);

async function checkMultipleWallets() {
    const inputFile = path.resolve(__dirname, 'wallets.txt');
    const outputFile = path.resolve(__dirname, 'results.csv');
    const walletAddresses = fs.readFileSync(inputFile, 'utf8').trim().split(/\r?\n/); // Read wallet addresses from wallets.txt
    const results = ['wallet,tokens']; // CSV header
    let totalTokens = 0; // Keeping track of all the tokens received.
    for (const wallet of walletAddresses) { // Checking all of the wallets.
        console.log(`Checking airdrop for: ${wallet}`);
        const tokens = await checkPenguAirdrop(wallet);
        totalTokens += tokens; // Adding the amount of tokens for this wallet to the total.
        results.push(`${wallet},${tokens}`);
        await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 0.1 seconds before the next request
    }
    results.push(`Total Tokens:,${totalTokens}`); // Add total tokens to the CSV
    fs.writeFileSync(outputFile, results.join("\r\n")); // Write results to CSV
    console.log(`Results written to ${outputFile}`);
}

checkMultipleWallets().catch(console.error);