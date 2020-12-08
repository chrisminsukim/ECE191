const router = require('express').Router();
let Description = require('../models/descriptions.model');

router.route('/').get((req, res) => {
  Description.find()
    .then(descriptions => res.json(descriptions))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const description = req.body.description;

  const newDescription = new Description({description});
  console.log(newDescription);

  newDescription.save()
    .then(() => res.json('New exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;