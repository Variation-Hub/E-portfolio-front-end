import React from 'react'
import Style from "./style.module.css";

const MainPageContent = () => {
  return (
    <div>
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
        <div className={Style.features_img_div}>
          <img
            src="assets/images/svgImage/features.svg"
            alt="Features"
            className={Style.features_img}
          />
        </div>
      </div>
      <div className={Style.whylocker_container}>
        <div className={Style.why_img_div}>
          <img
            src="assets/images/svgImage/why.svg"
            alt="Why Locker"
            className={Style.why_img}
          />
        </div>
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
      </div>
    </div>
  )
}

export default MainPageContent
