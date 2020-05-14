const express = require('express');
const posts = require('./postDb.js');
const router = express.Router();

router.get('/', (req, res) => {
  posts.get(req.query)
  .then(posts => {
    res.status(201).json(posts);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "The posts information could not be retrieved." });
  });
});

router.get('/:id', (req, res) => {
  posts.getById(req.params.id)
  .then(post => {
    console.log(post);
    if(post){
    res.status(201).json(post);
    }
    else{
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "The post information could not be retrieved." });
  });
});

router.delete('/:id', (req, res) => {
  posts.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(201).json(count);
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "The post could not be removed" });
  });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  posts.update(req.params.id, changes)
  .then(post => {
    res.status(201).json(changes);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "The post information could not be modified." });
  });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
