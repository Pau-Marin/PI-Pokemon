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
    case "FILTER_BY_STATUS": {
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
    }
    case "FILTER_BY_CREATED":
      const allPokemons = state.allPokemons;
      const createdFilter =
        action.payload === "created"
          ? allPokemons.filter((p) => p.createdInDb)
          : allPokemons.filter((p) => !p.createdInDb);
      return {
        ...state,
        pokemons: action.payload === "all" ? allPokemons : createdFilter,
      };
    case "ORDER_BY_NAME":
      const sortedArr =
        action.payload === "az"
          ? state.pokemons.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return {
        ...state,
        pokemons: [...sortedArr],
      };
    default:
      return state;
  }
};

export default rootReducer;
