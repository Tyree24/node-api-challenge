const express = require('express');

const Projects = require('../data/helpers/projectModel.js');
const pMid = require("../middleware/projectsMiddleware.js");
// const ActionsRouter = require('./ActionsRouter.js');

const router = express.Router();
router.use(express.json());
// router.use('/:id/actions', ActionsRouter);

// create a project
router.post('/', pMid.validateProject, (req, res) => {
  Projects.insert(req.body)
    .then(resp => {
      res.status(201).json(resp);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "There was an error creating a project." })
    })
})

// get all projects

// get project by id

// update a project

// delete a project

module.exports = router;