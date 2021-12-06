const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../routes/helpers/auth');

/* api/posts */
router.get('/', auth,  async (req, res, next) => {
  const posts = await Post.find();
  res.render('get-posts', {posts:posts});
});

/* use this to send the JSON to be consumed in another frontend app */
router.get('/all', async (req, res, next) => {
  const posts = await Post.find();
  res.json(posts);
});

router.get('/create', auth,  async (req, res, next) => {
  res.render('create-post');
});

router.get('/:id', auth, async (req, res, next) => { 
  const post = await Post.findById(req.params.id);
  res.render('get-post', {post: post});
});

router.post('/create', auth, async (req, res, next) => {
  const post =  new Post(req.body);
   try {
    const newPost = await post.save();
    res.status(201).json(newPost);
   } catch(err) {
    res.status(400).json({ message: err.message });
   }
});

router.get('/:id/update', auth, async (req, res, next) => { 
  const post = await Post.findById(req.params.id);
  res.render('update-post', {post: post});
});

router.post('/:id/update', auth, async (req, res, next) => { 
  const post = await Post.findById(req.params.id);
  if(req.body.title !== null){
    post.title = req.body.title;
  }

  if(req.body.body !== null){
    post.body = req.body.body;
  }

  if(req.body.published !== null){
    post.published = req.body.published;
  }
  
  try {
    await post.save();
    res.json(post);
  } catch(err) {
   res.status(400).json({ message: err.message });
  }
});

router.post('/:id/delete', auth, async (req, res, next) => { 
  try {
   await Post.findByIdAndDelete(req.params.id);
   res.json({message: `${req.params.id} deleted`});
  } catch(err) {
   res.status(500).json({ message: err.message });
  }
});

module.exports = router;