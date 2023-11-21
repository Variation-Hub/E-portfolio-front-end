import { lazy } from "react";
const CreateResourcesView = lazy(() => import("./createResources"));
import authRoles from 'src/app/auth/authRoles';

const CreateResourcesConfig = {
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
      path: "/createResources",
      element: <CreateResourcesView />
    },
  ],
};

export default CreateResourcesConfig;
