import "./App.css";
import Layout from "./components/layout";
import { Outlet, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Home from "./pages/home";
import { QueryClient, QueryClientProvider } from "react-query";
// 创建一个 client
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="flex w-[93vw] h-full">
          <div className="flex-none">
            <Layout />
          </div>
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
