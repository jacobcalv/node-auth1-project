const router = require('express').Router();
const model = require('./model.js');
  
  router.get("/", async (req, res, next) => {
    try {
      const users = await model.find()
      
      res.json(users)
    } catch (err) {
      next(err)
    }
  })

module.exports = router;