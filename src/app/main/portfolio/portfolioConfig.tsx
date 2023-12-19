import { lazy } from "react";
const PortfolioView = lazy(() => import("./portfolio"));
import authRoles from 'src/app/auth/authRoles';

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
      element: <PortfolioView />
    },
  ],
};

export default PortfolioConfig;
