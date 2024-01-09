import { RouteObject } from "react-router-dom";
import App from "../App.tsx";
import Home from "../pages/home.tsx";
import { lazy } from "react";
import FilterList from "../pages/filterList/index.tsx";

// const Home = () => import("../pages/home.tsx");
// const FilterList = lazy(() => import("../pages/filterList.tsx"));

export const DefaultRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        name: "主页",
        element: <Home />,
      },
      {
        path: "filterList",
        name: "条件筛选+无限滚动列表",
        element: <FilterList />,
        // lazy: () => import("../pages/filterList.tsx"),
      },
    ],
  },
];
