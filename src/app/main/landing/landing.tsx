import React from "react";
import ContentWrapper from "src/app/component/ContentWrapper";
import Header from "src/app/component/header";
import Navbar from "src/app/component/Navbar";
const landing = () => {
  return (
    <ContentWrapper title="Overview">
      <div>
        {/* <Header data="Landing" /> */}
        <Navbar/>
      </div>
    </ContentWrapper>
  );
}

export default landing;