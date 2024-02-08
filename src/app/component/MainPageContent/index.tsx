import React from "react";
import Style from "./style.module.css";

const MainPageContent = () => {
  return (
    <>
      <div>
        {/* <div className={Style.screenshort}></div> */}
        <div className="flex justify-evenly py-24 items-center bg-[#F9F9FD]">

          <div className="w-1/3 p-4 ml-60">
            <p className="font-bold">
              Welcome to{" "}
              <span className="inline-block bg-[#6D81A3] p-4 rounded text-white">
                LOCKER
              </span>
            </p>

            <h2 className="text-3xl font-extrabold mt-12 sm:text-4xl lg:text-5xl">
              LOREM IPSUM IS DUMMY CONTEXT
            </h2>

            <p className="mt-12">
              We have the technology and industry expertise to develop solutions
              that can connect people and businesses.
            </p>
            <button className="mt-12 p-8 sm:p-8 bg-[#6D81A3] text-white rounded text-sm sm:text-base">
              Read More
            </button>
          </div>

          <div className="w-1/3">
            <img
              src="assets/images/svgImage/landing1.svg"
              alt="img1"
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="flex justify-evenly items-center py-48">
          <div className="w-1/4">
            <img
              src="assets/images/svgImage/landing2.svg"
              alt="img1"
              className="w-full h-auto"
            />
          </div>
          <div className="w-2/4">
            <p>Enter Small Title here</p>
            <h2 className="text-3xl font-extrabold mt-2 sm:text-4xl lg:text-5xl">
              LOREM IPSUM IS SIMPLY DUMMY TEXT OF THE PRINTING.
            </h2>

            <p className="mt-2">
              Browse through our free content and learn how to grow your own
              e-commerce business or take your current online store to the next
              level with battle- tested digital marketing strategies. View our
              successful case studies and learn the secrets your own e-commerce
              business.
            </p>

            <div className="flex items-center justify-between mt-32">
              <div className="flex w-2/5">
                <img
                  src="assets/images/svgImage/landing2-1.svg"
                  alt="img1"
                  className="w-32 h-auto mr-10"
                />
                <div>
                  <h4 className=" font-bold ">Lorem ipsum context</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>
              </div>
              <div className="flex w-2/5">
                <img
                  src="assets/images/svgImage/landing2-2.svg"
                  alt="img1"
                  className="w-32 h-auto mr-10"
                />
                <div>
                  <h4 className=" font-bold ">Lorem ipsum context</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>
              </div>
            </div>

            <button className="mt-12 p-8 w-2/12 sm:p-8 bg-[#6D81A3] text-white rounded text-sm sm:text-base">
              Read More
            </button>
          </div>
        </div>

        <div className={Style.features_container} id="features">
          <div className={Style.features_list}>
            <p>Enter Small Title here</p>
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
              src="assets/images/svgImage/landing3.svg"
              alt="Features"
              className={Style.features_img}
            />
          </div>
        </div>
        <div className={Style.whylocker_container}>
          <div className={Style.why_img_div}>
            <img
              src="assets/images/svgImage/landing4.svg"
              alt="Why Locker"
              className={Style.why_img}
            />
          </div>
          <div className={Style.whylocker_list} id="why-locker">
            <p>Enter Small Title here</p>
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
    </>
  );
};

export default MainPageContent;
