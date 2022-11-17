import React from "react";

export default function Pagination({ pokemonsPerPage, allPokemons, paginate }) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav className="pagination">
      <ul>
        {pageNumbers &&
          pageNumbers.map((n) => {
            return (
              <li className="pagination_number" key={n}>
                <a onClick={() => paginate(n)}>{n}</a>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
