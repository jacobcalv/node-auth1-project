const router = require('express').Router();
const model = require('./model.js');
const restricted = require('../auth/restricted-middleware.js');

  router.get("/", restricted, async (req, res, next) => {
    try {
      const users = await model.find()
      
      res.json(users)
    } catch (err) {
      next(err)
    }
  })

module.exports = router;