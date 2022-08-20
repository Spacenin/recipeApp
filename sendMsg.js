const fs = require("fs");

//Parse secrets file into JSON and store needed info to create link with Twilio
const secretsFile = JSON.parse(fs.readFileSync("secrets.json"));
const ACCOUNT_SID = secretsFile["twilio"]["account_sid"];
const AUTH_TOKEN = secretsFile["twilio"]["auth_token"];

const twilio = require("twilio")(ACCOUNT_SID, AUTH_TOKEN);

//Create and send message containing daily recipe
function sendMsg(recipeUrl) {
    twilio.messages.create({
        body: "Here is your daily recipe: " + recipeUrl,
        from: "+16626727200",
        to: "+18645902895"
    }).then(message => (console.log("Sent recipe!")));
}

module.exports = {sendMsg};