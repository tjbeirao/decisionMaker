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
const dbHelpers = require("./db/dbHelpers.js")(knex);
const mailgun = require("./routes/utilities/mailGun.js");
const runoff = require("./routes/utilities/runoff.js")
const twilio = require('twilio');

// Seperated Routes for each Resource
const publicRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
// app.use(morgan('dev'));

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
  dbHelpers.addAdmin(req.body.email)
  req.session.current_user = req.body.email
  res.redirect("/create");
})

app.get("/create", (req, res) => {
  if (req.session.current_user){
  res.render("create");
  } else {
  res.redirect("/")
  }
})

app.post("/create", (req, res) => {
  let form = req.body
  let user_link = randomUrl('user')
  let admin_link = randomUrl('admin')

  dbHelpers.searchForAdminByEmail(req.session.current_user)
    .then((adminID) => {
      return dbHelpers.addSurveyInfo(
        adminID[0].id,
        admin_link,
        user_link,
        form.survey_input_question,
      )
    })
    .then(() => {
      return dbHelpers.searchSurveyByUserLink(user_link)
    })
    .then((survey_id) => {
      let resultsArray = form.answers.map((item)=>{
        item.survey_id = survey_id[0].id
        item.score = 0
        return item
      })
      return resultsArray
      })
    .then((resultsArray) => {
      return dbHelpers.addResultsInfo(resultsArray)
      })
    .then(() => {
      mailgun(req.session.current_user, user_link, admin_link)
      return
    })
    // .then(() => {
    //   console.log(user_link)
    //   twilio(user_link)
    //   return
    // })
    .then(() => {
      res.redirect("/create/confirmation");
    })
    .catch((err) => {
      console.error(err)
    });
})

app.get("/create/confirmation", (req, res) => {

  req.session.current_user = null; 
  res.render("confirmation");
})

app.get("/survey/confirmation", (req, res) => {

  req.session = null;
  res.render("confirmation");
})

app.get("/survey/:user_survey_id", (req, res) => {
  let templatevars = {}
  let user_link = req.protocol + '://' + req.get('host') + req.originalUrl
  dbHelpers.searchSurveyByUserLink(user_link)
    .then((survey) => {
      templatevars.survey = survey[0]
      return survey[0].id
    })
    .then((surveyID) => {
      return dbHelpers.searchResultsBySurveyID(surveyID);
    })
    .then((results) => {
      templatevars.results = results;
      // console.log(results)
      res.render("survey", templatevars);
    })
})

app.post("/survey/:user_survey_id", (req, res) => {
  let scores = req.body.answers
  let promiseArray = []
  let user_link = req.protocol + '://' + req.get('host') + req.originalUrl
  let admin_link = "";
  let answerEmail = true;
  let arr = []
  
  scores = scores.map((item, i)=>{
    let value = scores.length - i
    let obj = {}
    obj.id = parseInt(item, 10)
    obj.value = value
    item = obj
  return item
  })
  for(let i = 0; i < scores.length; i++){

    promiseArray.push(dbHelpers.incrementResultsScore(scores[i].id, scores[i].value))
  }
    return Promise.all(promiseArray)
    .then(()=>{
      return dbHelpers.searchSurveyByUserLink(user_link)
    })
    .then((survey) => {
      admin_link = survey[0].admin_link
      return survey[0].admin_id
    })
    .then((admin_id) => {
      return dbHelpers.searchForAdminByID(admin_id)
    })
    .then((admin_email) => {
      mailgun(admin_email[0].email, user_link, admin_link, answerEmail)
      return
    })
    .then(() => {
      res.redirect("/survey/confirmation");
    })
    .catch(err => console.log(err))
})

app.get("/admin/:admin_survey_id", (req, res) => {
  let admin_link = req.protocol + '://' + req.get('host') + req.originalUrl
  let templatevars = {}
  

  dbHelpers.searchSurveyByAdminLink(admin_link)
    .then((survey)=> {
      templatevars.survey = survey[0]
      return survey[0].id
    })
    .then((id)=> {
      return dbHelpers.searchResultsBySurveyID(id)
    })
    .then((results)=> {
      let total = 0
      results.forEach((item)=>{
        return total += item.score
      })
      console.log(total)
      results = results.map((item)=>{
        item.score = Math.round(100*item.score/total)
        return item
      })
      console.log(results)
      results = results.sort(function (a, b) {
        return (b.score - a.score);
    })
    console.log(results)
      return templatevars.results = results
    })
    .then(()=> {
      res.render("results", templatevars)
    })
    .catch(err => console.log(err))
  })


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
  console.log("Testing commit changes");
});
