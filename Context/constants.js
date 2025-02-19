import nftMarketplace from "./NFTMarketplace.json";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const NETWORK = process.env.NEXT_PUBLIC_NETWORK;

//NFT MARKETPLACE
//--------POLYGON AMOY TESTNET
export const NFTMarketplaceAddress = CONTRACT_ADDRESS;
export const NFTMarketplaceABI = nftMarketplace.abi;

//NETWORK
const networks = {
  polygon_amoy: {
    chainId: "0x13882", // 80002 in hex
    chainName: "Polygon Amoy",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-amoy.polygon.technology/"],
    blockExplorerUrls: ["https://amoy.polygonscan.com/"],
  },
  polygon: {
    chainId: "0x89", // 137 in hex
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com/", "https://rpc.ankr.com/polygon"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  localhost: {
    chainId: `0x${Number(1337).toString(16)}`,
    chainName: "localhost",
    nativeCurrency: {
      name: "GO",
      symbol: "GO",
      decimals: 18,
    },
    rpcUrls: ["http://127.0.0.1:8545/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
};

const changeNetwork = async ({ networkName }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName],
        },
      ],
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const handleNetworkSwitch = async () => {
  const networkName = NETWORK;
  await changeNetwork({ networkName });
};
