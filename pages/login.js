import React from "react";

//INTERNAL IMPORT
import Style from "../styles/login.module.css";
import LoginAndSignUp from "../loginAndSignUp/loginAndSignUp";

const login = () => {
  return (
    <div className={Style.login}>
      <div className={Style.login_box}>
        {/* Tiêu đề trang đăng nhập */}
        <h1>Login</h1>
        {/* Component xử lý đăng nhập và đăng ký */}
        <LoginAndSignUp />
        {/* Liên kết chuyển hướng đến trang đăng ký nếu chưa có tài khoản */}
        <p className={Style.login_box_para}>
          New user? <a href="#">Create an account</a>
        </p>
      </div>
    </div>
  );
};

export default login;
