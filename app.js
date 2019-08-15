//Dependencies
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const express = require("express");
const app = express();
const path = require("path");
const passport = require('passport')
const expHbs = require("express-handlebars");
const session = require("express-session");
const redirectToHTTPS = require("express-http-to-https").redirectToHTTPS;
const flash = require("connect-flash");
const navbarData = require("./data/nav-bar");

//Database

//Routes
const { apiRoutes } = require("./api/index");
const { userRoutes } = require("./user/index");

//Settings

app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  expHbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs"
  })
);
app.set("view engine", ".hbs");

//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "my_own_secret",
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(flash());

//Local variables
app.use((req, res, next) => {
  app.locals.success_msg = req.flash("success_msg");
  app.locals.error_msg = req.flash("error_msg");
  app.locals.error = req.flash("error");
  app.locals.user = req.user;
  app.locals.navbar_data = navbarData;
  next();
});

//Statics files
app.use(express.static(path.join(__dirname, "public")));

//Cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-Auth-Token, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Expose-Headers", "Authorization, X-Auth-Token");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

  next();
});

app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

app.get("/", (req, res) => {
  res.render("index");
});
app.use('/user', userRoutes)
app.use("/api", apiRoutes);

app.get("*", function(req, res) {
res.render("user/not_found");
});

module.exports = app;
