const express = require('express');
const passport = require('passport');

const router = express.Router();


router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);


router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
   
    res.json({
      message: 'Login com Google OK',
      user: req.user
    });
  }
);

module.exports = router;
