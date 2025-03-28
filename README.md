# SeismicDeploy

This script automates contract deployment and transactions on the Seismic Testnet.

## Features
- Deploys smart contracts on the Seismic Testnet.
- Sends periodic transactions to random addresses.
- Adjustable time intervals and limits.

## Requirements
Ensure you have the following installed:
- Node.js (version 18+)
- \`ethers\` library
- \`fs\` module

## Installation

Clone the repository and install dependencies:

\`\`\`bash
:  git clone https://github.com/Villageppl/SeismicDeploy.git
  

cd SeismicDeploy


npm install ethers fs
\`\`\`

## Usage

1. Add your private key to \`privateKey.txt\` 
2. Run the script with:

\`\`\`bash
node deploy.js
\`\`\`

## Notes
- The script interacts with the Seismic Testnet at \`https://node-2.seismicdev.net/rpc\`.
- Ensure you have enough testnet funds for transactions.

## License
MIT
EOF
