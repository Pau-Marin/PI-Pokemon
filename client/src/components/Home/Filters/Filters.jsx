import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPokemons,
  getAllTypes,
  filterPokemonsByTypes,
} from "../../../redux/actions/index";

export default function Filters({ paginate }) {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);

  function resetFiltersHandler(e) {
    e.preventDefault();
    dispatch(getAllPokemons());
  }

  function handleFilterType(e) {
    e.preventDefault();
    dispatch(filterPokemonsByTypes(e.target.value));
    paginate(1);
  }

  return (
    <div className="filters">
      <button onClick={(e) => resetFiltersHandler(e)}>Reset filters</button>
      <select>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
      </select>
      <select onChange={(e) => handleFilterType(e)}>
        {types?.map((t) => {
          return (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          );
        })}
      </select>
      <select>
        <option value="all">Todos</option>
        <option value="existing">Existentes</option>
        <option value="created">Creados</option>
      </select>
    </div>
  );
}
