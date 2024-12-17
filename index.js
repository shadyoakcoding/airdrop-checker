const fs = require('fs');
const path = require('path');

const { checkOdosAirdrop } = require(`./protocols/odos.js`);
const { checkPenguAirdrop } = require(`./protocols/pengu.js`);

async function checkMultipleWallets() {
    const inputFile = path.resolve(__dirname, 'wallets.txt');
    const outputFile = path.resolve(__dirname, 'results.csv');
    const walletAddresses = fs.readFileSync(inputFile, 'utf8').trim().split(/\r?\n/); // Read wallet addresses from wallets.txt
    const results = ['wallet,tokens']; // CSV header
    const walletResults = await Promise.all(walletAddresses.map(async (wallet) => {
        console.log(`Checking airdrop for: ${wallet}`);
        const tokens = await checkPenguAirdrop(wallet);
        return { wallet, tokens }; // Return results for each wallet
    }));

    // Process results
    let totalTokens = 0;
    walletResults.forEach(({ wallet, tokens }) => {
        totalTokens += tokens; // Add tokens to the total
        results.push(`${wallet},${tokens}`); // Add wallet and tokens to results
    });
    results.push(`Total Tokens:,${totalTokens}`); // Add total tokens to the CSV
    fs.writeFileSync(outputFile, results.join("\r\n")); // Write results to CSV
    console.log(`Results written to ${outputFile}`);
}

checkMultipleWallets().catch(console.error);