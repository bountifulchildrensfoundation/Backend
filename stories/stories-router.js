// Packages
const storiesRouter = require("express").Router();

// Data
const stories = require("../stories/stories-model.js");

// Middleware
const { checkTitle } = require("../auth/authenticators.js");

// ========  For endpoints beginning with /stories

// Get All Stories 
storiesRouter.get("/", (req, res) => {
  stories
    .findStories()
    .then(stories => {
      res.status(200).json(stories);
    })
    .catch(err => {
      res.status(500).json({ error: "The stories could not be retrieved." });
    });
});

// Get Story by ID
storiesRouter.get("/:id", (req, res) => {
  const storyId = req.params.id;
  stories
    .findById(storyId)
    .then(story => {
      if (story) {
        res.status(200).json(story);
      } else {
        res.status(404).json({ error: "This story could not be found." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "This story's information could not be retrieved." });
    });
});

// Add New Story
storiesRouter.post("/", checkTitle("Coordinator"), (req, res) => {
  const story = req.body;
  if (
    !story ||
    !story.user_id ||
    !story.title ||
    !story.country ||
    !story.description ||
    !story.fullStory ||
    !story.date
  ) {
    res.status(400).json({
      error:
        "You must post a story with a user_id, title, country, description, fullStory, and date."
    });
  } else {
    stories
      .addStory(story, "id")
      .then(story => {
        res.status(200).json(story);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the story to the database."
        });
      });
  }
});

// Update Story
storiesRouter.put("/:id", checkTitle("Coordinator"), (req, res) => {
  const story = req.body;
  const storyId = req.params.id;

  if (
    !story ||
    !story.user_id ||
    !story.title ||
    !story.country ||
    !story.description ||
    !story.fullStory ||
    !story.date
  ) {
    res.status(400).json({
      error:
        "The story must have a user_id, title, country, description, fullStory, and date."
    });
  } else {
    stories
      .update(storyId, story)
      .then(count => {
        if (count > 0) {
          res.status(200).json({
            message: `${count} ${count > 1 ? "stories" : "story"} updated!`
          });
        } else {
          res.status(404).json({ error: "This story could not be found." });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "There was an error while updating the story." });
      });
  }
});

// Delete Story
storiesRouter.delete("/:id", checkTitle("Coordinator"), (req, res) => {
  const storyId = req.params.id;
  stories
    .remove(storyId)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} ${count > 1 ? "stories" : "story"} deleted!`
        });
      } else {
        res.status(404).json({ error: "This story could not be found." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "There was an error while deleting the story." });
    });
});

module.exports = storiesRouter;
