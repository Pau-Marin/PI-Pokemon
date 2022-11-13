import React from "react";
import { Link } from "react-router-dom";

import PokeTypes from "../PokeTypes/PokeTypes";

const PokeCard = (props) => {
  const { id, name, img, types } = props;
  return (
    <div className="pokeCard">
      <Link to={`/pokemon/${id}`}>
        <h2>{name}</h2>
      </Link>
      <img src={img} alt={name} />
      <PokeTypes types={types} />
    </div>
  );
};

export default PokeCard;
