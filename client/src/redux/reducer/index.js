const initialState = {
  allPokemons: [],
  pokemons: [],
  types: [],
  pokemonDetails: {},
  error: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // Acá va tu código:
    case "ERROR":
      return {
        ...state,
        error: action.payload.message,
      };

    case "GET_ALL_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
        error: "",
      };
    case "GET_POKEMON_DETAILS":
      return {
        ...state,
        pokemonDetails: action.payload,
        error: "",
      };
    case "CREATE_POKEMON":
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
        error: "",
      };
    case "GET_ALL_TYPES":
      return {
        ...state,
        types: action.payload,
        error: "",
      };
    case "SEARCH_BY_NAME":
      return {
        ...state,
        pokemons: action.payload,
        error: "",
      };
    case "FILTER_BY_TYPE": {
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
        pokemons: [...statusFilter],
        error: "",
      };
    }
    case "FILTER_BY_CREATED": {
      const allPokemons = state.allPokemons;
      const createdFilter =
        action.payload === "created"
          ? allPokemons.filter((p) => p.createdInDb)
          : allPokemons.filter((p) => !p.createdInDb);
      return {
        ...state,
        pokemons: action.payload === "all" ? allPokemons : createdFilter,
        error: "",
      };
    }
    case "ORDER_BY_NAME": {
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
        error: "",
      };
    }
    case "ORDER_BY_ATTACK": {
      const sortedArr =
        action.payload === "ATK 1-9"
          ? state.pokemons.sort(function (a, b) {
              console.log(a, b);
              if (a.stats[2].stat > b.stats[2].stat) return 1;
              if (b.stats[2].stat > a.stats[2].stat) return -1;
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.stats[2].stat > b.stats[2].stat) return -1;
              if (b.stats[2].stat > a.stats[2].stat) return 1;
              return 0;
            });
      return {
        ...state,
        pokemons: [...sortedArr],
        error: "",
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
