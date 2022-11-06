const axios = require("axios");

const { Pokemon, Types } = require("../db");

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
  // ¡VENGA API, A TRABAJAR! =D
  for (let i = 0; i < urls.length; i++) {
    let url = await axios(urls[i]);
    let data = url.data;
    pokemon = {
      id: data.id,
      name: data.name,
      hp: data.stats.find((s) => s.stat.name === "hp").base_stat,
      atack: data.stats.find((s) => s.stat.name === "attack").base_stat,
      defense: data.stats.find((s) => s.stat.name === "defense").base_stat,
      speed: data.stats.find((s) => s.stat.name === "speed").base_stat,
      height: data.height,
      weight: data.weight,
    };
    pokemonsObjs.push(pokemon);
  }

  return pokemonsObjs;
};

module.exports = {
  getPokemons,
};
