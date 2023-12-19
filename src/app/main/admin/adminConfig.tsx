import { lazy } from "react";
const AdminView = lazy(() => import("./admin"));
const UserManagement = lazy(() => import("./userManagement"));
const LearnerManagement = lazy(() => import("./learnerManagement"));
import authRoles from 'src/app/auth/authRoles';

const AdminConfig = {
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
      path: "/admin",
      element: <AdminView />,
    },
    {
      path: "/admin/user",
      element: <UserManagement />,
    },
    {
      path: "/admin/learner",
      element: <LearnerManagement />,
    },
  ],
};

export default AdminConfig;
