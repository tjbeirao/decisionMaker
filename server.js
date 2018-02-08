"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

const randomUrl = require("./routes/utilities/randomUrl.js");
const cookieSession = require('cookie-session');
const borda = require("./routes/utilities/bordaCount.js");
const dbHelpers = require("./db/dbHelpers.js")(knex)

// Seperated Routes for each Resource
const publicRoutes = require("./routes/users");

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
// app.use("/index", publicRoutes(knex));



app.get("/", (req, res) => {
  res.render("index");
})

app.post("/", (req, res) => {
  dbHelpers.addAdmin(req.body.email) //getting the email and sending to the db
  req.session.current_user = req.body.email; //creating a cookie with the email
  res.redirect("/create");
})

app.get("/create", (req, res) => {
  res.render("create");
})

app.post("/create", (req, res) => {
  let user_link = randomUrl('user')
  let admin_link = randomUrl('admin')
  dbHelpers.searchForAdminid(req.session.current_user)
    .then((admin) => {
      console.log(admin[0].id)
      return dbHelpers.addSurveyInfo(
        admin[0].id,
        admin_link,
        user_link,
        req.body.survey_input_title,
        req.body.survey_input_description,
        req.body.survey_input_question,
        req.body.answer1,
        req.body.answer2,
        req.body.answer3,
        req.body.answer4
      )
    })
    .then(()=>{
      return //function(req.session.current_user, user_link, admin_link)
    })
    .then(() => { res.redirect("/create/confirmation");})
    .catch((err) => {console.error(err)});
})

app.get("/create/confirmation", (req, res) => {

  //req.session = null;                                                           //delete all cookies generated
  res.render("confirmation");
})

app.get("/survey/:user_survey_id", (req, res) => {
  let user_link = (`http://localhost8080/survey/${user_survey_id }`)
  dbHelpers.searchForUserLink(user_link)
    .then((poll_data)=>{
      res.render("survey", poll_data);
    })
  //we might have to use EJS at this point
  res.render("survey");
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
  res.redirect("/survey/confirmation");
})

app.get("/admin/:admin_survey_id", (req, res) => {
  //pull data from database [addResultsInfo]
  //convert the data to percentage 
  //sort the collection for display
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
  console.log("Testing commit changes");
});
