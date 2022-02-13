import React from "react";
import styles from "./container.module.css";

function Container({ addCountries, removeCountry }) {
  return (
    <div className={addCountries.length ? styles.countries : null}>
      {addCountries
        ? addCountries.map((country) => (
            <div key={country.id} className={styles.item}>
              <button onClick={() => removeCountry(country.id)}>X</button>
              <p>{country.name}</p>
            </div>
          ))
        : null}
    </div>
  );
}

export default Container;
