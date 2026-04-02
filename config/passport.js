const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async function (accessToken, refreshToken, profile, done) {
    try {
        console.log('Google strategy called for:', profile.emails[0].value);
        
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
        console.log('Existing user found:', user.email);
        return done(null, user);
        }

        user = await User.create({
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        photo: profile.photos[0]?.value || ''
        });

        console.log('New user created:', user.email);
        return done(null, user);
    } catch (err) {
        console.log('Strategy error:', err.message);
        return done(err);
    }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user._id.toString());
});

passport.deserializeUser(async function (id, done) {
  try {
    console.log('Deserializing user with id:', id);
    const user = await User.findById(id);
    console.log('Found user:', user);
    done(null, user);
  } catch (err) {
    console.log('Deserialize error:', err.message);
    done(err);
  }
});

module.exports = passport;