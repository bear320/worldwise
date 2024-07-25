import { Outlet } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CitiesProvider } from "./contexts/CitiesContext";

const App = () => {
  return (
    <AuthProvider>
      <CitiesProvider>
        <Outlet />
      </CitiesProvider>
    </AuthProvider>
  );
};

export default App;
