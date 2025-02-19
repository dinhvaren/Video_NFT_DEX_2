import React from "react";

//INTERNAL IMPORT
import Style from "../styles/collection.module.css";
import images from "../img";
import {
  Banner,
  CollectionProfile,
  NFTCardTwo,
} from "../collectionPage/collectionIndex";
import { Slider, Brand } from "../components/componentsindex";
import Filter from "../components/Filter/Filter";

// Danh sách NFT trong bộ sưu tập
const collection = () => {
  const collectionArray = [
    {
      image: "img/nft-image-1.png",
    },
    {
      image: "img/nft-image-2.png",
    },
    {
      image: "img/nft-image-3.png",
    },
    {
      image: "img/nft-image-1.png",
    },
    {
      image: "img/nft-image-2.png",
    },
    {
      image: "img/nft-image-3.png",
    },
    {
      image: "img/nft-image-1.png",
    },
    {
      image: "img/nft-image-2.png",
    },
  ];
  return (
    <div className={Style.collection}>
      {/* Banner hiển thị hình nền của bộ sưu tập */}
      <Banner bannerImage={images.creatorbackground1} />
      {/* Hồ sơ của bộ sưu tập */}
      <CollectionProfile />
      {/* Bộ lọc NFT */}
      <Filter />
      {/* Hiển thị danh sách NFT */}
      <NFTCardTwo NFTData={collectionArray} />
      {/* Slider hiển thị bộ sưu tập nổi bật */}
      <Slider />
      {/* Hiển thị thương hiệu hoặc logo */}
      <Brand />
    </div>
  );
};

export default collection;
