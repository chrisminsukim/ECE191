const router = require('express').Router();
let Chart = require('../models/chart.model');

router.route('/').get((req, res) => {
  Chart.find()
    .then(charts=> res.json(charts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const dataArray = req.body.dataArray;

  const newDataArray = new Chart({dataArray});
 

  newDataArray.save()
    //console.log(typeof req.body.dataArray)
    .then(() => res.json('New graph added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;