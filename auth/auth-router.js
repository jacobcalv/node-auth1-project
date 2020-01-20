const bcrypt = require("bcryptjs")
const express = require("express")
const usersModel = require("../users/model")
const router = require('express').Router();

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); 
  user.password = hash;

  usersModel.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  usersModel.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({ message: `${user.username} has been logged in!` });
      } else {
        res.status(401).json({ message: 'You shall not pass!' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/logout', (req, res) => {
  if(req.session) {
    req.session.destroy(error => {
      if(error) {
        res.status(500).json({message: 'an error has occured with the datatabase', error})
      } else{
        res.status(200).json({message: 'You have been logged out'});
      }
    })
  } 
})


module.exports = router;
