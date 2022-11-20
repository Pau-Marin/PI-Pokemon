import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPokemons,
  getAllTypes,
  filterPokemonsByTypes,
  filterPokemonsByCreated,
  filterPokemonsByAttack,
  orderByName,
} from "../../redux/actions";

export default function Filters({ paginate }) {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  useEffect(() => {
    if (!types.length) dispatch(getAllTypes());
  }, [dispatch]);

  function resetFiltersHandler(e) {
    e.preventDefault();
    dispatch(getAllPokemons());
    paginate(1);
  }

  function handleSort(e) {
    e.preventDefault();
    if (e.target.value === "az" || e.target.value === "za")
      dispatch(orderByName(e.target.value));
    if (e.target.value === "ATK 1-9" || e.target.value === "ATK 9-1")
      dispatch(filterPokemonsByAttack(e.target.value));
    paginate(1);
  }

  function handleFilterType(e) {
    dispatch(filterPokemonsByTypes(e.target.value));
    paginate(1);
  }

  function handleFilterCreated(e) {
    dispatch(filterPokemonsByCreated(e.target.value));
    paginate(1);
  }

  return (
    <div className="filters">
      <button className="ui" onClick={(e) => resetFiltersHandler(e)}>
        Reset filters
      </button>
      <select onChange={(e) => handleSort(e)}>
        <option selected disabled>
          Order
        </option>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
        <option value="ATK 1-9">ATK 1-9</option>
        <option value="ATK 9-1">ATK 9-1</option>
      </select>
      <select onChange={(e) => handleFilterType(e)}>
        <option selected disabled>
          Type
        </option>
        {types?.map((t) => {
          return (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          );
        })}
      </select>
      <select onChange={(e) => handleFilterCreated(e)}>
        <option selected disabled>
          Pokemons
        </option>
        <option value="all">All</option>
        <option value="existing">Existent</option>
        <option value="created">Created by users</option>
      </select>
    </div>
  );
}
