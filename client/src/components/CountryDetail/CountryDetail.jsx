import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountryById } from "../../redux/actions";
import styles from "./CountryDetail.module.css";

export default function CountryDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const country = useSelector((state) => state.countryDetail);

  React.useEffect(() => {
    dispatch(getCountryById(id));
  }, [dispatch, id]);

  React.useEffect(() => {
    return () => dispatch(getCountryById());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.name}>
        <h2>{country.name}</h2>
        <h3>({country.cca3})</h3>
      </div>
      <div className={styles.subcontainer}>
        <img
          src={country.flags}
          alt="img-country"
          className={styles.imgDetail}
        />
        <div className={styles.data}>
          <div className={styles.subdata}>
            <p>Continente: </p>
            <p>{country.region}</p>
          </div>
          <div className={styles.subdata}>
            <p>Sub-Continente: </p>
            <p>{country.subregion}</p>
          </div>
          <div className={styles.subdata}>
            <p>Capital: </p>
            <p>{country.capital}</p>
          </div>
          <div className={styles.subdata}>
            <p>Poblacion: </p>
            <p>{country.population}</p>
          </div>
          <div className={styles.subdata}>
            <p>Area: </p>
            <p>{country.area}</p>
          </div>
        </div>
        {country.activities?.length > 0 && (
          <div
            className={
              country.activities?.length > 1
                ? styles.activCompo
                : styles.activities
            }
          >
            <div className={styles.ch3}>
              <h3>Actividades</h3>
            </div>
            <div className={styles.dataActivity}>
              {country.activities?.map((activity) => (
                <div key={activity.id} className={styles.activityContainer}>
                  <div className={styles.subdata}>
                    <p>Nombre: </p>
                    <p>{activity.name}</p>
                  </div>
                  <div className={styles.subdata}>
                    <p>Dificultad: </p>
                    <p>{activity.difficulty}</p>
                  </div>
                  <div className={styles.subdata}>
                    <p>Duracion: </p>
                    <p>{activity.duration}</p>
                  </div>
                  <div className={styles.subdata}>
                    <p>Temporada: </p>
                    <p>{activity.season}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
