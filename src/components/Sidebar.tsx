import { Outlet } from "react-router-dom";
import Logo from "./Logo";
import AppNavbar from "./AppNavbar";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNavbar />

      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>&copy; Copyright {new Date().getFullYear()} by WorldWise Inc.</p>
      </footer>
    </div>
  );
};

export default Sidebar;
