const db = require("../database/dbConfig.js");

module.exports = {
  add,
  findAllUsers,
  findBy,
  findByUserId
  //findStoriesById
};

// for register
async function add(user) {
  const [id] = await db("users").insert(user);
  return findByUserId(id);
}

/* 

function findByUserId(id) {
  return db("users")
  .select("*")
    .where({ id: Number(id) })
    .first();
}

*/

async function findByUserId(id) {
  const user = await db("users")
    .select("*")
    .where({ "users.id": Number(id) })
    .first();

  const stories = await db("stories")
    .join("users", "users.id", "=", "stories.user_id")
    .where({ "stories.user_id": Number(id) })
    .select(
      "stories.id",
      "stories.title",
      "stories.country",
      "stories.description",
      "stories.fullStory",
      "stories.date"
    );

  return { ...user, stories: [...stories] };
}

function findAllUsers() {
  return db("users").select("*");
}

// for login
function findBy(filter) {
  return db("users")
    .where(filter)
    .first();
}

/*


function findStudentsById(id) {
  return db("cohorts as c")
    .join("students as s", "s.cohort_id", "c.cohorts_id") // cohort_id AND cohorts_id
    .select("c.cohorts_id", "c.name", "s.name as StudentName")
    .where({ cohorts_id: Number(id) });
}

*/
