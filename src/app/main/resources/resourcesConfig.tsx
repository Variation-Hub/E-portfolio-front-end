import { lazy } from "react";
const ResourcesView = lazy(() => import("./resources"));
import authRoles from 'src/app/auth/authRoles';

const ResourcesConfig = {
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
  auth: [authRoles.Trainer, authRoles.Employer, authRoles.IQA, authRoles.LIQA],
  routes: [
    {
      path: "/resources",
      element: <ResourcesView />
    },
  ],
};

export default ResourcesConfig;
