// hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    polygon: {
      url: process.env.POLYGON_URL || process.env.POLYGON_URL_OPTIONAL,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 137, // Mainnet
    },
    polygon_amoy: {
      url: process.env.AMOY_URL || process.env.AMOY_URL_OPTIONAL,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 80002, // testnet
    },
  },
  paths: {
    artifacts: "./artifacts",
    sources: "./contracts",
    cache: "./cache",
    tests: "./test",
  },
};
