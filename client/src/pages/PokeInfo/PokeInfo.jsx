import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getPokemonDetails } from "../../redux/actions";

import Nav from "../../components/Nav/Nav";
import PokeTypes from "../../components/PokeTypes/PokeTypes";

import "./PokeInfo.css";

export default function PokeInfo() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const pokemon = useSelector((state) => state.pokemonDetails);
  const random = Math.ceil(Math.random() * 2) - 1;
  const backgrounds = ["bg1", "bg2"];

  useEffect(() => {
    dispatch(getPokemonDetails(id));
  }, [dispatch]);

  return (
    <div className={`pokeInfo ${backgrounds[random]}`}>
      <Nav />
      <div className="pokeDataContainer">
        <div className="pokeInfoName">
          <h2>{pokemon.name}</h2>
          <img className="pokeDataImg" src={pokemon.img} alt={pokemon.name} />
          {id / 2 ? <h3>#{id}</h3> : <h3>Id site database: {id}</h3>}
          <PokeTypes types={pokemon.types} />
        </div>
        <div className="pokeInfoData">
          <div
            className={`pokeInfoContainer ${pokemon.types?.type1.toLowerCase()}`}
          >
            <h3>Stats</h3>
            <div className="pokeInfoStats">
              {pokemon.stats?.map((s) => {
                return (
                  <p key={s.name}>
                    <b>{s.name}:</b> {s.stat}
                  </p>
                );
              })}
            </div>
          </div>
          <div
            className={`pokeInfoContainer ${
              pokemon.types?.type2
                ? pokemon.types?.type2.toLowerCase()
                : pokemon.types?.type1.toLowerCase()
            }`}
          >
            <h3>Dimensions</h3>
            <div className="pokeInfoDimensions">
              <p>
                <b>Height:</b> {pokemon.height}cm
              </p>
              <p>
                <b>Weight:</b> {pokemon.weight}Kg
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
