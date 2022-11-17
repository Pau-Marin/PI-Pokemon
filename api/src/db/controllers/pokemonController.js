const { Pokemon, Type } = require("../db");

module.exports = {
  // Añade un objeto pokemon a la BBDD
  addPokemon: async function (pokemon) {
    if (!pokemon) throw new Error("No me mandaste un pokemon para añadir!");

    let poke = await Pokemon.create(pokemon);

    let type1Db = await Type.findAll({ where: { name: pokemon.type1 } });
    poke.addType(type1Db);
    if (pokemon.type2) {
      let type2Db = await Type.findAll({
        where: { name: pokemon.type2 },
      });
      poke.addType(type2Db);
    }

    return { data: poke, msg: `Pokemon ${pokemon.name} añadido correctamente` };
  },

  // Lista todos los pokemons en la base de datos
  listPokemons: async function () {
    let results = await Pokemon.findAll({ raw: true });

    return {
      data: results,
      msg: `Actualmente hay ${results.length} Pokemons en la base de datos`,
    };
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
