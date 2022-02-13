import React from "react";
import { NavLink } from "react-router-dom";
import Imagen from "../../images/img-mundo.png";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <div className={styles.container}>
      <div className={styles.subcontainer}>
        <img src={Imagen} alt="img-logo" className={styles.logo}/>
        <h1 className={styles.texto}>Countries of the World</h1>
      </div>
      <NavLink className={styles.links} to="/home">
        Home
      </NavLink>
      <NavLink className={styles.links} to="/newActivity">
        New Activity
      </NavLink>
    </div>
  );
}
