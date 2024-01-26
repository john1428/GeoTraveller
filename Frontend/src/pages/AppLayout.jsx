import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
import Map from "../components/Map";
import { useEffect } from "react";
import User from "../components/User";
function AppLayout() {
  // useEffect(function () {
  //   async function getData() {
  //     const res = await fetch(
  //       "https://api.jsonbin.io/v3/b/65ae449f266cfc3fde7dc56b",
  //       {
  //         method: "POST",
  //         headers: {
  //           "X-Master-Key":
  //             "$2a$10$NYl7my0UvKC8IAKaRdKVTuM8sT4YnSP7NVKBi9DOSxHv2jJmSOzia",
  //           "X-Access-Key":
  //             "$2a$10$Vphg.hRCSLdDzsCEqBqxjuiYQ9ou8Uo3Re/604DzzlKGuzbvTkGYq",
  //         },
  //       }
  //     );
  //     const data = await res.json();
  //     console.log("sid", data);
  //   }
  // }, []);
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
