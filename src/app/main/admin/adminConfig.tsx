import { lazy } from "react";
const AdminView = lazy(() => import("./admin"));
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
  auth: authRoles.admin, 
  routes: [
    {
      path: "/admin",
      element: <AdminView />
    },
  ],
};

export default AdminConfig;
