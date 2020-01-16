const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const sessions = require('express-session')
const KnexSessionStore = require('connect-session-knex')(sessions); 

const authRouter = require("../auth/auth-router.js")
const usersRouter = require("../users/router.js")
const knex = require('../data/dbConfig.js')


require('dotenv').config();

const server = express()

const secret = process.env.SECRET

const sessionConfiguration = {
    name: 'monstercookie',
    secret: secret,
    saveUninitialized: true, 
    resave: false,

    store: new KnexSessionStore({
        knex, 
        createtable: true,
        clearInterval: 1000 * 60 * 10,
        sidfieldname: 'sid',
        tablename: 'sessions'
    }),

    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false,
        httpOnly: true
    }
}

const middleware = [helmet(), cors(), express.json()]
server.use(middleware)
server.use(sessions(sessionConfiguration))
server.use("/api", authRouter, usersRouter)

server.get("/", (req, res) => {
  res.json({
    message: "API IN SESSION",
    success: "true"
  })
})

server.use((err, req, res, next) => {
  console.log("Error:", err)

  res.status(500).json({
    message: "Something went wrong",
  })
})


module.exports = server