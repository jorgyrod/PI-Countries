import React from "react";
import { NavLink } from "react-router-dom";
import CountryCard from "../../components/Card/CountryCard";
import styles from "./Cards.module.css";

export default function CountriesCards({ countries }) {
  return (
    <div className={styles.countries}>
      {countries &&
        countries.map((country) => (
          <NavLink className={styles.links} to={`/country/${country.cca3}`} key={country.cca3}>
            <CountryCard
              key={country.cca3}
              id={country.cca3}
              name={country.name}
              region={country.region}
              flags={country.flags}
            />
          </NavLink>
        ))}
    </div>
  );
}
