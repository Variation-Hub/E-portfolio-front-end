import { lazy } from "react";
const SupportView = lazy(() => import("./support"));
import authRoles from 'src/app/auth/authRoles';

const SupportConfig = {
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
      path: "/support",
      element: <SupportView />
    },
  ],
};

export default SupportConfig;
