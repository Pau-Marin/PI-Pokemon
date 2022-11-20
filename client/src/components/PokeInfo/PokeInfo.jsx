import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getPokemonDetails } from "../../redux/actions";

import PokeTypes from "../PokeTypes/PokeTypes";

import "./PokeInfo.css";

export default function PokeInfo() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const pokemon = useSelector((state) => state.pokemonDetails);
  const random = Math.ceil(Math.random() * 2) - 1;
  const backgrounds = ["bg1", "bg2"];

  useEffect(() => {
    dispatch(getPokemonDetails(id));
  }, []);

  return (
    <div className={`pokeInfo ${backgrounds[random]}`}>
      <div className="pokeDataContainer">
        <div className="pokeInfoName">
          <h2>{pokemon.name}</h2>
          <img className="pokeDataImg" src={pokemon.img} alt={pokemon.name} />
          {id / 2 ? <h3>#{id}</h3> : <h3>Id en base de datos: {id}</h3>}
          <PokeTypes types={pokemon.types} />
        </div>
        <div className="pokeInfoData">
          <div
            className={`pokeInfoStats ${pokemon.types?.type1.toLowerCase()}`}
          >
            <h3>Stats</h3>
            {pokemon.stats?.map((s) => {
              return (
                <p key={s.name}>
                  {s.name}: {s.stat}
                </p>
              );
            })}
          </div>
          <div
            className={`pokeInfoDimensions ${
              pokemon.types?.type2
                ? pokemon.types?.type2.toLowerCase()
                : pokemon.types?.type1.toLowerCase()
            }`}
          >
            <h3>Dimensions</h3>
            <p>Height: {pokemon.height}cm</p>
            <p>Weight: {pokemon.weight}Kg</p>
          </div>
        </div>
      </div>
    </div>
  );
}
