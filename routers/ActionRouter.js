const express = require('express');
const db = require('../data/helpers/actionModel');
const router = express.Router();

//use CRUD here
router.post('/', validateAction, (req, res) => {
  db.insert(req.body).then(action => {
    res.status(200).json(action)
  })
    .catch(error => {
      res.status(500).json({ message: "error adding action" })
    })
})

router.get('/', (req, res) => {
  db.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res.status(500).json({ message: "error retreiving actions." })
    })
})

router.get('/:id', validateActionID, (req, res) => {
  db.get(req.params.id).then(action => {
    res.status(200).json(action);
  })
    .catch(error => {
      res.status(500).json({ message: "Error getting action id" })
    })
})

router.put('/:id', validateActionID, validateAction, (req, res) => {
  db.update(req.params.id, req.body).then(action => {
    res.status(200).json(action);
  })
    .catch(error => {
      res.status(500).json({ message: "update did not work" })
    })
})

router.delete('/:id', validateActionID, (req, res) => {
  db.remove(req.params.id).then(action => {
    res.status(200).json(action);
  })
    .catch(error => { res.status(500).json({ message: "action is not deleted" }) })
})


//middleware
function validateActionID(req, res, next) {
  db.get(req.params.id).then(action => {
    if (action) {
      req.action = action;
      next();
    }
    else {
      res.status(404).json({ message: "error with action id" })
    }
  })
    .catch(error => {
      res.status(500).json({ message: "Action id could not be retrieved" })
    })
}

function validateAction(req, res, next) {
  if (req.body) {
    if (!req.body.project_id) {
      res.status(400).json({ message: "Missing required project id field" });
    }
    else if (!req.body.description) {
      res.status(400).json({ message: "Missing required description field" })
    }
    else if (!req.body.notes) {
      res.status(400).json({ message: "Missing required notes field" })
    }
    else {
      next();
    }
  }
  else {
    res.status(400).json({ message: "Missing action data" })
  }
}



module.exports = router;