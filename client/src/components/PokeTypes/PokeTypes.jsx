import React from "react";
import { useDispatch } from "react-redux";
import { filterPokemonsByTypes } from "../../redux/actions/index";
import { Link } from "react-router-dom";

import { typeIcons } from "./icons";

import "./PokeTypes.css";

const PokeTypes = (props) => {
  const { types } = props;

  const dispatch = useDispatch();

  function handleFilterByType(type) {
    dispatch(filterPokemonsByTypes(type));
  }

  return (
    <div className="wrapper">
      {types?.type1 && (
        <Link to="/home" onClick={(e) => handleFilterByType(types.type1)}>
          <button tabIndex="-1" className={`icon ${types.type1.toLowerCase()}`}>
            <img
              src={typeIcons[types.type1.toLowerCase()]}
              alt={types.type1}
              title={types.type1}
            />
          </button>
        </Link>
      )}
      {types?.type2 && (
        <Link to="/home" onClick={(e) => handleFilterByType(types.type2)}>
          <button tabIndex="-1" className={`icon ${types.type2.toLowerCase()}`}>
            <img
              src={typeIcons[types.type2.toLowerCase()]}
              alt={types.type2}
              title={types.type2}
            />
          </button>
        </Link>
      )}
    </div>
  );
};

export default PokeTypes;
