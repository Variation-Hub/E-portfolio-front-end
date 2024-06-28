import { lazy } from "react";
const ResourcesView = lazy(() => import("./resources"));
import authRoles from 'src/app/auth/authRoles';
import ResourcesCard from "./resourcesCard";

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
  auth: [authRoles.Trainer, authRoles.Learner, authRoles.Employer, authRoles.IQA, authRoles.LIQA],
  routes: [
    {
      path: "/resources",
      element: <ResourcesView />
    },
    {
      path: "/resources-card",
      element: <ResourcesCard />
    },
  ],
};

export default ResourcesConfig;
