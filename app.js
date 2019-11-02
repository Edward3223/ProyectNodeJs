//Setup of Express, Mongoose, etc . . .
var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  User = require("./models/user");

/* Database 
Mongoose.set (* AVOID ERRORS COMING FROM LAST MONGOOSE VERSION!!! *) */
mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);
//THIS CREATE A DATABASE IF IT IS NOT ALREADY CREATED!
mongoose.connect("mongodb://localhost/ice_cream");

//Configurnoation to have a clean code.
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

//PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "Andres Ogando!",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//USE VAR USER GLOBALLY ON THE CODE!!
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// Schema Setup DB
var icecreamSchema = new mongoose.Schema({
  name: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
});
//Schema
var IceCream = mongoose.model("IceCream", icecreamSchema);

//ROUTES
app.get("/", function(req, res) {
  res.render("Landing");
});

//INDEX ROUTE
app.get("/icecream", function(req, res) {
  //Get all icecreams from db
  IceCream.find({}, function(err, allIcecreams) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { icecream: allIcecreams });
    }
  });
});

//FORM TO LIST A NEW ICE CREAM!
app.get("/icecream/new", isLoggedIn, function(req, res) {
  res.render("New");
});

//ADD NEW ICE CREAM TO THE DB.
app.post("/icecream", isLoggedIn, function(req, res) {
  //get data from form and add to icecreams array
  var name = req.body.name;
  var description = req.body.description;
  var username = (res.locals.currentUser = req.user);
  var newIcecreams = {
    name: name,
    description: description,
    username: username
  };
  //CREATE A NEW ICECREAM AND SAVE TO DB
  IceCream.create(newIcecreams, function(err, newlyAdded) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/icecream");
    }
  });
});

//  ===========
// AUTH ROUTES
//  ===========

// show register form
app.get("/register", function(req, res) {
  res.render("register");
});

//handle sign up logic
app.post("/register", function(req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/icecream");
    });
  });
});

// show login form
app.get("/login", function(req, res) {
  res.render("login");
});
// handling login logic
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/icecream",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);

// logic route
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

//ERROR PAGE

app.get("*", function(req, res) {
  res.render("Error");
});

app.listen(3002, function() {
  console.log("arranco el meneo boby");
});
