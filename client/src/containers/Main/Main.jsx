import React from "react";
import { Link } from "react-router-dom";
import Imagen from "../../images/img-mundo.png";
import Fondo from "../../images/banderas.jpg";
import styles from "./Main.module.css";

export default function Main() {
  return (
    <div className={styles.container}>
      <img src={Fondo} alt="img-fondo" className={styles.fondo} />
      <div className={styles.datos}>
        <div>
          <h2 className={styles.h2}>Countries of World</h2>
          <Link to='/home'>
            <button className={styles.btnHome}>Home</button>
          </Link>
        </div>
        <img src={Imagen} alt="imagen-mundo" className={styles.img_mundo} />
      </div>
    </div>
  );
}
