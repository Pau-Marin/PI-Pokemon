const { Router } = require("express");
const { listTypes } = require("../middlewares/middleware");

const router = Router();

// /types
router.get("/", async (req, res) => {
  try {
    let types = await listTypes();
    return res.json(types);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

module.exports = router;
