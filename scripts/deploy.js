const hre = require("hardhat");

async function main() {
  // Lấy factory của smart contract NFTMarketplace
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  // Triển khai smart contract lên blockchain
  const nftMarketplace = await NFTMarketplace.deploy();
  // Chờ smart contract được triển khai thành công
  await nftMarketplace.deployed();
  // In địa chỉ của smart contract sau khi triển khai
  console.log(` deployed contract Address ${nftMarketplace.address}`);
}
// Gọi hàm main() và xử lý lỗi nếu có
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
