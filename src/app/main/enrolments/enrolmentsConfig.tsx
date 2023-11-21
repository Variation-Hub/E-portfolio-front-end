import { lazy } from "react";
const EnrolmentsView = lazy(() => import("./enrolments"));
import authRoles from 'src/app/auth/authRoles';

const EnrolmentsConfig = {
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
      path: "/enrolments",
      element: <EnrolmentsView />
    },
  ],
};

export default EnrolmentsConfig;
