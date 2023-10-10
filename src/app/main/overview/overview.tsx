import React from "react";
import ContentWrapper from "src/app/component/ContentWrapper";
import Header from "src/app/component/header";
const OverviewApp = () => {
  return (
    <ContentWrapper title="Overview">
      <div>
        <Header data="overview" />
      </div>
    </ContentWrapper>
  );
}

export default OverviewApp;