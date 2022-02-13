import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries, createActivity } from "../../redux/actions";
import Container from "./Container";
import { cargarActividades, listaActividades } from "../Home/Activities";
import styles from "./AddActivity.module.css";

function AddActivity() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);

  const [activity, setActivity] = useState({
    name: "",
    difficulty: "1",
    duration: "1",
    season: "",
  });

  const [addCountries, setAddCountries] = useState([]);

  function handleOnChange(e) {
    if (e.target.name === "name") validar(e.target.value);
    if (!error) {
      setActivity({
        ...activity,
        [e.target.name]: e.target.value,
      });
    }
  }
  cargarActividades(countries);
  let actividades = listaActividades;

  React.useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  function handleOnSubmit(e) {
    e.preventDefault();

    if (!addCountries.length) {
      setErrorSel("Debe de ingresar por lo menos 1 pais");
      alert("Debe de ingresar por lo menos 1 pais");
    } else {
      if (!error) {
        setErrorSel("");
        const codes = addCountries.map((country) => country.id);
        activity.codesCountries = codes;
        dispatch(createActivity(activity));
        alert(`La actividad ${activity.name} ha sido creada`);
        limpiar();
      }
      alert("Por favor corrija los campos!!");
    }
  }

  function handleOnSelect(e) {
    let aux = e.target.value.split(" ");
    setAddCountries([...addCountries, { id: aux[0], name: aux[1] }]);
  }

  function removeCountry(id) {
    const newCountries = addCountries.filter((country) => country.id !== id);
    setAddCountries(newCountries);
  }

  function limpiar() {
    setActivity({
      name: "",
      difficulty: "1",
      duration: "1",
      season: "",
    });
    setAddCountries([]);
  }

  const [error, setError] = useState("");
  const [errorSel, setErrorSel] = useState("");

  function validar(valor) {
    let valoresNumeros = /^[0-9]+$/;

    /*     if (actividades.indexOf(valor) !== -1)
      alert("El nombre de la actividad ya existe!"); */

    if (valor.match(valoresNumeros)) {
      setActivity({
        ...activity,
        name: "",
      });
      setError("El valor ingresado no es de tipo texto");
    } else if (actividades.indexOf(valor) !== -1)
      setError("El nombre de la actividad ya existe!");
    else setError("");
  }
  return (
    <div className={styles.container}>
      <form onSubmit={handleOnSubmit} className={styles.container}>
        <div className={styles.firstData}>
          <div className={styles.containerInput}>
            <label>Nombre de la Actividad: </label>
            <input
              name="name"
              value={activity.name}
              onChange={handleOnChange}
              className={error ? styles.error : styles.input}
              required
            />
            {!error ? null : <span>{error}</span>}
          </div>
          <div>
            <label>Duracion: </label>
            <input
              name="duration"
              type="number"
              min="1"
              max="365"
              value={activity.duration}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label>Dificultad: </label>
            <select
              name="difficulty"
              id="difficulty1"
              value={activity.difficulty}
              onChange={handleOnChange}
            >
              <option key="1" value={1}>
                1
              </option>
              <option key="2" value={2}>
                2
              </option>
              <option key="3" value={3}>
                3
              </option>
              <option key="4" value={4}>
                4
              </option>
              <option key="5" value={5}>
                5
              </option>
            </select>
          </div>
          <div>
            <label>Temporada: </label>
            <select
              name="season"
              id="temp1"
              value={activity.season}
              onChange={handleOnChange}
            >
              <option value={""}>Sin temporada</option>
              <option value={"Winter"}>Winter</option>
              <option value={"Autumn"}>Autumn</option>
              <option value={"Spring"}>Spring</option>
              <option value={"Summer"}>Summer</option>
            </select>
          </div>
        </div>
        <div className={styles.secondData}>
          <label>Seleccionar Paises</label>
          <select
            name="countries"
            id="count1"
            onChange={handleOnSelect}
            value={addCountries}
            multiple={true}
          >
            {countries &&
              countries.map((country) => (
                <option
                  key={country.cca3}
                  value={country.cca3 + " " + country.name}
                >
                  {country.name}
                </option>
              ))}
          </select>
          <Container
            addCountries={addCountries}
            removeCountry={removeCountry}
          />
          {!errorSel ? null : <span>{errorSel}</span>}
          <button type="submit" className={styles.btn}>
            Crear
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddActivity;
