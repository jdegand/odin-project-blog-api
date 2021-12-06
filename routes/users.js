const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/login', function(req, res, next) {

  res.render('login', {title: 'Blog API'});
});

router.post('/login', async function(req, res, next) {
  const user = await User.findOne({email: req.body.email});
  
  if(!user) return res.status(400).send('Invalid Credentials')

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(400).send('Invalid Credentials')
  
  //Create Token Here
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
  
  res.header('authtoken', token);
  res.cookie('authtoken', token);
  res.redirect('/api/posts');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post(
  '/register',
  // username must be an email
  body('email').isEmail(),
  // password must be at least 5 chars long
  body('password').isLength({ min: 5 }),
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    /*check if email exists 
    const emailExists = await User.findOne({email: req.body.email});

    if(emailExists) return res.status(400).send('Email Taken')
    */
   
    //hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    User.create({
      email: req.body.email,
      password: hashedPassword,
    }).then(user => res.send({user: user._id}));
  },
);

router.get('/logout', function(req, res, next) {
  res.render('logout')
});

router.post('/logout', function(req, res, next) {
  res.clearCookie('authtoken');
  res.redirect('/');
});

module.exports = router;
