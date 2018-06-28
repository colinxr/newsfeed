const fs 				 = require('fs');
const path 			 = require('path');
const request 	 = require('request');
const http 			 = require('http');
const https 		 = require('https');
const Stream 		 = require('stream').Transform;
const Entry      = require('../models/Entry');

getPosts = (req, res) => {
  Entry.find()
    .sort({ date: -1 })
    .then(data => res.send(data))
    .catch(err => res.send(err));
}

getPostsByTag = (req, res) => {
  const tag = req.params.tag
    .split('-')
    .map(el => el = el.charAt(0).toUpperCase() + el.substr(1))
    .join (' ');

  const posts = Entry.find({ entities: tag })
    .sort({ date: -1 })
    .then(data => res.send(data))
    .catch(err => res.send(err));
}

savePost = (req, res) => {
	const imgUrl = req.body.urlToImage;
	const fileName = getFileName(imgUrl);
	const dir = 'media';
	if (!fs.existsSync(dir)) fs.mkdirSync(dir, 0744);

	saveImg(imgUrl, fileName, dir);

	req.body.urlToImage = `${dir}/${fileName}`;

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

getFileName = (url) => {
	return url.substr(url.lastIndexOf('/') + 1)
};

saveImg = (url, filename, path) => {
	request
		.get(url)
		.on('response', (resp) => console.log(resp.headers[`content-type`]))
		.on('error', (err) => console.err(err))
		.pipe(fs.createWriteStream(`${path}/${filename}`));
}

module.exports = {
  getPosts,
  getPostsByTag,
  savePost,
  deletePost
}
