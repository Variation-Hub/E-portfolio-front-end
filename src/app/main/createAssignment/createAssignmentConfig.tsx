import { lazy } from "react";
const CreateAssignmentView = lazy(() => import("./createAssignment"));
import authRoles from 'src/app/auth/authRoles';
import ReviewAssignment from "./reviewAssignment";

const CreateAssignmentConfig = {
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
  auth: [authRoles.Learner],
  routes: [
    {
      path: "/createAssignment",
      element: <CreateAssignmentView />
    },
    {
      path: "/review",
      element: <ReviewAssignment />
    },
  ],
};

export default CreateAssignmentConfig;
