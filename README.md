# airdrop-checker
A repo for checking how much allo you go for various airdrops.

## Warning:
This repo uses the library https://github.com/DemonMartin/tlsClient which is not very popular which is a wrapper of https://github.com/bogdanfinn/tls-client. These libraries are used for making requests not look like bots in order to avoid being blocked along with letting you use proxies for the requests.

I have __not__ looked at every line of code of the file but I will say that I have been using it for a while and had nothing bad happen. I do not take any responsibility for anything that happens and I encourage you to look through the source code yourself.

If you have a ton of wallets to check and are scared of running this program, I understand that. Feel free to send me a DM on discord and I would be happy to check for you. I will not keep your list of wallets.

## How to use:
1. Run `npm i tlsclientwrapper`. This library is for using proxies to make requests.

2. Add a your wallet addresses in wallets.txt. There should be one address per line with no additional characters.

3. Create a proxies.txt file in the proxies folder and add your proxies. There should be one per line in the format IP:PORT:USERNAME:PASSWORD. It is best if these are residential proxies.

4. Edit line 15 of index.js to use the checker function you want. Here is the list of functions at the moment:
- checkOdosAirdrop
- checkPenguAirdrop

5. Run the index.js and wait for results.csv to be generated. The results will be a csv file with wallet addresses and token amounts.