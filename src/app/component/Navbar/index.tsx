import React from "react";
import Style from "./style.module.css";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate("/sign-in");
  };

  return (
    <>
      <div className={Style.navbar_container}>
      <div className={Style.navbar}>
        <div></div>
        <div>
          <ul className={Style.menu}>
            <li className={Style.navbar_link}>About Us</li>
            <li className={Style.navbar_link}>Products</li>
            <li className={Style.navbar_link}>Features</li>
            <li className={Style.navbar_link}>Why Locker?</li>
          </ul>
        </div>
        <div onClick={navigateLogin} className={Style.navbar_link}>
          Log in
        </div>
      </div>
    </div>
    <div className={Style.screenshort}></div>
    <div className={Style.features_container}>
      <div className={Style.features}>
        <h2>Features</h2>
      </div>
      <div className={Style.features_list}>
        <ol>
          <li><i>&#10003;</i> Bespoke Management Reporting</li>
          <li><i>&#10003;</i> Online Enrolments- Free template provided</li>
          <li><i>&#10003;</i> Form creations- ILP, Reviews, Learning Plans</li>
          <li><i>&#10003;</i> Video Teaching and Learning Resources for all courses</li>
          <li><i>&#10003;</i> Robust IQA functionality</li>
          <li><i>&#10003;</i> API Integration</li>
          <li><i>&#10003;</i> Easy-to-use platform can be accessed on multiple devices</li>
          <li><i>&#10003;</i> Progress tracking with visual gap analysis</li>
          <li><i>&#10003;</i> Intuitive Layout that is user-friendly</li>
          <li><i>&#10003;</i> Learner Forums</li>
        </ol>
      </div>
    </div>
    <div className={Style.whylocker_container}>
      <div className={Style.whylocker_list}>
        <ol>
          <li><i>&#10003;</i> Ofsted and ESFA compliance</li>
          <li><i>&#10003;</i> Real time skills assessment</li>
          <li><i>&#10003;</i> Engaging all users</li>
          <li><i>&#10003;</i> Created by industry experts</li>
          </ol>
      </div>
      <div className={Style.whylocker}>
        <h2>Why Locker?</h2>
      </div>
    </div>
    </>
  );
};

export default Index;
