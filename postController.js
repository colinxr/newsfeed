const Bluebird   = require('bluebird');
const Entry      = require('./models/Entry');
const routes     = require('express').Router();

getPosts = (req, res) => {
  Entry.find()
    .sort({ date: -1 })
    .then(data => {
      res.send(data);
    }).catch(err =>{
      res.send(err);
    });
}

savePost = (req, res) => {
  // NLP stuff to determine topic and theme
  const newEntry = new Entry(req.body);
  newEntry.save()
    .then(entry => {
      res.send({
        success: true,
        message: 'Post Added Successfully'
      });
    })
    .catch(err => {
      res.send(err);
    });
}

deletePost = (req, res) => {
  Entry.remove({ _id: req.params.id})
    .then(entry => res.send({ message: 'Post has been deleted.' }))
    .catch(err => res.send({ message: 'error' }));
}

module.exports = {
  getPosts,
  savePost,
  deletePost
}
