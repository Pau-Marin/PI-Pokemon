const { Pokemon } = require("../db");

module.exports = {
  // Añade un arreglo de objetos pokemons a la BBDD
  addPokemons: function (pokemons) {
    if (!pokemons) throw new Error("No me mandaste pokemons para añadir!");

    Pokemon.bulkCreate(pokemons);
    return "Pokemons añadidos correctamente a la BBDD";
    // for (pokemon in pokemons) {
    //   this.addPokemon(pokemon);
    // }
  },

  // Añade un objeto pokemon a la BBDD
  addPokemon: function (pokemon) {
    if (!pokemon) throw new Error("No me mandaste un pokemon para añadir!");

    Pokemon.create(pokemon);
  },

  listPokemon: function () {},

  searchPokemon: function () {},
};
