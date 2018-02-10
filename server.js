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
const mailgun = require("./routes/utilities/mailGun.js")
const twilio = require('twilio');

// Seperated Routes for each Resource
const publicRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
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
    .then(() => {
      mailgun(req.session.current_user, user_link, admin_link)
      return
    })
    .then(() => {
      res.redirect("/create/confirmation");
    })
    .catch((err) => {
      console.error(err)
    });
})

app.get("/create/confirmation", (req, res) => {

  //req.session = null;                                                           //delete all cookies generated
  res.render("confirmation");
})

app.get("/survey/confirmation", (req, res) => {

  //req.session = null;                                                           //delete all cookies generated
  res.render("confirmation");
})

app.get("/survey/:user_survey_id", (req, res) => {
  console.log("in user survey get route")
  let templatevars = {}
  let user_link = req.protocol + '://' + req.get('host') + req.originalUrl
  dbHelpers.searchForSurveyid(user_link)
    .then((surveyid) => {
      templatevars.surveyid = surveyid[0].id
      return dbHelpers.searchSurveyData(surveyid[0].id)
    })
    .then((poll_data) => {
      templatevars.poll_data = poll_data[0];
      res.render("survey", templatevars);
    })
})

app.post("/survey/:user_survey_id", (req, res) => {

  let array = req.body.answers
  let score_1 = 0
  let score_2 = 0
  let score_3 = 0
  let score_4 = 0

  for (let i = 0; i < array.length; i++) {
    if (array[i] === 'score_1') {
      score_1 = (4 - i)
    } else if (array[i] === 'score_2') {
      score_2 = (4 - i)
    } else if (array[i] === 'score_3') {
      score_3 = (4 - i)
    } else if (array[i] === 'score_4') {
      score_4 = (4 - i)
    }
  }

  dbHelpers.searchSurveyScore(req.body.survey_id)
    .then((scores) => {
      score_1 += scores[0].score_1
      score_2 += scores[0].score_2
      score_3 += scores[0].score_3
      score_4 += scores[0].score_4
      return
    })
    .then(() => {
      return dbHelpers.addSurveyScore(req.body.survey_id, score_1, score_2, score_3, score_4)
    })
    .then(() => {
      console.log(req.body.admin_id)
      console.log(req.body.user_link, req.body.admin_link)
      return dbHelpers.searchForAdminEmail(req.body.admin_id)
    })
    .then((email) => {
      mailgun(email[0].email, req.body.user_link, req.body.admin_link)
      return
    })
    .then(() => {
      res.redirect("/survey/confirmation");
    })
    .catch((err) => console.error(err))
})

app.get("/admin/:admin_survey_id", (req, res) => {
  let admin_link = req.protocol + '://' + req.get('host') + req.originalUrl
  
  let percent_1 = 0
  let percent_2 = 0
  let percent_3 = 0
  let percent_4 = 0

  dbHelpers.searchForSurveyidAdminLink(admin_link)
    .then((survey_id) => {
      return dbHelpers.searchSurveyScore(survey_id[0].id)
    })
    .then((data) => {
      let scores = data[0]
    
      let total = scores.score_1 + scores.score_2 + scores.score_3 + scores.score_4;
      console.log("total ", total)
      percent_1 = ((scores.score_1/total) * 100)
      percent_2 = ((scores.score_2/total) * 100)
      percent_3 = ((scores.score_3/total) * 100)
      percent_4 = ((scores.score_4/total) * 100)
      return (scores.id)
    })
    .then((survey_id) => {
      return dbHelpers.searchSurveyData(survey_id)
    })
    .then((survey_data) => {
      let surveyData = survey_data[0]
      let templatevars = {
        surveyData,
        percent_1,
        percent_2,
        percent_3,
        percent_4,
      }

      return res.render("results", templatevars)
    })
  //pull data from database [addResultsInfo]
  //convert the data to percentage 
  //sort the collection for display
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
  console.log("Testing commit changes");
});
