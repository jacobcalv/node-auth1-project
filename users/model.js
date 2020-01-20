const bcrypt = require("bcryptjs")
const db = require("../data/dbConfig")

function find() {
  return db("user_accounts")
    .select("id", "username", "password")
    //to show that password is hashed^
}

function findBy(user) {
  return db("user_accounts")
    .where(user)
    .select("id", "username", "password")
}

async function add(user) {
  const [id] = await db('user_accounts').insert(user);

  return findById(id);
}

function findById(id) {
  return db("user_accounts")
    .where({ id })
    .first("id", "username")
}

module.exports = {
  add,
  find,
  findBy,
  findById,
}