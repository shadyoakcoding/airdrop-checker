const { getNextProxy } = require(`../proxies/proxyHelper.js`);

async function checkPenguAirdrop(walletAddress) { // A function to check if a specified address will be receiving the Pengu airdrop. Returns 0 if not
    try {
        const proxy = getNextProxy();
        const { default: TlsClient } = await import('tlsclientwrapper');
        const client = new TlsClient({ // Instantiate the TlsClient class
            tlsClientIdentifier: "chrome_120",
            proxyUrl: `http://${proxy.username}:${proxy.password}@${proxy.ip}:${proxy.port}`
        });
        const response = await client.get(`https://api.clusters.xyz/v0.1/airdrops/pengu/eligibility/${walletAddress}?`); // Making a request to the Pengu API with a proxy
        console.log(response.body)
        const data = await JSON.parse(response.body);
        console.log(data)
        let totalTokens = 0;
        for (const category of data.categories) {
            totalTokens += category.total;
        }
        client.terminate();
        return totalTokens;
    } catch (error) {
        console.error(`Error checking airdrop for wallet ${walletAddress}:`, error);
        return checkPenguAirdrop(walletAddress);
    }
}

module.exports = { checkPenguAirdrop }