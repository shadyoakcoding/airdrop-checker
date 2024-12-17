const fs = require('fs');
const path = require('path');

let proxyIndices = {}; // Initialize an object to store indices for different proxy uses

function getNextProxy(requestType = 'default') { // If there's no index for the request type, initialize it to 0
    const filePath = path.resolve(__dirname, './proxies.txt');
    const proxies = fs.readFileSync(filePath, 'utf-8')
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean);
    if (!(requestType in proxyIndices)) {
        proxyIndices[requestType] = 0;
    }
    const currentIndex = proxyIndices[requestType]; // Get the current proxy based on the request type's index
    const proxy = proxies[currentIndex].split(':');
    const result = { ip: proxy[0], port: proxy[1], username: proxy[2], password: proxy[3] };
    proxyIndices[requestType] = (currentIndex + 1) % proxies.length; // Increment the index for the specific request type and reset if necessar
    return result;
}

module.exports = { getNextProxy };