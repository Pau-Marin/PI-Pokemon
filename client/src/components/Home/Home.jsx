import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons, getAllTypes } from "../../redux/actions/index";

import logo from "../../img/logo.png";

import PokeCard from "../PokeCard/PokeCard";
import PokeSearch from "../PokeSearch/PokeSearch";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);



  return (
    <div className="home">
      <h1>Esto es la Home</h1>
      <img src={logo} alt="PIkemon logo" />
      <PokeSearch />
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
  );
}
