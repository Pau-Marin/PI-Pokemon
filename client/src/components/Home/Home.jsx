import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../../redux/actions/index";

import Filters from "./Filters/Filters";
import Pagination from "./Pagination/Pagination";
import PokeCard from "../PokeCard/PokeCard";
import PokeSearch from "./PokeSearch/PokeSearch";
import Nav from "../Nav/Nav";

import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (!allPokemons.length) dispatch(getAllPokemons());
  }, [dispatch]);

  return (
    <div className="home">
      <Nav />
      <div className="content">
        <Filters paginate={paginate} />
        <PokeSearch />
        <Pagination
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons.length}
          paginate={paginate}
        />
        <div className="cardsContainer">
          {currentPokemons?.map((p) => {
            return (
              <PokeCard
                key={p.id}
                id={p.id}
                name={p.name}
                img={p.img}
                types={p.types}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
