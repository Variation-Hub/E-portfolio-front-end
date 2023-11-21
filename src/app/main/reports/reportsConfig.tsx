import { lazy } from "react";
const ReportsView = lazy(() => import("./reports"));
import authRoles from 'src/app/auth/authRoles';

const ReportsConfig = {
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
      path: "/reports",
      element: <ReportsView />
    },
  ],
};

export default ReportsConfig;
