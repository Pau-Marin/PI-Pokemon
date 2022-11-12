import React from "react";

import PokeTypes from "../PokeTypes/PokeTypes";

const PokeCard = (props) => {
  const { name, img, types } = props;
  return (
    <div className="pokeCard">
      <h2>{name}</h2>
      <img src={img} alt={name} />
    </div>
  );
};

export default PokeCard;
