require('dotenv').config();
var accountSid = process.env.ACCOUNT_SIR;
var authToken = process.env.AUTH_TOKEN;

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

module.exports = function (user_link) {

client.messages.create({
    body: 'Hello from node',
    to: '+16478706592',
    from: '+16474960366'
})
    .then((message) => console.log(message.sid));
}