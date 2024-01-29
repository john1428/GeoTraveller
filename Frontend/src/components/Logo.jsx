import styles from "./Logo.module.css";
import { Link } from "react-router-dom";
function Logo() {
  return (
    <Link to="/">
      <img
        src="../../geo7.png"
        alt="GeoTraveller logo"
        className={styles.logo}
      />
    </Link>
  );
}

export default Logo;
