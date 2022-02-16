import React from "react";
import { RIGHT_PAGE, LEFT_PAGE, fetchPageNumbers } from "./logic.js";
import styles from "./Pagination.module.css";

function Pagination({ countryPerPage, allCountries, Paginate, actualPage }) {
  const pageNeighbours = 2;
  const totalPages = Math.ceil(allCountries / countryPerPage);
  const pages = fetchPageNumbers(pageNeighbours, actualPage, totalPages);

  function handleClick(page) {
    return function (e) {
      e.preventDefault();
      Paginate(page);
    };
  }

  function handleMoveLeft(e) {
    e.preventDefault();
    let maxPage = actualPage - pageNeighbours * 2 - 1;
    maxPage = maxPage < 2 ? 1 : maxPage;
    Paginate(maxPage);
  }

  function handleMoveRight(e) {
    e.preventDefault();
    let maxPage = actualPage + pageNeighbours * 2 + 1;
    maxPage = maxPage > totalPages ? totalPages : maxPage;
    Paginate(maxPage);
  }

  return (
    <div className={styles.container}>
      {pages.map((page, index) => {
        if (page === LEFT_PAGE)
          return (
            <p key={index} className={styles.page}>
              <button
                onClick={handleMoveLeft}
                className={styles.pageActive}
              >
                &laquo;
              </button>
            </p>
          );
        if (page === RIGHT_PAGE)
          return (
            <p key={index} className={styles.page}>
              <button
                onClick={handleMoveRight}
                className={styles.pageActive}
              >
                &raquo;
              </button>
            </p>
          );
        return (
          <p key={index} className={styles.page}>
            <button
              onClick={handleClick(page)}
              className={actualPage === page ? styles.pageActive : styles.pageLink}
            >
              {page}
            </button>
          </p>
        );
      })}
    </div>
  );
}

export default Pagination;
