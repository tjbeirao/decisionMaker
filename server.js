"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

const randomUrl = require("./routes/utilities/randomUrl.js");
const cookieSession = require('cookie-session');
const borda = require("./routes/utilities/bordaCount.js");
const dbHelpers = require("./db/dbHelpers.js")(knex)

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000
}))

// Mount all resource routes
// app.use("/api/users", usersRoutes(knex));

app.get("/", (req, res) => {
  res.render("./index")
})

app.post("/", (req, res) => {
  //collect email from HTML input, save it to the data base on [addAdmin]
  //create a cookie with email information
  //let current_user = req.session.current_user
  res.redirect("/index/create")
})

app.get("/create", (req, res) => {
  res.render("./create")
})

app.post("/create", (req, res) => {
  //collect information from HTML text inputs, save it to the data base [addSurveyInfo]
  //call function to generate random URL - twice 
  //let adminlink = randomUrl()
  // let userlink = randomUrl()
  // dbHelpers.addlinks(adminlink, userlink)
  //save random URL on database [addLinks]
  //send email for using the saved cookie
  res.redirect("/create/confirmation")
})

app.get("/create/confirmation", (req, res) => {
  //delete all cookies generated
  res.render("./confirmation")
})

app.get("/survey/:user_survey_id", (req, res) => {
  //we might have to use EJS at this point
  res.render("./survey")
})

app.post("/survey/:user_survey_id", (req, res) => {
  //collect informations from drag-and-drop
  //[searchResultsScore]
  //run the function to do the math of the results
  //save the results in database
  //[addResultsScore]
  //search for admin email 
  //collect information from DB [searchForAdminLink]
  //send the email for the admin
  res.redirect("/survey/confirmation")
})

app.get("/survey/:admin_survey_id", (req, res) =>{
  //pull data from database [addResultsInfo]
  //convert the data to percentage 
  //sort the collection for display
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
  console.log("Testing commit changes");
});
