import { Details } from "./pages/Details";
import { Scan } from "./pages/Scan";
import { StartWash } from "./pages/StartWash";
import { WashingResult } from "./pages/WashingResult";
import { WaitForWashing } from "./pages/WaitForWashing";

export interface Route {
  Name: string;
  Path: string;
  Element: any;
  isHidden?: boolean;
}

export const Routes: Route[] = [
  {
    Name: "Scan",
    Path: "/Scan",
    Element: <Scan />,
    isHidden: true,
  },
  {
    Name: "Washing Result",
    Path: "/WashingResult",
    Element: <WashingResult />,
    isHidden: true,
  },
  {
    Name: "Details",
    Path: "/Details",
    Element: <Details />,
    isHidden: true,
  },
  {
    Name: "Wait For Washing",
    Path: "/Waiting",
    Element: <WaitForWashing />,
    isHidden: true,
  },
  {
    Name: "Start Washing",
    Path: "/StartWashingMachine",
    Element: <StartWash />,
    isHidden: true,
  },
];

export const MenuRoutes = Routes.filter((r) => !r.isHidden);