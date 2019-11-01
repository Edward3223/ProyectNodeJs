const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

passport.use(
  "local-signup",
  new localStrategy(
    {
      usernameField: "user",
      passwordField: "password",
      passReqToCallback: true
    },
    (req, user, passport, done) => {}
  )
);
