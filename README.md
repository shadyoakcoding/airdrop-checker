# odos-checker
A lil sumn sumn to check a text file of wallet addresses for ODOS airdrop claims.

## How to use:
1. Add a your wallet addresses in wallets.txt. There should be one address per line with no additional characters.

2. Edit line 15 of index.js to use the checker function you want. Here is the list of functions at the moment:
- checkOdosAirdrop
- checkPenguAirdrop

3. Run the index.js and wait for results.csv to be generated. The results will be a csv file with wallet addresses and token amounts.