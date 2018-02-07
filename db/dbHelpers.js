// MAKE SURE THAT dbHelpers.js IS REFERENCED IN server.js
// THROUGH const dbHelpers = require("./db/dbHelpers.js")(knex)

module.exports = function(knex){
    
    // Function that adds admin email 
    const addAdmin = function(email) {
        knex('admin').insert({
            email: email,
        }).asCallback((err,res) => {
            console.error(err)
            return(res)
        })
    }
    // Function that queries db for admin emails based on admin id
    const searchForAdmin = function(id) {
        knex.select('email').table('admin').where('id', id).asCallback((err,res) => {
            console.error(err)
            return(res)
        })
    }
    // Function that stores the admin URL and user URL 
    const addLink = function(adminLink, userLink) {
        knex('survey').insert({
            admin_link: adminLink,
            user_link: userLink
        }).asCallback((err,res) => {
            console.error(err)
            return(res)
        })
    }
    // Function that queries db for admin URL 
    const searchForAdminLink = function(id) {
        knex.select('admin_link').table('survey').where('id', id).asCallback((err,res) => {
            console.error(err)
            return(res)
        })
    }
    // Function that queries db for user URL 
    const searchForUserLink = function(id) {
        knex.select('user_link').table('survey').where('id', id).asCallback((err,res) => {
            console.error(err)
            return(res)
        })
    }
    // Function that stores the inormation from the create page 
    const addSurveyInfo = function(title, description, question) {
        knex('survey').insert({
            title: title,
            description: description,
            question: question
        }).asCallback((err,res) => {
            console.error(err)
            return(res)
        })
    }
    // Function that stores the answers from the create page 
    const addResultsInfo = function(answer1, answer2, answer3, answer4) {
        knex('results').insert({
            answer_1: answer1,
            answer_2: answer2,
            answer_3: answer3,
            answer_4: answer4
        }).asCallback((err,res) => {
            console.error(err)
            return(res)
        })
    }
    // Function that queries db for user URL 
    const searchResultsScore = function(id) {
        knex.select('score_1','score_2','score_3','score_4').table('results').where('id', id).asCallback((err,res) => {
            console.error(err)
            return(res)
        })
    }
    // Function that stores the answers from the create page 
    const addResultsScore = function(id, answer1, answer2, answer3, answer4) {
        knex('results').where(id).update({
            score_1: answer1,
            score_2: answer2,
            score_3: answer3,
            score_4: answer4
        }).asCallback((err,res) => {
            console.error(err)
            return(res)
        })
    }

return { 
    addAdmin,
    searchForAdmin,
    addLinks,
    searchForAdminLink,
    searchForUserLink,
    addSurveyInfo,
    addResultsInfo,
    searchResultsScore,
    addResultsScore
}

}