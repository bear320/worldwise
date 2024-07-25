import ProtectedRoute from "./ProtectedRoute";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import User from "../components/User";
import styles from "./WebApp.module.scss";

const WebApp = () => {
  return (
    <ProtectedRoute>
      <div className={styles.app}>
        <Sidebar />
        <Map />
        <User />
      </div>
    </ProtectedRoute>
  );
};

export default WebApp;
