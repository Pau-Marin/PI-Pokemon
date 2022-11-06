const { Router } = require("express");
const { getPokemons } = require("../middlewares/middleware");

const router = Router();

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

// /pokemons/:id
router.get("/:id", async (req, res) => {
  console.log("TEST");
});

// /pokemons?name=...
router.get("/", async (req, res) => {
  const { name } = req.params;
  console.log("TEST");
});

module.exports = router;
