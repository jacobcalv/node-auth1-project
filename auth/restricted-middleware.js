const bcrypt = require("bcryptjs")

const userModel = require('../users/model')

module.exports = function restricted() {
    const errorMessage = {
      message: "Invalid credentials try again",
    }
  
    return async (req, res, next) => {
      try {
        const { username, password } = req.headers

        if (!username || !password) {
          return res.status(401).json(errorMessage)
        }
  
        const user = await userModel.findBy({ username }).first()

        if (!user) {
          return res.status(401).json(errorMessage)
        }
  
        const passwordCheck = await bcrypt.compare(password, user.password)

        if (!passwordCheck) {
          return res.status(401).json(errorMessage)
        }

        next()
      } catch (err) {
        next(err)
      }
    }
  }