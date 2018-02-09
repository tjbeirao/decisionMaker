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
    const addSurveyInfo = function(id, adminLink, userLink, title, description, question, answer1, answer2, answer3, answer4) {
        return knex('survey').insert({
            admin_id: id,
            admin_link: adminLink,
            user_link: userLink,
            title: title,
            description: description,
            question: question,
            answer_1: answer1,
            answer_2: answer2,
            answer_3: answer3,
            answer_4: answer4,
        })
        .then((res) => res)
        .catch(err => console.log(err))
    }
    // Function that queries db for admin URL 
    const searchForLinks = function(id) {
        return knex.select('admin_link', 'user_link').table('survey').where('id', id)
        .then((res) => res)
        .catch(err => console.log(err))
    }
     // Function that queries db for survey ID 
     const searchForSurveyid = function(user_link) {
        return knex.select('id').table('survey').where('user_link', user_link)
        .then((res) => res)
        .catch(err => console.log(err))
    }
    // Function that queries db for user URL 
    const searchSurveyData = function(id) {
        return knex.select(
            'admin_id',
            'admin_link',
            'user_link',
            'title',
            'description',
            'question',
            'answer_1',
            'answer_2',
            'answer_3',
            'answer_4').table('survey').where('id', id)
        .then((res) => res)
        .catch(err => console.log(err))
    }
    // Function that queries db for user URL 
    const searchSurveyScore = function(id) {
        return knex.select('score_1','score_2','score_3','score_4').table('survey').where('id', id)
        .then((res) => res)
        .catch(err => console.log(err))
    }
    // Function that stores the answers from the create page 
    const addSurveyScore = function(id, score1, score2, score3, score4) {
        return knex('survey').where('id', id).update({
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
    searchForLinks,
    searchForSurveyid,
    searchSurveyData,
    searchSurveyScore,
    addSurveyScore
}

}