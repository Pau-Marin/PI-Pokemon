const { Router } = require("express");
const { searchPokemon, listPokemons } = require("../middlewares/middleware");

const router = Router();

// /pokemons/:id
router.get("/:id", async (req, res) => {
  console.log("/pokemon/:id called");
  const { id } = req.params;
  if (id) {
    try {
      let pokemon = await searchPokemon(req.params);
      return res.json(pokemon);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  }
});

// /pokemons?name=...
router.get("/", async (req, res, next) => {
  const { name } = req.query;
  if (name) {
    console.log("/pokemon/?query called");
    try {
      let pokemon = await searchPokemon(req.query);
      return res.json(pokemon);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  }

  next();
});

// /pokemons/
router.get("/", async (req, res) => {
  console.log("/pokemon/ called");
  try {
    let pokemons = await listPokemons();
    return res.json(pokemons);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

module.exports = router;
