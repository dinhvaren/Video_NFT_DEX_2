import nftMarketplace from "./NFTMarketplace.json";

// Lấy địa chỉ hợp đồng và mạng blockchain từ biến môi trường
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const NETWORK = process.env.NEXT_PUBLIC_NETWORK;

//địa chỉ hợp đồng và ABI của hợp đồng NFT Marketplace
export const NFTMarketplaceAddress = CONTRACT_ADDRESS;
export const NFTMarketplaceABI = nftMarketplace.abi;

// Định nghĩa các mạng blockchain được hỗ trợ
const networks = {
  optimism_sepolia: {
    chainId: "0x45", // Mã hex của chuỗi Optimism Sepolia (69)
    chainName: "Optimism Sepolia",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: ["https://sepolia.optimism.io"],
    blockExplorerUrls: ["https://sepolia-optimism.etherscan.io"]
},
  polygon_amoy: {
    chainId: "0x13882", // Mã hex của chuỗi Polygon Amoy (80002)
    chainName: "Polygon Amoy",
    nativeCurrency: {
      name: "POL",
      symbol: "POL",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-amoy.polygon.technology/"],
    blockExplorerUrls: ["https://amoy.polygonscan.com/"],
  },
  polygon: {
    chainId: "0x89", // Mã hex của chuỗi Polygon Mainnet (137)
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
    chainId: `0x${Number(1337).toString(16)}`,  // Mã hex của mạng cục bộ (1337)
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

// Hàm thay đổi mạng trên MetaMask
const changeNetwork = async ({ networkName }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          // Lấy thông tin mạng từ danh sách networks
          ...networks[networkName],
        },
      ],
    });
  } catch (err) {
    console.log(err.message);
  }
};

// Hàm kiểm tra và chuyển đổi mạng blockchain dựa trên biến môi trường
export const handleNetworkSwitch = async () => {
  const networkName = NETWORK;
  await changeNetwork({ networkName });
};
