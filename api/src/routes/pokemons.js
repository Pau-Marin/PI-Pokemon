const { Router } = require("express");
const {
  createPokemon,
  searchPokemon,
  listPokemons,
} = require("../middlewares/middleware");

const router = Router();

// /pokemons/
router.post("/", async (req, res) => {
  const {
    name,
    hp,
    attack,
    defense,
    speed,
    img,
    type1,
    type2,
    height,
    weight,
  } = req.body;

  const pokemonCreated = await createPokemon(
    name,
    hp,
    attack,
    defense,
    speed,
    img,
    type1,
    type2,
    height,
    weight
  );
  res.json(pokemonCreated.msg);
});

// /pokemons/:id
router.get("/:id", async (req, res) => {
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
  try {
    let pokemons = await listPokemons();
    return res.json(pokemons);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

module.exports = router;
