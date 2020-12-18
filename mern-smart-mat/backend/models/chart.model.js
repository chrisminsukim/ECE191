const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chartSchema = new Schema({
    dataArray: [{
        type: Number
    }]
});

const Chart = mongoose.model('Chart', chartSchema);

module.exports = Chart;