
var api_key = 'key-df7a08f7db3a4ad670b77814ddd2ecd7';
var domain = 'sandbox1c0d245039aa4f97b66b027b6a581b39.mailgun.org';
var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

module.exports = function (email, user_link, admin_link) {

var data = {
    from: 'Decide Kick Organization <noreply@decidekick.mydomain.com>',
    to: `${email}`,
    subject: 'Hello',
    text: (`Thank you!! \n
    The results of the survey that you submit can be found at ${admin_link} \n \n
    Now, you can share the link bellow with your friends. 
    Everytime someone reply you question you will get a notification on this e-mail\n \n 
    
    ${user_link}`)
};

mailgun.messages().send(data, function (error, body) {
    console.log(body);
});
}
