import { lazy } from "react";
const PortfolioView = lazy(() => import("./portfolio"));
import authRoles from "src/app/auth/authRoles";
import UploadedEvidenceFile from "src/app/component/Cards/uploadedEvidenceFile";

const PortfolioConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: true,
        },
        toolbar: {
          display: true,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: true,
        },
        rightSidePanel: {
          display: true,
        },
      },
    },
  },
  auth: [authRoles.Learner],
  routes: [
    {
      path: "/portfolio",
      element: <PortfolioView />,
    },
    {
      path: "/portfolio/assingment",
      element: <UploadedEvidenceFile />,
    },
  ],
};

export default PortfolioConfig;
