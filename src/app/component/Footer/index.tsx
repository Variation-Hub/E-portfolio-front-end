import React from "react";
import Style from "./style.module.css";

const Footer = () => {
  return (
    <div>
      <div></div>
      <div className={`${Style.footer} w-full flex h-48 justify-center items-center`}>
        <p>Copyright &#169; 2023 Locker. All right reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
