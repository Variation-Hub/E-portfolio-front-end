import React from "react";
import Style from "./style.module.css";

const Footer = () => {
  return (
    <div>
      <div>
        <div className="flex justify-evenly py-48 bg-[#6D81A3] text-white">
          <div className="flex flex-col items-start w-1/3">
            <img
              src="assets/images/logo/logo-text.svg"
              alt="Logo"
              className="w-2/5"
            />
            <p>
              From making strategic decisions to developing your capabilities,
              we're here to help. Using our expertise and deep understanding of
              the industry, you'll receive real solutions....
            </p>
          </div>

          <div className="text-left">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className={Style.footerMenu}>
              <li>
                <a href="#">
                  Home
                </a>
              </li>
              <li>
                <a href="#">
                  About Us
                </a>
              </li>
              <li>
                <a href="#">
                  Products
                </a>
              </li>
              <li>
                <a href="#">
                  Features
                </a>
              </li>
              <li>
                <a href="#">
                  Why Locker
                </a>
              </li>
            </ul>
          </div>

          <div className="text-left">
            <h3 className="text-lg font-semibold mb-2">Policy</h3>
            <ul className={Style.footerMenu}>
              <li>
                <a href="#">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#">
                  Need Help?
                </a>
              </li>
            </ul>
          </div>

          <div className="text-left">
            <h3 className="text-lg font-semibold mb-2">Follow Us On</h3>
            <ul className={Style.footerMenu}>
                <li>
                  <a href="#" className="text-white mr-2">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white mr-2">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Twitter
                  </a>
                </li>
            </ul>
          </div>

        </div>
      </div>
      <div className={`${Style.footer} w-full flex h-48 justify-center items-center bg-[#526380]`}>
        <p>Copyright &#169; 2023 Locker. All right reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
