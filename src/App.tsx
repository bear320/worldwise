import { Outlet } from "react-router-dom";
import { CitiesProvider } from "./contexts/CitiesContext";

const App = () => {
  return (
    <CitiesProvider>
      <Outlet />
    </CitiesProvider>
  );
};

export default App;
