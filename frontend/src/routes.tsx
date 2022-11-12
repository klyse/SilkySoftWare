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
    Name: "Main",
    Path: "/Scan",
    Element: <Scan />,
    isHidden: true,
  },
  {
    Name: "Main",
    Path: "/TagsList",
    Element: <TagsList />,
    isHidden: true,
  },
];

export const MenuRoutes = Routes.filter((r) => !r.isHidden);