const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const descriptionSchema = new Schema({
  description: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
}, {
  timestamps: true,
});

const Description = mongoose.model('Description', descriptionSchema);

module.exports = Description;