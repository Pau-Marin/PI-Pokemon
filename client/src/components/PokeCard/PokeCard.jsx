import React from "react";

const PokeCard = (props) => {
  const { name, hp, attack, defense, speed, height, weight } = props;
  return (
    <div className="pokeCard">
      <h2>{name}</h2>
      <p>HP: {hp}</p>
      <p>ATK: {attack}</p>
      <p>DEF: {defense}</p>
      <p>SPD: {speed}</p>
      <p>{height}cm</p>
      <p>{weight}Kg</p>
    </div>
  );
};

export default PokeCard;
