const { Router } = require("express");

const router = Router();

// /types
router.get("/", async (req, res) => {
  console.log("TEST");
});

module.exports = router;
