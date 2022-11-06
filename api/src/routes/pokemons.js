const { Router } = require("express");
const { getPokemons, searchPokemon } = require("../middlewares/middleware");

const router = Router();

// /pokemons/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      console.log(req.params);
      let pokemon = await searchPokemon(req.params);
      return res.json(pokemon);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  }
});

// /pokemons?name=...
router.get("/", async (req, res) => {
  const { name } = req.query;
  if (name) {
    try {
      console.log("req.query = " + req.query);
      let pokemon = await searchPokemon(req.query);
      return res.json(pokemon);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  }
});

// /pokemons
router.get("/", async (req, res) => {
  const { offset, limit } = req.query;
  try {
    let pokemons = await getPokemons(offset, limit);
    return res.json(pokemons);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

module.exports = router;
