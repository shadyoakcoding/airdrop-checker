async function checkOdosAirdrop(walletAddress) { // A function to check if a specified address will be receiving the odos airdrop. Returns 0 if not
    try {
        const response = await fetch(`https://api.odos.xyz/loyalty/users/${walletAddress}/balances`); // Making a request to the ODOS API
        const data = await response.json(); // Making the response json format
        let number = data.data.pendingTokenBalance / 1e18;
        return parseFloat(number.toFixed(2));
    } catch (error) {
        console.error(`Error checking airdrop for wallet ${walletAddress}:`, error);
    }
}

module.exports = { checkOdosAirdrop }