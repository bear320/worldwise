import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== "/app" && <Navbar />}
      <Outlet />
    </>
  );
};

export default App;
