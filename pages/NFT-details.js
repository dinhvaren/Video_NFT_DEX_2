import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

import { Button, Category, Brand } from "../components/componentsindex";
import NFTDetailsPage from "../NFTDetailsPage/NFTDetailsPage";

// Import dữ liệu từ Smart Contract thông qua Context API
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
const NFTDetails = () => {
  // Lấy thông tin tài khoản hiện tại từ Context
  const { currentAccount } = useContext(NFTMarketplaceContext);
  // Khởi tạo state để lưu thông tin NFT
  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
  });
  // Sử dụng useRouter để lấy dữ liệu từ URL
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    // Cập nhật state NFT với dữ liệu lấy từ query trên URL
    setNft(router.query);
  }, [router.isReady]);

  return (
    <div>
      {/* Hiển thị chi tiết NFT */}
      <NFTDetailsPage nft={nft} />
      {/* Hiển thị danh mục NFT */}
      <Category />
      <Brand />
    </div>
  );
};

export default NFTDetails;
