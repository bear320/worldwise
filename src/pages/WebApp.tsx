import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import styles from "./WebApp.module.scss";

const WebApp = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
};

export default WebApp;
