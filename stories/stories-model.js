// webdb-iv-challenge reference recipes-model

const db = require("../database/dbConfig.js");

module.exports = {
  findStories,
  findById,
  addStory,
  update,
  remove
};

// Find All Stories
function findStories() {
  return db("stories").select("*");
}

// Find Single Story by ID
function findById(id) {
    return db("stories").where({ id: Number(id) }).first();
}

// Add New Story
async function addStory(story) {
    const [id] = await db("stories").insert(story, "id");
    return findById(id);

//   or use below:
//   return db("stories")
//     .insert(story, "id")
//     .then(ids => ({ id: ids[0] }));
}

// Update a Story
// async function update(id, story) {
//     const [id] = await db("stories")
//       .where({ id: Number(id) })
//       .update(story);

//       return findById(id);
// }

function update(id, story) {
    return db("stories")
      .where({ id: Number(id) })
      .update(story);
  }

// Delete a Story
  function remove(id) {
    return db("stories")
      .where({ id: Number(id) })
      .del();
  }


