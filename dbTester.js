const pg          = require("pg");
const ENV         = process.env.ENV || "development";
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV])

const dbHelpers = require("./db/dbHelpers.js")(knex)

// knex.select().table('admin').asCallback((err,res) => {
//   console.error(err)
//   console.log(res)
// })
// knex.select().table('survey').asCallback((err,res) => {
//     console.error(err)
//     console.log(res)
//   })
//   knex.select().table('results').asCallback((err,res) => {
//     console.error(err)
//     console.log(res)
//   })


// dbHelpers.searchForAdmin(1)
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))

// dbHelpers.searchForAdmin(2)
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))

// dbHelpers.searchForAdmin(3)
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))


// dbHelpers.searchForAdminLink(1)
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))

// dbHelpers.searchForAdminLink(2)
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))

// dbHelpers.searchForAdminLink(3)
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))

// dbHelpers.searchForUserLink(1)
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))

// dbHelpers.searchForUserLink(2)
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))

// dbHelpers.searchForUserLink(3)
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))

// dbHelpers.searchResultsScore(1)
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))

// dbHelpers.searchResultsScore(2)
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))

// dbHelpers.searchResultsScore(3)
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))




// dbHelpers.addAdmin('juicyj@hotmail.com')
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))

// dbHelpers.addSurveyInfo(14, 'http://www.example.com','http://wwww.youtube.com', 'my new poll', 'hello', 'who do you think you are?')
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))

// dbHelpers.addResultsInfo(12, 'answer1', 'answer2', 'answer3', 'answer4')
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))

dbHelpers.addResultsScore(4, '8','12','16','4')
    .then((res) => console.log(res))
    .catch((err) => console.log(err))


