const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const authRouter = require("./auth/auth-router.js")
const usersRouter = require("./users/router.js")
const restricted = require('./auth/restricted-middleware')
const secretMessage = require('./auth/secretMessage')

require('dotenv').config();

const server = express()
const port = process.env.PORT

const middleware = [helmet(), cors(), express.json()]
server.use(middleware)
// server.use('api/restricted', restricted)
// server.use('api/restricted', secretMessage)
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


server.listen(port, () => {
  console.log(`\n** Running on http://localhost:${port} **\n`)
})
