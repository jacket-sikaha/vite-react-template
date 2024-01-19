import "./App.css";
import Layout from "./components/layout";
import Footer from "./components/footer";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import TryRedux from "./pages/TryRedux";
import About from "./pages/About";

function App() {
  return (
    <>
      <Layout />
      <div className="my-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          {/* <Route index element={<Home />} /> */}
          <Route path="redux" element={<TryRedux />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
