import React from "react";
import Style from "./style.module.css";

const Footer = () => {
  return (
    <div>
      <div>
      <div className="flex justify-between items-center p-4 bg-[#6D81A3] text-white">
        <div className="flex flex-col items-start">
          <img
            src="assets/images/logo/logo-text.svg"
            alt="Logo"
            className="w-112 h-auto"
          />
          <p>
            From making strategic decisions to developing your capabilities,
            we're here to help. Using our expertise and deep understanding of
            the industry, you'll receive real solutions....
          </p>
        </div>

        <div className="text-left">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="list-none">
            <li>
              <a href="#" className="text-white hover:text-blue-500">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-blue-500">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-blue-500">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-blue-500">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-blue-500">
                Why Locker
              </a>
            </li>
          </ul>
        </div>

        <div className="text-left">
          <h3 className="text-lg font-semibold mb-2">Policy</h3>
          <ul className="list-none">
            <li>
              <a href="#" className="text-white hover:text-blue-500">
                Terms of Use
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-blue-500">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-blue-500">
                Need Help?
              </a>
            </li>
          </ul>
        </div>

        <div className="text-left">
          <h3 className="text-lg font-semibold mb-2">Follow Us On</h3>
          <div className="flex items-center">
            <a href="#" className="text-white mr-2">
              <i className="fab fa-facebook">Facebook</i>
            </a>
            <a href="#" className="text-white mr-2">
              <i className="fab fa-instagram">Instagram</i>
            </a>
            <a href="#" className="text-white">
              <i className="fab fa-twitter">Twitter</i>
            </a>
          </div>
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
