import React from "react";
import style from "./Card.module.css";

export default function CountryCard({ name, region, flags }) {
  return (
    <div className={style.card}>
      <img src={flags} alt="img-country" className={style.imgCountries}/>
      <div className={style.texto}>
        <h4>Nombre: {name}</h4>
        <h5>Continente: {region}</h5>
      </div>
    </div>
  );
}
