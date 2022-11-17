const axios = require("axios");

const { addType, listTypesDb } = require("../db/controllers/typeController");
const {
  addPokemon,
  listPokemonsDb,
} = require("../db/controllers/pokemonController");

let pokemonsObjs = [];

const getPokemonsFromAPI = async () => {
  let pokemonsAPI = [];
  // Obtenemos datos
  // let pokemons = await axios("https://pokeapi.co/api/v2/pokemon?limit=1154");
  let pokemons = await axios("https://pokeapi.co/api/v2/pokemon");
  let pokemonsNext = await axios(pokemons.data.next);

  // Como solo viene el nombre y url hay que irlos a buscar uno por uno
  let urls = pokemons.data.results.map((pokemon) => {
    return pokemon.url;
  });
  let urlsNext = pokemonsNext.data.results.map((pokemon) => {
    return pokemon.url;
  });

  urls = urls.concat(urlsNext);

  let pokemon = {};
  let promises = [];
  // ¡VENGA API, A TRABAJAR! =D
  for (let i = 0; i < urls.length; i++) {
    let url = await axios(urls[i]);
    promises.push(url);
    console.log(`Cargando pokemon de ${urls[i]} (${url.data.name})`);

    let data = url.data;
    let stats = data.stats;

    let types;
    // Some pokemons only have 1 type
    if (data.types.length > 1) {
      types = {
        type1:
          data.types[0].type.name[0].toUpperCase() +
          data.types[0].type.name.substring(1),
        type2:
          data.types[1].type.name[0].toUpperCase() +
          data.types[1].type.name.substring(1),
      };
    } else {
      types = {
        type1:
          data.types[0].type.name[0].toUpperCase() +
          data.types[0].type.name.substring(1),
      };
    }

    pokemon = {
      id: data.id,
      // Capitalize 1st letter in name
      name: data.name[0].toUpperCase() + data.name.substring(1),
      // Stats in array for easyer use in front
      stats: [
        {
          name: "HP",
          stat: stats.find((s) => s.stat.name === "hp").base_stat,
        },
        {
          name: "ATK",
          stat: stats.find((s) => s.stat.name === "attack").base_stat,
        },
        {
          name: "DEF",
          stat: stats.find((s) => s.stat.name === "defense").base_stat,
        },
        {
          name: "SPD",
          stat: stats.find((s) => s.stat.name === "speed").base_stat,
        },
      ],
      // img = URL
      img: data.sprites.other.dream_world.front_default,
      types,
      // Height needs to be * 10 to be in cm
      height: data.height * 10,
      weight: data.weight,
    };

    pokemonsAPI.push(pokemon);
  }

  Promise.all(promises).then((p) => {
    console.log("All Pokemon data gathered");
  });

  return pokemonsAPI;
};

const getPokemonsFromDb = async () => {
  return await listPokemonsDb();
};

const getPokemons = async () => {
  const pokemonsAPI = await getPokemonsFromAPI();
  const pokemonsDB = await getPokemonsFromDb();
  const allPokemons = pokemonsAPI.concat(pokemonsDB.data);
  pokemonsObjs = allPokemons;
};

const listPokemons = async () => {
  // Si ya hay pokemons en el arreglo pokemonsObjs devuelve ese arreglo
  // De lo contrario lanza getPokemonsFromAPI() para rellenarlo
  getPokemons();
  return pokemonsObjs.length ? pokemonsObjs : getPokemons();
};

const searchPokemon = async (search) => {
  if (!pokemonsObjs.length) await getPokemons();

  // Search nos llega como objeto, separamos todas las keys en un arreglo
  // (Así permitimos reutilizar la función en distintas búsquedas)
  keys = [];
  for (key in search) {
    keys.push(key);
  }

  for (let i = 0; i < pokemonsObjs.length; i++) {
    for (let j = 0; j < keys.length; j++) {
      let pokemonKey = pokemonsObjs[i][keys[j]];
      let searchKey = search[keys[j]];
      if (typeof pokemonKey === "string" && typeof searchKey === "string") {
        pokemonKey = pokemonKey.toLowerCase();
        searchKey = searchKey.toLowerCase();
      }
      if (pokemonKey == searchKey) return pokemonsObjs[i];
    }
  }
  throw new Error("Pokemon no encontrado");
};

const createPokemon = async (
  name,
  hp,
  attack,
  defense,
  speed,
  img,
  type1,
  type2,
  height,
  weight
) => {
  let pokemon = await addPokemon({
    name,
    hp,
    attack,
    defense,
    speed,
    img,
    type1,
    type2,
    height,
    weight,
    createdInDb: true,
  });
  return pokemon;
};

const getTypesFromAPI = async () => {
  // Obtenemos datos
  let types = await axios(`https://pokeapi.co/api/v2/type`);

  // Como solo viene el nombre y url hay que irlos a buscar uno por uno
  let urls = types.data.results.map((type) => {
    return type.url;
  });

  let type = {};
  let promises = [];
  // ¡VENGA API, A TRABAJAR! =D
  for (let i = 0; i < urls.length; i++) {
    let url = await axios(urls[i]);
    promises.push(url);
    console.log(`Cargando tipo de ${urls[i]} (${url.data.name})`);

    let data = url.data;
    type = {
      id: data.id,
      name: data.name[0].toUpperCase() + data.name.substring(1),
    };
    addType(type);
  }

  Promise.all(promises).then((p) => {
    console.log("All type data gathered");
  });
};

const listTypes = async () => {
  let types = await listTypesDb();
  return types.data;
};

module.exports = {
  getPokemons,
  listPokemons,
  searchPokemon,
  createPokemon,
  getTypesFromAPI,
  listTypes,
};
