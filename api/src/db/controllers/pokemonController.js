const { Sequelize } = require("sequelize")
const { Pokemon, Type, Pokemon_types } = require("../db")

module.exports = {
  // Añade un objeto pokemon a la BBDD
  addPokemon: async function (pokemon) {
    if (!pokemon) throw new Error("No me mandaste un pokemon para añadir!")

    let poke = await Pokemon.create(pokemon)

    let type1Db = await Type.findAll({ where: { name: pokemon.type1 } })
    await poke.addType(type1Db)
    if (pokemon.type2) {
      let type2Db = await Type.findAll({
        where: { name: pokemon.type2 },
      })
      await poke.addType(type2Db)
    }

    return { data: poke, msg: `Pokemon ${pokemon.name} añadido correctamente` }
  },

  // Lista todos los pokemons en la base de datos
  listPokemonsDb: async function () {
    let results = await Pokemon.findAll({ include: Type })

    results = results.map((p) => {
      p = p.dataValues

      let types = [p.types[0]?.dataValues.name, p.types[1]?.dataValues.name]

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
          type1: types[0],
          type2: types[1],
        },
        // Height needs to be * 10 to be in cm
        height: p.height,
        weight: p.weight,
        createdInDb: p.createdInDb,
      }
    })

    return {
      data: results,
      msg: `Actualmente hay ${results.length} Pokemons en la base de datos`,
    }
  },

  // Busca pokemons en función de las llaves del objeto que recive
  searchPokemon: async function (search) {
    let data = await Pokemon.findAll({ where: search })

    if (data.length <= 0) {
      throw new Error("Ese pokemon no se encuentra en la base de datos")
    }

    return { data, msg: "Pokemon encontrado" }
  },
}
