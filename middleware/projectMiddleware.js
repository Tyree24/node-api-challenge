const Projects = require("../data/helpers/projectModel.js");

module.exports = {
  validateProject,
  validateProjectById
}

function validateProject(req, res, next) {
  if (!req.body.name || !req.body.description) {
    // not accepted
    res.status(400).json({ errorMessage: "Please send a name and description." })
  } else {
    next();
  }
}

function validateProjectById(req, res, next) {
  // we need to make sure the project exists
  const { id } = req.params;
  Projects.get(id)
    .then(resp => {
      if (resp !== null) {
        next();
      } else {
        res.status(404).json({ errorMessage: "The project with that id does not exist." })
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "There was an error getting the specified project." })
    })
} 