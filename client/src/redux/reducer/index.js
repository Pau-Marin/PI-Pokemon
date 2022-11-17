const initialState = {
  allPokemons: [],
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
        allPokemons: action.payload,
      };
    case "GET_POKEMON_DETAILS":
      return {
        ...state,
        pokemonDetails: action.payload,
      };
    case "CREATE_POKEMON":
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
      };
    case "GET_ALL_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "FILTER_BY_STATUS":
      const allPokemons = state.allPokemons;
      const statusFilter =
        action.payload === "all"
          ? allPokemons
          : allPokemons.filter((p) => {
              if (
                p.types.type1 === action.payload ||
                p.types.type2 === action.payload
              )
                return p;
            });
      return {
        ...state,
        pokemons: statusFilter,
      };
    default:
      return state;
  }
};

export default rootReducer;
