import React from "react";

import PokeTypes from "../PokeTypes/PokeTypes";

export default function PokeInfo({ pokemon }) {
  return (
    <div className="pokeInfo">
      <h1>Esto es la información de un Pokemon</h1>
      <h2>
        #{pokemon.id} - {pokemon.name}
      </h2>
      <img src={pokemon.img} alt={pokemon.name} />
      <PokeTypes types={pokemon.types} />
      <h3>Stats</h3>
      {pokemon.stats.map((s) => {
        return (
          <p key={s.name}>
            {s.name}: {s.stat}
          </p>
        );
      })}
      <h3>Dimensions</h3>
      <p>Height: {pokemon.height}cm</p>
      <p>Weight: {pokemon.weight}Kg</p>
    </div>
  );
}
