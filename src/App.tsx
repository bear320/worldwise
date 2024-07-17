import { Outlet, Link } from "react-router-dom";

const App = () => {
  return (
    <>
      <Link to="/">Home</Link> | <Link to="/pricing">Pricing</Link> | <Link to="/product">Product</Link>
      <Outlet />
    </>
  );
};

export default App;
