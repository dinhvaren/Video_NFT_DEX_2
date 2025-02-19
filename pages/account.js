import React, { useState, useMemo, useCallback, useContext } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

// Import styles và component nội bộ
import Style from "../styles/account.module.css";
import images from "../img";
import From from "../AccountPage/Form/Form";

const account = () => {
  // State lưu trữ tệp ảnh tải lên
  const [fileUrl, setFileUrl] = useState(null);
  // Xử lý sự kiện khi người dùng kéo thả tệp vào khu vực upload
  const onDrop = useCallback(async (acceptedFile) => {
    setFileUrl(acceptedFile[0]);
  }, []);
  // Cấu hình Dropzone để chỉ chấp nhận ảnh với dung lượng tối đa 5MB
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  return (
    <div className={Style.account}>
      {/* Phần giới thiệu của trang cài đặt tài khoản */}
      <div className={Style.account_info}>
        <h1>Profile settings</h1>
        <p>
          You can set preferred display name, create your profile URL and manage
          other personal settings.
        </p>
      </div>
      {/* Khu vực chỉnh sửa thông tin tài khoản */}
      <div className={Style.account_box}>
        {/* Khu vực tải lên ảnh đại diện */}
        <div className={Style.account_box_img} {...getRootProps()}>
          <input {...getInputProps()} />
          <Image
            src={images.user1}
            alt="account upload"
            width={150}
            height={150}
            className={Style.account_box_img_img}
          />
          <p className={Style.account_box_img_para}>Change Image</p>
        </div>
        {/* Form chỉnh sửa thông tin tài khoản */}
        <div className={Style.account_box_from}>
          <From />
        </div>
      </div>
    </div>
  );
};

export default account;
