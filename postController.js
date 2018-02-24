const Bluebird   = require('bluebird');
const language   = require('@google-cloud/language');
const Entry      = require('./models/Entry');
const routes     = require('express').Router();

const client     = new language.LanguageServiceClient()

getPosts = (req, res) => {
  Entry.find()
    .sort({ date: -1 })
    .then(data => res.send(data))
    .catch(err => res.send(err));
}

analyzeEntities = (req, res, next) => {
  console.log('analyzing post');
  const title = req.body.title;
  const desc = req.body.description;

  const text = `${title}. ${desc}`;
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  const topics = [];

  client
    .analyzeEntities({ document })
    .then(results => {
      const entities = results[0].entities;
      entities.forEach(entity => {
        console.log(entity.name);
        console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
        if (entity.metadata && entity.metadata.wikipedia_url) {
          console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}$`);
        }
        if (entity.salience > 0.18) {
          topics.push(entity.name);
        }
      });
      req.body.entities = topics;
      // console.log(req.body.entities);
      next();
    })
   .catch(err => {
     console.error('ERROR:', err);
     res.status(500).send(err.message);
   });

  // console.log(topics);
  // req.entities = topics;
}

savePost = (req, res) => {
  console.log('saving');
  console.log(req.body.entities);
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
  Entry.remove({ _id: req.params.id })
    .then(entry => res.send({ message: 'Post has been deleted.' }))
    .catch(err => res.send({ message: 'error' }));
}

module.exports = {
  getPosts,
  analyzeEntities,
  savePost,
  deletePost
}
