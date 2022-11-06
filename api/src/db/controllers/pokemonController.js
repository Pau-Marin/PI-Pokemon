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
  addPokemon: function (pokemon) {
    if (!pokemon) throw new Error("No me mandaste un pokemon para añadir!");

    Pokemon.create(pokemon);
  },

  // Lista todos los pokemons en la base de datos
  listPokemons: async function () {
    let results = await Pokemon.findAll({ raw: true });

    return { data: results, msg: "Ya hay pokemons en la BBDD" };
  },

  searchPokemon: async function (id) {
    let data = await Pokemon.findByPk(id);
    return { data, msg: "Pokemon encontrado" };
  },

  // searchPokemonName: async function (name) {
  // return await Pokemon.findOne({ where: { name } });
  // },
};
