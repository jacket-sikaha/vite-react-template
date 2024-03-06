import { Suspense, lazy } from "react";
import App from "../App.tsx";
import Home from "../pages/home/index";
import Theme from "../pages/theme/index";
// import FilterList from "../pages/filterList/index.tsx";

// const Home = () => import("../pages/home.tsx");
const FilterList = lazy(() => import("../pages/filterList"));
// const Theme = lazy(() => import("../pages/theme"));

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
        element: (
          <Suspense fallback={<h1>loading</h1>}>
            <FilterList />
          </Suspense>
        ),
        // lazy: () => <FilterList />,
      },
      {
        path: "theme",
        name: "多种主题切换",
        element: <Theme />,
      },
    ],
  },
];
