const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getProfile, logout } = require('../controllers/authController');

// kicks off the Google login flow
router.get('/google', (req, res, next) => {
  /*
    #swagger.summary = 'Login with Google'
    #swagger.description = 'Redirects the user to Google for OAuth authentication. Open this URL directly in your browser — do not test through Swagger Execute.'
  */
  next();
}, passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google sends the user back here after they approve
router.get(
  '/google/callback',
  /*  #swagger.ignore = true  */
  passport.authenticate('google', { failureRedirect: '/auth/failed' }),
  (req, res) => {
    req.session.save((err) => {
      if (err) {
        console.log('Session save error:', err);
        return res.redirect('/auth/failed');
      }
      res.redirect('/auth/profile');
    });
  }
);

// shows the logged-in user's profile
router.get('/profile', (req, res, next) => {
  /*
    #swagger.summary = 'Get current user profile'
    #swagger.description = 'Returns the profile of the currently logged-in user. Requires an active Google OAuth session.'
    #swagger.responses[200] = {
      description: 'User is logged in',
      schema: {
        loggedIn: true,
        user: {
          id: '64abc...',
          name: 'Tony Gabito',
          email: 'tonygabito@gmail.com',
          photo: 'https://...'
        }
      }
    }
    #swagger.responses[401] = { description: 'Not logged in' }
  */
  next();
}, getProfile);

// logs out and destroys the session
router.get('/logout', (req, res, next) => {
  /*
    #swagger.summary = 'Log out'
    #swagger.description = 'Ends the current session and logs the user out.'
    #swagger.responses[200] = { description: 'Successfully logged out' }
  */
  next();
}, logout);

// fallback if Google login fails
router.get('/failed', (req, res) => {
  /*  #swagger.ignore = true  */
  res.status(401).json({ error: 'Google login did not work. Please try again.' });
});

module.exports = router;