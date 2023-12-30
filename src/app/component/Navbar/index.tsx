import React, { useState } from "react";
import Style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import Logo from "app/theme-layouts/shared-components/Logo";
import { Divider, Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import instance from "src/app/auth/services/jwtService/jwtService";

const Index = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const navigateLogin = () => {
    if (instance.getAccessToken()) {
      navigate("/home");
    } else {
      navigate("/sign-in");
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={Style.navbar_container}>
        <div className={Style.navbar}>
          <div className="mx-24">
            <Logo />
          </div>
          <div>
            <ul className={Style.menu}>
              <li className={Style.navbar_link}>About Us</li>
              <li className={Style.navbar_link}>Product</li>
              <a href="#features">
                <li className={Style.navbar_link}>Features</li>
              </a>
              <a href="#why-locker">
                <li className={Style.navbar_link}>Why Locker?</li>
              </a>
            </ul>
          </div>
          <div
            onClick={navigateLogin}
            className={`${Style.navbar_link} ${Style.login_button}`}
          >
            {instance.getAccessToken() ? "Dashboard" : "Log in"}
          </div>
          <div className={`${Style.navbar_link} ${Style.menu_open_icon}`}>
            <IconButton onClick={handleOpen}>
              <MenuIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#5B718F",
            width: "60vw",
          },
        }}
      >
        <ul className="text-white">
          <IconButton onClick={handleClose} sx={{ textAlign: "left" }}>
            <CloseIcon />
          </IconButton>
          <Divider light />
          <li className={`${Style.navbar_link_mobile}`} onClick={handleClose}>
            About Us
          </li>
          <li className={`${Style.navbar_link_mobile}`} onClick={handleClose}>
            Products
          </li>
          <a href="#features">
            <li className={`${Style.navbar_link_mobile}`} onClick={handleClose}>
              Features
            </li>
          </a>
          <a href="#why-locker">
            <li className={`${Style.navbar_link_mobile}`} onClick={handleClose}>
              Why Locker?
            </li>
          </a>
          <li onClick={navigateLogin} className={`${Style.navbar_link_mobile}`}>
            {instance.getAccessToken() ? "Dashboard" : "Log in"}
          </li>
        </ul>
      </Drawer>
    </>
  );
};

export default Index;
