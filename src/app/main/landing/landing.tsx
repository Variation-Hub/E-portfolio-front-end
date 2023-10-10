import React from "react";
import ContentWrapper from "src/app/component/ContentWrapper";
import Header from "src/app/component/header";
const landing = () => {
  return (
    <ContentWrapper title="Overview">
      <div>
        <Header data="Landing" />
      </div>
    </ContentWrapper>
  );
}

export default landing;