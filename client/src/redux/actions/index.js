import axios from "axios";

export const getAllPokemons = () => {
  return async function (dispatch) {
    let pokemons = await axios("http://localhost:3001/pokemons");
    return dispatch({ type: "GET_ALL_POKEMONS", payload: pokemons.data });
  };
};

export const getPokemonDetails = (id) => {
  return async function (dispatch) {
    let pokemon = await axios(`http://localhost:3001/pokemons/${id}`);
    return dispatch({ type: "GET_POKEMON_DETAILS", payload: pokemon.data });
  };
};

export const createPokemon = (payload) => {
  return async function (dispatch) {
    let pokemon = axios.post(
      "http://localhost:3001/pokemons/createPokemon",
      payload
    );
    return pokemon;
  };
};

export const getAllTypes = (payload) => {
  return async function (dispatch) {
    let types = await axios("http://localhost:3001/types");
    return dispatch({ type: "GET_ALL_TYPES", payload: types.data });
  };
};

export function filterPokemonsByTypes(payload) {
  return {
    type: "FILTER_BY_STATUS",
    payload,
  };
}

export function filterPokemonsByCreated(payload) {
  return {
    type: "FILTER_BY_CREATED",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function searchPokemonByName(name) {
  return async function (dispatch) {
    try {
      let pokemon = await axios(`http://localhost:3001/pokemons?name=${name}`);
      return dispatch({
        type: "SEARCH_BY_NAME",
        payload: [pokemon.data],
      });
    } catch (err) {
      console.log(err);
    }
  };
}
