const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const entrySchema = new Schema({
  date: { type: Date, default: Date.now },
  description: String,
  originalTitle: String,
  title: { type: String },
  source: String,
  url: { type: String },
  urlToImage: {},
  priority: Number
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
