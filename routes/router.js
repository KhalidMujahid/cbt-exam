const { Router } = require("express");

const router = Router();

// base url
router.get("/", (req, res) => {
  res.status(200).render("index", {
    error: null,
  });
});

module.exports = router;
