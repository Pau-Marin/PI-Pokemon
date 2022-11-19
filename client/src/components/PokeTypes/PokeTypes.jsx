import React from "react";
import { useDispatch } from "react-redux";
import { filterPokemonsByTypes } from "../../redux/actions/index";
import { Link } from "react-router-dom";

import bug from "../../img/icons/bug.svg";
import dark from "../../img/icons/dark.svg";
import dragon from "../../img/icons/dragon.svg";
import electric from "../../img/icons/electric.svg";
import fairy from "../../img/icons/fairy.svg";
import fighting from "../../img/icons/fighting.svg";
import fire from "../../img/icons/fire.svg";
import flying from "../../img/icons/flying.svg";
import ghost from "../../img/icons/ghost.svg";
import grass from "../../img/icons/grass.svg";
import ground from "../../img/icons/ground.svg";
import ice from "../../img/icons/ice.svg";
import normal from "../../img/icons/normal.svg";
import poison from "../../img/icons/poison.svg";
import psychic from "../../img/icons/psychic.svg";
import rock from "../../img/icons/rock.svg";
import steel from "../../img/icons/steel.svg";
import water from "../../img/icons/water.svg";

import "./pokeTypes.css";

const PokeTypes = (props) => {
  const typeIcons = {
    bug,
    dark,
    dragon,
    electric,
    fairy,
    fighting,
    fire,
    flying,
    ghost,
    grass,
    ground,
    ice,
    normal,
    poison,
    psychic,
    rock,
    steel,
    water,
  };

  const { types } = props;

  const dispatch = useDispatch();

  function handleFilterByType(type) {
    dispatch(filterPokemonsByTypes(type));
  }

  return (
    <div className="wrapper">
      {types?.type1 && (
        <Link to="/home" onClick={(e) => handleFilterByType(types.type1)}>
          <button className={`icon ${types.type1.toLowerCase()}`}>
            <img
              src={typeIcons[types.type1.toLowerCase()]}
              alt={types.type1}
              title={types.type1}
            />
          </button>
        </Link>
      )}
      {types?.type2 && (
        <Link to="/home" onClick={(e) => handleFilterByType(types.type1)}>
          <button
            className={`icon ${types.type2.toLowerCase()}`}
            onClick={(e) => handleFilterByType(e, types.type2)}
          >
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
