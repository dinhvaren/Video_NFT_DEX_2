import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

import Style from "../styles/reSellToken.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import { Button } from "../components/componentsindex";

// Import dữ liệu từ Smart Contract thông qua Context API
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const reSellToken = () => {
  // Lấy hàm createSale từ Context để thực hiện bán lại NFT
  const { createSale } = useContext(NFTMarketplaceContext);
  // State để lưu URL hình ảnh của NFT
  const [image, setImage] = useState("");
  // State để lưu giá NFT khi bán lại
  const [price, setPrice] = useState('"');
  // Sử dụng useRouter để lấy dữ liệu từ URL
  const router = useRouter();
  const { id, tokenURI } = router.query;
  // Hàm lấy dữ liệu NFT từ tokenURI
  const fetchNFT = async () => {
    if (!tokenURI) return;

    const { data } = await axios.get(tokenURI);

    setImage(data.image);
  };
  // Gọi fetchNFT khi component được mount hoặc khi id thay đổi
  useEffect(() => {
    fetchNFT();
  }, [id]);
  // Hàm xử lý việc bán lại NFT
  const resell = async () => {
    try {
      await createSale(tokenURI, price, true, id);
      router.push("/author"); // Điều hướng về trang cá nhân sau khi bán thành công
    } catch (error) {
      console.log("Error while resell", error);
    }
  };
  return (
    <div className={Style.reSellToken}>
      <div className={Style.reSellToken_box}>
        <h1>ReSell Your Token, Set Price</h1>
        {/* form nhập giá bán lại */}
        <div className={formStyle.Form_box_input}>
          <label htmlFor="name">Price</label>
          <input
            type="number"
            min={1}
            placeholder="reSell price"
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        {/* Hiển thị hình ảnh NFT nếu có */}
        <div className={Style.reSellToken_box_image}>
          {image && (
            <Image src={image} alt="resell nft" width={400} height={400} />
          )}
        </div>
        {/* Nút xác nhận bán lại NFT */}
        <div className={Style.reSellToken_box_btn}>
          <Button btnName="Resell NFT" handleClick={() => resell()} />
        </div>
      </div>
    </div>
  );
};

export default reSellToken;
