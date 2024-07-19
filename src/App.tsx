import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
