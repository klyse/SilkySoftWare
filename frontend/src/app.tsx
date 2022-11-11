import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import {  Routes as MainRoutes } from "./routes";

export const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>

        <Route
            element={
                <MainLayout />
            }
          >
          {MainRoutes.map((route) => {
            return <Route key={route.Path} path={route.Path} element={route.Element} />;
          })}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
