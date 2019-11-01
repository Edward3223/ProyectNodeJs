const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../../models/User");

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
