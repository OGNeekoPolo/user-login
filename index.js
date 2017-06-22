const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser')

const app = express();

//Sets up the app to recognize your mustache file
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static("/"));

//Allows you to call data from your html/mustache file based on the 'names' of the HTML elements
app.use(bodyParser.urlencoded({extended: true}));

//Boiler-plate data to set up a session.
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

//Allows us to set up the persistent data
app.use(function(req, res, next){
  req.session.users = {
    Edwin: "bacon1"
  };

  next();
})

//This is the initial path that the
app.get("/", function(req, res, next){
  if (req.session.username) {
    res.send("Hello, " + req.session.username + "!");
  } else {
    res.redirect("/login")
  };
});

//When you go to the /login path, you will tell your js. to render the html/mustache file of index
app.get("/login", function(req, res, next){
  res.render("index");
});

app.post("/login", function(req, res, next){
  console.log(req.session.users[req.body.username]); //console log here to find out what your variables are doing

  //Use an if then statement to check your logged infomation against the information that was submitted in the form
  if (req.session.users[req.body.username] === req.body.password) {
    // if This statement returns true, then you will set the session username to the username submitted through the form.
    req.session.username = req.body.username;
  };
  res.redirect('/');
});


app.listen(3000, function(req, res, next){
  console.log("Booting Up...");
});
