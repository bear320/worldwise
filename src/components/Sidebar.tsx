import { Outlet, useOutletContext } from "react-router-dom";
import Logo from "./Logo";
import AppNavbar from "./AppNavbar";
import { ContextType } from "../types";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const { cities, isLoading } = useOutletContext<ContextType>();

  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNavbar />

      <Outlet context={{ cities, isLoading }} />

      <footer className={styles.footer}>
        <p className={styles.copyright}>&copy; Copyright {new Date().getFullYear()} by WorldWise Inc.</p>
      </footer>
    </div>
  );
};

export default Sidebar;
