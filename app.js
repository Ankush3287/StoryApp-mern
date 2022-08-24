const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const app = express();

//Load config files
dotenv.config({
  path: "./config/config.env",
});

//Connecting to databse
connectDB();

//Setting up morgan for logging http req
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Setting Handlebars
app.engine(".hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
