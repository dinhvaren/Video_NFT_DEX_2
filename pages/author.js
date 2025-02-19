import React, { useState, useEffect, useContext } from "react";

import Style from "../styles/author.module.css";
import { Banner, NFTCardTwo } from "../collectionPage/collectionIndex";
import { Brand, Title } from "../components/componentsindex";
import FollowerTabCard from "../components/FollowerTab/FollowerTabCard/FollowerTabCard";
import images from "../img";
import {
  AuthorProfileCard,
  AuthorTaps,
  AuthorNFTCardBox,
} from "../authorPage/componentIndex";

// IMPORT DỮ LIỆU TỪ SMART CONTRACT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const author = () => {
  // Danh sách người theo dõi giả định
  const followerArray = [
    {
      background: images.creatorbackground1,
      user: images.user1,
      seller: "7d64gf748849j47fy488444",
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
      seller: "7d64gf748849j47fy488444",
    },
    {
      background: images.creatorbackground3,
      user: images.user3,
      seller: "7d64gf748849j47fy488444",
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
      seller: "7d64gf748849j47fy488444",
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
      seller: "7d64gf748849j47fy488444",
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
      seller: "7d64gf748849j47fy488444",
    },
  ];
  // Trạng thái hiển thị danh sách NFT theo từng tiêu chí
  const [collectiables, setCollectiables] = useState(true);
  const [created, setCreated] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);

  // Lấy dữ liệu từ Smart Contract thông qua Context API
  const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(
    NFTMarketplaceContext
  );

  // State lưu trữ NFT
  const [nfts, setNfts] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);

  // Lấy danh sách NFT mà người dùng đã niêm yết trên Marketplace
  useEffect(() => {
    fetchMyNFTsOrListedNFTs("fetchItemsListed").then((items) => {
      setNfts(items);

      console.log(nfts);
    });
  }, []);

  // Lấy danh sách NFT mà người dùng sở hữu
  useEffect(() => {
    fetchMyNFTsOrListedNFTs("fetchMyNFTs").then((items) => {
      setMyNFTs(items);
      console.log(myNFTs);
    });
  }, []);

  return (
    <div className={Style.author}>
      {/* Banner của trang tác giả */}
      <Banner bannerImage={images.creatorbackground2} />
      {/* Thẻ hiển thị thông tin tác giả */}   
      <AuthorProfileCard currentAccount={currentAccount} />
      {/* Tabs để lọc NFT hiển thị */}
      <AuthorTaps
        setCollectiables={setCollectiables}
        setCreated={setCreated}
        setLike={setLike}
        setFollower={setFollower}
        setFollowing={setFollowing}
        currentAccount={currentAccount}
      />
      {/* Khu vực hiển thị NFT của tác giả */}
      <AuthorNFTCardBox
        collectiables={collectiables}
        created={created}
        like={like}
        follower={follower}
        following={following}
        nfts={nfts}
        myNFTS={myNFTs}
      />
      {/* Tiêu đề cho phần danh sách người sáng tạo phổ biến */}
      <Title
        heading="Popular Creators"
        paragraph="Click on music icon and enjoy NTF music or audio
"
      />
      {/* Danh sách người sáng tạo phổ biến */}
      <div className={Style.author_box}>
        {followerArray.map((el, i) => (
          <FollowerTabCard i={i} el={el} />
        ))}
      </div>
      <Brand />
    </div>
  );
};

export default author;
