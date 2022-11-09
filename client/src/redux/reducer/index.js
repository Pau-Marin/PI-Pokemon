const initialState = {
  pokemons: [],
  types: [],
  pokemonDetails: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // Acá va tu código:
    case "GET_ALL_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "GET_POKEMON_DETAILS":
      return {
        ...state,
        pokemonDetails: action.payload,
      };
    case "CREATE_POKEMON":
      return {
        ...state,
        pokemons: [...state.movies, action.payload],
      };
    case "GET_ALL_TYPES":
      return {
        ...state,
        types: action,
        pokeType: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
