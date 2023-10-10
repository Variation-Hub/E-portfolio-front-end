import { lazy } from "react";
const Overview = lazy(() => import("./overview"));
import authRoles from 'src/app/auth/authRoles';

const OverviewConfig = {
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
  auth: authRoles.admin, 
  routes: [
    {
      path: "/overview",
      element: <Overview />
    },
  ],
};

export default OverviewConfig;
