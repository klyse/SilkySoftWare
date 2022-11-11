import { Main } from "./pages/Main";

export interface Route {
  Name: string;
  Path: string;
  Element: any;
  isHidden?: boolean;
}

export const Routes: Route[] = [
  {
    Name: "Main",
    Path: "/",
    Element: <Main />,
    isHidden: true,
  },
];

export const MenuRoutes = Routes.filter((r) => !r.isHidden);