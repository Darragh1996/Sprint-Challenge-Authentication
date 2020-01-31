const db = require("../database/dbConfig");

function find() {
  return db("users").select("id", "username");
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .first();
}

function add(user) {
  return db("users").insert(user);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}

module.exports = {
  find,
  findBy,
  add,
  findById,
  remove
};
