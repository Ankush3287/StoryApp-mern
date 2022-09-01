const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();

//Load config files
dotenv.config({
  path: "./config/config.env",
});

//Passport Config
require("./config/passport")(passport);

//Connecting to databse
connectDB();

//Setting up morgan for logging http req
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Setting Handlebars
app.engine(".hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

//Session Middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    //Storing session in db
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Static folder
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
