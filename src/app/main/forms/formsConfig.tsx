import { lazy } from "react";
const FormsView = lazy(() => import("./forms"));
import authRoles from 'src/app/auth/authRoles';

const FormsConfig = {
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
  auth: [authRoles.Admin], 
  routes: [
    {
      path: "/forms",
      element: <FormsView />
    },
  ],
};

export default FormsConfig;
