import Logo from "./Logo";
import AppNavbar from "./AppNavbar";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNavbar />

      <p>List of cities</p>

      <footer className={styles.footer}>
        <p className={styles.copyright}>&copy; Copyright {new Date().getFullYear()} by WorldWise Inc.</p>
      </footer>
    </div>
  );
};

export default Sidebar;
