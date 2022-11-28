import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../../redux/actions/index";

import Filters from "../../components/Filters/Filters";
import Pagination from "../../components/Pagination/Pagination";
import PokeCard from "../../components/PokeCard/PokeCard";
import PokeSearch from "../../components/PokeSearch/PokeSearch";
import Nav from "../../components/Nav/Nav";

import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const error = useSelector((state) => state.error);

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
      {error ? (
        <div className="error">
          <h1>Vaya, parece que ha habido un error</h1>
          <p>Estoy trabajando para arreglarlo lo antes possible.</p>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
