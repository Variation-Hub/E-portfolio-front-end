import FuseUtils from "@fuse/utils";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import OverviewConfig from "../main/overview/overviewConfig";
import SignInConfig from "../main/sign-in/SignInConfig";
import LandingConfig from "../main/landing/landingConfig";

const routeConfigs = [
  LandingConfig,
  OverviewConfig,
  SignInConfig
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(
    routeConfigs,
    settingsConfig.defaultAuth
  ),
  {
    path: "*",
    element: <Navigate to="/" />,
  }
];

export default routes;
