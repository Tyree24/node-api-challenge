const express = require('express');
const db = require('../data/helpers/projectModel');
const router = express.Router();

//use CRUD here
router.post('/', validateProject, (req, res) => {
  db.insert(req.body).then(project => {
    res.status(200).json(project)
  })
    .catch(error => {
      res.status(500).json({ message: "error in creating project" })
    })
})


router.get('/', (req, res) => {
  db.get()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(error => {
      res.status(500).json({ message: "error retreiving projects" })
    })
})


router.get('/:id', valdiateProjectID, (req, res) => {
  db.get(req.params.id).then(project => {
    res.status(200).json(project)
  })
    .catch(error => {
      res.status(500).json({ message: "error getting project with id" })
    })
})


router.get('/:id/actions', valdiateProjectID, (req, res) => {
  db.getProjectActions(req.params.id).then(actions => {
    res.status(200).json(actions)
  })
    .catch(error => { res.status(500).json({ message: "error can't get project's actions" }) })
})


router.put('/:id', valdiateProjectID, validateProject, (req, res) => {
  db.update(req.params.id, req.body).then(project => {
    res.status(200).json(project)
  })
    .catch(error => {
      res.status(500).json({ message: "error update did not work" })
    })
})


router.delete('/:id', valdiateProjectID, (req, res) => {
  db.remove(req.params.id).then(project => {
    res.status(200).json(project)
  })
    .catch(error => { res.status(500).json({ message: "error delete did not work" }) })
})


//middleware
function valdiateProjectID(req, res, next) {
  db.get(req.params.id).then(project => {
    if (project) {
      req.project = project;
      next();
    }
    else {
      res.status(404).json({ message: "project id does not exist" })
    }
  })
    .catch(error => { res.status(500).json({ message: "error informaton not retrieved" }) })
}



function validateProject(req, res, next) {
  if (req.body) {
    if (!req.body.name) {
      res.status(400).json({ message: "Missing name field" })
    }
    else if (!req.body.description) {
      res.status(400).json({ message: "Missing description field" })
    }
    else {
      next();
    }
  }
  else { res.status(400).json({ message: "error with project data" }) }
}


module.exports = router;