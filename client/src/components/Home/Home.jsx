import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries, getCountriesSort } from "../../redux/actions";
import CountriesCards from "../../containers/Cards/CountriesCards";
import Pagination from "../Pagination/Pagination";
import style from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);

  const [filter, setFilter] = useState({
    name: "",
    sort: "",
    region: "",
    subregion: "",
    activity: "",
  });

  React.useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(
      getCountriesSort(
        filter.name,
        filter.sort,
        filter.region,
        filter.subregion,
        filter.activity
      )
    );
  }, [dispatch, filter]);

  const [page, setPage] = useState({
    actualPage: 1,
    countriesPerPage: 10,
  });

  let actividades = [];
  countries.map(
    (data) =>
      data.activities?.length &&
      data.activities.map(
        (activity) => activity.name && actividades.push(activity.name)
      )
  );

  let indexActivities = actividades.filter(function (item, index, array) {
    return array.indexOf(item) === index;
  });

  const lastCountries = page.actualPage * page.countriesPerPage;
  const firstCountries = lastCountries - page.countriesPerPage;
  const actualCountries = countries.slice(firstCountries, lastCountries);

  const paginate = (pageNumber) =>
    setPage({
      ...page,
      actualPage: pageNumber,
    });

  function handleOnChange(e) {
    if (filter.region === "") page.actualPage = 1;
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  }
  if(filter.subregion !== "") filter.region = "";

  return (
    <div>
      <div className={style.filters}>
        <div className={style.select}>
          <select name="region" onChange={handleOnChange}>
            <option value="">All Regions</option>
            <option value="Europe">Europe</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
        <div>
          <select name="subregion" onChange={handleOnChange}>
            <option value="">All Sub-Regions</option>
            <option value="South America">Sur America</option>
            <option value="North America">Norte America</option>
            <option value="Caribbean">America Central</option>
          </select>
        </div>
        <div>
          <select name="sort" onChange={handleOnChange}>
            <option value=""> Order By</option>
            <option value="AtoZ">A to Z</option>
            <option value="ZtoA">Z to A</option>
            <option value="pobAsc">Ascending Population</option>
            <option value="pobDes">Descending Population</option>
          </select>
        </div>
        <div>
          <select name="activity" onChange={handleOnChange}>
            <option value=""> Activities</option>
            {indexActivities.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            placeholder="Find Country"
            name="name"
            value={filter.name}
            onChange={handleOnChange}
          />
        </div>
      </div>
      <Pagination
        countryPerPage={page.countriesPerPage}
        allCountries={countries.length}
        Paginate={paginate}
        actualPage={page.actualPage}
      />
      <CountriesCards countries={actualCountries} />
    </div>
  );
};

export default Home;
