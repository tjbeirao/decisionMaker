const pg          = require("pg");
const ENV         = process.env.ENV || "development";
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV])

const dbHelpers = require("./db/dbHelpers")(knex)

knex.select().table('admin').asCallback((err,res) => {
  console.error(err)
  console.log(res)
})
knex.select().table('survey').asCallback((err,res) => {
    console.error(err)
    console.log(res)
  })
  knex.select().table('results').asCallback((err,res) => {
    console.error(err)
    console.log(res)
  })


// console.log(dbHelpers.searchForAdmin(1))
// console.log(dbHelpers.searchForAdmin(2))
// console.log(dbHelpers.searchForAdmin(3))

// console.log(dbHelpers.searchForAdminLink(1))
// console.log(dbHelpers.searchForAdminLink(2))
// console.log(dbHelpers.searchForAdminLink(3))

// console.log(dbHelpers.searchForUserLink(1))
// console.log(dbHelpers.searchForUserLink(2))
// console.log(dbHelpers.searchForUserLink(3))

// console.log(dbHelpers.searchResultsScore(1))
// console.log(dbHelpers.searchResultsScore(2))
// console.log(dbHelpers.searchResultsScore(3))




// addAdmin,
// addLinks,
// addSurveyInfo,
// addResultsInfo,
// addResultsScore

// searchForAdmin,
// searchForAdminLink,
// searchForUserLink,
// searchResultsScore,
