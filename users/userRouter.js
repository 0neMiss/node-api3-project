const express = require('express');
const users = require('./userDb.js');
const router = express.Router();

router.post('/', (req, res) => {
  users.insert(req.body)
  .then(user => {
    res.status(201).json(user);

  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "There was an error while saving the comment to the database" });
  });
});

router.post('/:id/posts', validateUserId, (req, res) => {
  users.insert(req.body)
  .then(user => {
    console.log(user);
    if(req.params.id){
    res.status(201).json(user);
    }
    else{
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }

  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "There was an error while saving the comment to the database" });
  });
});

router.get('/', (req, res) => {
  users.get(req.query)
  .then(users => {
    res.status(201).json(users);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "The posts information could not be retrieved." });
  });
});

router.get('/:id', validateUserId, (req, res) => {
  users.getById(req.params.id)
  .then(user => {
    console.log(user);
    if(user){
    res.status(201).json(user);
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

router.get('/:id/posts', validateUserId, (req, res) => {
  users.getById(req.params.id)
  .then(posts => {
    console.log(posts);
    if(posts){
    res.status(201).json(posts);
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

router.delete('/:id', validateUserId, (req, res) => {
  users.remove(req.params.id)
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

router.put('/:id', validateUserId, (req, res) => {
  const changes = req.body;
  users.update(req.params.id, changes)
  .then(user => {
    res.status(201).json(changes);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "The post information could not be modified." });
  });
});

//custom middleware
//think this works? lol
function validateUserId(req, res, next) {
  const {id} = req.param;

  users.findById(id)
    .then(user =>{
      if(user){
        req.user = user;
        next();
      }
      else{
        res.status(400).json({ message: "invalid user id" })
      }
    })
}
//broken, needs fixed not sure how to seperate the checks for user and user.name while still using the next function since it will pass it on to the next midleware as soon as the condition is met. also idk what req.user is but it makes sense to use that from following the guided lecture... flip
function validateUser(req, res, next) {
  const {user} = req.body;
  if(user && user.name){
    req.user = user;
    next();
  }
  else{

  }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
