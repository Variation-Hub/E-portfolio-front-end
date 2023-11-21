import { lazy } from "react";
const OffTheJobView = lazy(() => import("./offTheJob"));
import authRoles from 'src/app/auth/authRoles';

const OffTheJobConfig = {
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
      path: "/offTheJob",
      element: <OffTheJobView />
    },
  ],
};

export default OffTheJobConfig;
