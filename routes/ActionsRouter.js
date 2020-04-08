const express = require('express');

const Actions = require('../data/helpers/actionModel.js');
const aMid = require("../middleware/actionsMiddleware.js");
const pMid = require("../middleware/projectsMiddleware.js");

const router = express.Router({ mergeParams: true });
router.use(express.json());

router.post(
  '/',
  pMid.validateProjectById,
  aMid.validateAction,
  (req, res) => {
    const project_id = req.params.id;
    req.body.project_id = project_id;

    Actions.insert(req.body)
      .then(resp => {
        res.status(201).json(resp);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "There was an error creating the action." })
      })
  }
)

router.get(
  '/',
  pMid.validateProjectById,
  (req, res) => {
    Actions.get()
      .then(resp => {
        res.status(200).json(resp);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "There was an error getting the actions." })
      })
  }
)

router.get(
  '/:aId',
  pMid.validateProjectById,
  aMid.validateActionById,
  (req, res) => {
    const { aId } = req.params;

    Actions.get(aId)
      .then(resp => {
        res.status(200).json(resp);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "There was an error getting the action." })
      })
  }
)

router.put(
  '/:aId',
  pMid.validateProjectById,
  aMid.validateActionById,
  aMid.validateAction,
  (req, res) => {
    const { aId } = req.params;
    const project_id = req.params.id;
    req.body.project_id = project_id;

    Actions.update(aId, req.body)
      .then(resp => {
        res.status(200).json(resp);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "There was an error updating the action." })
      })
  }
)

router.delete(
  '/:aId',
  pMid.validateProjectById,
  aMid.validateActionById,
  (req, res) => {
    const { aId } = req.params;

    Actions.remove(aId)
      .then(resp => {
        res.status(201).json({ message: "Action deleted." });
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "There was an error deleting the action." })
      })
  }
)


module.exports = router;