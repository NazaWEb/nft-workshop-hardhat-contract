require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    goerli: {
      url: process.env.GOERLI_RPC || "",
      accounts: [process.env.PRIVATE_ONE || ""],
    },
  },
  etherscan: {
    apiKey: "AEDRXVRA4TDK4SE1BTVZI3TV189HSG7VFN",
  },
};
