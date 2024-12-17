async function checkPenguAirdrop(walletAddress) { // A function to check if a specified address will be receiving the Pengu airdrop. Returns 0 if not
    try {
        const response = await fetch(`https://api.clusters.xyz/v0.1/airdrops/pengu/eligibility/${walletAddress}?`); // Making a request to the Pengu API
        const data = await response.json(); // Making the response json format
        let totalTokens = 0;
        for (const category of data.categories) {
            totalTokens += category.total;
        }
        return totalTokens;
    } catch (error) {
        console.error(`Error checking airdrop for wallet ${walletAddress}:`, error);
    }
}

module.exports = { checkPenguAirdrop }