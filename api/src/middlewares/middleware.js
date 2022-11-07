const axios = require("axios");

const { Pokemon, Types } = require("../db/db");
const pokemonController = require("../db/controllers/pokemonController");
const typeController = require("../db/controllers/typeController");

const getPokemons = async (offset = 0, limit = 20) => {
  let pokemonsObjs = [];

  // Obtenemos datos
  let pokemons = await axios(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );

  // Como solo viene el nombre y url hay que irlos a buscar uno por uno
  let urls = pokemons.data.results.map((pokemon) => {
    return pokemon.url;
  });

  let pokemon;
  let promises = [];
  // ¡VENGA API, A TRABAJAR! =D
  for (let i = 0; i < urls.length; i++) {
    let url = await axios(urls[i]);
    promises.push(url);
    console.log("Cargando pokemon en " + urls[i]);

    let data = url.data;
    pokemon = {
      idAPI: data.id,
      name: data.name,
      hp: data.stats.find((s) => s.stat.name === "hp").base_stat,
      atack: data.stats.find((s) => s.stat.name === "attack").base_stat,
      defense: data.stats.find((s) => s.stat.name === "defense").base_stat,
      speed: data.stats.find((s) => s.stat.name === "speed").base_stat,
      height: data.height,
      weight: data.weight,
    };
    pokemonController.addPokemon(pokemon);
    pokemonsObjs.push(pokemon);
  }

  Promise.all(promises).then((p) => {
    console.log("All Pokemon data gathered");
  });

  return pokemonsObjs;
};

const listPokemons = async () => {
  return pokemonController.listPokemons();
};

const searchPokemon = async (search) => {
  return pokemonController.searchPokemon(search);
};

const getTypes = async () => {
  let typesObjs = [];

  // Obtenemos datos
  let types = await axios(`https://pokeapi.co/api/v2/type`);

  // Como solo viene el nombre y url hay que irlos a buscar uno por uno
  let urls = types.data.results.map((type) => {
    return type.url;
  });

  let type;
  let promises = [];
  // ¡VENGA API, A TRABAJAR! =D
  for (let i = 0; i < urls.length; i++) {
    let url = await axios(urls[i]);
    promises.push(url);
    console.log("Cargando tipo en " + urls[i]);

    let data = url.data;
    type = {
      idAPI: data.id,
      name: data.name,
    };
    typeController.addType(type);
    typesObjs.push(type);
  }

  Promise.all(promises).then((p) => {
    console.log("All type data gathered");
  });

  return typesObjs;
};

const listTypes = async () => {
  return typeController.listTypes();
};

module.exports = {
  getPokemons,
  listPokemons,
  searchPokemon,
  getTypes,
  listTypes,
};
