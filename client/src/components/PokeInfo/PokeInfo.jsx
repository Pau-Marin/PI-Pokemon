import React from "react";

export default function PokeInfo({ pokemon }) {
  return (
    <div>
      <h1>Esto es la información de un Pokemon</h1>
      <h2>{pokemon.name}</h2>
    </div>
  );
}
