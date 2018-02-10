require('dotenv').config();
var accountSid = process.env.ACCOUNTSIR;
var authToken = process.env.AUTHTOKEN;

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

module.exports = function (survey_url, phonenumber) {

client.messages.create({
    body: `Hello we are Decide Kick, you friend is questing your help to decipe a questione. You can help him at: ${survey_url}`,
    to: `+${phonenumber}`,
    from: `+16474960366`
})
    .then((message) => console.log(message.sid));
}