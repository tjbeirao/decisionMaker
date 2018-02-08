module.exports = function(knex){
    
    // Function that adds admin email 
    const addAdmin = function(email) {
        return knex('admin').insert({
            email: email,
        })
        .then((res) => res)
        .catch(err => console.log(err))
    }
    // Function that queries db for admin emails based on admin id
    const searchForAdminEmail = function(id) {
        return knex.select('email').table('admin').where('id', id)
        .then((res) => res)
        .catch(err => console.log(err))
    }
    // Function that queries db for admin id based on admin email
    const searchForAdminid = function(email) {
        return knex.select('id').table('admin').where('email', email)
        .then((res) => res)
        .catch(err => console.log(err))
    }
    // Function that stores the admin URL and user URL 
    const addSurveyInfo = function(id, adminLink, userLink, title, description, question) {
        return knex('survey').insert({
            admin_id: id,
            admin_link: adminLink,
            user_link: userLink,
            title: title,
            description: description,
            question: question
        })
        .then((res) => res)
        .catch(err => console.log(err))
    }
    // Function that queries db for admin URL 
    const searchForAdminLink = function(id) {
        return knex.select('admin_link').table('admin').where('id', id)
        .then((res) => res)
        .catch(err => console.log(err))
    }
    // Function that queries db for user URL 
    const searchForUserLink = function(id) {
        return knex.select('user_link').table('survey').where('id', id)
        .then((res) => res)
        .catch(err => console.log(err))
    }
     // Function that queries db for survey ID 
     const searchForSurveyid = function(admin_id) {
        return knex.select('id').table('survey').where('admin_id', admin_id)
        .then((res) => res)
        .catch(err => console.log(err))
    }
    // Function that stores the answers from the create page 
    const addResultsInfo = function(id, answer1, answer2, answer3, answer4) {
        return knex('results').insert({
            survey_id: id,
            answer_1: answer1,
            answer_2: answer2,
            answer_3: answer3,
            answer_4: answer4
        })
        .then((res) => res)
        .catch(err => console.log(err))
    }
    // Function that queries db for user URL 
    const searchResultsScore = function(id) {
        return knex.select('score_1','score_2','score_3','score_4').table('results').where('id', id)
        .then((res) => res)
        .catch(err => console.log(err))
    }
    // Function that stores the answers from the create page 
    const addResultsScore = function(id, score1, score2, score3, score4) {
        return knex('results').where('id', id).update({
            score_1: score1,
            score_2: score2,
            score_3: score3,
            score_4: score4
        })
        .then((res) => res)
        .catch(err => console.log(err))
    }

return { 
    addAdmin,
    searchForAdminEmail,
    searchForAdminid,
    addSurveyInfo,
    searchForAdminLink,
    searchForUserLink,
    addResultsInfo,
    searchResultsScore,
    addResultsScore
}

}