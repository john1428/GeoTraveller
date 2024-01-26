import AppNav from "./AppNav";
import CityList from "./CityList";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CountryList from "./CountryList";
function Sidebar() {
  const location = useLocation();
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      {/* {location.pathname == "/app/cities" ? <CityList /> : <CountryList />} */}
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; CopyRight {new Date().getFullYear} by GeoTraveller Inc
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
