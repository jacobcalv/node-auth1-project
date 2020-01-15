const router = require('express').Router();

router.get("/", async (req, res) => {
    try {
      res.status(200).json({message: "you have made it congrats"})
    } catch (err) {
      res.status(500).json(err)
    }
  })

module.exports = router