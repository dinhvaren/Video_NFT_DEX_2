import React from "react";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { HiOutlineMail } from "react-icons/hi";

import Style from "../styles/contactus.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import { Button } from "../components/componentsindex";

const contactus = () => {
  return (
    <div className={Style.contactus}>
      <div className={Style.contactus_box}>
        {/* Tiêu đề trang liên hệ */}

        <h1>Contact</h1>
        <div className={Style.contactus_box_box}>
          {/* Phần thông tin liên hệ bên trái */}
          <div className={Style.contactus_box_box_left}>
            <div className={Style.contactus_box_box_left_item}>
              <h3>🗺 ADDRESS</h3>
              <p>
                Photo booth tattooed prism, portland taiyaki hoodie neutra
                typewriter
              </p>
            </div>
            <div className={Style.contactus_box_box_left_item}>
              <h3>💌 EMAIL</h3>
              <p>nc.example@example.com</p>
            </div>
            <div className={Style.contactus_box_box_left_item}>
              <h3>☎ PHONE</h3>
              <p>000-123-456-7890</p>
            </div>
            {/* Danh sách các mạng xã hội */}
            <div className={Style.contactus_box_box_left_item}>
              <h3>🌏 SOCIALS</h3>
              <a href="#">
                <TiSocialFacebook />
              </a>
              <a href="#">
                <TiSocialLinkedin />
              </a>
              <a href="#">
                <TiSocialInstagram />
              </a>
              <a href="#">
                <TiSocialYoutube />
              </a>
              <a href="#">
                <TiSocialTwitter />
              </a>
            </div>
          </div>
          {/* Phần biểu mẫu liên hệ bên phải */}
          <div className={Style.contactus_box_box_right}>
            <form>
              {/* Trường nhập họ và tên */}
              <div className={formStyle.Form_box_input}>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className={formStyle.Form_box_input_userName}
                />
              </div>
              {/* Trường nhập email */}
              <div className={formStyle.Form_box_input}>
                <label htmlFor="email">Email</label>
                <div className={formStyle.Form_box_input_box}>
                  <div className={formStyle.Form_box_input_box_icon}>
                    <HiOutlineMail />
                  </div>
                  <input type="text" placeholder="Email*" />
                </div>
              </div>
              {/* Trường nhập tin nhắn */}
              <div className={formStyle.Form_box_input}>
                <label htmlFor="description">Message</label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="6"
                  placeholder="something about yourself in few words"
                ></textarea>
              </div>
              {/* Nút gửi tin nhắn */}
              <Button
                btnName="Send Message"
                handleClick={() => { }}
                classStyle={Style.button}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default contactus;
