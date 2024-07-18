import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <h1>Worldwise</h1>
      <Link to="/app">Go to the app</Link>
    </div>
  );
};

export default Homepage;
