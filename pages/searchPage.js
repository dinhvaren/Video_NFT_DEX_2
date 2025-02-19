import React, { useEffect, useState, useContext } from "react";

import Style from "../styles/searchPage.module.css";
import { Slider, Brand, Loader } from "../components/componentsindex";
import { SearchBar } from "../SearchPage/searchBarIndex";
import { Filter } from "../components/componentsindex";

import { NFTCardTwo, Banner } from "../collectionPage/collectionIndex";
import images from "../img";

//iport smart contract
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const searchPage = () => {
  const { fetchNFTs, setError, currentAccount } = useContext(
    // Lấy dữ liệu từ context
    NFTMarketplaceContext
  );
  // Khai báo state để lưu trữ danh sách NFT
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  // Hook useEffect để lấy danh sách NFT khi tài khoản hiện tại thay đổi
  useEffect(() => {
    try {
      if (currentAccount) {
        fetchNFTs().then((items) => {
          setNfts(items?.reverse()); // Đảo ngược danh sách NFT để hiển thị mới nhất trước
          setNftsCopy(items); // Lưu trữ bản sao danh sách NFT để tìm kiếm
          console.log(nfts);
        });
      }
    } catch (error) {
      setError("Please reload the browser", error);
    }
  }, [currentAccount]);
  // Hàm xử lý tìm kiếm NFT theo tên
  const onHandleSearch = (value) => {
    const filteredNFTS = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNFTS.length === 0) {
      setNfts(nftsCopy); // Nếu không tìm thấy, hiển thị danh sách gốc
    } else {
      setNfts(filteredNFTS);
    }
  };
  // Hàm xóa bộ lọc tìm kiếm, hiển thị lại toàn bộ NFT
  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  // const collectionArray = [
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  // ];
  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar
        onHandleSearch={onHandleSearch}
        onClearSearch={onClearSearch}
      />
      {/* Bộ lọc NFT */}
      <Filter />
      {nfts?.length == 0 ? <Loader /> : <NFTCardTwo NFTData={nfts} />}
      <Slider />
      <Brand />
    </div>
  );
};

export default searchPage;
