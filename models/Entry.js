const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  description: String,
  excerpt: String,
  originalTitle: String,
  title: { type: String },
  source: String,
  url: { type: String },
  urlToImage: {},
  priority: Number,
  entities: []
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
