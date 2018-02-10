require('dotenv').config();
var api_key = process.env.MAILGUN_API_KEY
var domain = process.env.MAILGUN_TOKEN
var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

module.exports = function (admin_email, user_link, admin_link, friend_email, friend_email) {
    if (!friend_email) {
        var data = {
            from: 'Decide Kick Organization <noreply@decidekick.mydomain.com>',
            to: `${admin_email}`,
            subject: 'Your new survey from Decide Kick',
            text: (
    `Your survey is read for use! \n
    Now, you can share the link bellow with your friends. \n
    ${user_link} \n \n
    The results of the survey that you submit can be found at ${admin_link} \n \n
    Everytime someone reply you question you will get a notification on this e-mail!\n \n
   
    You are welcome anytime!`)};


    } else if (friend_email) {
        var data = {
            from: 'Decide Kick Organization <noreply@decidekick.mydomain.com>',
            to: `${friend_email}`,
            subject: 'Your friend just sent you a survey!',
            text: (
    `Your friend ${admin_email} just sent you a survey and he is asking your help! \n
    If you clink on the link bellow, your will be redirected for our webpage and your friend will get your asnwer for the question \n
    ${user_link} \n 
    To answer your question, just drag and drop which one is your favorite, followed for your second... \n
    You are also welcome to make your own survey, just need to go our website, put your e-email and the question that you need help. We are glad do help!\n \n
   `)};
    }


    mailgun.messages().send(data, function (error, body) {
        console.log(body);
    });
}