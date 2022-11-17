const axios = require("axios");

let pokemonsObjs = [];
let typesObjs = [];

const getPokemonsFromAPI = async () => {
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
    console.log("Cargando pokemon de " + urls[i]);

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

    pokemonsObjs.push(pokemon);
  }

  Promise.all(promises).then((p) => {
    console.log("All Pokemon data gathered");
  });

  return pokemonsObjs;
};

const listPokemons = async () => {
  // Si ya hay pokemons en el arreglo pokemonsObjs devuelve ese arreglo
  // De lo contrario lanza getPokemonsFromAPI() para rellenarlo
  return pokemonsObjs.length ? pokemonsObjs : getPokemonsFromAPI();
};

const searchPokemon = async (search) => {
  if (!pokemonsObjs.length) await getPokemonsFromAPI();
  console.log(search);

  // Search nos llega como objeto, separamos todas las keys en un arreglo
  // (Así permitimos reutilizar la función en distintas búsquedas)
  keys = [];
  for (key in search) {
    keys.push(key);
  }

  for (let i = 0; i < pokemonsObjs.length; i++) {
    for (let j = 0; j < keys.length; j++) {
      if (pokemonsObjs[i][keys[j]] == search[keys[j]]) return pokemonsObjs[i];
    }
  }
  throw new Error("Pokemon no encontrado");
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
    console.log("Cargando tipo de " + urls[i]);

    let data = url.data;
    type = {
      id: data.id,
      name: data.name[0].toUpperCase() + data.name.substring(1),
    };
    typesObjs.push(type);
  }

  Promise.all(promises).then((p) => {
    console.log("All type data gathered");
  });

  return typesObjs;
};

const listTypes = async () => {
  return typesObjs.length ? typesObjs : getTypesFromAPI();
};

module.exports = {
  getPokemonsFromAPI,
  listPokemons,
  searchPokemon,
  getTypesFromAPI,
  listTypes,
};
