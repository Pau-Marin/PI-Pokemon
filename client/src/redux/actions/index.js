// const axios = require("axios");
import axios from "axios";

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_POKEMON_DETAILS = "GET_POKEMON_DETAILS";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_ALL_TYPES = "GET_ALL_TYPES";

export const getAllPokemons = () => {
  return async function (dispatch) {
    let pokemons = await axios("http://localhost:3001/pokemons");
    return dispatch({ type: GET_ALL_POKEMONS, payload: pokemons.data });
  };
};

export const getPokemon = (id) => {
  return async function (dispatch) {
    let pokemon = await axios(`http://localhost:3001/pokemons/${id}`);
    return dispatch({ type: GET_POKEMON_DETAILS, payload: pokemon.data });
  };
};

// TODO: crear ruta en el back para crear pokemons
// export const createPokemon = (pokemon) => {
//   return async function (dispatch) {}
//     let pokemon = axios("http://localhost:3001/createPokemon");
//     return dispatch({ type: CREATE_POKEMON, payload: pokemon.data });
//   };
// };

export const getAllTypes = () => {
  return async function (dispatch) {
    let types = await axios("http://localhost:3001/types");
    return dispatch({ type: GET_ALL_TYPES, payload: types.data });
  };
};
