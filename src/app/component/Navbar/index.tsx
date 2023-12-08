import React, { useState } from "react";
import Style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import Logo from "app/theme-layouts/shared-components/Logo";
import { Divider, Drawer, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Index = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const navigateLogin = () => {
    navigate("/sign-in");
  };

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

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
              <li className={Style.navbar_link}>Products</li>
              <a href="#features"><li className={Style.navbar_link}>Features</li></a>
              <a href="#why-locker"><li className={Style.navbar_link}>Why Locker?</li></a>
            </ul>
          </div>
          <div onClick={navigateLogin} className={`${Style.navbar_link} ${Style.login_button}`}>
            Log in
          </div>
          <div className={`${Style.navbar_link} ${Style.menu_open_icon}`}>
            <IconButton onClick={handleOpen}>
              <MenuIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <div className={Style.screenshort}></div>
      <div className={Style.features_container} id="features">
        <div className={Style.features_list}>
          <div className={Style.features}>
            <h2>Features</h2>
          </div>
          <ol>
            <li>Bespoke Management Reporting</li>
            <li>Online Enrolments- Free template provided</li>
            <li>Form creations- ILP, Reviews, Learning Plans</li>
            <li>Video Teaching and Learning Resources for all courses</li>
            <li>Robust IQA functionality</li>
            <li>API Integration</li>
            <li>Easy-to-use platform can be accessed on multiple devices</li>
            <li>Progress tracking with visual gap analysis</li>
            <li>Intuitive Layout that is user-friendly</li>
            <li>Learner Forums</li>
          </ol>
        </div>
        <div className={Style.features_img_div}><img src="assets/images/svgImage/features.svg" alt="Features" className={Style.features_img} /></div>
      </div>
      <div className={Style.whylocker_container}>
        <div className={Style.why_img_div}><img src="assets/images/svgImage/why.svg" alt="Why Locker" className={Style.why_img} /></div>
        <div className={Style.whylocker_list} id="why-locker">
          <div className={Style.whylocker}>
            <h2>Why Locker?</h2>
          </div>
          <ol>
            <li>Ofsted and ESFA compliance</li>
            <li>Real time skills assessment</li>
            <li>Engaging all users</li>
            <li>Created by industry experts</li>
          </ol>
        </div>
        <Drawer
          anchor="right"
          open={open}
          onClose={handleClose}
          sx={{
            '& .MuiDrawer-paper': {
              backgroundColor: "#5B718F",
              width: "60vw"
            }
          }}
        >

          <ul className="text-white">
            <IconButton onClick={handleClose} sx={{ textAlign: "left" }}>
              <CloseIcon />
            </IconButton>
            <Divider light/>
            <li className={`${Style.navbar_link_mobile}`} onClick={handleClose}>About Us</li>
            <li className={`${Style.navbar_link_mobile}`} onClick={handleClose}>Products</li>
            <a href="#features"><li className={`${Style.navbar_link_mobile}`} onClick={handleClose}>Features</li></a>
            <a href="#why-locker"><li className={`${Style.navbar_link_mobile}`} onClick={handleClose}>Why Locker?</li></a>
            <li onClick={navigateLogin} className={`${Style.navbar_link_mobile}`}>Log in</li>
          </ul>
        </Drawer>
      </div>
    </>
  );
};

export default Index;
