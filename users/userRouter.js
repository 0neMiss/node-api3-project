const express = require('express');
const users = require('./userDb.js');
const router = express.Router();




router.post('/', validateUser, (req, res) => {
  users.insert(req.body)
  .then(user => {
    res.status(201).json(user);

  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "There was an error while saving the comment to the database" });
  });
});
//ask about this
router.post('/:id/posts', validatePost, (req, res) => {
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
    res.status(201).json(req.user);
});
//ask about this
router.get('/:id/posts',validateUserId, (req, res) => {
    console.log(`posts from router.get /id/posts `, req.user.id)
    const user = req.user;
    users.getUserPosts(user.id)
    .then(posts => res.status(200).json(posts))
    .catch(() => res.status(500).json({error: "error retrieving posts from database."}))



});

router.delete('/:id', (req, res) => {
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

router.put('/:id', validateUser, (req, res) => {
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


function validateUserId(req, res, next) {
  const id = req.params.id;
  console.log(`req.paramas.id in validateUserId: ${req.params.id}`);
  users.getById(id)
    .then(user =>{
      if(user){
        req.user = user;
        next();
    }
    else{
      res.status(404).json({error: 'user not found'});
    }

    })
    .catch(err =>{
      console.log(err);

    })


};

function validateUser(req, res, next) {
  const body = req.body;
  if(!body){
    res.status(400).json({error: "missing user data" });

  }
  if else(!body.name){
res.status(400).json({error: "missing user name" });
  }
  next();
}

function validatePost(req, res, next) {
  const body = req.body;
  if(!body){
    res.status(400).json({error: "missing post data" });

  }
  if else(!body.text){
res.status(400).json({error: "missing post text" });
  }
  next();
}
}

module.exports = router;
