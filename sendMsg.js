const fs = require("fs");

//Parse secrets file into JSON and store needed info to create link with Twilio
const secretsFile = JSON.parse(fs.readFileSync("/home/pi/Code/js/recipeApp/secrets.json"));
const ACCOUNT_SID = secretsFile["twilio"]["account_sid"];
const AUTH_TOKEN = secretsFile["twilio"]["auth_token"];
const MY_NUMBER = secretsFile["twilio"]["my_number"];
const TWI_NUMBER = secretsFile["twilio"]["twi_number"];

const twilio = require("twilio")(ACCOUNT_SID, AUTH_TOKEN);

//Create and send message containing daily recipe
function sendMsg(recipeUrl) {
    twilio.messages.create({
        body: "Here is your daily recipe: " + recipeUrl,
        from: TWI_NUMBER,
        to: MY_NUMBER
    }).then(message => (console.log("Sent recipe!")));
}

module.exports = {sendMsg};
