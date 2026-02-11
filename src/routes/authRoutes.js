import express from 'express';
import passport from 'passport';

const router = express.Router();

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  (req, res) => {
    res.json({
      message: 'Login successful',
      user: req.user
    });
  }
);

export default router;
