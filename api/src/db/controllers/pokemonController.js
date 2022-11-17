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
  listPokemonsDb: async function () {
    let results = await Pokemon.findAll({ raw: true });

    results = results.map((p) => {
      return {
        id: p.id,
        // Capitalize 1st letter in name
        name: p.name[0].toUpperCase() + p.name.substring(1),
        // Stats in array for easyer use in front
        stats: [
          {
            name: "HP",
            stat: p.hp,
          },
          {
            name: "ATK",
            stat: p.attack,
          },
          {
            name: "DEF",
            stat: p.defense,
          },
          {
            name: "SPD",
            stat: p.speed,
          },
        ],
        // img = URL
        img: p.img,
        types: {
          type1: p.type1,
          type2: p.type2,
        },
        // Height needs to be * 10 to be in cm
        height: p.height * 10,
        weight: p.weight,
        createdInDb: p.createdInDb,
      };
    });

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
