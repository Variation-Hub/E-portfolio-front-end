import React from "react";
import Style from "./style.module.css";
import { Button } from "@mui/material";

const Home = () => {
    return (
        <>

            <div className={Style.home_img}>

                <div className={Style.home_text}>

                    <div className="w-full p-4 px-20">
                        <p className="font-semibold`">
                            Welcome to{" "}
                            <span className="w-96 text-center font-bold text-lg inline-block bg-[#ffffff] p-4 rounded text-black">
                                LOCKER
                            </span>
                        </p>

                        <h2 className="text-3xl font-extrabold mt-12 sm:text-4xl lg:text-5xl">
                            LOREM IPSUM IS DUMMY CONTEXT
                        </h2>

                        <p className="text-base mt-12 text-justify break-words">
                            We have the technology and industry expertise to develop solutions that can connect people and businesses.
                        </p>

                        <Button className="hover:bg-[#ffffff] w-96 font-bold text-sm mt-16 inline-block bg-[#ffffff] p-15 rounded text-black">
                            Read More
                        </Button>
                    </div>
                </div>
            </div>


            <div className="flex flex-col justify-evenly py-24 items-center bg-[#F9F9FD] sm:flex-row">

                <div className="w-full p-4 px-20 sm:w-1/4">
                    <img
                        src="assets/images/homePage/meeting.svg"
                        alt="img1"
                        className="w-full h-auto"
                    />
                </div>

                <div className="w-full p-4 px-20 sm:w-2/5">
                    <p className="font-medium">
                        Enter Small Title here
                    </p>

                    <h2 className=" uppercase text-3xl font-bold mt-12 sm:text-3xl lg:text-3xl">
                        Lorem Ipsum is simply dummy text of the printing.
                    </h2>

                    <p className="mt-12 text-justify break-words">
                        Browse through our free content and learn how to grow your own e-commerce business or take your current online store to the next level with battle- tested digital marketing strategies. View our successful case studies and learn the secrets your own e-commerce business.
                    </p>


                    <div className="flex py-20">
                        <div className="flex flex-row items-center pr-20">
                            <div className="w-full p-14 pr-20 sm:w-1/4">
                                <img
                                    src="assets/icons/shoping.svg"
                                    alt="img1"
                                    className="w-full h-auto"
                                />
                            </div>

                            <div className="w-3/5">
                                <h2 className="text-base font-bold mt-12">
                                    Lorem ipsum context
                                </h2>

                                <p className="text-sm mt-12 text-justify break-words">
                                    Explode your sales by working closely with our experienced.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-row items-center">
                            <div className="w-full p-14 pr-20 sm:w-1/4">
                                <img
                                    src="assets/icons/store.svg"
                                    alt="img1"
                                    className="w-full h-auto"
                                />
                            </div>

                            <div className="w-3/5">
                                <h2 className="text-base font-bold mt-12">
                                    Lorem ipsum context
                                </h2>

                                <p className="text-sm mt-12 text-justify break-words">
                                    Explode your sales by working closely with our experienced.
                                </p>
                            </div>
                        </div>

                    </div>

                    <Button className="hover:bg-[#6D81A3] w-1/4 font-bold text-sm mt-16 inline-block bg-[#6D81A3] p-15 rounded text-white">
                        Read More
                    </Button>
                </div>
            </div>


            <div className={`${Style.bg_img} text-white flex flex-col justify-evenly py-24 items-center bg-[#6D81A3] sm:flex-row`}>

                <div className="w-full p-4 px-20 sm:w-2/5">
                    <p className="font-medium">
                        Enter Small Title here
                    </p>

                    <h2 className=" uppercase text-3xl font-bold mt-12 sm:text-3xl lg:text-3xl">
                        Features
                    </h2>
                    
                    <ul className="list-disc list-outside">
                        <li className="p-5">Bespoke Management Reporting</li>
                        <li className="p-5">Online Enrolments- Free template provided</li>
                        <li className="p-5">Form creations- ILP, Reviews, Learning Plans</li>
                        <li className="p-5">Video Teaching and Learning Resources for all courses</li>
                        <li className="p-5">Robust IQA functionality</li>
                        <li className="p-5">API Integration</li>
                        <li className="p-5">Easy-to-use platform can be accessed on multiple devices</li>
                        <li className="p-5">Progress tracking with visual gap analysis</li>
                        <li className="p-5">Intuitive Layout that is user-friendly</li>
                        <li className="p-5">Learner Forums</li>
                    </ul>
                </div>

                <div className="w-full relative sm:w-2/5 h-5/6">
                    <div className="w-8/12 top-0 left-0 absolute">
                        <img
                            src="assets/images/homePage/multicultural.jpeg"
                            alt="img1"
                            className="rounded-2xl"
                        />
                    </div>

                    <div className="w-8/12 absolute bottom-0 right-0" >
                        <img
                            src="assets/images/homePage/woman-working.jpeg"
                            alt="img1"
                            className="rounded-2xl"
                        />
                    </div>
                </div>

            </div>


            <div className="flex flex-col justify-center py-28 items-center bg-[#F9F9FD] sm:flex-col gap-40 ">

                <div className="text-center w-full py-24 px-20 sm:w-3/5">
                    <p className="font-medium">
                        Enter Small Title here
                    </p>

                    <h2 className=" uppercase text-3xl font-bold mt-12 sm:text-3xl lg:text-3xl">
                        Lorem Ipsum is simply dummy text
                    </h2>

                    <p className="mt-12 text-justify break-words">
                        Browse through our free content and learn how to grow your own e-commerce business or take your current online store to the next level with battle- tested digital marketing strategies. View our successful case studies and learn the secrets your own e-commerce business.
                    </p>
                </div>

                <div className="flex items-center justify-center gap-96 ">

                    <div className="bg-[#B9FCFF] flex items-center w-2/5 h-xs relative">
                        <div className="w-1/2 flex flex-col justify-around h-full p-12">
                            <h3 className="text-3xl font-bold sm:text-3xl lg:text-3xl">
                                Event Management and Ticketing Website
                            </h3>

                            <p className="text-justify break-words">
                                The System provides an easily customizable, personalized ticketing website for venues of all sizes. To provide an e-ticketing solution that any venue can afford. With this event tickets portal website.
                            </p>

                            <h3 className="text-xl font-semibold sm:text-3xl lg:text-xl">
                                Read More
                            </h3>
                        </div>

                        <div className="bg-[#D2FDFF] w-1/2 h-full flex items-center relative z-20" >
                            <img
                                src="assets/images/homePage/computer.png"
                                alt="img1"
                                width="100%"
                                height="100%"
                            />
                        </div>

                        <div className="w-1/2 h-full bg-[#E3FEFF] absolute -right-14 -top-14 z-10"></div>
                    </div>

                    <div className="bg-[#FFD5C2] mt-60 flex items-center w-2/5 h-xs relative">
                        <div className="w-1/2 flex flex-col justify-around h-full p-12">
                            <h3 className="text-3xl font-bold sm:text-3xl lg:text-3xl">
                                Event Management and Ticketing Website
                            </h3>

                            <p className="text-justify break-words">
                                The System provides an easily customizable, personalized ticketing website for venues of all sizes. To provide an e-ticketing solution that any venue can afford. With this event tickets portal website.
                            </p>

                            <h3 className="text-xl font-semibold sm:text-3xl lg:text-xl">
                                Read More
                            </h3>
                        </div>

                        <div className="bg-[#FFE4D8] w-1/2 h-full flex items-center relative z-20" >
                            <img
                                src="assets/images/homePage/computer.png"
                                alt="img1"
                                width="100%"
                                height="100%"
                            />
                        </div>

                        <div className="w-1/2 h-full bg-[#FFEEE7] absolute -right-14 -top-14 z-10"></div>
                    </div>

                </div>

                <div className="flex items-center justify-center gap-96 ">

                    <div className="bg-[#DFBDF4] flex items-center w-2/5 h-xs relative">
                        <div className="w-1/2 flex flex-col justify-around h-full p-12">
                            <h3 className="text-3xl font-bold sm:text-3xl lg:text-3xl">
                                Event Management and Ticketing Website
                            </h3>

                            <p className="text-justify break-words">
                                The System provides an easily customizable, personalized ticketing website for venues of all sizes. To provide an e-ticketing solution that any venue can afford. With this event tickets portal website.
                            </p>

                            <h3 className="text-xl font-semibold sm:text-3xl lg:text-xl">
                                Read More
                            </h3>
                        </div>

                        <div className="bg-[#F5E5FF] w-1/2 h-full flex items-center relative z-20" >
                            <img
                                src="assets/images/homePage/computer.png"
                                alt="img1"
                                width="100%"
                                height="100%"
                            />
                        </div>

                        <div className="w-1/2 h-full bg-[#FBF4FF] absolute -right-14 -top-14 z-10"></div>
                    </div>

                    <div className="bg-[#9CCC76] mt-60 flex items-center w-2/5 h-xs relative">
                        <div className="w-1/2 flex flex-col justify-around h-full p-12">
                            <h3 className="text-3xl font-bold sm:text-3xl lg:text-3xl">
                                Event Management and Ticketing Website
                            </h3>

                            <p className="text-justify break-words">
                                The System provides an easily customizable, personalized ticketing website for venues of all sizes. To provide an e-ticketing solution that any venue can afford. With this event tickets portal website.
                            </p>

                            <h3 className="text-xl font-semibold sm:text-3xl lg:text-xl">
                                Read More
                            </h3>
                        </div>

                        <div className="bg-[#E5FFD0] w-1/2 h-full flex items-center relative z-20" >
                            <img
                                src="assets/images/homePage/computer.png"
                                alt="img1"
                                width="100%"
                                height="100%"
                            />
                        </div>

                        <div className="w-1/2 h-full bg-[#EFFFE2] absolute -right-14 -top-14 z-10"></div>
                    </div>

                </div>
            </div>
            <div>
                <div className="flex items-center ">
                    <div className="w-2/6 p-4 py-28 px-28 sm:w-2/5 flex flex-col gap-10">
                        <p className="font-medium">
                            Enter Small Title here
                        </p>

                        <h2 className="text-3xl font-bold mt-12 sm:text-3xl lg:text-3xl">
                            Solutions for all, always
                        </h2>

                        <p className="mt-12 text-justify break-words">
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                        </p>
                    </div>

                    <div className="w-2/6 p-4 text-center py-28 px-28 sm:w-2/5 flex flex-col gap-10">
                        <div className="flex justify-center">
                            <div className="flex flex-row">
                                <div className="w-full sm:w-full">
                                    <img
                                        src="assets/images/svgImage/freelancer.svg"
                                        alt="img1"
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold mt-12 sm:text-3xl lg:text-3xl">
                            Freelancer
                        </h2>

                        <p className="mt-12 text-justify break-words">
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                        </p>

                    </div>

                    <div className="w-2/6 p-4 text-center py-28 px-28 sm:w-2/5 flex flex-col gap-10">
                        <div className="flex justify-center">
                            <div className="flex flex-row">
                                <div className="w-full sm:w-full">
                                    <img
                                        src="assets/images/svgImage/startsup.svg"
                                        alt="img1"
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold mt-12 sm:text-3xl lg:text-3xl">
                            Startups
                        </h2>

                        <p className="mt-12 text-justify break-words">
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                        </p>

                    </div>
                </div>

                <div className="flex items-center">

                    <div className={`${Style.bg_enterprise} w-2/6 p-4 text-center py-28 px-28 sm:w-2/5 flex flex-col gap-10`}>
                        <div className="flex justify-center">
                            <div className="flex flex-row">
                                <div className="w-full sm:w-full">
                                    <img
                                        src="assets/images/svgImage/enterprise.svg"
                                        alt="img1"
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl text-white font-bold mt-12 sm:text-3xl lg:text-3xl">
                            Freelancer
                        </h2>

                        <p className="mt-12 text-white text-justify break-words">
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                        </p>

                    </div>

                    <div className="w-2/6 p-4 text-center py-28 px-28 sm:w-2/5 flex flex-col gap-10">
                        <div className="flex justify-center">
                            <div className="flex flex-row">
                                <div className="w-full sm:w-full">
                                    <img
                                        src="assets/images/svgImage/freelancer.svg"
                                        alt="img1"
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold mt-12 sm:text-3xl lg:text-3xl">
                            Freelancer
                        </h2>

                        <p className="mt-12 text-justify break-words">
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                        </p>

                    </div>

                    <div className="w-2/6 p-4 text-center py-28 px-28 sm:w-2/5 flex flex-col gap-10">
                        <div className="flex justify-center">
                            <div className="flex flex-row">
                                <div className="w-full sm:w-full">
                                    <img
                                        src="assets/images/svgImage/freelancer.svg"
                                        alt="img1"
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold mt-12 sm:text-3xl lg:text-3xl">
                            Freelancer
                        </h2>

                        <p className="mt-12 text-justify break-words">
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                        </p>

                    </div>

                </div>
            </div>
        </>
    );
};

export default Home;
