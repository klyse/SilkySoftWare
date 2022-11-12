import { Details } from "./pages/Details";
import { Scan as Scan } from "./pages/Scan";
import { TagsList } from "./pages/TagsList";

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
    Name: "TagsList",
    Path: "/TagsList",
    Element: <TagsList />,
    isHidden: true,
  },
  {
    Name: "Details",
    Path: "/Details",
    Element: <Details />,
    isHidden: true,
  },
];

export const MenuRoutes = Routes.filter((r) => !r.isHidden);