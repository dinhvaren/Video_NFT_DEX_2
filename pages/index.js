import React, { useState, useEffect, useContext } from "react";

import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  BigNFTSilder,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  AudioLive,
  FollowerTab,
  Slider,
  Brand,
  Video,
  Loader,
} from "../components/componentsindex";
import {
  NFTCardTwo
} from "../collectionPage/collectionIndex";
import { getTopCreators } from "../TopCreators/TopCreators";

// Import dữ liệu từ smart contract
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const Home = () => {
  // Lấy hàm kiểm tra kết nối ví và tài khoản hiện tại từ context
  const { checkIfWalletConnected, currentAccount } = useContext(
    NFTMarketplaceContext
  );
  // Kiểm tra ví có kết nối hay không khi component được render
  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  // Lấy hàm fetch NFT từ context
  const { fetchNFTs } = useContext(NFTMarketplaceContext);
  // State lưu trữ danh sách NFT
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  // Fetch danh sách NFT khi có tài khoản ví hiện tại
  useEffect(() => {
    if (currentAccount) {
      fetchNFTs().then((items) => {
        console.log(nfts);
        setNfts(items?.reverse()); // Đảo ngược danh sách NFT để hiển thị NFT mới nhất trước
        setNftsCopy(items);
      });
    }
  }, [currentAccount]);

  // Lấy danh sách những người sáng tạo hàng đầu từ danh sách NFT
  const creators = getTopCreators(nfts);
  // console.log(creators);

  return (
    <div className={Style.homePage}>
      {/* Phần hiển thị tiêu đề và giới thiệu */}
      <HeroSection />
      <Service />
      <BigNFTSilder />
      <Title
        heading="Audio Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      {/* Phần hiển thị bộ sưu tập âm thanh */}
      <AudioLive />
      {/* Hiển thị danh sách những người sáng tạo nổi bật */}
      {creators.length == 0 ? (
        <Loader />
      ) : (
        <FollowerTab TopCreator={creators} />
      )}
      <Slider />
      <Collection />
      {/* Hiển thị NFT nổi bật */}
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <Filter />
      {nfts.length == 0 ? <Loader /> : <NFTCard NFTData={nfts} />}
      {/* Hiển thị danh mục NFT */}
      <Title
        heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categories."
      />
      <Category />
      {/* Phần đăng ký nhận tin và thương hiệu */}
      <Subscribe />
      <Brand />
      <Video />
    </div>
  );
};

export default Home;
