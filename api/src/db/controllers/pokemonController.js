const { Pokemon } = require("../db");

module.exports = {
  // Añade un arreglo de objetos pokemons a la BBDD
  addPokemons: async function (pokemons) {
    if (!pokemons) throw new Error("No me mandaste pokemons para añadir!");

    // let data = await Pokemon.bulkCreate(pokemons);
    for (let i = 0; i < pokemons.length; i++) {
      await Pokemon.findOrCreate({
        where: { idAPI: pokemons[i].id },
        defaults: pokemons[i],
        raw: true,
      });
    }

    let pokeList = await this.listPokemons();

    return {
      data: pokeList.data,
      msg: "Pokemons añadidos correctamente a la BBDD",
    };
  },

  // Añade un objeto pokemon a la BBDD
  addPokemon: async function (pokemon) {
    if (!pokemon) throw new Error("No me mandaste un pokemon para añadir!");

    let poke = await await Pokemon.findOrCreate({
      where: { name: pokemon.name },
      defaults: pokemon,
      raw: true,
    });
    return { data: poke, msg: "Pokemon añadido correctamente" };
  },

  // Lista todos los pokemons en la base de datos
  listPokemons: async function () {
    let results = await Pokemon.findAll({ raw: true });

    return { data: results, msg: "Ya hay pokemons en la BBDD" };
  },

  // Busca pokemons en función de las llaves del objeto que recive
  searchPokemon: async function (search) {
    let data = await Pokemon.findAll({ where: search });

    if (data.length <= 0) {
      throw new Error("Ese pokemon no se encuentra en la base de datos");
    }

    return { data, msg: "Pokemon encontrado" };
  },
};
