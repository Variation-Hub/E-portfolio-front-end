import React from "react";
import Breadcrumb from "src/app/component/Breadcrumbs";
import { AdminRedirect } from "src/app/contanst";

const Index = () => {
  return (
    <div className="w-full h-full p-12">
      <Breadcrumb linkData={[AdminRedirect]} currPage="Learner" />
      Learner Management
    </div>
  );
};

export default Index;
